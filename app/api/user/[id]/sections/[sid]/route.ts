import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET } from "@/lib/constants";

const db = sqlite3("stories.db");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; sid: string } }
) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const userId = parseInt(params.id);
    const sectionId = parseInt(params.sid);

    if (decoded.id !== userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const formData = await req.formData();
    const get = (key: string) => formData.get(key)?.toString().trim() || "";

    const title = get("title");
    const content = get("content");
    const imageDirection = get("imageDirection") === "right" ? "right" : "left";
    const imageFile = formData.get("image") as File | null;

    let imageUrl =
      (
        db
          .prepare(
            `SELECT imageUrl FROM profile_sections WHERE id = ? AND userId = ?`
          )
          .get(sectionId, userId) as { imageUrl: string } | undefined
      )?.imageUrl || "";

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${imageFile.type};base64,${base64}`;
      const uploaded = await cloudinary.uploader.upload(dataUri, {
        folder: "profile_sections",
      });
      imageUrl = uploaded.secure_url;
    }

    db.prepare(
      `
      UPDATE profile_sections
      SET title = ?, content = ?, imageUrl = ?, imageDirection = ?
      WHERE id = ? AND userId = ?
    `
    ).run(title, content, imageUrl, imageDirection, sectionId, userId);

    const updatedSection = db
      .prepare(`SELECT * FROM profile_sections WHERE id = ?`)
      .get(sectionId);

    return NextResponse.json({
      message: "تم تحديث القسم بنجاح",
      section: updatedSection,
    });
  } catch (error) {
    console.error("PUT /sections error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; sid: string } }
) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const userId = parseInt(params.id);
    const sectionId = parseInt(params.sid);

    if (decoded.id !== userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const section = db
      .prepare(`SELECT * FROM profile_sections WHERE id = ? AND userId = ?`)
      .get(sectionId, userId);

    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    db.prepare(`DELETE FROM profile_sections WHERE id = ? AND userId = ?`).run(
      sectionId,
      userId
    );

    return NextResponse.json({ message: "تم حذف القسم بنجاح" });
  } catch (err) {
    console.error("DELETE section error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
