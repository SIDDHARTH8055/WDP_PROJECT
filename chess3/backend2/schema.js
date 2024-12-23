const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Player {
    id: ID!
    username: String!
    email: String!
    password: String!
    rating: Int!
    bio: String
    location: String
  }

  type Game {
    id: ID!
    whitePlayer: Player
    blackPlayer: Player
    mode: String
    winner: String
    moves: [String]
  }

  type Stats {
    won: Int
    lost: Int
    tied: Int
  }

  type LoginResponse {
    token: String
    userId: String
  }

  type Query {
    healthCheck: String
    allPlayers: [Player!]
    playerById(id: ID!): Player
    allGames: [Game!]
    gameById(id: ID!): Game
    countStats(playerId: ID!, mode: String): Stats
  }

  type Mutation {
    addPlayer(
      username: String!,
      email: String!,
      password: String!,
      rating: Int,
      bio: String,
      location: String
    ): Player

    login(email: String!, password: String!): LoginResponse

    resetPassword(playerId: ID!, newPassword: String!): Player

    updatePlayerDetails(playerId: ID!, bio: String, location: String): Player

    updatePlayerRating(playerId: ID!, rating: Int!): Player

    createGame(
      whitePlayerId: ID!,
      blackPlayerId: ID!,
      mode: String!,
      winner: String,
      moves: [String]
    ): Game
  }
`);

module.exports = schema;
