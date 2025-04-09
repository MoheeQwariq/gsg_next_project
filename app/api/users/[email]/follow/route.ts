import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;

async function isFollowing(followerEmail: string, followedEmail: string) {
  const result = db
    .prepare("SELECT 1 FROM followers WHERE followerEmail = ? AND followedEmail = ?")
    .get(followerEmail, followedEmail);
  return !!result;
}

async function followUser(followerEmail: string, followedEmail: string) {
  const insertFollow = db.prepare(`
    INSERT OR IGNORE INTO followers (followerEmail, followedEmail)
    VALUES (?, ?)
  `);
  insertFollow.run(followerEmail, followedEmail);
}

async function unfollowUser(followerEmail: string, followedEmail: string) {
  const deleteFollow = db.prepare(`
    DELETE FROM followers WHERE followerEmail = ? AND followedEmail = ?
  `);
  deleteFollow.run(followerEmail, followedEmail);
}

export async function POST(req: NextRequest, { params }: { params: { email: string } }) {
  const { email: followedEmail } = await params;

  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Token مفقود أو غير صالح" }, { status: 401 });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    const followerEmail = decoded.email;

    if (followerEmail === followedEmail) {
      return NextResponse.json({ message: "لا يمكنك متابعة نفسك" }, { status: 400 });
    }
    const followedUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(followedEmail);

    if (!followedUser) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    const { action } = await req.json();

    if (action === "follow") {
      const alreadyFollowing = await isFollowing(followerEmail, followedEmail);

      if (alreadyFollowing) {
        return NextResponse.json({ message: "أنت تتابع هذا المستخدم بالفعل" });
      }

      await followUser(followerEmail, followedEmail);

      return NextResponse.json({ message: "تمت المتابعة بنجاح" });
    } else if (action === "unfollow") {
      const alreadyFollowing = await isFollowing(followerEmail, followedEmail);

      if (!alreadyFollowing) {
        return NextResponse.json({ message: "أنت لا تتابع هذا المستخدم أصلاً" });
      }

      await unfollowUser(followerEmail, followedEmail);

      return NextResponse.json({ message: "تمت إلغاء المتابعة بنجاح" });
    } else {
      return NextResponse.json({ message: "العملية غير صحيحة" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: "التوكن غير صالح" }, { status: 401 });
  }
}

