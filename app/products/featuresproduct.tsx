'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import DashboardSkeleton from '@/components/DashboardSkeleton';
import type { Product } from '@prisma/client';
import AddToCartButton from '@/components/button/addCartButton';

export default function FeaturesProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function FeaturesProducts() {
      try {
        const response = await fetch('/api/products');
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

    FeaturesProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const getValidImage = (image: string | null) => {
    if (image && image.trim() !== '') return image;
    return '/images/placeholder.png';
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Featured Products</h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl">
          <p className="text-gray-500 font-medium">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products
            .filter((product) => product.image && product.image.trim() !== '')
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
                  <Image
                    src={getValidImage(product.image)}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col grow">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h2
                      className="font-semibold text-gray-900 text-base line-clamp-1"
                      title={product.title}
                    >
                      {product.title}
                    </h2>
                    {product.category && (
                      <span className="text-[11px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wider">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-2 min-h-8 mb-4">
                    {product.description || 'No description provided.'}
                  </p>

                  {/* Footer: thin blurred divider, price + button */}
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <p className="text-base font-bold text-gray-900 whitespace-nowrap">
                      USD {Number(product.price).toLocaleString()}
                    </p>
                    <AddToCartButton
                      product={{
                        id: Number(product.id),
                        title: product.title,
                        price: Number(product.price),
                        image: product.image,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
