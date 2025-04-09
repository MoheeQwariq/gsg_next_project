import sqlite3 from "better-sqlite3";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET } from "@/lib/constants";
import { v2 as cloudinary } from "cloudinary";
import { UserProfile } from "@/types/profile";

const db = sqlite3("stories.db");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = db
      .prepare(
        `SELECT id, name, email, role, avatar, birthday FROM users WHERE id = ?`
      )
      .get(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const profile = db
      .prepare(`SELECT * FROM profiles WHERE userId = ?`)
      .get(userId);

    return NextResponse.json({
      data: {
        user,
        profile: profile || null,
      },
    });
  } catch (error) {
    console.error("Profile GET by ID Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const authUserId = decoded.id;
    const targetId = Number(context.params.id);

    if (!targetId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const get = (key: string) => formData.get(key)?.toString() ?? null;

    const bio = get("bio");
    const phoneNumber = get("phoneNumber");
    const facebookUrl = get("facebookUrl");
    const linkedinUrl = get("linkedinUrl");
    const xUrl = get("xUrl");
    const showStats = get("showStats") === "true" ? 1 : 0;
    const showInteractions = get("showInteractions") === "true" ? 1 : 0;
    const cover = formData.get("cover") as File | null;

    const profile = db
      .prepare("SELECT * FROM profiles WHERE userId = ?")
      .get(authUserId) as UserProfile;

    if (!profile) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    let coverUrl = profile.coverUrl;
    if (cover) {
      const arrayBuffer = await cover.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const dataUri = `data:${cover.type};base64,${base64}`;

      const uploadRes = await cloudinary.uploader.upload(dataUri, {
        folder: "covers",
      });
      coverUrl = uploadRes.secure_url;
    }

    db.prepare(
      `UPDATE profiles SET bio = ?, phoneNumber = ?, facebookUrl = ?, linkedinUrl = ?, xUrl = ?, showStats = ?, showInteractions = ?, coverUrl = ? WHERE userId = ?`
    ).run(
      bio,
      phoneNumber,
      facebookUrl,
      linkedinUrl,
      xUrl,
      showStats,
      showInteractions,
      coverUrl,
      authUserId
    );

    const updatedProfile = db
      .prepare(`SELECT * FROM profiles WHERE userId = ?`)
      .get(authUserId);
    return NextResponse.json({
      message: "تم تحديث البروفايل",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Profile PUT by ID Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
