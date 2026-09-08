import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CollectionBanner } from "@/components/catalog/CollectionBanner";
import { ProductRail } from "@/components/catalog/ProductRail";
import { SubcategoryShelf } from "@/components/catalog/SubcategoryShelf";
import { Newsletter } from "@/components/layout/Footer";
import { collectionBySlug } from "@/data/catalog";
import { NotFoundPage } from "./NotFoundPage";

export function CollectionPage() {
  const { slug = "" } = useParams();
  const collection = collectionBySlug[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = collection ? `${collection.name} — Kallayani` : "Not found — Kallayani";
  }, [collection]);

  if (!collection) return <NotFoundPage />;

  return (
    <>
      <CollectionBanner collection={collection} />
      <SubcategoryShelf name={collection.name} items={collection.subcategories} />
      <ProductRail eyebrow={`The ${collection.name} selection`} title="Newly considered" products={collection.products} />
      <Newsletter />
    </>
  );
}
