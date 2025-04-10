import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;

function addComment(userEmail: string, postId: number, content: string) {
  const insertComment = db.prepare(
    "INSERT INTO comments (userEmail, postId, content, createdAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
  );
  insertComment.run(userEmail, postId, content);
}

function getComments(postId: number) {
  const getCommentsQuery = db.prepare(
    "SELECT comments.*, users.name as userName FROM comments LEFT JOIN users ON comments.userEmail = users.email WHERE postId = ?"
  );
  return getCommentsQuery.all(postId);
}

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;
  const postId = parseInt(id, 10);
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { message: "توكن مفقود أو غير صالح" },
      { status: 401 }
    );
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
    const userEmail = decoded.email;

    const { content } = await req.json();

    if (!content || content.trim() === "") {
      return NextResponse.json({ message: "محتوى التعليق مفقود" }, { status: 400 });
    }

    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(postId);
    if (!post) {
      return NextResponse.json({ message: "المدونة غير موجودة" }, { status: 404 });
    }

    addComment(userEmail, postId, content);

    return NextResponse.json({ message: "تم إضافة التعليق بنجاح" });
  } catch (error) {
    return NextResponse.json({ message: "التوكن غير صالح أو منتهي الصلاحية" }, { status: 401 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;  

  const postId = parseInt(id, 10);  

  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(postId);
  if (!post) {
    return NextResponse.json({ message: "المدونة غير موجودة" }, { status: 404 });
  }

  const comments = getComments(postId);

  return NextResponse.json({ data: comments });
}