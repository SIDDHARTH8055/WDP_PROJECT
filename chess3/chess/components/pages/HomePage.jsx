import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // To navigate to other pages

const HomePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { authPayload } = route.params || {}; // Safely destructure authPayload
  console.log ({authPayload});
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Home Page</Text>
      <Button
        title="Go to Game Page"
        onPress={() => navigation.navigate('GamePage',{authPayload})} // Navigate to the Game Page
      />
      <Button
        title="Go to Profile Page"
        onPress={() => navigation.navigate('ProfilePage', { authPayload })} // Navigate to the Profile Page with authPayload
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default HomePage;
