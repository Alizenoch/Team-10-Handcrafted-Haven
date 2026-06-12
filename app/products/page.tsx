"use client";

import Image from "next/image";
import { Suspense,useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { ProductCreateForm } from "@/components/form/ProductCreateForm";
import type { Product } from "@prisma/client";

  function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const artisanId = searchParams.get("artisanId");

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        const url = artisanId
          ? `/api/products?artisanId=${artisanId}`
          : "/api/products";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response error");

        const data = await response.json();
        const productsArray = Array.isArray(data)
          ? data
          : data.products || [];

        console.log("Products from API:", productsArray);

        if (isMounted) setProducts(productsArray);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [artisanId]);

  if (loading) {
    return (
      <div className="p-6 pt-24 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }
   const deleteProduct = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
  } catch (error) {
    console.error("Delete failed:", error);
  }
};
  return (
    <div className="p-6 pt-24 max-w-7xl mx-auto">
      {/* Header Controls */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>

          {artisanId && (
            <p className="text-sm text-gray-500 mt-1">
              Showing products by artisan #{artisanId}
            </p>
          )}

          
        </div>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className={`self-start sm:self-auto px-4 py-2 font-semibold rounded-lg text-sm transition-colors border ${
            showForm
              ? "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300"
              : "bg-blue-600 hover:bg-blue-700 text-white border-transparent"
          }`}
        >
          {showForm ? "Close Form" : "Create Product"}
        </button>
      </div>

      {/* Product Create Form */}
      {showForm && (
        <div className="mb-8">
          <ProductCreateForm setProducts={setProducts} />
        </div>
      )}

      {/* Back to Artisans link */}
      {artisanId && (
        <div className="mb-6">
          <a
            href="/artisans"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            ← Back to Artisans
          </a>
        </div>
      )}

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
                  src={product.image || "/images/placeholder.png"}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition duration-300"
                  unoptimized
                />
              </div>

              {/* Data Content Block */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2
                    className="font-semibold text-gray-900 text-base line-clamp-1"
                    title={product.title}
                  >
                    {product.title}
                  </h2>

                 
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 min-h-[32px] mb-4">
                  {product.description || "No description provided."}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-3 border-t flex items-center justify-between gap-2">
                  <p className="text-base font-bold text-gray-900 whitespace-nowrap">
                    USD {Number(product.price).toLocaleString()}
                  </p>

                  <button 
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs py-2 px-3 rounded-lg transition-colors shadow-sm active:scale-95 transform">
                    Delete
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
export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 pt-24 max-w-7xl mx-auto">
          <DashboardSkeleton />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}