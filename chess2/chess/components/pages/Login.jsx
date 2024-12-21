import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation
import { login } from '../data/Playerrec'; // Adjust according to your file structure
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native local storage (optional)
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Replace this with actual login logic, such as fetching user data
      const authPayload = login(username,password); // Example payload
      console.log({authPayload});
      // Directly navigate to HomePage after successful login
      navigation.navigate("HomePage",{authPayload});
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Error", err.message || "Error logging in!");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>
          New to Chess? <Text style={styles.link}>Signup</Text>
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
  signupText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Login;
