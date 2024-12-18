import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_PLAYER_PROFILE } from '../graphql/queries';

const ProfileScreen = () => {
  const { loading, error, data } = useQuery(GET_PLAYER_PROFILE);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { username, highScore, achievements } = data.playerProfile;

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.highScore}>High Score: {highScore}</Text>
      <Text style={styles.achievementsTitle}>Unlocked Achievements:</Text>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.achievement}>{item.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  highScore: {
    fontSize: 18,
    marginBottom: 16,
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  achievement: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ProfileScreen;