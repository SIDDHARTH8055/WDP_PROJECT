const mongoose = require('mongoose');

// Define the schema
const playerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rating: { type: Number, default: 1200 },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
});

// Model creation
const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
