import Image from "next/image";
import { Grid2X2Check, ShoppingCart, LucideEdit, LucidePlus } from "lucide-react";

export default function HeroSection() {
  return (
    <> 
       <section className="relative w-full min-h-[300px] overflow-hidden">
      <Image
        src="/images/hero-image.png"
        alt="Handmade products"
        fill
        className="absolute inset-0 object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[600px] items-center px-6 py-24 md:px-16">
        <div className="max-w-3xl text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-200 mb-4">
            Handmade marketplace
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Handmade with love. <br />
            Made for you.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-indigo-100 leading-relaxed max-w-2xl">
            Explore a marketplace filled with unique, handcrafted items from passionate artisans worldwide.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-xl font-medium transition">
              Shop Now
            </button>

            <button className="border border-white/70 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-medium transition">
              Explore Artisans
            </button>
          </div>
        </div>
      </div>
    </section>

  <div className="bg-white py-8">
  <div className="container mx-auto px-4">
    {/* Grid wrapper */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      
      {/* Card 1 */}
      <div className="bg-gray-100 p-2 rounded-lg shadow hover:shadow-lg transition">
        <div className="flex items-center mb-4">
          <Grid2X2Check className="text-indigo-500 mr-4" size={30} />
          <h3 className="text-lg font-semibold text-gray-800">
            100% Handmade
          </h3>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Explore a marketplace filled with unique, handcrafted items from passionate artisans worldwide.
        </p>
      </div>

      {/* Card 2 (example) */}
      <div className="bg-gray-100 p-3 rounded-lg shadow hover:shadow-lg transition">
        <div className="flex items-center mb-4">
          <ShoppingCart className="text-indigo-500 mr-4" size={30} />
          <h3 className="text-lg font-semibold text-gray-800">
            Eco-Friendly
          </h3>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Products made with sustainable materials and mindful practices.
        </p>
      </div>

      {/* Card 3 (example) */}
      <div className="bg-gray-100 p-3 rounded-lg shadow hover:shadow-lg transition">
        <div className="flex items-center mb-4">
          <LucideEdit className="text-indigo-500 mr-4" size={30} />
          <h3 className="text-lg font-semibold text-gray-800">
            Global Artisans
          </h3>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Connect with creators from diverse cultures and traditions.
        </p>
      </div>
      {/* secure payment */}
      <div className="bg-gray-100 p-3 rounded-lg shadow hover:shadow-lg transition">
        <div className="flex items-center mb-4">
          <LucidePlus className="text-indigo-500 mr-4" size={30} />
          <h3 className="text-lg font-semibold text-gray-800">
            Secure Payment
          </h3>
        </div>
        <p className="leading-relaxed">
          Trustworthy payment options to ensure a safe shopping experience.
        </p>
      </div>
    </div>
  </div>
</div>

</>
 );
}