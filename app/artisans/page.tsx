// app/artisans/page.tsx (Next.js 13+ with App Router)
import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function ArtisansPage() {
  // Fetch artisans with their products
  const artisans = await prisma.artisan.findMany({
    include: { products: true },
  });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Meet Our Artisans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            {artisan.image && (
              <Image
                src={artisan.image}
                alt={artisan.name}
                width={200}
                height={200}
                className="rounded-md object-cover mb-4"
              />
            )}
            <h2 className="text-xl font-semibold">{artisan.name}</h2>
            <p className="text-sm text-gray-600">{artisan.craft}</p>
            <p className="mt-2 text-gray-800">{artisan.bio}</p>

            <h3 className="mt-4 font-medium">Products:</h3>
            <ul className="list-disc list-inside text-left">
              {artisan.products.map((product) => (
                <li key={product.id}>
                  {product.title} – ${product.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
