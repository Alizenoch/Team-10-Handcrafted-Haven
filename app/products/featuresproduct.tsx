// ProductsPage.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import type { Product } from "@/types/product";

export default function FeaturesProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function FeaturesProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Network response error");
        
        const data = await response.json();
        const productsArray = Array.isArray(data) ? data : data.products || [];

        if (isMounted) setProducts(productsArray);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    FeaturesProducts();
    return () => { isMounted = false; };
  }, []);

  const getValidImage = (image: string | null) => {
    if (image?.startsWith("http") && image !== "https://...") {
      return image;
    }
    return "/images/placeholder.png";
  };

  if (loading) {
    return (
      <div className="p-6 pt-24 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6 pt-24 max-w-7xl mx-auto">
        {/* features Product page  */}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Features Products</h1>
      </div>
        {/* Product Catalog Display Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl">
          <p className="text-gray-500 font-medium">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full"
            >
              {/* Media Block */}
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={getValidImage(product.image)}
                  alt={product.name}
                  fill
                  sizes="(max-w-640px) 100vw, (max-w-1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition duration-300"
                  unoptimized
                />
              </div>

              {/* Data Content Block */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="font-semibold text-gray-900 text-base line-clamp-1 title" title={product.name}>
                    {product.name}
                  </h2>
                  {product.category && (
                    <span className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wider">
                      {product.category}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 min-h-[32px] mb-4">
                  {product.description || "No description provided."}
                </p>

                {/* Footer Control Block */}
                <div className="mt-auto pt-3 border-t flex items-center justify-between gap-2">
                  <p className="text-base font-bold text-gray-900 whitespace-nowrap">
                    KES {Number(product.price).toLocaleString()}
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-2 px-3 rounded-lg transition-colors shadow-sm active:scale-95 transform">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
