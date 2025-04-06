import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token)
    return NextResponse.json({ error: "التوكن غير موجود" }, { status: 401 });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const newToken = jwt.sign(
      { id: payload.id, email: payload.email, role: payload.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token: newToken });
  } catch {
    return NextResponse.json({ error: "رمز غير صالح" }, { status: 403 });
  }
}
