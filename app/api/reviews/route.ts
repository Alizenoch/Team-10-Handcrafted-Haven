
import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
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

    const { rating, comment, productId } =
      await request.json();

    if (!rating || !productId) {
      return NextResponse.json(
        { error: "Rating and productId are required" },
        { status: 400 }
      );
    }
     if (rating < 1 || rating > 5) {
    return NextResponse.json(
    { error: "Rating must be between 1 and 5" },
    { status: 400 }
    );
    }
    const review = await db.review.create({
      data: {
        rating: Number(rating),
        comment,
        productId: Number(productId),
        userId: (decoded as any).id,
      },
    });

    return NextResponse.json(
      {
        message: "Review created successfully",
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Review creation error:", error);

    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

