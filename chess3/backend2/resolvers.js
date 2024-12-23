const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Player = require('./models/Player');
const Game = require('./models/Game');

const resolvers = {
  Query: {
    healthCheck: () => 'Server is running!',

    allPlayers: async () => {
      return await Player.find();
    },

    playerById: async (_, { id }) => {
      return await Player.findById(id);
    },

    allGames: async () => {
      return await Game.find().populate('whitePlayer').populate('blackPlayer');
    },

    gameById: async (_, { id }) => {
      return await Game.findById(id).populate('whitePlayer').populate('blackPlayer');
    },

    countStats: async (_, { playerId, mode }) => {
      const games = await Game.find({
        $or: [{ whitePlayer: playerId }, { blackPlayer: playerId }],
        mode,
      });

      const stats = {
        won: games.filter((game) => game.winner === playerId).length,
        lost: games.filter((game) => game.winner && game.winner !== playerId).length,
        tied: games.filter((game) => !game.winner).length,
      };

      return stats;
    },
  },

  Mutation: {
    addPlayer: async (_, { username, email, password, bio, location }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const player = new Player({
          username,
          email,
          password: hashedPassword,
          bio,
          location,
        });
        const Savedplayer=await player.save();
        console.log(Savedplayer);
        return Savedplayer;
      } catch (err) {
        if (err.code === 11000) {
          if (err.keyValue.username) throw new Error('Username already exists!');
          if (err.keyValue.email) throw new Error('Email already exists!');
        }
        throw new Error('Error creating player');
      }
    },

    login: async (_, { email, password }) => {
      const player = await Player.findOne({ email });
      if (!player) throw new Error('Player not found');

      const validPassword = await bcrypt.compare(password, player.password);
      if (!validPassword) throw new Error('Invalid credentials');

      const token = jwt.sign({ id: player.id }, 'secretkey', { expiresIn: '1h' });
      return { token, userId: player.id };
    },

    resetPassword: async (_, { playerId, newPassword }) => {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      return await Player.findByIdAndUpdate(
        playerId,
        { password: hashedPassword },
        { new: true }
      );
    },

    updatePlayerDetails: async (_, { playerId, bio, location }) => {
      const updateData = {};
      if (bio) updateData.bio = bio;
      if (location) updateData.location = location;

      return await Player.findByIdAndUpdate(playerId, updateData, { new: true });
    },

    updatePlayerRating: async (_, { playerId, rating }) => {
      return await Player.findByIdAndUpdate(playerId, { rating }, { new: true });
    },

    createGame: async (_, { whitePlayerId, blackPlayerId, mode, winner, moves }) => {
      const game = new Game({
        whitePlayer: whitePlayerId,
        blackPlayer: blackPlayerId,
        mode,
        winner,
        moves,
      });
      return await game.save();
    },
  },
};

module.exports = resolvers;
