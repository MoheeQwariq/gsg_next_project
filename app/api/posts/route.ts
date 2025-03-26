import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, deletePost } from "@/services/stories.service";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const type = params.get("type"); 
  let posts = getAllPosts();
  if (type) {
    posts = posts.filter((post) => post.type === type);
  }
  return NextResponse.json(posts, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const isDeleted = deletePost(id);

  if (isDeleted) {
    return NextResponse.json({ message: "Post deleted successfully" });
  } else {
    return NextResponse.json({ message: "Failed to delete post" }, { status: 400 });
  }
}
