import type { Post } from "@/types/post";
import type { ProfileSection } from "@/types/profile";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function getUserArticles(userId: number): Promise<Post[]> {
  const response = await fetch(`${API_URL}/articles?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user articles");
  }
  const data = await response.json();
  return data.articles; 
}

export async function getProfileSections(profileId: number): Promise<ProfileSection[]> {
  const response = await fetch(`${API_URL}/profileSections?profileId=${profileId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch profile sections");
  }
  const data = await response.json();
  return data.sections;
}





// services/profile.service.ts
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
