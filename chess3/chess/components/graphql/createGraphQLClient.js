import { GraphQLClient } from 'graphql-request';
import Config from 'react-native-config';

// Create a cache to store clients for each URL
const clientCache = {};

// Function to create or retrieve a cached client for a given URL
const createGraphQLClient = (endpoint) => {
  // Construct the full URL by combining the base API URL and the endpoint
  const url = `http://192.168.245.42:4000${endpoint}`;

  // Check if a client for this URL already exists
  if (!clientCache[url]) {
    // If the client doesn't exist, create a new one and store it in the cache
    clientCache[url] = new GraphQLClient(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  console.log(clientCache[url]);
  // Return the client from the cache
  return clientCache[url];
};

export default createGraphQLClient;

