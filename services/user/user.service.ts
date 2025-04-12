import type { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Failed to get users: ${response.statusText}`);
    }
    const data = await response.json();
    return data as User[];
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
}

export async function getUser(userId: number): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
       },

    });
    if (!response.ok) {
      throw new Error(`Failed to get user: ${response.statusText}`);
    }
    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}

export async function editUser(userId: number, updatedData: Partial<User>): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }
    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
}

export async function deleteUser(userId: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
}

export async function getUserByUsername(username: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users/username/${username}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Failed to get user by username: ${response.statusText}`);
    }
    const data = await response.json();
    return data as User;
  } catch (error) {
    console.error("Error fetching user by username", error);
    throw error;
  }
}
interface Publisher {
  postId: number;
  totalLikes: number;
  user: User;
}
export async function getTrendUsers(): Promise<Publisher[]> {
  try {
    const response = await fetch(`${API_URL}/users/trend`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Failed to get trend users: ${response.statusText}`);
    }
    const data = await response.json();
    return data as Publisher[];
  } catch (error) {
    console.error("Error fetching trend users", error);
    throw error;
  }
}
