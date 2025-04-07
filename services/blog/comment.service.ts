import { Comment, CommentData } from "@/types/comment";
  
  export async function addComment(
    blogId: string,
    commentData: CommentData
  ): Promise<Comment> {
    const response = await fetch(`/blogs/${blogId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
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
    const response = await fetch(`/blogs/${blogId}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) {
      throw new Error("Error editing comment");
    }
    return response.json();
  }
  export async function deleteComment(
    blogId: string,
    commentId: string,
  ): Promise<Comment> {
    const response = await fetch(`/blogs/${blogId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error editing comment");
    }
    return response.json();
  }
  
  export async function getBlogComments(blogId: string): Promise<Comment[]> {
    const response = await fetch(`/blogs/${blogId}/comments`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error fetching comments");
    }
    return response.json();
  }
  

  export async function addLoveToComment(commentId: string): Promise<Comment> {
    const response = await fetch(`/comments/${commentId}/love`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Error adding love to comment");
    }
    return response.json();
  }
  
  export async function addLoveToBlog(blogId: string): Promise<Comment> {
    const response = await fetch(`/blogs/${blogId}/love`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Error adding love to blog");
    }
    return response.json();
  }
  