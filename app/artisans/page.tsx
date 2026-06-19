import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const prisma = new PrismaClient();

export default async function ArtisansPage() {
  const artisans = await prisma.artisan.findMany();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pt-24">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Meet Our Artisans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Image banner */}
            <div className="w-full h-48 bg-gray-50 overflow-hidden">
              {artisan.image ? (
                <Image
                  src={artisan.image}
                  alt={artisan.name}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300 text-4xl font-bold">
                  {artisan.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-indigo-500 mb-1">
                {artisan.craft}
              </span>
              <h2 className="text-base font-bold text-gray-900 mb-2">{artisan.name}</h2>
              <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed grow">
                {artisan.bio}
              </p>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <Link
                  href={`/products?artisanId=${artisan.id}`}
                  className="flex items-center justify-between text-sm font-medium text-gray-800 hover:text-indigo-500 transition-colors duration-200"
                >
                  View Products
                  <ArrowRight
                    size={15}
                    className="text-indigo-400 group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
