import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getPlayerById } from "../data/Playerrec";
import { countPlayerStats } from "../data/Gamerec";
const ProfilePage = () => {
  
  const navigation = useNavigation();
  const route = useRoute();
  const { authPayload } = route.params || {}; // Safely access authPayload
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (authPayload && authPayload.player?.id) {
      const fetchedPlayer = getPlayerById(authPayload.player.id);
      if (fetchedPlayer) {
        setPlayer(fetchedPlayer);
        const fetchedStats = countPlayerStats(fetchedPlayer.username);
        setStats(fetchedStats);
      } else {
        console.error("Player not found for ID:", authPayload.player.id);
      }
    } else {
      console.error("authPayload is missing or invalid!");
    }
  }, [authPayload]);

  return (
    <View style={styles.container}>
      {player ? (
        <View>
          <Text style={styles.header}>Player Profile</Text>
          <Text>Username: {player.username}</Text>
          <Text>Rating: {player.rating}</Text>
          <Text>Bio: {player.bio}</Text>
          <Text>Location: {player.location}</Text>
          {stats ? (
            <View style={styles.statsContainer}>
              <Text style={styles.statsHeader}>Game Stats</Text>
              <Text>Wins: {stats.wins}</Text>
              <Text>Losses: {stats.losses}</Text>
              <Text>Ties: {stats.ties}</Text>
            </View>
          ) : (
            <Text>Loading stats...</Text>
          )}
        </View>
      ) : (
        <Text>Loading profile...</Text>
      )}
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
});

export default ProfilePage;
