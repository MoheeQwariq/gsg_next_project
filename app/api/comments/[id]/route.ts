import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;
interface Comment {
  id: number;
  userEmail: string;
  content: string;
  love: number;
  createdAt: string;
  postId:number
}
function deleteComment(commentId: number) {
  const deleteCommentQuery = db.prepare("DELETE FROM comments WHERE id = ?");
  deleteCommentQuery.run(commentId);
  const deleteLovesQuery = db.prepare("DELETE FROM comment_loves WHERE commentId = ?");
  deleteLovesQuery.run(commentId);
}
function hasUserLovedComment(userEmail: string, commentId: number): boolean {
  const checkLoveQuery = db.prepare("SELECT * FROM comment_loves WHERE userEmail = ? AND commentId = ?");
  const result = checkLoveQuery.get(userEmail, commentId);
  return result !== undefined;
}

function addLoveToComment(commentId: number) {
  const updateLoveQuery = db.prepare("UPDATE comments SET love = love + 1 WHERE id = ?");
  updateLoveQuery.run(commentId);
}

function removeLoveFromComment(commentId: number) {
  const updateLoveQuery = db.prepare("UPDATE comments SET love = love - 1 WHERE id = ?");
  updateLoveQuery.run(commentId);
}

function recordLove(userEmail: string, commentId: number) {
  const insertLoveQuery = db.prepare("INSERT INTO comment_loves (userEmail, commentId) VALUES (?, ?)");
  insertLoveQuery.run(userEmail, commentId);
}

function removeLoveRecord(userEmail: string, commentId: number) {
  const deleteLoveQuery = db.prepare("DELETE FROM comment_loves WHERE userEmail = ? AND commentId = ?");
  deleteLoveQuery.run(userEmail, commentId);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const commentId = Number(id)
  if (!Number.isInteger(commentId)) {
    return NextResponse.json({ message: "المعرف غير صالح" }, { status: 400 });
  }
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "توكن مفقود أو غير صالح" }, { status: 401 });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
    const userEmail = decoded.email;

    const comment = db.prepare("SELECT * FROM comments WHERE id = ?").get(commentId);
    if (!comment) {
      return NextResponse.json({ message: "التعليق غير موجود" }, { status: 404 });
    }

    const body = await req.json();
    const action = body.action;

    if (action === "like") {
      if (hasUserLovedComment(userEmail, commentId)) {
        return NextResponse.json({ message: "لقد تفاعلت مع هذا التعليق مسبقًا" }, { status: 400 });
      }

      addLoveToComment(commentId);
      recordLove(userEmail, commentId);

      return NextResponse.json({ message: "تم التفاعل مع التعليق بنجاح" });

    } else if (action === "unlike") {
      if (!hasUserLovedComment(userEmail, commentId)) {
        return NextResponse.json({ message: "لم تقم بالتفاعل مع هذا التعليق من قبل" }, { status: 400 });
      }

      removeLoveFromComment(commentId);
      removeLoveRecord(userEmail, commentId);

      return NextResponse.json({ message: "تم إلغاء التفاعل مع التعليق بنجاح" });

    } else {
      return NextResponse.json({ message: "قيمة غير صالحة للحقل 'action'" }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ message: "التوكن غير صالح أو منتهي الصلاحية" }, { status: 401 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const commentId = Number(id);
  
  if (!Number.isInteger(commentId)) {
    return NextResponse.json({ message: "المعرف غير صالح" }, { status: 400 });
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "توكن مفقود أو غير صالح" }, { status: 401 });
  }

  const token = authHeader
  if (!token) {
    return NextResponse.json({ message: "توكن مفقود أو غير صالح" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
    const userEmail = decoded.email;

    const comment = db.prepare("SELECT * FROM comments WHERE id = ?").get(commentId) as Comment;

    if (!comment) {
      return NextResponse.json({ message: "التعليق غير موجود" }, { status: 404 });
    }

    if (comment.userEmail !== userEmail && decoded.role !== "admin") {
      return NextResponse.json({ message: "ليس لديك صلاحيات لحذف هذا التعليق" }, { status: 403 });
    }

    deleteComment(commentId);

    return NextResponse.json({ message: "تم حذف التعليق بنجاح" });

  } catch (error) {
    return NextResponse.json({ message: "التوكن غير صالح أو منتهي الصلاحية" }, { status: 401 });
  }
}