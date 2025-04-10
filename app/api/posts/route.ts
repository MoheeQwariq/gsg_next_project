import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";
import { User } from "@/types/user";
import { Post } from "@/types/post";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;


export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "التوكن مفقود أو غير صالح" }, { status: 401 });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(decoded.email) as User | undefined;

    if (!user) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    const body = await req.json();

    const {
      id,
      title,
      content,
      image = null,
      category,
      createdAt,
    } = body as Omit<Post, "author" | "authorEmail" | "userId">;

    if (!id || !title || !content || !category || !createdAt) {
      return NextResponse.json({ message: "بيانات غير مكتملة" }, { status: 400 });
    }

    const insertPost = db.prepare(`
      INSERT INTO posts (id, title, content, author, authorEmail, image, category, createdAt, userId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertPost.run(
      id,
      title,
      content,
      user.name,
      user.email,
      image,
      category,
      createdAt,
      user.id
    );

    return NextResponse.json({ message: "تم إنشاء المنشور بنجاح" }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "توكن غير صالح" }, { status: 401 });
  }
}
