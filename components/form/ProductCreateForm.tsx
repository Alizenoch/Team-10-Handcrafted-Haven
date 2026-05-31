"use client";

import { useActionState, useEffect } from "react";
import { CreateProductButton } from "../button/CreateProduct";
import { createProduct } from "../action/productActions";
import type { Product, CreateProductInput } from "@/types/product";

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

// Updated shape to include optional product data
type ActionState = {
  error: string | null;
  success: boolean;
  data: Product | null; 
};

export function ProductCreateForm({ setProducts }: Props) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (prevState, formData) => {
      const name = String(formData.get("productName") ?? "").trim();
      const price = Number(formData.get("price"));
      const description = String(formData.get("description") ?? "").trim();
      const category = String(formData.get("category") ?? "").trim();
      const image = String(formData.get("image") ?? "").trim();

      if (!name) return { error: "Product name cannot be empty.", success: false, data: null };
      if (!description) return { error: "Description cannot be empty.", success: false, data: null };
      if (Number.isNaN(price) || price <= 0) {
        return { error: "Price must be a valid number greater than 0.", success: false, data: null };
      }

      const productInput: CreateProductInput = {
        name,
        price,
        description,
        category: category || "Uncategorized",
        image: image || "/images/placeholder.png",
      };

      try {
        const createdProduct = await createProduct(productInput);
        
        // Return the product to the state instead of executing an inline state update
        return { error: null, success: true, data: createdProduct };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Failed to create product. Please try again.",
          success: false,
          data: null,
        };
      }
    },
    { error: null, success: false, data: null } // Initial state
  );

  // 🔔 Safely notify the parent UI array when the state succeeds
  useEffect(() => {
    if (state.success && state.data) {
      setProducts((prev) => {
        // Prevent accidental duplicates in StrictMode
        if (prev.some((p) => p.id === state.data!.id)) return prev;
        return [...prev, state.data!];
      });
    }
  }, [state.success, state.data, setProducts]);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Product Name
        </label>
        <input
          name="productName"
          type="text"
          required
          placeholder="Enter product name"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Price */}
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

      {/* Description */}
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

      {/* Category */}
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

      {/* Image */}
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

      {/* Error Message */}
      {state.error && (
        <p className="text-sm text-red-600 font-medium" role="alert">
          {state.error}
        </p>
      )}

      {/* 🟢 Optional Inline Success Banner */}
      {state.success && (
        <p className="text-sm text-green-600 font-medium" role="status">
          Product created successfully!
        </p>
      )}

      {/* Submit Button */}
      <CreateProductButton type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Product"}
      </CreateProductButton>
    </form>
  );
}
