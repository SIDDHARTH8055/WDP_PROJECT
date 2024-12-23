import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Chess } from "chess.js";
import Chessboard from "react-native-chessboard"; // Chessboard component for React Native

const ChessGame = () => {
  const [game, setGame] = useState(new Chess()); // Initialize the chess game state

  // Function to handle piece movements
  const onDrop = (from, to) => {
    const newGame = new Chess(); // Create a temporary game instance to avoid mutation
    newGame.load(game.fen()); // Load the current game state

    const move = newGame.move({
      from,
      to,
      promotion: "q", // Always promote to queen
    });

    if (move) {
      setGame(newGame); // Update the game state only if the move is valid
      return true;
    }
    return false; // Reject invalid moves
  };

  // Function to undo the last move
  const handleUndo = () => {
    const newGame = new Chess();
    newGame.load(game.fen());
    newGame.undo();
    setGame(newGame);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Chess Game</Text>
      <Chessboard
        fen={game.fen()} // Display the current position
        onMove={onDrop} // Handle piece drops
        size={300} // Set the board size
      />
      <Button title="Undo Move" onPress={handleUndo} style={styles.undoButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  undoButton: {
    marginTop: 16,
    padding: 8,
  },
});

export default ChessGame;
