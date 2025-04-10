import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import { BlogDetail } from "@/types/blog";
import { User } from "@/types/user";

const db = sqlite3("stories.db");

export async function GET(_req: NextRequest) {
  try {
    const trendingRows = db
      .prepare(
        `
        SELECT * FROM posts
        ORDER BY likes DESC, commentsCount DESC
        LIMIT 5
      `
      )
      .all();

    const trending: BlogDetail[] = trendingRows.map((row: any) => {
      const userRecord = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(row.userId) as User | undefined;

      return {
        blogId: row.id.toString(),
        title: row.title,
        category: row.category,
        content: row.content,
        tags: row.tags || "",
        imageUrl: row.image,
        createdAt: row.createdAt,
        like: row.likes || 0,
        author: {
          id: userRecord ? userRecord.id : 0,
          name: userRecord ? userRecord.name : "Unknown Author",
          image: userRecord ? (userRecord.imageUrl || "/default-author.png") : "/default-author.png",
        },
      };
    });

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
