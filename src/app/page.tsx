import { HeroSection } from "@/components/sections/HeroSection";
import { RecentPostsSection } from "@/components/sections/RecentPostsSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { ProductHighlight } from "@/components/sections/ProductHighlight";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RecentPostsSection />
      <CategoriesSection />
      <ProductHighlight />
    </>
  );
}
