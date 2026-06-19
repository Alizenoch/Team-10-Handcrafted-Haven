import Link from "next/link";

const categories = [
  { name: "Bilums", image: "/images/bilums.png" },
  { name: "Jewelry", image: "/images/jewelry.png" },
  { name: "Wood carvings", image: "/images/wood_carvings.png" },
  { name: "Baskets", image: "/images/baskets.png" },
  { name: "Pottery", image: "/images/pottery.png" },
  { name: "Paintings", image: "/images/paintings.png" },
];

export default function CategoriesPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pt-24">
      <h1 className="text-4xl font-bold text-center mb-10">Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/products?category=${category.name}`}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="w-full h-56 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Label */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
              <h2 className="text-base font-semibold text-gray-800">
                {category.name}
              </h2>
              <span className="text-xs text-indigo-500 font-medium group-hover:underline">
                Shop now →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}