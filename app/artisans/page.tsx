// app/artisans/page.tsx
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function ArtisansPage() {
  // ✅ Fetch artisans only (no products)
  const artisans = await prisma.artisan.findMany();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Meet Our Artisans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            className="border rounded-xl shadow-sm p-6 bg-white hover:shadow-lg transition flex flex-col items-center text-center"
          >
            {artisan.image && (
              <Image
                src={artisan.image}
                alt={artisan.name}
                width={200}
                height={200}
                className="rounded-lg object-cover mb-4"
              />
            )}
            <h2 className="text-lg font-semibold text-gray-900">
              {artisan.name}
            </h2>
            <p className="text-sm text-blue-600 font-medium">{artisan.craft}</p>
            <p className="mt-2 text-gray-700 text-sm">{artisan.bio}</p>

            {/* 🔗 View Products Button */}
            <Link
              href={`/products?artisanId=${artisan.id}`}
              className="mt-4 inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              View Products
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
