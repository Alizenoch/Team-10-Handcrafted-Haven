import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/app/lib/db";
import { signToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ id: user.id, email: user.email });

  const res = NextResponse.json({ message: "Login successful", user });
  res.cookies.set("token", token, { httpOnly: true, path: "/" });
  return res;
}

