import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/constants";

const db = sqlite3("stories.db");

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
      role: string;
    };
    const userId = parseInt(params.id);

    if (decoded.id !== userId && decoded.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const lastFollowed = db
      .prepare(
        `
      SELECT followedEmail, datetime(rowid, 'unixepoch') as followedAt
      FROM followers
      WHERE followerEmail = (SELECT email FROM users WHERE id = ?)
      ORDER BY rowid DESC LIMIT 5
    `
      )
      .all(userId);

    const lastStarred = db
      .prepare(
        `
      SELECT starredEmail, datetime(rowid, 'unixepoch') as starredAt
      FROM stars
      WHERE userEmail = (SELECT email FROM users WHERE id = ?)
      ORDER BY rowid DESC LIMIT 5
    `
      )
      .all(userId);

    return NextResponse.json({
      interactions: {
        lastFollowed,
        lastStarred,
      },
    });
  } catch (err) {
    console.error("GET /users/{id}/interactions error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
