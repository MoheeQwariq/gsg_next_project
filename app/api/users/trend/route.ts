import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import { User } from "@/types/user";

const db = sqlite3("stories.db");

export async function GET(_: NextRequest) {
  try {
    const topPostsQuery = db.prepare(`
      SELECT userId, SUM(likes) AS totalLikes, MAX(id) AS postId
      FROM posts
      GROUP BY userId
      ORDER BY totalLikes DESC
      LIMIT 5
    `);

    const topUsers = topPostsQuery.all() as {
      userId: number;
      totalLikes: number;
      postId: number;
    }[];

    const validTrending = topUsers.filter((row) => row.totalLikes > 0);

    if (validTrending.length > 0) {
      const trendingUserIds = validTrending.map((row) => row.userId);
      const usersQuery = db.prepare(`
        SELECT id, name, email, role, imageUrl, username, birthday 
        FROM users WHERE id IN (${trendingUserIds.map(() => '?').join(', ')})
      `);
      const users = usersQuery.all(...trendingUserIds) as User[];

      const result = validTrending.map((row) => ({
        postId: row.postId,
        totalLikes: row.totalLikes,
        user: users.find((u) => u.id === row.userId) as User,
      }));
      return NextResponse.json(result, { status: 200 });
    } else {

      const fallbackQuery = db.prepare(`
        SELECT p.userId, MAX(p.id) AS postId, MAX(p.createdAt) AS lastPostDate, 
               u.id AS id, u.name, u.email, u.role, u.imageUrl, u.username, u.birthday
        FROM posts p
        JOIN users u ON p.userId = u.id
        GROUP BY p.userId
        ORDER BY lastPostDate DESC
        LIMIT 5
      `);
      const fallbackRows = fallbackQuery.all() as {
        userId: number;
        postId: number;
        lastPostDate: string;
        id: number;
        name: string;
        email: string;
        role: string;
        imageUrl: string;
        username: string;
        birthday: string;
      }[];

      if (fallbackRows.length === 0) {
        return NextResponse.json({ message: "لا يوجد مستخدمين" }, { status: 404 });
      }
      const fallbackResult = fallbackRows.map((row) => ({
        postId: row.postId,
        totalLikes: 0, 
        user: {
          id: row.id,
          name: row.name,
          email: row.email,
          role: row.role,
          imageUrl: row.imageUrl,
          username: row.username,
          birthday: row.birthday,
        } as User,
      }));
      return NextResponse.json(fallbackResult, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "حدث خطأ أثناء جلب البيانات", error: String(error) },
      { status: 500 }
    );
  }
}




// import { NextRequest, NextResponse } from "next/server";
// import sqlite3 from "better-sqlite3";
// import { User } from "@/types/user";

// const db = sqlite3("stories.db");

// export async function GET(_: NextRequest) {
//   try {
//     // 1. Try to select trending posts: top 5 posts (by total likes) with likes > 0.
//     const topPostsQuery = db.prepare(`
//       SELECT id, authorEmail, SUM(likes) AS totalLikes
//       FROM posts
//       GROUP BY id, authorEmail
//       ORDER BY totalLikes DESC
//       LIMIT 5
//     `);
//     const topPosts = topPostsQuery.all() as { id: number; authorEmail: string; totalLikes: number }[];
//     const validTopPosts = topPosts.filter((post) => post.totalLikes > 0);

//     if (validTopPosts.length > 0) {
//       const userEmails = validTopPosts.map((post) => post.authorEmail);
//       const usersQuery = db.prepare(`
//         SELECT name, email, role, imageUrl, username, birthday 
//         FROM users WHERE email IN (${userEmails.map(() => '?').join(', ')})
//       `);
//       const users = usersQuery.all(...userEmails) as User[];

//       const result = validTopPosts.map((post) => {
//         const user = users.find((user) => user.email === post.authorEmail);
//         return {
//           postId: post.id,
//           totalLikes: post.totalLikes,
//           user: user as User,
//         };
//       });
//       return NextResponse.json(result, { status: 200 });
//     } else {
//       // 2. Fallback: no trending posts found.
//       // Get the last 5 unique users who made a post, ordered by the most recent post.
//       // We use a query that groups by userId and orders by the maximum createdAt for each user.
//       const fallbackQuery = db.prepare(`
//         SELECT userId, MAX(id) as postId, MAX(createdAt) AS lastPostDate
//         FROM posts
//         GROUP BY userId
//         ORDER BY lastPostDate DESC
//         LIMIT 5
//       `);
//       const fallbackRows = fallbackQuery.all() as { userId: number; postId: number; lastPostDate: string }[];

//       if (fallbackRows.length === 0) {
//         return NextResponse.json({ message: "لا يوجد مستخدمين" }, { status: 404 });
//       }

//       // Get user details for each unique userId.
//       const userIds = fallbackRows.map(row => row.userId);
//       const usersQuery = db.prepare(`
//         SELECT name, email, role, imageUrl, username, birthday 
//         FROM users WHERE id IN (${userIds.map(() => '?').join(', ')})
//       `);
//       const users = usersQuery.all(...userIds) as User[];

//       const result = fallbackRows.map(row => {
//         const user = users.find(u => u.id === row.userId);
//         return {
//           postId: row.postId,
//           totalLikes: 0, // Fallback: no likes calculated.
//           user: user as User,
//         };
//       });
//       return NextResponse.json(result, { status: 200 });
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { message: "حدث خطأ أثناء جلب البيانات", error: String(error) },
//       { status: 500 }
//     );
//   }
// }
