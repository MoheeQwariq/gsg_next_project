import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) {
  try {
    const trending = db
      .prepare(
        `
      SELECT * FROM posts
      ORDER BY likes DESC, commentsCount DESC
      LIMIT 10
    `
      )
      .all();

    return NextResponse.json({
      message: "المدونات الشائعة",
      data: trending,
    });
  } catch (error) {
    console.error("GET /blogs/trends error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب المدونات " },
      { status: 500 }
    );
  }
}
