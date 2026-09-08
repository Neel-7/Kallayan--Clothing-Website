import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Collection } from "@/types/catalog";

export function CollectionBanner({ collection }: { collection: Collection }) {
  return (
    <section className="collection-banner">
      <img src={collection.hero.src} alt={collection.hero.alt} style={{ objectPosition: collection.hero.position }} />
      <div className="collection-banner__copy">
        <h1>{collection.name}</h1>
        <p>{collection.description}</p>
        <Button asChild><a href="#shop-category">Shop now <ArrowDown size={16} /></a></Button>
      </div>
    </section>
  );
}
