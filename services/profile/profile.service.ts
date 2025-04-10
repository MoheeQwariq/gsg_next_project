import type { UserProfile } from "@/types/profile";
import type { User } from "@/types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function getMe(): Promise<{ user: User; profile: UserProfile }> {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching user data: ${errorText}`);
  }
  return response.json();
}

export async function getProfile(profileId: number): Promise<UserProfile> {
  const response = await fetch(`${API_BASE_URL}/profile/${profileId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching profile: ${errorText}`);
  }
  return response.json();
}

export async function createProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
  const response = await fetch(`${API_BASE_URL}/profile/profiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error creating profile: ${errorText}`);
  }
  return response.json();
}

export async function updateProfile(
  profileId: number,
  updatedData: Partial<UserProfile>
): Promise<UserProfile> {
  const response = await fetch(`${API_BASE_URL}/profile/${profileId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error updating profile: ${errorText}`);
  }
  return response.json();
}
