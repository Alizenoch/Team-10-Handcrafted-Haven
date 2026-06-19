import HeroSection from "@/components/herosection";
import FeaturesProductsPage from "./products/featuresproduct";

export default function Home() {
  return (
    <main>
      <HeroSection />
    <div className="container mx-auto pt-4 px-4">
      <FeaturesProductsPage />
    </div>

    </main>
  );
}