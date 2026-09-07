import { ArrowDown, ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type { Collection } from "@/types/catalog";

export function CollectionBanner({ collection }: { collection: Collection }) {
  return (
    <section className={`collection-banner collection-banner--${collection.heroAlign}`}>
      <img src={collection.hero.src} alt={collection.hero.alt} style={{ objectPosition: collection.hero.position }} />
      <div className="collection-banner__copy">
        <Link to="/" className="back-link"><ArrowLeft size={15} /> All collections</Link>
        <p className="section-kicker">Kallayani · {collection.name}</p>
        <h1>{collection.headline}</h1>
        <p>{collection.description}</p>
        <a className="solid-link" href="#shop-category">Explore the edit <ArrowDown size={16} /></a>
      </div>
    </section>
  );
}
