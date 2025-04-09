import { type NextRequest, NextResponse } from "next/server"
import sqlite3 from "better-sqlite3"
import { User } from "@/types/user"

const db = sqlite3("stories.db")

export async function GET(_: NextRequest, { params }: { params: { username: string } }) {
  try {
    const username = params.username

    if (!username) {
      return NextResponse.json(
        { message: "اسم المستخدم مطلوب" },
        { status: 400 }
      )
    }

    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as User

    if (!user) {
      return NextResponse.json(
        { message: "المستخدم غير موجود" },
        { status: 404 }
      )
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "حدث خطأ أثناء جلب المستخدم", error: String(error) },
      { status: 500 }
    )
  }
}
