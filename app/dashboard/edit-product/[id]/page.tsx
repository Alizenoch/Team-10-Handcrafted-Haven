"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${params.id}`);
      const product = await res.json();

      setTitle(product.title || "");
      setDescription(product.description || "");
      setPrice(product.price?.toString() || "");
      setImage(product.image || "");
    };

    fetchProduct();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/products/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        price: Number(price),
        image,
      }),
    });

    if (res.ok) {
      alert("Product updated successfully!");
      router.push("/dashboard/my-products");
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <main className="max-w-2xl mx-auto pt-24 px-6">
      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>
        <div>
  <label className="block mb-1 font-medium">
    Image URL
  </label>

  <input
    type="text"
    value={image}
    onChange={(e) => setImage(e.target.value)}
    className="w-full border rounded p-2"
  />
</div>

        <div>
          <label className="block mb-1 font-medium">
            Price
          </label>
          

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </main>
  );
}