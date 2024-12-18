import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_LEADERBOARD } from '../graphql/queries';

const Leaderboard = () => {
  const { loading, error, data } = useQuery(GET_LEADERBOARD);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={data.leaderboard}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.leaderboardItem}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderRadius: 8,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
    flex: 1,
    marginLeft: 8,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Leaderboard;