import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sqlite3 from "better-sqlite3";

interface IDBUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string | null;
}

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "البريد وكلمة المرور مطلوبة" },
      { status: 400 }
    );
  }

  const user = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as IDBUser;
  if (!user) {
    return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { error: "كلمة المرور غير صحيحة" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return NextResponse.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
}
