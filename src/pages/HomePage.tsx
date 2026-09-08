import { ProductRail } from "@/components/catalog/ProductRail";
import { Newsletter } from "@/components/layout/Footer";
import { CategoryBento } from "@/components/home/CategoryBento";
import { EditorialImages } from "@/components/home/EditorialImages";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BrandSignature } from "@/components/home/BrandSignature";
import { featuredProducts } from "@/data/catalog";

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <CategoryBento />
      <BrandSignature />
      <EditorialImages />
      <ProductRail
        eyebrow="Newly arrived"
        title="Pieces worth meeting"
        products={featuredProducts}
      />
      <Newsletter />
    </>
  );
}
