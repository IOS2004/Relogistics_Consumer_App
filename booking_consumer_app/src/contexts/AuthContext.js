import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'consumer' or 'agent'
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password, role) => {
    setIsLoading(true);
    // Mock login - simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: role === "consumer" ? "C001" : "A001",
          email,
          name: role === "consumer" ? "John Doe" : "Agent Smith",
          phone: "+1234567890",
          role,
        };
        setUser(mockUser);
        setUserRole(role);
        setIsLoading(false);
        resolve({ success: true });
      }, 1000);
    });
  };

  const register = async (name, email, password, phone, role) => {
    setIsLoading(true);
    // Mock registration
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: role === "consumer" ? "C" + Date.now() : "A" + Date.now(),
          email,
          name,
          phone,
          role,
        };
        setUser(mockUser);
        setUserRole(role);
        setIsLoading(false);
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
  };

  const updateProfile = (updatedData) => {
    setUser({ ...user, ...updatedData });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
