import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const userId = parseInt(context.params.id);
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as {
      id: number;
      email: string;
    };

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const postStats = db
      .prepare(
        `SELECT 
           COUNT(*) as totalStories, 
           SUM(likes) as totalLikes, 
           SUM(commentsCount) as totalComments 
         FROM user_articles 
         WHERE userId = ?`
      )
      .get(userId) as {
      totalStories: number;
      totalLikes: number;
      totalComments: number;
    };

    const followerStats = db
      .prepare(
        "SELECT COUNT(*) as followers FROM followers WHERE followedEmail = ?"
      )
      .get(user.email) as { followers: number };

    const stats = {
      totalStories: postStats?.totalStories || 0,
      totalLikes: postStats?.totalLikes || 0,
      totalComments: postStats?.totalComments || 0,
      followers: followerStats?.followers || 0,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("GET /users/{id}/stats error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
