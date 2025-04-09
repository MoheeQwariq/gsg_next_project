import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;

async function isStarred(userEmail: string, starredEmail: string) {
  const result = db
    .prepare("SELECT 1 FROM stars WHERE user_email = ? AND starred_email = ?")
    .get(userEmail, starredEmail);
  return !!result;
}

async function starUser(userEmail: string, starredEmail: string) {
  const insertStar = db.prepare(`
    INSERT OR IGNORE INTO stars (user_email, starred_email)
    VALUES (?, ?)
  `);
  insertStar.run(userEmail, starredEmail);
}

async function unstarUser(userEmail: string, starredEmail: string) {
  const deleteStar = db.prepare(`
    DELETE FROM stars WHERE user_email = ? AND starred_email = ?
  `);
  deleteStar.run(userEmail, starredEmail);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "التوكن مفقود أو غير صالح" }, { status: 401 });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    const userEmail = decoded.email;

    // تأكد من أن `params` يتم الوصول إليها بشكل صحيح
    const { email: starredEmail } = await params; // قم باستخدام await هنا

    if (userEmail === starredEmail) {
      return NextResponse.json({ message: "لا يمكنك تمييز نفسك بنجمة" }, { status: 400 });
    }

    const starredUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(starredEmail);

    if (!starredUser) {
      return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
    }

    const { action } = await req.json();

    if (action === "star") {
      const alreadyStarred = await isStarred(userEmail, starredEmail);

      if (alreadyStarred) {
        return NextResponse.json({ message: "لقد قمت بالفعل بتمييز هذا المستخدم بنجمة" });
      }

      await starUser(userEmail, starredEmail);

      const isMutual = await isStarred(starredEmail, userEmail);

      return NextResponse.json({
        message: isMutual ? "تم تمييز المستخدم بنجمة بنجاح، والمستخدم قام بتمييزك أيضاً 🎉" : "تم تمييز المستخدم بنجمة بنجاح",
      });
    } else if (action === "unstar") {
      const alreadyStarred = await isStarred(userEmail, starredEmail);

      if (!alreadyStarred) {
        return NextResponse.json({ message: "أنت لم تقم بتمييز هذا المستخدم بنجمة" });
      }

      await unstarUser(userEmail, starredEmail);

      return NextResponse.json({ message: "تم إلغاء تمييز المستخدم بنجمة بنجاح" });
    } else {
      return NextResponse.json({ message: "العملية غير صحيحة" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: "التوكن غير صالح" }, { status: 401 });
  }
}