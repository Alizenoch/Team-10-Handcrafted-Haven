import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

// GET single product
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(product);
}

// PUT update product
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await prisma.product.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(updated);
}

// DELETE product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.product.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Product deleted successfully" });
}
