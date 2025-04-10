import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET } from "@/lib/constants";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const userId = decoded.id;

    const user = db
      .prepare(
        `SELECT id, name, email, role, imageUrl, birthday FROM users WHERE id = ?`
      )
      .get(userId) as {
      id: number;
      name: string;
      email: string;
      role: string;
      imageUrl: string;
      birthday: string;
    };


    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const profile = db
      .prepare(`SELECT * FROM profiles WHERE userId = ?`)
      .get(userId);

    return NextResponse.json({
      data: {
        user: {
          ...user,
          avatar: user.imageUrl, 
        },
        profile: profile || null,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
