"use client";
import React, { createContext, useContext, useState, useEffect, JSX } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUserByUsername } from "@/services/user/user.service";
import { getProfile } from "@/services/profile/profile.service";
import type { User } from "@/types/user";
import type { UserProfile } from "@/types/profile";

interface UserProfileData {
  user: User | null;
  profile: UserProfile | null;
  isOwner: boolean;
  loading: boolean;
}

const UserProfileDataContext = createContext<UserProfileData>({
  user: null,
  profile: null,
  isOwner: false,
  loading: true,
});

export function useUserProfileData() {
  return useContext(UserProfileDataContext);
}

export function UserProfileDataProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { username: usernameParam } = useParams();
  const username = typeof usernameParam === "string" ? usernameParam : "";
  const { user: authUser, profile: authProfile } = useAuth();
  const isOwner = username === authUser.username;

  const [userData, setUserData] = useState<User | null>(isOwner ? authUser : null);
  const [profileData, setProfileData] = useState<UserProfile | null>(isOwner ? authProfile : null);
  const [loading, setLoading] = useState<boolean>(!isOwner);

  useEffect(() => {
    if (!isOwner && username) {
      async function fetchData() {
        try {
          const fetchedUser = await getUserByUsername(username);
          const fetchedProfile = await getProfile(fetchedUser.profileId);
          setUserData(fetchedUser);
          setProfileData(fetchedProfile);
        } catch (error) {
          console.error("Error fetching user/profile data:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [isOwner, username]);

  return (
    <UserProfileDataContext.Provider
      value={{ user: userData, profile: profileData, isOwner, loading }}
    >
      {children}
    </UserProfileDataContext.Provider>
  );
}
