import { type NextRequest, NextResponse } from "next/server"
import sqlite3 from "better-sqlite3"
import jwt from "jsonwebtoken"
import { User } from "@/types/user"
import bcrypt from 'bcryptjs';
const db = sqlite3("stories.db")
const JWT_SECRET = process.env.JWT_SECRET!


export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } } 
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ message: "الـ ID مطلوب" }, { status: 400 });
    }

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User;

    if (user) {
      return NextResponse.json(user, { status: 200 });
    }

    return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: "حدث خطأ أثناء جلب البيانات", error: String(error) },
      { status: 500 }
    );
  }
}

  export async function PUT(request: NextRequest) {
    try {
      const url = new URL(request.url)
      const pathParts = url.pathname.split("/")
      const userId = pathParts[pathParts.length - 1]
      const authHeader = request.headers.get("authorization")
      const userExists = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as User
  
      if (!userExists) {
        return NextResponse.json({ message: "المستخدم غير موجود", userId }, { status: 404 })
      }
  
      if (!authHeader) {
        return NextResponse.json(
          {
            message: "Token مفقود أو غير صالح",
            debug: { authHeader: "missing" },
          },
          { status: 401 },
        )
      }
  
      const token = authHeader
  
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
          id: string | number
          email: string
          role: string
        }
  
        const tokenId = String(decoded.id)
        const requestedId = String(userId)
  
        if (tokenId !== requestedId) {
          return NextResponse.json(
            { message: "ليس من صلاحياتك تعديل هذا المستخدم" },
            { status: 403 },
          )
        }
  
        const requestData = await request.json()
        const currentUser = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as User
        const { name, email, imageUrl, username, role, password } = requestData
  
        const updatedName = name || currentUser.name
        const updatedEmail = email || currentUser.email
        const updatedimageUrl = imageUrl !== undefined ? imageUrl : currentUser.imageUrl
        const updatedUsername = username || currentUser.username
        const updatedRole = role || currentUser.role
  
        if (updatedEmail !== currentUser.email) {
          const emailExists = db.prepare("SELECT * FROM users WHERE email = ?").get(updatedEmail) as User
          if (emailExists && emailExists.id !== currentUser.id) {
            return NextResponse.json(
              { message: "هذا البريد الإلكتروني مستخدم بالفعل من قبل مستخدم آخر" },
              { status: 409 },
            )
          }
        }
  
        let updatedPassword = currentUser.password
        if (password) {
          const isSamePassword = await bcrypt.compare(password, currentUser.password)
          if (!isSamePassword) {
            updatedPassword = await bcrypt.hash(password, 10)
          }
        }
  
        if (
          updatedName === currentUser.name &&
          updatedEmail === currentUser.email &&
          updatedimageUrl === currentUser.imageUrl &&
          updatedUsername === currentUser.username &&
          updatedRole === currentUser.role &&
          updatedPassword === currentUser.password
        ) {
          return NextResponse.json({ message: "لم يتم تحديث أي بيانات" }, { status: 404 })
        }
  
        const updateUser = db.prepare(
          "UPDATE users SET name = ?, email = ?, imageUrl = ?, username = ?, role = ?, password = ? WHERE id = ?"
        )
  
        const result = updateUser.run(
          updatedName,
          updatedEmail,
          updatedimageUrl,
          updatedUsername,
          updatedRole,
          updatedPassword,
          userId,
        )
  
        if (result.changes === 0) {
          return NextResponse.json({ message: "لم يتم تحديث أي بيانات" }, { status: 404 })
        }
  
        const updatedUser = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as User
  
        return NextResponse.json(
          {
            message: "تم تعديل المستخدم بنجاح",
            data: updatedUser,
            debug: {
              tokenId,
              requestedId,
              match: tokenId === requestedId,
            },
          },
          { status: 200 },
        )
      } catch (jwtError) {
        return NextResponse.json(
          {
            message: "Token غير صالح أو منتهي",
            error: String(jwtError),
            debug: { token: token.substring(0, 20) + "..." },
          },
          { status: 401 },
        )
      }
    } catch (error) {
      return NextResponse.json(
        {
          message: "حدث خطأ أثناء تحديث المستخدم",
          error: String(error),
        },
        { status: 500 },
      )
    }
  }
  
  
export async function DELETE(request: NextRequest) {
    const authHeader = request.headers.get("authorization")
    
    if (!authHeader) {
      return NextResponse.json({ message: "Token مفقود أو غير صالح" }, { status: 401 })
    }
  
    const token =  authHeader
 
  
    try {
      const url = new URL(request.url)
      const pathParts = url.pathname.split("/")
      const userId = pathParts[pathParts.length - 1]
  
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string | number; email: string; role: string }
  
      if (decoded.role !== "admin") {
        return NextResponse.json({ message: "غير مصرح لك بحذف المستخدمين" }, { status: 403 })
      }
  
      const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId)
  
      if (!user) {
        return NextResponse.json({ message: "المستخدم غير موجود" }, { status: 404 })
      }
  
      db.prepare("DELETE FROM users WHERE id = ?").run(userId)
  
      return NextResponse.json({ message: "تم حذف المستخدم بنجاح" })
    } catch (error) {
    
      return NextResponse.json({ message: "Token غير صالح أو منتهي" }, { status: 401 })
    }
  }
  