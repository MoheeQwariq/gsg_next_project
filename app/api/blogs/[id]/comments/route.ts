import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import { Comment, CommentData } from "@/types/comment";

const db = sqlite3("stories.db");

function addComment(userEmail: string, postId: number, content: string): Comment {
  const insertComment = db.prepare(
    "INSERT INTO comments (userEmail, postId, content, createdAt, love) VALUES (?, ?, ?, CURRENT_TIMESTAMP, 0)"
  );
  const result = insertComment.run(userEmail, postId, content);

  const newRow = db.prepare("SELECT * FROM comments WHERE id = ?").get(result.lastInsertRowid);
  const userRow = db.prepare("SELECT id FROM users WHERE email = ?").get(userEmail);
  
  return {
    id: newRow.id.toString(),
    content: newRow.content,
    authorId: userRow ? userRow.id : 0,
    createdAt: newRow.createdAt,
    likes: newRow.likes || 0,
  };
}


function getComments(postId: number) {
  const getCommentsQuery = db.prepare(
    "SELECT comments.*, users.name as userName FROM comments LEFT JOIN users ON comments.userEmail = users.email WHERE postId = ?"
  );
  return getCommentsQuery.all(postId);
}
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const postId = Number(id);
  if (!Number.isInteger(postId)) {
    return NextResponse.json({ message: "المعرف غير صالح" }, { status: 400 });
  }
  
  const { userEmail, content } = await req.json();
  
  if (!userEmail || userEmail.trim() === "") {
    return NextResponse.json({ message: "البريد الإلكتروني مفقود" }, { status: 400 });
  }
  
  if (!content || content.trim() === "") {
    return NextResponse.json({ message: "محتوى التعليق مفقود" }, { status: 400 });
  }
  
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(postId);
  if (!post) {
    return NextResponse.json({ message: "المدونة غير موجودة" }, { status: 404 });
  }
  
  const newComment = addComment(userEmail, postId, content);
  
  return NextResponse.json(
    { message: "تم إضافة التعليق بنجاح", data: newComment },
    { status: 200 }
  );
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const postId = Number(id);
  if (!Number.isInteger(postId)) {
    return NextResponse.json({ message: "المعرف غير صالح" }, { status: 400 });
  }
  
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(postId);
  if (!post) {
    return NextResponse.json({ message: "المدونة غير موجودة" }, { status: 404 });
  }
  
  const comments = getComments(postId);
  return NextResponse.json({ data: comments });
}
