import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "better-sqlite3";
import { User } from "@/types/user";
const db = sqlite3("stories.db");

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User;

        if (user) {
            return NextResponse.json(user, { status: 200 });
        }

        return NextResponse.json({ message: "User not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching user", error }, { status: 500 });
    }
}
