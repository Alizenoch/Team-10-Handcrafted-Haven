"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
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

    const data = await res.json();

    if (res.ok) {
      alert("Product created successfully!");
      setTitle("");
      setDescription("");
      
      setPrice("");
      setImage("");
    } else {
      alert(data.error || "Failed to create product");
    }
  };

  return (
    <main className="max-w-2xl mx-auto pt-36 px-6">
      <h1 className="text-4xl font-bold mb-8">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">
            Product Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows={4}
            required
          />
        </div>
         <div>
          <label className="block font-medium mb-1">
          Product Image
          </label>

        <input
         type="text"
         placeholder="Paste image URL"
         value={image}
         onChange={(e) => setImage(e.target.value)}
         className="w-full border rounded-lg p-2"
         />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Price
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Create Product
        </button>
      </form>
    </main>
  );
}