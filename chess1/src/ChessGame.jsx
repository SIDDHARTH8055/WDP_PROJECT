import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const ChessGame = () => {
  const [game, setGame] = useState(new Chess()); // Initialize the chess game state

  // Function to handle piece movements
  const onDrop = (sourceSquare, targetSquare) => {
    const newGame = new Chess(); // Create a temporary game instance to avoid mutation
    newGame.load(game.fen()); // Load the current game state

    const move = newGame.move({
      from: sourceSquare,
      to: targetSquare,
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
    <div className="chessboard-container">
      <h1 className="title">React Chess Game</h1>
      <Chessboard
        position={game.fen()} // Display the current position
        onPieceDrop={onDrop} // Handle piece drops
        boardWidth={700} // Reduce board size by 50%
        customBoardStyle={{
          borderRadius: "5px",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
        }}
      />
      <button className="undo-button" onClick={handleUndo}>
        Undo Move
      </button>
    </div>
  );
};

export default ChessGame;
