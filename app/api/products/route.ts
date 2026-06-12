// app/api/products/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const artisanId = searchParams.get("artisanId");

    const products = await prisma.product.findMany({
      where: artisanId ? { artisanId: Number(artisanId) } : {},
      include: { artisan: true }, // ✅ include artisan relation so you can show artisan name
      orderBy: { id: "desc" },
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
    const { title, price, description, category, image, sellerId, artisanId } = body;

    if (!title || !description || !price || !sellerId) {
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
        sellerId,
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
