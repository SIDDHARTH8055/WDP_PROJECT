import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Leaderboard from "./Leaderboard";
import ChessGame from "./ChessGame";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/chessgame" element={<ChessGame />} />
      </Routes>
    </Router>
  );
};

export default App;
