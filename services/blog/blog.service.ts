import type { BlogDetail } from "@/types/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";


export async function addBlog(blogData: Partial<BlogDetail>): Promise<BlogDetail> {
  const formData = new FormData();

  Object.keys(blogData).forEach((key) => {
    const value = blogData[key as keyof BlogDetail];
    if (value !== undefined && value !== null) {
      if (typeof value === "object" && !(value instanceof Blob)) {
        formData.append(key, JSON.stringify(value));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formData.append(key, value as any);
      }
    }
  });

  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error adding blog: ${errorText}`);
  }
  return response.json();
}



export async function getBlogs(): Promise<BlogDetail[]> {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching blogs: ${errorText}`);
  }

  return response.json();
}

export async function getUserBlogs(userId: number): Promise<BlogDetail[]> {
  const response = await fetch(`${API_BASE_URL}/${userId}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching blogs for user ${userId}: ${errorText}`);
  }

  return response.json();
}


export async function getBlog(id: string): Promise<BlogDetail> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching blog ${id}: ${errorText}`);
  }

  return response.json();
}


export async function editBlog(id: string, updatedData: Partial<BlogDetail>): Promise<BlogDetail> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error deleting blog ${id}: ${errorText}`);
  }

  return response.json();
}


export async function getTrendBlogs(): Promise<BlogDetail[]> {
  const response = await fetch(`${API_BASE_URL}/posts/trends`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching trend blogs: ${errorText}`);
  }
  return response.json();
}
