import type { UserStats } from "@/types/dashboardStats";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";


export async function getUserStats(userId: number): Promise<UserStats> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/stats`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch user stats: ${response.statusText}`);
  }
  const data = await response.json();
  return data as UserStats;
}
