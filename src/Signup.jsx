import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { graphqlClient } from './client'; // Import the graphqlClient instance
import { CREATE_PLAYER } from './graphql/queries'; // Import the createPlayer mutation

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Added email input for player schema
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(""); // Profile bio
  const [location, setLocation] = useState(""); // Profile location
  const [avatarUrl, setAvatarUrl] = useState(""); // Profile avatar URL
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Set up the GraphQL mutation variables
      const variables = {
        username,
        email,
        password,
        profile: {
          bio,
          location,
          avatarUrl,
        },
      };

      // Send the request using graphqlClient
      const response = await graphqlClient.request(CREATE_PLAYER, variables);

      if (response.createPlayer) {
        // Save token or other necessary data to localStorage or state
        alert("Player created successfully!");
        localStorage.setItem("token", process.env.JWT_Secret); // Example token, replace with actual JWT
        navigate("/chessgame"); // Redirect to chess game
      } else {
        alert("Error: " + response.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error while creating player!");
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email" // Changed to email input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?<a href="/">Login</a>
      </p>
    </div>
  );
};

export default Signup;
