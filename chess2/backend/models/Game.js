// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  whitePlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  blackPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  winner: { type: String },
  moves: { type: [String], default: [] },
});

module.exports = mongoose.model('Game', gameSchema);