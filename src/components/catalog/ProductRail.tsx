import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, HeartStraight, Plus } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "@/types/catalog";
import { addToBag, toggleWishlist, type RootState } from "@/store/store";

const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function ProductCard({ item }: { item: Product }) {
  const dispatch = useDispatch();
  const wished = useSelector((state: RootState) => state.shop.wishlist.includes(item.id));

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={item.image.src} alt={item.image.alt} style={{ objectPosition: item.image.position }} />
        <button
          className={`product-card__heart ${wished ? "is-active" : ""}`}
          aria-label={wished ? `Remove ${item.name} from wishlist` : `Add ${item.name} to wishlist`}
          onClick={() => dispatch(toggleWishlist(item.id))}
        >
          <HeartStraight size={20} weight={wished ? "fill" : "regular"} />
        </button>
        <button className="product-card__add" onClick={() => dispatch(addToBag())}>
          Add to bag <Plus size={16} />
        </button>
      </div>
      <div className="product-card__details">
        <div><h3>{item.name}</h3><span>{dollars.format(item.price)}</span></div>
        <p>{item.craft} · {item.region}</p>
      </div>
    </article>
  );
}

export function ProductRail({ title, eyebrow, products }: { title: string; eyebrow?: string; products: Product[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);

  const move = (direction: number) => {
    rail.current?.scrollBy({ left: direction * Math.min(window.innerWidth * 0.72, 760), behavior: "smooth" });
  };

  return (
    <section className="product-section" aria-labelledby={`rail-${title.replace(/\s/g, "-").toLowerCase()}`}>
      <div className="product-section__head shell">
        <div>
          {eyebrow && <p className="section-kicker">{eyebrow}</p>}
          <h2 id={`rail-${title.replace(/\s/g, "-").toLowerCase()}`}>{title}</h2>
        </div>
        <div className="rail-controls">
          <button onClick={() => move(-1)} aria-label="Previous products"><ArrowLeft size={20} /></button>
          <span>{String(position + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span>
          <button onClick={() => move(1)} aria-label="Next products"><ArrowRight size={20} /></button>
        </div>
      </div>
      <div
        className="product-rail"
        ref={rail}
        onScroll={(event) => {
          const element = event.currentTarget;
          const max = element.scrollWidth - element.clientWidth;
          setPosition(Math.min(products.length - 1, Math.round((element.scrollLeft / Math.max(max, 1)) * (products.length - 1))));
        }}
      >
        <span className="product-rail__spacer" aria-hidden="true" />
        {products.map((item) => <ProductCard item={item} key={item.id} />)}
        <span className="product-rail__spacer" aria-hidden="true" />
      </div>
    </section>
  );
}
