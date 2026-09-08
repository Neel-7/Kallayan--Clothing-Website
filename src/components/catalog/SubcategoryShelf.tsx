import { ArrowUpRight } from "lucide-react";
import type { Subcategory } from "@/types/catalog";

export function SubcategoryShelf({ name, items }: { name: string; items: Subcategory[] }) {
  return (
    <section className="subcategory-section" id="shop-category" aria-labelledby="subcategory-title">
      <div className="subcategory-section__heading"><p className="section-kicker">The {name} edit</p><h2 id="subcategory-title">Shop by category</h2></div>
      <div className="subcategory-grid">
        {items.map((item, index) => (
          <a className={`subcategory-card subcategory-card--${index + 1}`} href="#products" key={item.name}>
            <img src={item.image.src} alt={item.image.alt} style={{ objectPosition: item.image.position }} />
            <span>{item.name}<ArrowUpRight size={19} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
