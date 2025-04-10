import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";
import { User } from "@/types/user";
import { v2 as cloudinary } from "cloudinary";
import { Post } from "@/types/post";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { message: "التوكن مفقود أو غير صالح" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(decoded.email) as User;

    if (!user) {
      return NextResponse.json(
        { message: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const get = (key: string): string | File | null => {
      return (
        [...formData.entries()].find(([k]) => k.trim() === key)?.[1] ?? null
      );
    };

    const title = get("title")?.toString() || "";
    const content = get("content")?.toString() || "";
    const category = get("category")?.toString() || "";
    const createdAt = get("createdAt")?.toString() || "";
    const photo = get("photo") as File | null;
    console.log({ title, content, category, createdAt, photo });

    if (!title || !content || !category || !createdAt || !photo) {
      return NextResponse.json(
        { message: "البيانات غير مكتملة" },
        { status: 400 }
      );
    }

    const arrayBuffer = await photo.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:${photo.type};base64,${base64}`;

    const uploadRes = await cloudinary.uploader.upload(dataUri, {
      folder: "posts",
    });

    const imageUrl = uploadRes.secure_url;

    const insertPost = db.prepare(`
      INSERT INTO posts (title, content, author, authorEmail, image, category, createdAt, userId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertPost.run(
      title,
      content,
      user.name,
      user.email,
      imageUrl,
      category,
      createdAt,
      user.id
    );

    return NextResponse.json(
      { message: "تم إنشاء المنشور بنجاح" },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { message: "توكن غير صالح أو خطأ داخلي" },
      { status: 401 }
    );
  }
}



export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { message: "التوكن مفقود أو غير صالح" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(decoded.email) as User;

    if (!user) {
      return NextResponse.json(
        { message: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    const posts = db.prepare("SELECT * FROM posts ORDER BY createdAt DESC").all();

    return NextResponse.json(posts, { status: 200 });
  } catch (err) {
    console.error("GET ALL POSTS Error:", err);
    return NextResponse.json(
      { message: "خطأ في التوكن أو خطأ داخلي" },
      { status: 401 }
    );
  }
}
