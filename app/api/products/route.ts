import { NextResponse } from "next/server";
import pool from "../../lib/db";

// GET all products
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: String(error),
      },
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY RECEIVED:", body);

    const { name, price, description, category, image } = body;

    if (!name || !price || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO products (name, price, description, category, image)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, price, description, category, image]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create product",
        details: error.message,
      },
      { status: 500 }
    );
  }
}