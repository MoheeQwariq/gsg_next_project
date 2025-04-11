import { Comment, CommentData } from "@/types/comment";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export async function addComment(
  blogId: string,
  commentData: CommentData,
  userEmail: string
): Promise<Comment> {
  const dataWithEmail = { ...commentData, userEmail };
  const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataWithEmail),
  });
  if (!response.ok) {
    throw new Error("Error adding comment");
  }
  return response.json();
}
  

export async function editComment(
  blogId: string,
  commentId: string,
  commentData: CommentData
): Promise<Comment> {
  const response = await fetch(
    `${API_BASE_URL}/blogs/${blogId}/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,

      },
      body: JSON.stringify(commentData),
    }
  );
  if (!response.ok) {
    throw new Error("Error editing comment");
  }
  return response.json();
}

export async function deleteComment(
  blogId: string,
  commentId: string
): Promise<Comment> {
  const response = await fetch(
    `${API_BASE_URL}/blogs/${blogId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,

      },
    }
  );
  if (!response.ok) {
    throw new Error("Error deleting comment");
  }
  return response.json();
}

export async function getBlogComments(blogId: string): Promise<Comment[]> {
  const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching comments");
  }
  return response.json();
}

export async function addLoveToComment(commentId: string): Promise<Comment> {
  const response = await fetch(`${API_BASE_URL}/comments/${commentId}/love`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error adding love to comment");
  }
  return response.json();
}

export async function addLoveToBlog(blogId: string, action: string): Promise<Comment> {
  const response = await fetch(`${API_BASE_URL}/blog/${blogId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ action }),
  });
  if (!response.ok) {
    throw new Error("Error adding love to blog");
  }
  return response.json();
}
