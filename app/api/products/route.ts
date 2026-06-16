// app/api/products/route.ts

import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const artisanId = searchParams.get("artisanId");
    const search = searchParams.get("search");

    const products = await prisma.product.findMany({
      where: {
        ...(artisanId && {
          artisanId: Number(artisanId),
        }),

        ...(search && {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              category: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
      },

      include: {
        artisan: true,
      },

      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, price, description, category, image, artisanId } = body;

    const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

console.log("TOKEN:", token);

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

console.log("USER:", user);


if (!user) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}

if (!title || !description || !price) {
  return NextResponse.json(
    { error: "Missing required fields" },
    { status: 400 }
  );
}

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price), // ensure Float type
        category,
        image,
        sellerId: user.id,
        artisanId: artisanId ? Number(artisanId) : null, // ✅ link product to artisan if provided
      },
      include: { artisan: true }, // return artisan info with product
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
