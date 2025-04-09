import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { JWT_SECRET } from "@/lib/constants";
import jwt from "jsonwebtoken";
import sqlite3 from "better-sqlite3";

const db = sqlite3("stories.db");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const userId = decoded.id;

    const userExists = db
      .prepare(`SELECT id FROM users WHERE id = ?`)
      .get(userId);
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const get = (key: string) => formData.get(key)?.toString().trim() || null;

    const bio = get("bio");
    const facebookUrl = get("facebookUrl");
    const linkedinUrl = get("linkedinUrl");
    const xUrl = get("xUrl");
    const phoneNumber = get("phoneNumber");
    const showStats = get("showStats") === "false" ? 0 : 1;
    const showInteractions = get("showInteractions") === "false" ? 0 : 1;

    const coverFile = formData.get("cover") as File | null;

    let coverUrl = "";

    if (coverFile) {
      const arrayBuffer = await coverFile.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const dataUri = `data:${coverFile.type};base64,${base64}`;

      const upload = await cloudinary.uploader.upload(dataUri, {
        folder: "covers",
      });

      coverUrl = upload.secure_url;
    }

    db.prepare(
      `
      INSERT INTO profiles (
        userId, bio, coverUrl, facebookUrl, linkedinUrl, xUrl, phoneNumber, showStats, showInteractions
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
      userId,
      bio,
      coverUrl,
      facebookUrl,
      linkedinUrl,
      xUrl,
      phoneNumber,
      showStats,
      showInteractions
    );

    return NextResponse.json({
      message: "تم إنشاء البروفايل بنجاح",
      profile: {
        bio,
        coverUrl,
        facebookUrl,
        linkedinUrl,
        xUrl,
        phoneNumber,
        showStats,
        showInteractions,
      },
    });
  } catch (error) {
    console.error("POST /profile error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
