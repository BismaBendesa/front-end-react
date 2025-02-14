import { createContext, useContext, useState } from "react";

// Create Auth Context
export const AuthContext = createContext();

// Provide Auth State Globally
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("token") ? true : false);

  // Login function
  const login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username)
    setUser(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
// export const useAuth = () => useContext(AuthContext);
