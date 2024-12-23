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

// Define endpoints for each function
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true, // Enable GraphiQL for testing queries
  }));
// Login
app.use('/login', graphqlHTTP({
  schema,
  rootValue: { login: resolvers.login },
  graphiql: true, // Enable GraphiQL for testing
}));

// Add Player
app.use('/addPlayer', graphqlHTTP({
  schema,
  rootValue: { addPlayer: resolvers.addPlayer },
  graphiql: true,
}));

// Reset Password
app.use('/resetPassword', graphqlHTTP({
  schema,
  rootValue: { resetPassword: resolvers.resetPassword },
  graphiql: true,
}));

// Update Player Details
app.use('/updatePlayerDetails', graphqlHTTP({
  schema,
  rootValue: { updatePlayerDetails: resolvers.updatePlayerDetails },
  graphiql: true,
}));

// Update Player Rating
app.use('/updatePlayerRating', graphqlHTTP({
  schema,
  rootValue: { updatePlayerRating: resolvers.updatePlayerRating },
  graphiql: true,
}));

// Create Game
app.use('/createGame', graphqlHTTP({
  schema,
  rootValue: { createGame: resolvers.createGame },
  graphiql: true,
}));

// Health Check
app.use('/healthCheck', graphqlHTTP({
  schema,
  rootValue: { healthCheck: resolvers.healthCheck },
  graphiql: true,
}));

// All Players
app.use('/allPlayers', graphqlHTTP({
  schema,
  rootValue: { allPlayers: resolvers.allPlayers },
  graphiql: true,
}));

// Player by ID
app.use('/playerById', graphqlHTTP({
  schema,
  rootValue: { playerById: resolvers.playerById },
  graphiql: true,
}));

// All Games
app.use('/allGames', graphqlHTTP({
  schema,
  rootValue: { allGames: resolvers.allGames },
  graphiql: true,
}));

// Game by ID
app.use('/gameById', graphqlHTTP({
  schema,
  rootValue: { gameById: resolvers.gameById },
  graphiql: true,
}));

// Count Stats
app.use('/countStats', graphqlHTTP({
  schema,
  rootValue: { countStats: resolvers.countStats },
  graphiql: true,
}));

app.listen(PORT, getWiFiIP(), () => {
  console.log(`Server running at http://${getWiFiIP()}:${PORT}`);
});

// Helper function to get the Wi-Fi IP address
function getWiFiIP() {
  const networkInterfaces = os.networkInterfaces();

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
