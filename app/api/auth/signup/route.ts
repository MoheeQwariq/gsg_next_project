import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");

export async function POST(req: NextRequest) {
  const { name, email, password, birthday, avatar } = await req.json();

  if (!name || !email || !password || !birthday) {
    return NextResponse.json({ error: "البيانات غير مكتملة" }, { status: 400 });
  }

  const exists = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (exists) {
    return NextResponse.json(
      { error: "البريد الإلكتروني مستخدم مسبقاً" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  db.prepare(
    `
    INSERT INTO users (name, email, password, role, avatar)
    VALUES (?, ?, ?, ?, ?)
  `
  ).run(name, email, hashedPassword, "user", avatar || null);

  return NextResponse.json(
    { message: "تم إنشاء الحساب بنجاح" },
    { status: 201 }
  );
}
