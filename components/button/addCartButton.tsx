"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string | null;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative group/btn">
      <button
        onClick={handleAddToCart}
        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 shadow-sm active:scale-95
          ${added
            ? "bg-green-500 text-white"
            : "bg-indigo-500 hover:bg-indigo-400 text-white"
          }`}
      >
        {added ? <Check size={14} /> : <ShoppingCart size={14} />}
      </button>

      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[11px] font-medium bg-gray-900 text-white rounded-md whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none">
        {added ? "Added!" : "Add to Cart"}
      </span>
    </div>
  );
}