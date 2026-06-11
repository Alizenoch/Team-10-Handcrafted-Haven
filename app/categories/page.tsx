import Link from "next/link";

const categories = [
  {
    name: "Bilums",
    image: "/images/bilums.png",
  },
  {
    name: "Jewelry",
    image: "/images/jewelry.png",
  },
  {
    name: "Wood carvings",
    image: "/images/wood carvings.png",
  },
  {
    name: "Baskets",
    image: "/images/baskets.png",
  },
  {
    name: "Pottery",
    image: "/images/pottery.png",
  },
  {
    name: "Paintings",
    image: "/images/paintings.png",
  },
];

export default function CategoriesPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Categories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/products?category=${category.name}`}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}