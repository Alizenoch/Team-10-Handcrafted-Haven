'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import DashboardSkeleton from '@/components/DashboardSkeleton';
import type { Product } from '@prisma/client';
import AddToCartButton from '@/components/button/addCartButton';

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const artisanId = searchParams.get('artisanId');
  const search = searchParams.get('search');
  const category = searchParams.get('category');

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        let url = '/api/products';
        if (artisanId) url += `?artisanId=${artisanId}`;
        if (search) url += artisanId ? `&search=${search}` : `?search=${search}`;
        if (category) url += (url.includes('?') ? '&' : '?') + `category=${category}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response error');

        const data = await response.json();
        const productsArray = Array.isArray(data) ? data : data.products || [];
        if (isMounted) setProducts(productsArray);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [artisanId, search, category]);

  if (loading) {
    return (
      <div className="p-6 pt-24 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6 pt-24 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          {artisanId && (
            <p className="text-sm text-gray-400 mt-1">Showing products by artisan #{artisanId}</p>
          )}
        </div>
      </div>

      {/* Back link */}
      {artisanId && (
        <div className="mb-6">
          <Link href="/artisans" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            ← Back to Artisans
          </Link>
        </div>
      )}

      {/* Empty state */}
      {products.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400 font-medium">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
                <Image
                  src={product.image || '/images/placeholder.png'}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition duration-300"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col grow">
                <h2
                  className="font-semibold text-gray-900 text-base line-clamp-1 mb-1"
                  title={product.title}
                >
                  {product.title}
                </h2>

                <p className="text-xs text-gray-400 line-clamp-2 min-h-8 mb-4">
                  {product.description || 'No description provided.'}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <p className="text-base font-bold text-gray-900 whitespace-nowrap">
                    USD {Number(product.price).toLocaleString()}
                  </p>

                  <div className="flex items-center gap-1.5 relative">
                    <AddToCartButton
                      product={{
                        id: product.id,
                        title: product.title,
                        price: Number(product.price),
                        image: product.image,
                      }}
                    />

                    <div className="relative group/details">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center justify-center w-8 h-8 bg-gray-900 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                      >
                        <ShoppingBag size={14} />
                      </Link>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[11px] font-medium bg-gray-900 text-white rounded-md whitespace-nowrap opacity-0 group-hover/details:opacity-100 transition-opacity duration-200 pointer-events-none">
                        View Details
                      </span>
                    </div>
                  </div>
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
