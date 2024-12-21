import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation
import { createPlayer } from '../data/Playerrec'; // Import the createPlayer function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Optional if you want to save user info

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      // Call createPlayer function to create the new player
      const newPlayer = createPlayer(username, email, password, 1200, bio, location);
      console.log(newPlayer);

      // Optional: Store player info or token in AsyncStorage
      await AsyncStorage.setItem('playerId', newPlayer.id);
      await AsyncStorage.setItem('username', newPlayer.username);
      
      // Show success alert and navigate to ChessGame screen
      Alert.alert("Success", "Player created successfully!", [
        { text: "OK", onPress: () => navigation.navigate("HomePage") },
      ]);
    } catch (err) {
      console.error("Signup error:", err);
      Alert.alert("Error", "Error while creating player!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.link}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Signup;
