import React, { useEffect, useState } from 'react';
import { graphqlClient } from './client'; // Ensure you have graphqlClient setup
import { GET_ALL_PLAYERS } from './graphql/queries'; // Import the GET_ALL_PLAYERS query

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await graphqlClient.request(GET_ALL_PLAYERS);
        const sortedPlayers = response.players.sort((a, b) => b.rating - a.rating); // Sort players by rating
        setPlayers(sortedPlayers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Leaderboard</h1>
      <div>
        {players.map((item, index) => (
          <div key={item.id} style={styles.leaderboardItem}>
            <span style={styles.rank}>{index + 1}</span>
            <span style={styles.username}>{item.username}</span>
            <span style={styles.rating}>{item.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '16px',
  },
  leaderboardItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f9f9f9',
    marginBottom: '8px',
    borderRadius: '8px',
  },
  rank: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  username: {
    fontSize: '18px',
    flex: 1,
    marginLeft: '8px',
  },
  rating: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default Leaderboard;
