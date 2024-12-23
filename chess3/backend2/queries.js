import { gql } from 'graphql-request';

// Mutation to add a new player
export const ADD_PLAYER = gql`
  mutation AddPlayer($username: String!, $email: String!, $password: String!, $bio: String, $location: String) {
    addPlayer(username: $username, email: $email, password: $password, bio: $bio, location: $location) {
      id
      username
      email
      bio
      location
    }
  }
`;

// Mutation to login
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

// Mutation to reset password
export const RESET_PASSWORD = gql`
  mutation ResetPassword($playerId: ID!, $newPassword: String!) {
    resetPassword(playerId: $playerId, newPassword: $newPassword) {
      id
      username
    }
  }
`;

// Mutation to update player details
export const UPDATE_PLAYER_DETAILS = gql`
  mutation UpdatePlayerDetails($playerId: ID!, $bio: String, $location: String) {
    updatePlayerDetails(playerId: $playerId, bio: $bio, location: $location) {
      id
      username
      bio
      location
    }
  }
`;

// Mutation to update player rating
export const UPDATE_PLAYER_RATING = gql`
  mutation UpdatePlayerRating($playerId: ID!, $rating: Int!) {
    updatePlayerRating(playerId: $playerId, rating: $rating) {
      id
      username
      rating
    }
  }
`;

// Mutation to create a new game
export const CREATE_GAME = gql`
  mutation CreateGame($whitePlayerId: ID!, $blackPlayerId: ID!, $mode: String!, $winner: String, $moves: [String]) {
    createGame(
      whitePlayerId: $whitePlayerId
      blackPlayerId: $blackPlayerId
      mode: $mode
      winner: $winner
      moves: $moves
    ) {
      id
      mode
      winner
      moves
    }
  }
`;

// Query for health check
export const HEALTH_CHECK = gql`
  query HealthCheck {
    healthCheck
  }
`;

// Query for all players
export const ALL_PLAYERS = gql`
  query AllPlayers {
    allPlayers {
      id
      username
      email
      rating
      bio
      location
    }
  }
`;

// Query for player by ID
export const PLAYER_BY_ID = gql`
  query PlayerById($id: ID!) {
    playerById(id: $id) {
      id
      username
      email
      rating
      bio
      location
    }
  }
`;

// Query for all games
export const ALL_GAMES = gql`
  query AllGames {
    allGames {
      id
      mode
      winner
      moves
    }
  }
`;

// Query for game by ID
export const GAME_BY_ID = gql`
  query GameById($id: ID!) {
    gameById(id: $id) {
      id
      mode
      winner
      moves
    }
  }
`;

// Query for counting stats
export const COUNT_STATS = gql`
  query CountStats($playerId: ID!, $mode: String) {
    countStats(playerId: $playerId, mode: $mode) {
      won
      lost
      tied
    }
  }
`;
