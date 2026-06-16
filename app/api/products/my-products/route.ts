import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
try {
const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;


if (!token) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

const user = verifyToken(token) as {
  id: number;
  email: string;
} | null;

if (!user) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

const products = await db.product.findMany({
  where: {
    sellerId: user.id,
  },
  orderBy: {
    id: "desc",
  },
});

return NextResponse.json({ products });


} catch (error) {
console.error(error);


return NextResponse.json(
  { error: "Failed to load products" },
  { status: 500 }
);

}
}
