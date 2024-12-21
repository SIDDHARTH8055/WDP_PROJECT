require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const os = require('os'); // Added for network interface details
const cors = require('cors');
const schema = require('./schema');
const resolvers = require('./resolvers');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true, // Enable GraphiQL for testing queries
}));

app.listen(PORT, getWiFiIP(), () => {
  console.log(`Server running at http://${getWiFiIP()}:${PORT}/graphql`);
});

// Helper function to get the Wi-Fi IP address
function getWiFiIP() {
  const networkInterfaces = os.networkInterfaces();

  // Iterate over interfaces to find Wi-Fi-specific names
  for (const interfaceName in networkInterfaces) {
    if (
      interfaceName.toLowerCase().includes('wi-fi') || // Windows
      interfaceName.toLowerCase().includes('wlan') || // Linux
      interfaceName.toLowerCase().includes('wifi')    // MacOS/Linux alternative
    ) {
      for (const net of networkInterfaces[interfaceName]) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  }

  console.warn('No Wi-Fi interface found. Falling back to localhost.');
  return 'localhost'; // Fallback to localhost if Wi-Fi IP is not found
}
