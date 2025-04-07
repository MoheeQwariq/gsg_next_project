import type { ProfileSection } from "@/types/profile";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function addUserSection(
  userId: number,
  newSection: Omit<ProfileSection, "id">
): Promise<ProfileSection> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSection),
    });
    if (!response.ok) {
      throw new Error(`Failed to add section: ${response.statusText}`);
    }
    const data = await response.json();
    return data as ProfileSection;
  } catch (error) {
    console.error("Error adding section", error);
    throw error;
  }
}

export async function updateProfileSection(
  userId: number,
  sectionId: number,
  updatedData: Omit<ProfileSection, "id">
): Promise<ProfileSection> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/sections/${sectionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update section: ${response.statusText}`);
    }
    const data = await response.json();
    return data as ProfileSection;
  } catch (error) {
    console.error("Error updating section", error);
    throw error;
  }
}

export async function deleteProfileSection(
  userId: number,
  sectionId: number
): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/sections/${sectionId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete section: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting section", error);
    throw error;
  }
}

export async function getUserSections(
  userId: number
): Promise<ProfileSection[]> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/sections`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Failed to get sections: ${response.statusText}`);
    }
    const data = await response.json();
    return data as ProfileSection[];
  } catch (error) {
    console.error("Error getting sections", error);
    throw error;
  }
}
