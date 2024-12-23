import React, { createContext, useState, useContext } from "react";

// Create the AuthContext to hold the auth information
const AuthContext = createContext();

// Create a provider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [authPayload, setAuthPayload] = useState(null);

  // Define the login function
  const login = (payload) => {
    setAuthPayload(payload); // Store the authPayload globally
  };

  // Define the logout function
  const logout = () => {
    setAuthPayload(null); // Clear the authPayload
  };

  return (
    <AuthContext.Provider value={{ authPayload, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth data in any component
export const useAuth = () => {
  return useContext(AuthContext); // Access the AuthContext
};
