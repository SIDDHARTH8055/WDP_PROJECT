import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation
import createGraphQLClient from '../graphql/createGraphQLClient'; // Assuming you have this file for client creation
import { LOGIN } from '../graphql/queries'; // The login query you provided

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const client = createGraphQLClient("/login"); // Use the specific login endpoint for your API
      const variables = { email, password };

      // Call the login mutation
      const response = await client.request(LOGIN, variables);
      console.log(response);
      if (response.login) {
        // Directly navigate to HomePage after successful login
        navigation.navigate("HomePage", { userId: response.login.userId });
      } else {
        Alert.alert("Login failed", "Invalid email or password.");
      }
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
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
