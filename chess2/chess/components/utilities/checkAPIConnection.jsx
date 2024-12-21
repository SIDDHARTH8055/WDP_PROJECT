import { graphqlClient } from '../graphql/client'; // Import the graphqlClient instance
import { HEALTH_CHECK } from '../graphql/queries'; // Import the health check query

const checkAPIConnection = async () => {
  try {
    const API_URL = "http://192.168.46.42:4000/graphql"; // Ensure the URL is valid
    const response = await fetch(API_URL); // Make a GET request to the API URL
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    console.log("Successfully connected to the API");
    return true;
  } catch (err) {
    console.error("Error connecting to the API:", err);
    return false;
  }
};

export default checkAPIConnection;
{/*const checkAPIConnection = async () => {
  try {
    const response = await graphqlClient.request(HEALTH_CHECK);
    console.log(response.healthCheck); // Should log "API is up and running!"
    return true;
  } catch (err) {
    console.error("Error connecting to the API:", err);
    return false;
  }
};

export default checkAPIConnection;

    */}