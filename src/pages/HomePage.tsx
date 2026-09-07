import { ProductRail } from "@/components/catalog/ProductRail";
import { Newsletter } from "@/components/layout/Footer";
import { CategoryBento } from "@/components/home/CategoryBento";
import { CraftMarquee, CraftStory } from "@/components/home/CraftStory";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { VoiceCarousel } from "@/components/home/VoiceCarousel";
import { featuredProducts } from "@/data/catalog";

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <CategoryBento />
      <CraftMarquee />
      <ProductRail
        eyebrow="Newly arrived"
        title="Pieces worth meeting"
        products={featuredProducts}
      />
      <CraftStory />
      <VoiceCarousel />
      <Newsletter />
    </>
  );
}
