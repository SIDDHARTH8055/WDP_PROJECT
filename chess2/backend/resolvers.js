// resolvers.js
const Player = require('./models/Player');
const Game = require('./models/Game');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY; // Replace with a secure key

const root = {
  players: async () => await Player.find(),
  player: async ({ id }) => await Player.findById(id),
  games: async () => await Game.find().populate('whitePlayer').populate('blackPlayer'),
  game: async ({ id }) => await Game.findById(id).populate('whitePlayer').populate('blackPlayer'),
  login: async ({ email, password }) => {
    try {
      const player = await Player.findOne({ email });
      if (!player) {
        throw new Error('Player not found');
      }

      const valid = await bcrypt.compare(password, player.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ playerId: player.id }, SECRET_KEY, { expiresIn: '1h' });

      return {
        token,
        player,
      };
    } catch (error) {
      throw new Error('Error during login: ' + error.message);
    }
  },

  createPlayer: async ({ username, email, password }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newPlayer = new Player({ username, email, password: hashedPassword });
      return await newPlayer.save();
    } catch (error) {
      throw new Error('Error creating player: ' + error.message);
    }
  },

  updatePlayer: async ({ id, bio, location }) => {
    try {
      return await Player.findByIdAndUpdate(
        id,
        { bio, location },
        { new: true } // Return the updated document
      );
    } catch (error) {
      throw new Error('Error updating player: ' + error.message);
    }
  },

  createGame: async ({ whitePlayer, blackPlayer, winner, moves }) => {
    try {
      const newGame = new Game({ whitePlayer, blackPlayer, winner, moves });
      return await newGame.save();
    } catch (error) {
      throw new Error('Error creating game: ' + error.message);
    }
  },

  whitePlayer: async (parent) => await Player.findById(parent.whitePlayer),
  blackPlayer: async (parent) => await Player.findById(parent.blackPlayer),
};

module.exports = root;
