"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User, UserRole } from "@/types/user";
import type { UserProfile } from "@/types/profile";
import { defaultUser } from "@/types/user";
import { defaultUserProfile } from "@/types/profile";
interface AuthContextType {
  user: User;
  profile: UserProfile ;
  isLoggedIn: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void | null | UserRole>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [profile, setProfile] = useState<UserProfile >(defaultUserProfile);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(defaultUser);
      setProfile(defaultUserProfile);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/profile/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Fetched profile data:", data);
        setUser(data.user);
        setProfile(data.profile);
      } else {
        setUser(defaultUser);
        setProfile(defaultUserProfile);
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setUser(defaultUser);
      setProfile(defaultUserProfile);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [API_URL]);

  
  const login = async (credentials: { email: string; password: string }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok)return null
    const data = await res.json();
    localStorage.setItem("token", data.token);
    setUser(data.user);
    await fetchProfile();
    return data.user.role;
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("token");
      setUser(defaultUser);
      setProfile(defaultUserProfile);
    }
  };
console.log("User:", user);
console.log("Profile:", profile);
  const isLoggedIn = !!user?.id || false;
console.log("Is logged in:", isLoggedIn);
  return (
    <AuthContext.Provider value={{ user, profile, isLoggedIn, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
