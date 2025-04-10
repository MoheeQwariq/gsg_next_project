import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const get = (key: string): string | File | null => {
      return (
        [...formData.entries()].find(([k]) => k.trim() === key)?.[1] ?? null
      );
    };

    const name = get("name")?.toString().trim() || "";
    const email = get("email")?.toString().trim() || "";
    const password = get("password")?.toString() || "";
    const birthday = get("birthday")?.toString() || "";
    const username = get("username")?.toString().trim() || "";
    const photo = get("photo") as File | null;

    // Validations
    if (name.length < 4) {
      return NextResponse.json(
        { error: "الاسم الكامل يجب أن يكون على الأقل 4 أحرف" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "صيغة البريد الإلكتروني غير صحيحة" },
        { status: 400 }
      );
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (password.length < 8 || !passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            "كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير، صغير، رقم، وحرف خاص",
        },
        { status: 400 }
      );
    }

    if (!birthday) {
      return NextResponse.json(
        { error: "تاريخ الميلاد مطلوب" },
        { status: 400 }
      );
    }

    const birthDate = new Date(birthday);
    const minAge = new Date();
    minAge.setFullYear(minAge.getFullYear() - 18);
    if (birthDate > minAge) {
      return NextResponse.json(
        { error: "يجب أن يكون عمرك 18 سنة على الأقل" },
        { status: 400 }
      );
    }

    if (!username || username.length < 3) {
      return NextResponse.json(
        { error: "اسم المستخدم مطلوب ويجب أن يكون 3 أحرف على الأقل" },
        { status: 400 }
      );
    }

    const usernameExists = db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username);
    if (usernameExists) {
      return NextResponse.json(
        { error: "اسم المستخدم مستخدم مسبقاً" },
        { status: 409 }
      );
    }

    if (!photo) {
      return NextResponse.json(
        { error: "الصورة الشخصية مطلوبة" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(photo.type)) {
      return NextResponse.json(
        { error: "يجب أن تكون الصورة من نوع JPG, PNG, أو GIF" },
        { status: 400 }
      );
    }

    if (photo.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "حجم الصورة يجب أن لا يتجاوز 2MB" },
        { status: 400 }
      );
    }

    const emailExists = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);
    if (emailExists) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مستخدم مسبقاً" },
        { status: 409 }
      );
    }

    const arrayBuffer = await photo.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:${photo.type};base64,${base64}`;

    const uploadRes = await cloudinary.uploader.upload(dataUri, {
      folder: "avatars",
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.prepare(
      `INSERT INTO users (name, email, password, role, imageUrl, birthday, username)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(
      name,
      email,
      hashedPassword,
      "user",
      uploadRes.secure_url,
      birthday,
      username
    );

    return NextResponse.json(
      {
        message: "تم إنشاء الحساب بنجاح",
        user: {
          name,
          email,
          imageUrl: uploadRes.secure_url,
          birthday,
          username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "حدث خطأ في الخادم" }, { status: 500 });
  }
}
