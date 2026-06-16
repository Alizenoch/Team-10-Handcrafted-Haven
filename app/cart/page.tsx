"use client";

import { useEffect, useState } from "react";
import Image from "next/image";




type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string | null;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <main className="max-w-6xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
          <div
          key={`${item.id}-${index}`}
          className="border rounded-lg p-4 flex items-center gap-4"
           >
              
                <Image
                  src={
                    item.image ||
                    "/images/placeholder.png"
                  }
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded"
                  unoptimized
                />

                <div className="flex-grow">
                  <h2 className="font-semibold">
                    {item.title}
                  </h2>

                  <p className="text-green-700 font-bold">
                    USD {item.price.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-4">
            <h2 className="text-xl font-bold">
              Total: USD {total.toLocaleString()}
            </h2>
          </div>
        </>
      )}
    </main>
  );
}