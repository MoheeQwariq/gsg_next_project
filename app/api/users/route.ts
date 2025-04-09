import { NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "@/services/users.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    const users = getAllUsers();
    return NextResponse.json(users, { status: 200 });
}
