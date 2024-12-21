// schema.js
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Player {
    id: ID!
    username: String!
    email: String!
    rating: Int!
    bio: String
    location: String
  }

  type Game {
    id: ID!
    whitePlayer: Player!
    blackPlayer: Player!
    winner: String
    moves: [String!]
  }

  type AuthPayload {
    token: String!
    player: Player!
  }

  type Query {
    players: [Player!]!
    player(id: ID!): Player
    games: [Game!]!
    game(id: ID!): Game
    login(email: String!, password: String!): AuthPayload
  }

  type Mutation {
    createPlayer(username: String!, email: String!, password: String!): Player
    updatePlayer(id: ID!, bio: String, location: String): Player
    createGame(whitePlayer: ID!, blackPlayer: ID!, winner: String, moves: [String!]): Game
  }
`);

module.exports = schema;