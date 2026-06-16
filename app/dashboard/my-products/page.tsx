"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Product = {
id: number;
title: string;
description: string | null;
price: number;
image: string | null;
};

export default function MyProductsPage() {
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

const handleDelete = async (id: number) => {
  const confirmed = confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    setProducts(products.filter((p) => p.id !== id));
  } catch (error) {
    console.error(error);
    alert("Failed to delete product");
  }
};

useEffect(() => {
const fetchProducts = async () => {
try {
const res = await fetch("/api/products/my-products");

    if (!res.ok) {
      throw new Error("Failed to load products");
    }

    const data = await res.json();
    setProducts(data.products || []);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

fetchProducts();


}, []);

if (loading) {
return ( <main className="pt-24 px-6"> <p>Loading products...</p> </main>
);
}

return ( <main className="pt-24 max-w-7xl mx-auto px-6"> <div className="flex items-center justify-between mb-8"> <h1 className="text-3xl font-bold">
My Products </h1>


    <Link
      href="/dashboard/add-product"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
      ➕ Add Product
    </Link>
  </div>

  {products.length === 0 ? (
    <div className="bg-white rounded-xl shadow p-8 text-center">
      <p className="text-gray-500">
        You haven't created any products yet.
      </p>
    </div>
  ) : (
    <div className="grid md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow overflow-hidden"
        >
          <div className="relative h-48">
            <Image
              src={product.image || "/images/placeholder.png"}
              alt={product.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="p-4">
            <h2 className="font-semibold text-lg">
              {product.title}
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              {product.description}
            </p>

            <p className="font-bold mt-4">
              USD {Number(product.price).toLocaleString()}
            </p>

            <div className="flex gap-2 mt-4">
              <Link
                href={`/products/${product.id}`}
                className="bg-blue-600 text-white px-3 py-2 rounded"
              >
                View
              </Link>

              <Link
               href={`/dashboard/edit-product/${product.id}`}
               className="bg-yellow-500 text-white px-3 py-2 rounded"
              >
             Edit
            </Link>

              <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-600 text-white px-3 py-2 rounded"
              >
              Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</main>

);
}
