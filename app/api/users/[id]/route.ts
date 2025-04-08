import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import { User } from "@/types/user";
import jwt from "jsonwebtoken";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User;

    if (user) {
      return NextResponse.json(user, { status: 200 });
    }

    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user", error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Token مفقود أو غير صالح" }, { status: 401 });
  }

  const token = authHeader; 

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "غير مصرح لك بحذف المستخدمين" }, { status: 403 });
    }

    const userId = params.id;

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);

    if (!user) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    db.prepare("DELETE FROM users WHERE id = ?").run(userId);

    return NextResponse.json({ message: "تم حذف المستخدم بنجاح" });
  } catch (error) {
    return NextResponse.json({ message: "Token غير صالح أو منتهي" }, { status: 401 });
  }
}
