// services/profile.service.ts

import type { UserProfile } from "@/types/profile";
import type { Article } from "@/types/blog";
import { User } from "@/types/user";

export async function getProfileData(username: string): Promise<UserProfile> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        user: {
          id: 1,
          name: "Mock User",
          email: "mockuser@example.com",
          username: "mockuser",
          role: "user",
        },
        bio: "هذا سيرة ذاتية تجريبية للمستخدم.",
        avatarUrl: "/myPhoto.jpg",
        coverUrl: "/myPhoto.jpg",
        facebookUrl: "https://facebook.com/mockuser",
        XUrl: "https://twitter.com/mockuser",
        linkedinUrl: "https://linkedin.com/in/mockuser",
        phoneNumber: "123-456-7890",
        website: "https://mockuser.com",
        country: "Mock Country",
        city: "Mock City",
        birthdate: "2000-01-01",
        followersCount: 100,
        articlesCount: 10,
        starsCount: 5,
        commentsCount: 2,
        isFollowing: false,
        showStats: true,
        showInteractions: true,
      } as UserProfile); // Type assertion here
    }, 300); // Simulated delay (300ms)
  });
}

export async function getUserArticles(userId: number): Promise<Article[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Mock Article 1",
          imageUrl: "/mock-article-1.jpg",
          content: "هذا هو محتوى المقالة التجريبية الأولى.",
          likes: 10,
          commentsCount: 3,
        },
        {
          id: 2,
          title: "Mock Article 2",
          imageUrl: "/mock-article-2.jpg",
          content: "هذا هو محتوى المقالة التجريبية الثانية.",
          likes: 15,
          commentsCount: 5,
        },
      ]);
    }, 300); // Simulated delay (300ms)
  });
}
import type { ProfileSection } from "@/types/profile";

export async function saveProfileSection(
  newSection: Omit<ProfileSection, "id">
): Promise<ProfileSection> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        ...newSection,
      });
    }, 300); 
  });
}


import type { ProfileSection } from "@/types/profile";

export async function updateProfileSection(
  id: number,
  updatedSection: {
    title: string;
    content: string;
    imageUrl: string;
    imageDirection: "left" | "right";
  }
): Promise<ProfileSection> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        ...updatedSection,
      });
    }, 300); 
  });
}
