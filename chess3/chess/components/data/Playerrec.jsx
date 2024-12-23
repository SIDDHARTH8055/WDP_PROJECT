import bcrypt from 'bcryptjs';

// Function to retrieve the player list from localStorage
export const getPlayers = () => {
  const players = JSON.parse(localStorage.getItem('players'));
  return players || []; // Return the list or an empty array if not found
};

// Function to save the player list to localStorage
const savePlayers = (players) => {
  localStorage.setItem('players', JSON.stringify(players));
};

// Function to retrieve a single player by ID
export const getPlayerById = (id) => {
  const players = getPlayers();
  return players.find((player) => player.id === id);
};

// Function to add a new player to the list
export const createPlayer = (username, email, password, rating = 1200, bio = "", location = "") => {
  console.log("from server");
  console.log(username);
  console.log(email);
  console.log(password);
  console.log(rating);
  console.log(bio);
  console.log(location);

  // Retrieve existing players from localStorage
  const players = getPlayers();

  // Check if username already exists
  const existingPlayer = players.find(player => player.username === username);
  if (existingPlayer) {
    throw new Error("Username is already taken.");
  }

  // Check if email already exists
  const existingEmail = players.find(player => player.email === email);
  if (existingEmail) {
    throw new Error("Email is already taken.");
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create new player
  const newPlayer = {
    id: (players.length + 1).toString(), // Generate a simple ID
    username,
    email,
    password: hashedPassword,
    rating,
    bio,
    location,
  };

  // Add the new player to the list
  players.push(newPlayer);

  // Save the updated list to localStorage
  savePlayers(players);

  return newPlayer;
};

// Function to update an existing player's bio and/or location by ID
export const updatePlayer = (id, bio, location) => {
  const players = getPlayers();
  const player = players.find((player) => player.id === id);
  if (player) {
    if (bio) player.bio = bio;
    if (location) player.location = location;

    // Save the updated player list to localStorage
    savePlayers(players);

    return player;
  }
  return null; // Return null if the player is not found
};

// Function to login a player
export const login = (username, password) => {
  console.log('Username:', username);
  console.log('Password:', password);

  const players = getPlayers();
  const player = players.find((player) => player.username === username);
  if (!player) {
    throw new Error("Player not found.");
  }

  const isPasswordValid = bcrypt.compareSync(password, player.password); // Verify the password
  if (!isPasswordValid) {
    throw new Error("Invalid password.");
  }

  // Authentication successful
  return {
    token: "token", // Replace with a JWT in a real implementation
    player: {
      id: player.id,
      username: player.username,
      email: player.email,
      rating: player.rating,
      bio: player.bio,
      location: player.location,
    },
  };
};
