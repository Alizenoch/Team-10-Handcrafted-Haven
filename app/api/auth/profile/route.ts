import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const decoded = verifyToken(token);

  if (!decoded || typeof decoded === "string") {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }

  const user = await db.user.findUnique({
  where: { id: (decoded as any).id },
  include: {
    profile: true,
    products: true,
    reviews: true,
  },
});

if (!user) {
  return NextResponse.json(
    { error: "User not found" },
    { status: 404 }
  );
}

const { password, ...safeUser } = user;

return NextResponse.json({
  user: safeUser,
});

 

return NextResponse.json({
  user: safeUser,
});
}
export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const decoded = verifyToken(token);

  if (!decoded || typeof decoded === "string") {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }

  const { name, email } = await request.json();
  if (!name || !email) {
  return NextResponse.json(
    { error: "Name and email are required" },
    { status: 400 }
  );
}

  const updatedUser = await db.user.update({
    where: {
      id: (decoded as any).id,
    },
    data: {
      name,
      email,
    },
  });

  return NextResponse.json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
}

