"use client";

import React, { createContext, useContext, useState } from "react";
import type { UserProfile } from "@/types/profile";
import type { UserRole } from "@/types/User";

const mockProfile: UserProfile = {
  id: 1,
  user: {
    id: 100,
    name: "Jane Doe",
    email: "janedoe@example.com",
    username: "janedoe",
    role: "user" as UserRole,
  },
  bio: "This is a mock bio for testing the ProfileContext.",
  avatarUrl: "https://example.com/avatar.jpg",
  coverUrl: "https://example.com/cover.jpg",
  facebookUrl: "https://facebook.com/janedoe",
  XUrl: "https://twitter.com/janedoe",
  linkedinUrl: "https://linkedin.com/in/janedoe",
  phoneNumber: "123-456-7890",
  website: "https://janedoe.com",
  country: "Wonderland",
  city: "Imagination",
  birthdate: "1990-01-01",
  followersCount: 120,
  articlesCount: 8,
  starsCount: 15,
  commentsCount: 25,
  isFollowing: false,
  showStats: true,
  showInteractions: true,

  sections: [],
};

interface IProfileContext {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ProfileContext = createContext<IProfileContext | undefined>(undefined);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
