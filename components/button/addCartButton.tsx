"use client";

import { useState } from "react";


type Product = {
  id: number;
  title: string;
  price: number;
  image: string | null;
};

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const [added, setAdded] = useState(false);
  

  const handleAddToCart = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-green-600 hover:bg-green-700 text-white font-medium text-xs py-2 px-3 rounded-lg transition-colors"
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}