export interface Interaction {
  id: number;
  type: string;
  content?: string;
  articleId: number;
}

export async function getUserInteractions(userId: number): Promise<Interaction[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  try {
    const response = await fetch(`${API_URL}/users/${userId}/interactions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`Failed to fetch interactions: ${response.statusText}`);
    const data = await response.json();
    return data as Interaction[];
  } catch (error) {
    console.error("Error fetching interactions:", error);
    return [];
  }
}
