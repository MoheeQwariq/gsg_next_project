import type { BlogDetail } from "@/types/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";


export async function addBlog(blogData: Partial<BlogDetail>): Promise<BlogDetail> {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error adding blog: ${errorText}`);
  }

  return response.json();
}


export async function getBlogs(): Promise<BlogDetail[]> {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching blogs: ${errorText}`);
  }

  return response.json();
}

export async function getUserBlogs(userId: number): Promise<BlogDetail[]> {
  const response = await fetch(`${API_BASE_URL}/${userId}/blogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching blogs for user ${userId}: ${errorText}`);
  }

  return response.json();
}


export async function getBlog(id: string): Promise<BlogDetail> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching blog ${id}: ${errorText}`);
  }

  return response.json();
}


export async function editBlog(id: string, updatedData: Partial<BlogDetail>): Promise<BlogDetail> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error editing blog ${id}: ${errorText}`);
  }

  return response.json();
}


export async function deleteBlog(id: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error deleting blog ${id}: ${errorText}`);
  }

  return response.json();
}


export async function getTrendBlogs(): Promise<BlogDetail[]> {
  const response = await fetch(`${API_BASE_URL}/blogs/trends`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching trend blogs: ${errorText}`);
  }
  return response.json();
}
