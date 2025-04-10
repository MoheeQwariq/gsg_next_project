import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/constants";
import sqlite3 from "better-sqlite3";
import { v2 as cloudinary } from "cloudinary";

const db = sqlite3("stories.db");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;

  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const userId = parseInt(params.id);
    if (decoded.id !== userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const formData = await req.formData();
    const get = (key: string) => formData.get(key)?.toString().trim() || "";

    const title = get("title");
    const content = get("content");
    const imageDirection = get("imageDirection") === "right" ? "right" : "left";
    const imageFile = formData.get("image") as File | null;

    let imageUrl = "";
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${imageFile.type};base64,${base64}`;
      console.log("Uploading image...");
      const uploaded = await cloudinary.uploader.upload(dataUri, {
        folder: "profile_sections",
      });
      console.log("Uploaded!", uploaded.secure_url);
      imageUrl = uploaded.secure_url;
    }

    const result = db
      .prepare(
        `
      INSERT INTO profile_sections (userId, title, content, imageUrl, imageDirection)
      VALUES (?, ?, ?, ?, ?)
    `
      )
      .run(userId, title, content, imageUrl, imageDirection);

    const newSection = db
      .prepare(`SELECT * FROM profile_sections WHERE id = ?`)
      .get(result.lastInsertRowid);

    return NextResponse.json({
      message: "تم إضافة القسم بنجاح",
      section: newSection,
    });
  } catch (err) {
    console.error("POST section error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const sections = db
      .prepare(`SELECT * FROM profile_sections WHERE userId = ?`)
      .all(userId);

    return NextResponse.json({ sections });
  } catch (error) {
    console.error("GET sections error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
