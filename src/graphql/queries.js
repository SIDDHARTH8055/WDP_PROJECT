// Define all the GraphQL operations as constants

// Query: Get all players
export const GET_ALL_PLAYERS = `
  query GetAllPlayers {
    players {
      id
      username
      email
      rating
      profile {
        bio
        location
        avatarUrl
      }
    }
  }
`;

// Query: Get a single player by ID
export const GET_PLAYER = `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      username
      email
      rating
      profile {
        bio
        location
        avatarUrl
      }
    }
  }
`;

// Query: Get all games for a player
export const GET_GAMES = `
  query GetGames($playerId: ID!) {
    getGames(playerId: $playerId) {
      id
      whitePlayer {
        id
        username
      }
      blackPlayer {
        id
        username
      }
      winner
      moves
    }
  }
`;

// Mutation: Create a new player
export const CREATE_PLAYER = `
  mutation CreatePlayer(
    $username: String!, 
    $email: String!, 
    $password: String!, 
    $bio: String, 
    $location: String, 
    $avatarUrl: String
  ) {
    createPlayer(
      username: $username, 
      email: $email, 
      password: $password,
      bio: $bio,
      location: $location,
      avatarUrl: $avatarUrl
    ) {
      id
      username
      email
      rating
      profile {
        bio
        location
        avatarUrl
      }
    }
  }
`;


// Mutation: Create a new game
export const CREATE_GAME = `
  mutation CreateGame($whitePlayerId: ID!, $blackPlayerId: ID!) {
    createGame(whitePlayerId: $whitePlayerId, blackPlayerId: $blackPlayerId) {
      id
      whitePlayer {
        id
        username
      }
      blackPlayer {
        id
        username
      }
      moves
    }
  }
`;

// Mutation: Make a move in a game
export const MAKE_MOVE = `
  mutation MakeMove($gameId: ID!, $move: String!) {
    makeMove(gameId: $gameId, move: $move) {
      id
      moves
      winner
    }
  }
`;

// Subscription: Game updates
export const GAME_UPDATES = `
  subscription GameUpdates($gameId: ID!) {
    gameUpdates(gameId: $gameId) {
      id
      moves
      winner
      whitePlayer {
        id
        username
      }
      blackPlayer {
        id
        username
      }
    }
  }
`;
export const LOGIN_USER = `
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      userId
    }
  }
`;


