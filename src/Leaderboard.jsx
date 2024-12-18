import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = localStorage.getItem("token"); // Get JWT token
      if (!token) {
        alert("Unauthorized! Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:4010/leaderboard", {
          headers: { Authorization: token }, // Send token in the header
        });
        setPlayers(response.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching leaderboard!");
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.username}: {player.score} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
