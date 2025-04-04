"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/types/user";

const mockUser: User = {
  id: 100,
  name: "Jane Doe",
  email: "janedoe@example.com",
  username: "janedoe",
  role: "user", // "admin" "user" "guest"
};

interface IAuthContext {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) {
      setUser(mockUser);
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setUser(mockUser); // Simulate logging in with our mock user
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
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
