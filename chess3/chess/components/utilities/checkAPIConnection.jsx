import { graphqlClient } from '../graphql/client'; // Import the graphqlClient instance
import { HEALTH_CHECK } from '../graphql/queries'; // Import the health check query

const checkAPIConnection = async () => {
  try {
    const API_URL = "http://192.168.245.42:4000/healthCheck";
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: HEALTH_CHECK }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    if (data.errors) {
      throw new Error("Errors returned from API health check");
    }

    console.log("Successfully connected to the API");
    return true;
  } catch (err) {
    console.error("Error connecting to the API:", err);
    return false;
  }
};

export default checkAPIConnection;
