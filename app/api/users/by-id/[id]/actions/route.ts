import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    if (!userId)
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as {
      email: string;
    };

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const actions = {
      followed: db
        .prepare(
          "SELECT followedEmail FROM followers WHERE followerEmail = ? ORDER BY rowid DESC LIMIT 5"
        )
        .all(user.email),
      starred: db
        .prepare(
          "SELECT starredEmail FROM stars WHERE userEmail = ? ORDER BY rowid DESC LIMIT 5"
        )
        .all(user.email),
    };

    return NextResponse.json({ actions });
  } catch (error) {
    console.error("GET /users/{id}/actions error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
