import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";
import { User } from "@/types/user";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest, context: { params: { userId: string } }) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { message: "التوكن مفقود أو غير صالح" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const { userId } = context.params;

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

    if (user.id.toString() !== userId) {
      return NextResponse.json(
        { message: "ليس لديك صلاحية للوصول إلى هذه البيانات" },
        { status: 403 }
      );
    }

    const posts = db
      .prepare("SELECT * FROM posts WHERE userId = ? ORDER BY createdAt DESC")
      .all(user.id);

    return NextResponse.json(posts, { status: 200 });
  } catch (err) {
    console.error("GET USER POSTS Error:", err);
    return NextResponse.json(
      { message: "توكن غير صالح أو خطأ داخلي" },
      { status: 401 }
    );
  }
}
