import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import { User } from "@/types/user";

const db = sqlite3("stories.db");

export async function GET(_: NextRequest) {
  try {
    const topPostsQuery = db.prepare(`
      SELECT id, authorEmail, SUM(love) AS totalLikes
      FROM posts
      GROUP BY id, authorEmail
      ORDER BY totalLikes DESC
      LIMIT 5
    `);

    const topPosts = topPostsQuery.all() as { id: number; authorEmail: string; totalLikes: number }[];

    const validTopPosts = topPosts.filter((post) => post.totalLikes > 0);

    if (validTopPosts.length === 0) {
      return NextResponse.json({ message: "لا يوجد مستخدمين trend" }, { status: 404 });
    }

    const userEmails = validTopPosts.map((post) => post.authorEmail);

    const usersQuery = db.prepare(`
      SELECT name, email, role, imageUrl, username, birthday 
      FROM users WHERE email IN (${userEmails.map(() => '?').join(', ')})
    `);

    const users = usersQuery.all(...userEmails) as User[];

    const result = validTopPosts.map((post) => {
      const user = users.find((user) => user.email === post.authorEmail);
      return {
        postId: post.id,
        totalLikes: post.totalLikes,
        user: user as User,
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    
    return NextResponse.json(
      { message: "حدث خطأ أثناء جلب البيانات", error: String(error) },
      { status: 500 }
    );
  }
}
