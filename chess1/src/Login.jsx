import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { graphqlClient } from "./client";  // Import your configured GraphQL client
import { LOGIN_USER } from "./graphql/queries"; // Import the login mutation

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await graphqlClient.request(LOGIN_USER, {
        username,
        password,
      });
      
      if (response.login.success) {
        localStorage.setItem("token", response.login.token); // Store JWT token
        alert("Login successful!");
        navigate("/"); // Redirect to the homepage or dashboard after login
      } else {
        alert(response.login.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error logging in!");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        New to Chess? <a href="/signup">Signup</a>
      </p>
    </div>
  );
};

export default Login;
