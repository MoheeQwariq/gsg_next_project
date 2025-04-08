import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import { User } from "@/types/user";
import jwt from "jsonwebtoken";
const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const email = url.pathname.split("/").pop();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as User;

    if (user) {
      return NextResponse.json(user, { status: 200 });
    }

    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user", error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { email: string } }) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Token مفقود أو غير صالح" }, { status: 401 });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    if (decoded.email !== params.email) {
      return NextResponse.json({ message: "غير مصرح لك بتعديل هذه البيانات" }, { status: 403 });
    }

    const { name, avatar, username, role } = await req.json();

    const currentUser = db.prepare("SELECT * FROM users WHERE email = ?").get(params.email) as User;

    const updatedName = name || currentUser.name;
    const updatedAvatar = avatar !== undefined ? avatar : currentUser.avatar;
    const updatedUsername = username || currentUser.username;
    const updatedRole = role || currentUser.role;

    const updateUser = db.prepare(
      "UPDATE users SET name = ?, avatar = ?, username = ?, role = ? WHERE email = ?"
    );
    const result = updateUser.run(updatedName, updatedAvatar, updatedUsername, updatedRole, params.email);

    if (result.changes === 0) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    const updatedUser = db.prepare("SELECT * FROM users WHERE email = ?").get(params.email) as User;

    return NextResponse.json({ message: "تم تعديل المستخدم بنجاح", data: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Token غير صالح أو منتهي" }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { email: string } }) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Token مفقود أو غير صالح" }, { status: 401 });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "غير مصرح لك بحذف المستخدمين" }, { status: 403 });
    }

    const userEmail = params.email;

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(userEmail);

    if (!user) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    db.prepare("DELETE FROM users WHERE email = ?").run(userEmail);

    return NextResponse.json({ message: "تم حذف المستخدم بنجاح" });
  } catch (error) {
    return NextResponse.json({ message: "Token غير صالح أو منتهي" }, { status: 401 });
  }
}
