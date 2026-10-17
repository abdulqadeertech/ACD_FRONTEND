import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logout as apiLogout } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const loginUser = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    if (token) localStorage.setItem("token", token);
    setUser(userData);
  };

  const logoutUser = () => {
    apiLogout();
    setUser(null);
  };

  const updateUser = (updated) => {
    const fresh = { ...user, ...updated };
    localStorage.setItem("user", JSON.stringify(fresh));
    setUser(fresh);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoading,
        loginUser,
        logoutUser,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
