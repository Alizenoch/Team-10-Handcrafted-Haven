"use client";

import { useActionState, useEffect } from "react";
import { CreateProductButton } from "../button/CreateProduct";
import { createProduct } from "../action/productActions";
import type { CreateProductInput } from "@/types/product";
import type { Product } from "@prisma/client";

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

type ActionState = {
  error: string | null;
  success: boolean;
  data: Product | null;
};

export function ProductCreateForm({ setProducts }: Props) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (prevState, formData) => {
      const title = String(formData.get("title") ?? "").trim();
      const price = Number(formData.get("price"));
      const description = String(formData.get("description") ?? "").trim();
      const category = String(formData.get("category") ?? "").trim();
      const image = String(formData.get("image") ?? "").trim();

      if (!title) {
        return {
          error: "Product title cannot be empty.",
          success: false,
          data: null,
        };
      }

      if (!description) {
        return {
          error: "Description cannot be empty.",
          success: false,
          data: null,
        };
      }

      if (Number.isNaN(price) || price <= 0) {
        return {
          error: "Price must be a valid number greater than 0.",
          success: false,
          data: null,
        };
      }

      const productInput: CreateProductInput & { sellerId: number } = {
  title,
  price,
  description,
  category: category || "Uncategorized",
  image: image || "/images/placeholder.png",
  sellerId: 1, // Replace with authenticated user ID later
};
      try {
        const createdProduct = await createProduct(productInput);

        return {
          error: null,
          success: true,
          data: createdProduct,
        };
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "Failed to create product. Please try again.",
          success: false,
          data: null,
        };
      }
    },
    {
      error: null,
      success: false,
      data: null,
    }
  );

  useEffect(() => {
    if (state.success && state.data) {
      setProducts((prev) => {
        if (prev.some((p) => p.id === state.data!.id)) {
          return prev;
        }

        return [...prev, state.data!];
      });
    }
  }, [state.success, state.data, setProducts]);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">
          Product Title
        </label>
        <input
          name="title"
          type="text"
          required
          placeholder="Enter product title"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Price
        </label>
        <input
          name="price"
          type="number"
          required
          placeholder="Enter price"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Enter description"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Category
        </label>
        <input
          name="category"
          type="text"
          placeholder="Enter category"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Image URL
        </label>
        <input
          name="image"
          type="text"
          placeholder="Enter image URL"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600 font-medium" role="alert">
          {state.error}
        </p>
      )}

      {state.success && (
        <p className="text-sm text-green-600 font-medium" role="status">
          Product created successfully!
        </p>
      )}

      <CreateProductButton type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Product"}
      </CreateProductButton>
    </form>
  );
}