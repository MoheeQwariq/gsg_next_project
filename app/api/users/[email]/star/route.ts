import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";

const db = sqlite3("stories.db");
const JWT_SECRET = process.env.JWT_SECRET!;

async function isStarred(userEmail: string, starredEmail: string) {
  const result = db
    .prepare("SELECT 1 FROM stars WHERE userEmail = ? AND starredEmail = ?")
    .get(userEmail, starredEmail);
  return !!result;
}

async function starUser(userEmail: string, starredEmail: string) {
  const insertStar = db.prepare(
    "INSERT OR IGNORE INTO stars (userEmail, starredEmail) VALUES (?, ?)"
  );
  insertStar.run(userEmail, starredEmail);
}

async function unstarUser(userEmail: string, starredEmail: string) {
  const deleteStar = db.prepare(
    "DELETE FROM stars WHERE userEmail = ? AND starredEmail = ?"
  );
  deleteStar.run(userEmail, starredEmail);
}

export async function POST(req: NextRequest, { params }: { params: { email: string } }) {
  const { email: starredEmail } = await params;
const authHeader = req.headers.get("authorization");

if (!authHeader) {
  return NextResponse.json(
    { message: "التوكن مفقود أو غير صالح" },
    { status: 401 }
  );
}

const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    const userEmail = decoded.email;

    if (userEmail === starredEmail) {
      return NextResponse.json({ message: "لا يمكنك تفضيل نفسك" }, { status: 400 });
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
        return NextResponse.json({ message: "قمت بتفضيل هذا المستخدم من قبل" });
      }

      await starUser(userEmail, starredEmail);

      return NextResponse.json({ message: "تم تفضيل المستخدم بنجاح" });
    } else if (action === "unstar") {
      const alreadyStarred = await isStarred(userEmail, starredEmail);

      if (!alreadyStarred) {
        return NextResponse.json({ message: "لم تقم بتفضيل هذا المستخدم" });
      }

      await unstarUser(userEmail, starredEmail);

      return NextResponse.json({ message: "تم إلغاء التفضيل بنجاح" });
    } else {
      return NextResponse.json({ message: "الإجراء غير صالح" }, { status: 400 });
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "توكن غير صالح" }, { status: 401 });
  }
}
