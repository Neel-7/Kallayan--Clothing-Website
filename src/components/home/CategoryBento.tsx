import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { collections } from "@/data/catalog";

const classNames = ["category-card--women", "category-card--men", "category-card--kids", "category-card--home", "category-card--jewellery"];

export function CategoryBento() {
  return (
    <section className="category-section shell" aria-labelledby="ways-title">
      <h2 id="ways-title" className="image-heading">
        Ways of <span className="image-heading__media"><img src="/images/jewellery-edit.webp" alt="" /></span> living
      </h2>
      <div className="category-bento">
        {collections.map((item, index) => (
          <Link key={item.slug} to={`/${item.slug}`} className={`category-card ${classNames[index]}`}>
            <img src={item.hero.src} alt={item.hero.alt} style={{ objectPosition: item.hero.position }} />
            <span>{item.name}<ArrowUpRight size={24} weight="light" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
