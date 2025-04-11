import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types/user";
import { v2 as cloudinary } from "cloudinary";
import { Post } from "@/types/post";
import { BlogDetail } from "@/types/blog";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ---------------- PUT handler ----------------
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { message: "التوكن مفقود أو غير صالح" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];

  try {
    const resolvedParams = await context.params;
    const postId = resolvedParams.id;

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
    const contentType = req.headers.get("content-type") || "";
    if (
      !contentType.includes("multipart/form-data") &&
      !contentType.includes("application/x-www-form-urlencoded")
    ) {
      return NextResponse.json(
        {
          message:
            "Content-Type must be multipart/form-data or application/x-www-form-urlencoded",
        },
        { status: 400 }
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
    // Note: "createdAt" value may be updated by client, or you can generate a new timestamp if desired.
    const createdAt = get("createdAt")?.toString() || "";
    const photo = get("photo") as File | null;

    if (!postId || !title || !content || !category) {
      return NextResponse.json(
        { message: "البيانات غير مكتملة" },
        { status: 400 }
      );
    }

    const existingPost = db
      .prepare("SELECT * FROM posts WHERE id = ? AND userId = ?")
      .get(postId, user.id);
    if (!existingPost) {
      return NextResponse.json(
        { message: "المنشور غير موجود أو لا يتبع هذا المستخدم" },
        { status: 404 }
      );
    }
    const post = existingPost as Post;
    let imageUrl = post.image;
    if (photo) {
      const arrayBuffer = await new Response(photo).arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const dataUri = `data:${photo.type};base64,${base64}`;
      const uploadRes = await cloudinary.uploader.upload(dataUri, {
        folder: "posts",
      });
      imageUrl = uploadRes.secure_url;
    }
    const updatePost = db.prepare(`
      UPDATE posts
      SET title = ?, content = ?, image = ?, category = ?, createdAt = ?
      WHERE id = ? AND userId = ?
    `);
    updatePost.run(title, content, imageUrl, category, createdAt, postId, user.id);

    // Retrieve the updated post
    const updatedRow = db
      .prepare("SELECT * FROM posts WHERE id = ?")
      .get(postId);

    // Fetch the full author record from the users table
    const authorRecord = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(updatedRow.userId) as User | undefined;

    const blogDetail: BlogDetail = {
      blogId: updatedRow.id.toString(),
      title: updatedRow.title,
      category: updatedRow.category,
      content: updatedRow.content,
      tags: updatedRow.tags || "",
      imageUrl: updatedRow.image,
      createdAt: updatedRow.createdAt,
      like: updatedRow.like || 0,
      author: {
        id: authorRecord ? authorRecord.id : 0,
        name: authorRecord ? authorRecord.name : "Unknown Author",
        image: authorRecord
          ? (authorRecord.imageUrl || "/default-author.png")
          : "/default-author.png",
      },
    };

    return NextResponse.json(blogDetail, { status: 200 });
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      { message: "توكن غير صالح أو خطأ داخلي" },
      { status: 401 }
    );
  }
}

// ---------------- DELETE handler ----------------
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { message: "التوكن مفقود أو غير صالح" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const resolvedParams = await context.params;
    const postId = resolvedParams.id;
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
    if (!postId) {
      return NextResponse.json(
        { message: "معرف المنشور غير موجود" },
        { status: 400 }
      );
    }
    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(postId);
    if (!post) {
      return NextResponse.json(
        { message: "المنشور غير موجود" },
        { status: 404 }
      );
    }
    // Optionally, check that the post belongs to this user.
    const deletePost = db.prepare("DELETE FROM posts WHERE id = ?");
    deletePost.run(postId);
    return NextResponse.json(
      { message: "تم حذف المنشور بنجاح" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { message: "توكن غير صالح أو خطأ داخلي" },
      { status: 401 }
    );
  }
}

// ---------------- GET handler ----------------
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { message: "التوكن مفقود أو غير صالح" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const resolvedParams = await context.params;
    const postId = resolvedParams.id;
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
    if (!postId) {
      return NextResponse.json(
        { message: "معرف المنشور غير موجود" },
        { status: 400 }
      );
    }
    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(postId);
    if (!post) {
      return NextResponse.json(
        { message: "المنشور غير موجود" },
        { status: 404 }
      );
    }
    // Fetch the full author record for the post.
    const authorRecord = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(post.userId) as User | undefined;
    const blogDetail: BlogDetail = {
      blogId: post.id.toString(),
      title: post.title,
      category: post.category,
      content: post.content,
      tags: post.tags || "",
      imageUrl: post.image,
      createdAt: post.createdAt,
      like: post.like || 0,
      author: {
        id: authorRecord ? authorRecord.id : 0,
        name: authorRecord ? authorRecord.name : "Unknown Author",
        image: authorRecord ? (authorRecord.imageUrl || "/default-author.png") : "/default-author.png",
      },
    };
    return NextResponse.json(blogDetail, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: "توكن غير صالح أو خطأ داخلي" },
      { status: 401 }
    );
  }
}
