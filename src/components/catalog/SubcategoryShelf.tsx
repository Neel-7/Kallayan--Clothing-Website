import { ArrowUpRight } from "@phosphor-icons/react";
import type { Subcategory } from "@/types/catalog";

export function SubcategoryShelf({ name, items }: { name: string; items: Subcategory[] }) {
  return (
    <section className="subcategory-section shell" id="shop-category" aria-labelledby="subcategory-title">
      <p className="section-kicker">The {name} edit</p>
      <h2 id="subcategory-title" className="image-heading">Find your <span className="image-heading__media"><img src={items[0].image.src} alt="" /></span> form</h2>
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
