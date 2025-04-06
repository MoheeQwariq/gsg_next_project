import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "تم تسجيل الخروج" },
    {
      status: 200,
      headers: {
        "Set-Cookie": "token=; Max-Age=0; path=/;",
      },
    }
  );
}
