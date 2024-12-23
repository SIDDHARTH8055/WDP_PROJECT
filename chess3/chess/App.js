import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native"; // Navigation container
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Stack navigator
import Login from "./components/pages/Login"; // Login component
import Signup from "./components/pages/Signup"; // Signup component
import Leaderboard from "./components/pages/Leaderboard"; // Leaderboard component
import ChessGame from "./components/game/ChessGame"; // ChessGame component
import checkAPIConnection from "./components/utilities/checkAPIConnection"; // API connection checker
import HomePage from './components/pages/HomePage';
import GamePage from './components/pages/GamePage';
import ProfilePage from './components/pages/ProfilePage';
import { AuthProvider } from "./components/utilities/AuthContext";
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const testConnection = async () => {
      const isConnected = await checkAPIConnection();
      if (!isConnected) {
        console.log("Unable to connect to the API. Please try again later.");
      }
    };

    testConnection();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: "Login" }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ title: "Signup" }} 
        />
        <Stack.Screen 
          name="Leaderboard" 
          component={Leaderboard} 
          options={{ title: "Leaderboard" }} 
        />
        <Stack.Screen name="HomePage" component={HomePage} title="HomePage"/>
        <Stack.Screen name="GamePage" component={GamePage} title="Game"/>
        <Stack.Screen name="ProfilePage" component={ProfilePage} title="Profile"/>
        <Stack.Screen name="ChessGame" component={ChessGame} title="ChessGame"/>
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
