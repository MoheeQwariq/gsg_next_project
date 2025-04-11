import type { Interaction } from "@/types/dashboardStats";

export async function getUserInteractions(userId: number): Promise<Interaction[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  try {
    const response = await fetch(`${API_URL}/users/by-id/${userId}/interactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch interactions: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data && typeof data === "object" && "interactions" in data) {
      const lastFollowed: Interaction[] = Array.isArray(data.interactions.lastFollowed)
        ? data.interactions.lastFollowed
        : [];
      const lastStarred: Interaction[] = Array.isArray(data.interactions.lastStarred)
        ? data.interactions.lastStarred
        : [];
        
      return [...lastFollowed, ...lastStarred];
    }
    
    if (Array.isArray(data)) {
      return data as Interaction[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching interactions:", error);
    return [];
  }
}
