import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { graphqlClient } from "../graphql/client"; // Ensure you have graphqlClient setup
import { GET_ALL_PLAYERS } from "../graphql/queries"; // Import the GET_ALL_PLAYERS query

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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      {players.map((item, index) => (
        <View key={item.id} style={styles.leaderboardItem}>
          <Text style={styles.rank}>{index + 1}</Text>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  leaderboardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
    borderRadius: 8,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    fontSize: 18,
    flex: 1,
    marginLeft: 8,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    fontSize: 16,
    color: "red",
  },
});

export default Leaderboard;
