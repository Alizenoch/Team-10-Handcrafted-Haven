import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

// GET single product
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(product);
}

// PUT update product
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();

  const updated = await prisma.product.update({
    where: { id: Number(id) },
    data: body,
  });

  return NextResponse.json(updated);
}

// DELETE product
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.product.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({
    message: "Product deleted successfully",
  });
}