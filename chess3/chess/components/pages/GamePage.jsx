import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GamePage = () => {
  const navigation = useNavigation();

  // Function to navigate to a new screen for Player vs Player game (you can modify this to your game logic)
  const startPvPGame = () => {
    navigation.navigate("ChessGame"); // Replace with your actual game screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game Page</Text>

      {/* Player vs Player clickable option */}
      <TouchableOpacity style={styles.button} onPress={startPvPGame}>
        <Text style={styles.buttonText}>Player vs Player</Text>
      </TouchableOpacity>

      <Button
        title="Back to Home Page"
        onPress={() => navigation.goBack()} // Go back to the previous page
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GamePage;
