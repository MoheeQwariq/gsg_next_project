import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;

function hasUserLovedPost(userEmail: string, postId: number): boolean {
  const checkLoveQuery = db.prepare("SELECT * FROM post_loves WHERE userEmail = ? AND postId = ?");
  const result = checkLoveQuery.get(userEmail, postId);
  return result !== undefined;
}

function addLoveToPost(postId: number) {
  const updateLoveQuery = db.prepare("UPDATE posts SET love = love + 1 WHERE id = ?");
  updateLoveQuery.run(postId);
}

function removeLoveFromPost(postId: number) {
  const updateLoveQuery = db.prepare("UPDATE posts SET love = love - 1 WHERE id = ?");
  updateLoveQuery.run(postId);
}

function recordLove(userEmail: string, postId: number) {
  const insertLoveQuery = db.prepare("INSERT INTO post_loves (userEmail, postId) VALUES (?, ?)");
  insertLoveQuery.run(userEmail, postId);
}

function removeLoveRecord(userEmail: string, postId: number) {
  const deleteLoveQuery = db.prepare("DELETE FROM post_loves WHERE userEmail = ? AND postId = ?");
  deleteLoveQuery.run(userEmail, postId);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId)) {
    return NextResponse.json({ message: "المعرف غير صالح" }, { status: 400 });
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "توكن مفقود أو غير صالح" }, { status: 401 });
  }

  const token = authHeader 

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
    const userEmail = decoded.email;

    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(postId);
    if (!post) {
      return NextResponse.json({ message: "البوست غير موجود" }, { status: 404 });
    }

    const body = await req.json();
    const action = body.action;

    if (action === "like") {
      if (hasUserLovedPost(userEmail, postId)) {
        return NextResponse.json({ message: "لقد تفاعلت مع هذا البوست مسبقًا" }, { status: 400 });
      }

      addLoveToPost(postId);
      recordLove(userEmail, postId);

      return NextResponse.json({ message: "تم التفاعل مع البوست بنجاح" });

    } else if (action === "unlike") {
      if (!hasUserLovedPost(userEmail, postId)) {
        return NextResponse.json({ message: "لم تقم بالتفاعل مع هذا البوست من قبل" }, { status: 400 });
      }

      removeLoveFromPost(postId);
      removeLoveRecord(userEmail, postId);

      return NextResponse.json({ message: "تم إلغاء التفاعل مع البوست بنجاح" });

    } else {
      return NextResponse.json({ message: "قيمة غير صالحة للحقل 'action'" }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ message: "التوكن غير صالح أو منتهي الصلاحية" }, { status: 401 });
  }
}
