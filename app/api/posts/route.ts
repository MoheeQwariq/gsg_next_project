import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";
import { User } from "@/types/user";
import { BlogDetail } from "@/types/blog";
import { v2 as cloudinary } from "cloudinary";

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
    const currentUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(decoded.email) as User;

    if (!currentUser) {
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
    const createdAt = new Date().toISOString();
    const photo = get("imageUrl") as File | null;
    console.log({ title, content, category, createdAt, photo });

    if (!title || !content || !category || !photo) {
      return NextResponse.json(
        { message: "البيانات غير مكتملة" },
        { status: 400 }
      );
    }

    const arrayBuffer = await new Response(photo).arrayBuffer();
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

    const result = insertPost.run(
      title,
      content,
      currentUser.name,         
      currentUser.email,        
      imageUrl,
      category,
      createdAt,
      currentUser.id
    );

    const insertedId = result.lastInsertRowid;
    const insertedRow = db
      .prepare("SELECT * FROM posts WHERE id = ?")
      .get(insertedId) as {
        id: number;
        title: string;
        content: string;
        category: string;
        tags?: string;
        image: string;
        createdAt: string;
        like?: number;
        userId: number;
      };

    const userRecord = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(insertedRow.userId) as User;

    const newBlog: BlogDetail = {
      blogId: insertedRow.id.toString(),
      title: insertedRow.title,
      category: insertedRow.category,
      content: insertedRow.content,
      tags: insertedRow.tags || "",       
      imageUrl: insertedRow.image,
      createdAt: insertedRow.createdAt,
      like: insertedRow.like || 0,
      author: {
        id: userRecord.id,
        name: userRecord.name,
        image: userRecord.imageUrl || "/default-author.png",
      },
    };

    return NextResponse.json(newBlog, { status: 201 });
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

    const currentUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(decoded.email) as User;

    if (!currentUser) {
      return NextResponse.json(
        { message: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    const postsRows = db
      .prepare("SELECT * FROM posts ORDER BY createdAt DESC")
      .all();

    const blogs: BlogDetail[] = postsRows.map((row: any) => {
      const userRecord = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(row.userId) as User;

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
          id: userRecord.id,
          name: userRecord.name,
          image: userRecord.imageUrl || "/default-author.png",
        },
      };
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.error("GET ALL POSTS Error:", err);
    return NextResponse.json(
      { message: "خطأ في التوكن أو خطأ داخلي" },
      { status: 401 }
    );
  }
}
