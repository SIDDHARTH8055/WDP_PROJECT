import { getPlayers } from './Playerrec';

// Function to retrieve the game list from localStorage
const getGames = () => {
  const games = JSON.parse(localStorage.getItem('games'));
  return games || []; // Return the list or an empty array if not found
};

// Function to save the game list to localStorage
const saveGames = (games) => {
  localStorage.setItem('games', JSON.stringify(games));
};

// Model for a game (simulated schema)
const createGame = (whitePlayer, blackPlayer, winner = null, moves = []) => {
  const games = getGames();

  const newGame = {
    id: (games.length + 1).toString(), // Generate a simple ID
    whitePlayer,
    blackPlayer,
    winner,
    moves,
  };

  games.push(newGame);
  saveGames(games);

  return newGame;
};

// Function to retrieve games for a specific player by username
const getGamesForPlayer = (username) => {
  const players = getPlayers();
  const player = players.find((player) => player.username === username);
  if (!player) {
    throw new Error("Player not found.");
  }

  const games = getGames();
  return games.filter(
    (game) =>
      game.whitePlayer === player.id || game.blackPlayer === player.id
  );
};

// Function to count wins, losses, and ties for a specific player
const countPlayerStats = (username) => {
  const games = getGamesForPlayer(username);
  const players = getPlayers();
  const player = players.find((player) => player.username === username);
  if (!player) {
    throw new Error("Player not found.");
  }

  let wins = 0;
  let losses = 0;
  let ties = 0;

  games.forEach((game) => {
    if (game.winner === null) {
      ties += 1;
    } else if (game.winner === player.id) {
      wins += 1;
    } else {
      losses += 1;
    }
  });

  return { wins, losses, ties };
};

export { createGame, getGamesForPlayer, countPlayerStats };
