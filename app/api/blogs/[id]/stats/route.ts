import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = parseInt(params.id);
    if (!blogId) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blog = db.prepare(`SELECT * FROM posts WHERE id = ?`).get(blogId) as {
      likes: number;
      commentsCount: number;
    };

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const stats = {
      likes: blog.likes || 0,
      comments: blog.commentsCount || 0,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("GET /blogs/{id}/stats error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
