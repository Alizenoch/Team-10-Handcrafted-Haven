import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/button/addCartButton";

const prisma = new PrismaClient();

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      reviews: true,
    },
  });

  if (!product) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6 pt-24">
      <Link
        href="/products"
        className="text-blue-600 hover:underline"
      >
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        <div>
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={product.title}
            width={600}
            height={600}
            className="rounded-xl w-full"
            unoptimized
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-green-700">
          USD {Number(product.price).toLocaleString()}
         </p>

         <AddToCartButton
         product={{
         id: product.id,
         title: product.title,
        price: Number(product.price),
        image: product.image,
       }}
       />

         <Link
         href={`/products/${product.id}/review`}
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
        Write a Review
       </Link>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Reviews & Ratings
        </h2>

        {product.reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet.
          </p>
        ) : (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-4"
              >
                <p className="font-semibold">
                  Rating: ⭐ {review.rating}/5
                </p>

                <p className="mt-2 text-gray-700">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}