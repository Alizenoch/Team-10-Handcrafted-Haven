"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();

  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: Number(params.id),
        rating: Number(rating),
        comment,
      }),
    });

    if (res.ok) {
      alert("Review submitted successfully!");
      router.push(`/products/${params.id}`);
    } else {
      alert("Failed to submit review");
    }
  };

  return (
    <main className="max-w-2xl mx-auto pt-24 px-6">
      <h1 className="text-3xl font-bold mb-8">
        Leave a Review & Rating
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Review
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            className="w-full border rounded p-2"
            placeholder="Write your review..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Submit Review
        </button>
      </form>
    </main>
  );
}