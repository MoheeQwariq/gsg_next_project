import { NextResponse } from "next/server";
import { getAllPosts, deletePost } from "@/services/stories.service";


export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const isDeleted = deletePost(id);

  if (isDeleted) {
    return NextResponse.json({ message: "Post deleted successfully" });
  } else {
    return NextResponse.json({ message: "Failed to delete post" }, { status: 400 });
  }
}
