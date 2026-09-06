import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menuData, navItems } from "@/data/navigation";
import { addToBag, toggleWishlist, type RootState } from "@/store/store";

const products = [
  {
    id: "red-jamdani",
    name: "Rakta Jamdani Saree",
    craft: "Jamdani · Dhaka weaving tradition",
    price: "$248",
    image: "/images/bengal-edit.webp",
    position: "50% 38%",
  },
  {
    id: "black-kanjeevaram",
    name: "Nila Kanjeevaram Saree",
    craft: "Pure silk · Kanchipuram, Tamil Nadu",
    price: "$320",
    image: "/images/south-edit.webp",
    position: "50% 35%",
  },
  {
    id: "vermillion-silk",
    name: "Sindoor Silk Saree",
    craft: "Silk Jamdani · Handwoven motif",
    price: "$286",
    image: "/images/kallayani-hero.webp",
    position: "62% 46%",
  },
  {
    id: "charcoal-zari",
    name: "Kajal Zari Saree",
    craft: "Kanjeevaram silk · Korvai border",
    price: "$348",
    image: "/images/kallayani-hero.webp",
    position: "84% 44%",
  },
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      className={`brand ${light ? "brand--light" : ""}`}
      aria-label="Kallayani home"
    >
      <span className="brand__flower" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="brand__name">Kallayani</span>
      {/* <span className="brand__bengali">কল্যাণী</span> */}
    </a>
  );
}

function IconButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className="icon-button" aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const bagCount = useSelector((state: RootState) => state.shop.bagCount);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && setActiveMenu(null);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const active = activeMenu ? menuData[activeMenu] : null;

  return (
    <header className="site-header" onMouseLeave={() => setActiveMenu(null)}>
      <div className="announcement">
        <span>Complimentary US shipping over $150</span>
        <span className="announcement__story">
          Every piece includes its weave story
        </span>
      </div>
      <div className="header-main shell">
        <div className="mobile-only">
          <Sheet>
            <SheetTrigger asChild>
              <IconButton label="Open menu">
                <Menu size={21} strokeWidth={1.6} />
              </IconButton>
            </SheetTrigger>
            <SheetContent side="left" className="mobile-menu">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">
                Browse Kallayani departments and collections
              </SheetDescription>
              <BrandMark />
              <nav className="mobile-nav" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <details key={item}>
                    <summary>
                      {item}
                      <ChevronDown size={16} />
                    </summary>
                    <div className="mobile-nav__children">
                      {menuData[item].sections
                        .flatMap((section) => section.items.slice(0, 2))
                        .map((child) => (
                          <a href="#new" key={`${item}-${child}`}>
                            {child}
                          </a>
                        ))}
                    </div>
                  </details>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="header-main__side header-main__side--left desktop-only">
          <button className="text-action" onClick={() => setSearchOpen(true)}>
            <Search size={18} /> Search
          </button>
          <span className="header-divider" />
          <button className="text-action">USD</button>
        </div>
        <BrandMark />
        <div className="header-main__side header-main__side--right">
          <IconButton label="Search" onClick={() => setSearchOpen(true)}>
            <Search size={20} strokeWidth={1.5} />
          </IconButton>
          <IconButton label="Account">
            <UserRound size={20} strokeWidth={1.5} />
          </IconButton>
          <IconButton label="Wishlist">
            <Heart size={20} strokeWidth={1.5} />
          </IconButton>
          <IconButton label={`Shopping bag with ${bagCount} items`}>
            <ShoppingBag size={20} strokeWidth={1.5} />
            {bagCount > 0 && <span className="bag-count">{bagCount}</span>}
          </IconButton>
        </div>
      </div>

      <nav className="desktop-nav desktop-only" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            key={item}
            className={activeMenu === item ? "active" : ""}
            onMouseEnter={() => setActiveMenu(item)}
            onFocus={() => setActiveMenu(item)}
            aria-expanded={activeMenu === item}
          >
            {item}
          </button>
        ))}
      </nav>

      {active && (
        <motion.div
          className="mega-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mega-menu__inner shell">
            <div className="mega-menu__intro">
              <p className="eyebrow">{active.eyebrow}</p>
              <h2>{active.title}</h2>
              <a href="#new" className="arrow-link">
                Explore all <ArrowRight size={15} />
              </a>
            </div>
            <div className="mega-menu__sections">
              {active.sections.map((section) => (
                <div key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.items.map((item) => (
                    <a href="#new" key={item}>
                      {item}
                    </a>
                  ))}
                </div>
              ))}
            </div>
            <a className="mega-menu__feature" href="#stories">
              <img src={active.image} alt={active.imageAlt} />
              <span>
                Read the cloth <ArrowRight size={15} />
              </span>
            </a>
          </div>
        </motion.div>
      )}

      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="right" className="search-sheet">
          <SheetTitle>What are you looking for?</SheetTitle>
          <SheetDescription>
            Search by garment, weave, region, or technique.
          </SheetDescription>
          <label className="search-field">
            <Search size={22} />
            <input autoFocus placeholder="Try ‘Jamdani’ or ‘wedding guest’" />
          </label>
          <div className="search-suggestions">
            <span>Popular now</span>
            {["Ivory sarees", "Kanjeevaram", "Kantha jackets", "Puja edit"].map(
              (item) => (
                <button key={item}>
                  {item}
                  <ArrowRight size={15} />
                </button>
              ),
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="hero" id="top">
      <img
        className="hero__image"
        src="/images/kallayani-hero.webp"
        alt="Two women in red Jamdani and black Kanjeevaram sarees in a sunlit colonnade"
      />
      <div className="hero__shade" />
      <motion.div
        className="hero__content"
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">Bengal × South India · Edition 01</p>
        <h1>
          Woven stories.
          <br />
          <em>Made to live in.</em>
        </h1>
        <p className="hero__lede">
          <span>Heirloom handlooms,</span>
          <small>edited for a life between places.</small>
        </p>
        <div className="hero__actions">
          <Button asChild variant="inverse">
            <a href="#new">
              Shop the new edit <ArrowRight size={16} />
            </a>
          </Button>
          <a className="hero__text-link" href="#stories">
            Discover the story
          </a>
        </div>
      </motion.div>
      <a
        className="hero__scroll"
        href="#stories"
        aria-label="Scroll to our stories"
      >
        Scroll <ArrowDown size={15} />
      </a>
    </section>
  );
}

function StoryCard({
  number,
  eyebrow,
  title,
  copy,
  image,
  alt,
}: {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
}) {
  return (
    <article className="story-card">
      <a href="#new" className="story-card__image-wrap">
        <img src={image} alt={alt} />
        <span className="story-card__number">{number}</span>
        <span className="story-card__cta">
          Shop the collection <ArrowRight size={16} />
        </span>
      </a>
      <div className="story-card__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
    </article>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  const dispatch = useDispatch();
  const liked = useSelector((state: RootState) =>
    state.shop.wishlist.includes(product.id),
  );
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="product-card"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
    >
      <div className="product-card__image">
        <img
          src={product.image}
          alt={product.name}
          style={{ objectPosition: product.position }}
        />
        <button
          className={liked ? "wishlist active" : "wishlist"}
          onClick={() => dispatch(toggleWishlist(product.id))}
          aria-label={`${liked ? "Remove" : "Add"} ${product.name} ${liked ? "from" : "to"} wishlist`}
        >
          <Heart size={19} fill={liked ? "currentColor" : "none"} />
        </button>
        <button className="quick-add" onClick={() => dispatch(addToBag())}>
          Quick add
        </button>
      </div>
      <p className="product-card__craft">{product.craft}</p>
      <div className="product-card__row">
        <h3>{product.name}</h3>
        <span>{product.price}</span>
      </div>
    </motion.article>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />

        <section className="story-section shell" id="stories">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Two regions, one point of view</p>
              <h2>Shop by story</h2>
            </div>
            <p>
              Clothing chosen for the hand behind it, the place it comes from,
              and the ease with which it enters your life.
            </p>
          </div>
          <div className="story-grid">
            <StoryCard
              number="01"
              eyebrow="From Bengal"
              title="Air, light, and the loom"
              copy="Weightless Jamdani, crisp Tant, and quiet Kantha—cloth that carries its artistry lightly."
              image="/images/bengal-edit.webp"
              alt="Woman in a white and red Jamdani saree"
            />
            <StoryCard
              number="02"
              eyebrow="From the South"
              title="Silk with architecture"
              copy="Kanjeevaram, Kasavu, and Chettinad cotton—structured by temple borders and luminous color."
              image="/images/south-edit.webp"
              alt="Woman in a black Kanjeevaram saree with antique gold border"
            />
          </div>
        </section>

        <section
          className="craft-ribbon"
          aria-label="Featured textile traditions"
        >
          {[
            ["Jamdani", "Dhaka weaving tradition"],
            ["Kanjeevaram", "Kanchipuram, Tamil Nadu"],
            ["Kantha", "Bengal running stitch"],
            ["Kasavu", "Kerala gold border"],
          ].map(([name, detail], index) => (
            <div key={name}>
              <span>0{index + 1}</span>
              <strong>{name}</strong>
              <small>{detail}</small>
            </div>
          ))}
        </section>

        <section className="new-section shell" id="new">
          <div className="section-heading section-heading--line">
            <div>
              <p className="eyebrow">Just in</p>
              <h2>New heirlooms</h2>
            </div>
            <a className="arrow-link" href="#new">
              View all 24 pieces <ArrowRight size={16} />
            </a>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>

        <section className="editorial" id="journal">
          <div className="editorial__image">
            <img
              src="/images/kallayani-hero.webp"
              alt="Detail of handwoven red and black sarees"
            />
          </div>
          <div className="editorial__copy">
            <p className="eyebrow">The cloth notes · No. 01</p>
            <h2>
              Before the garment,
              <br />
              <em>there is the loom.</em>
            </h2>
            <p>
              Every Kallayani piece arrives with more than a care label. We name
              the weave, region, fiber, and technique—because provenance is part
              of the design.
            </p>
            <dl>
              <div>
                <dt>Weave</dt>
                <dd>Jamdani supplementary weft</dd>
              </div>
              <div>
                <dt>Region</dt>
                <dd>West Bengal</dd>
              </div>
              <div>
                <dt>Fiber</dt>
                <dd>Handspun cotton</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>12–18 days on the loom</dd>
              </div>
            </dl>
            <a className="arrow-link" href="#journal">
              Read the maker story <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="newsletter shell">
          <div>
            <p className="eyebrow">Notes from the loom</p>
            <h2>A slower kind of inbox.</h2>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="email">
              First access to new edits, craft stories, and private
              appointments.
            </label>
            <div className="newsletter__field">
              <input
                id="email"
                type="email"
                placeholder="Your email address"
                required
              />
              <Button type="submit">
                Join us <ArrowRight size={16} />
              </Button>
            </div>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__top shell">
          <BrandMark light />
          <p>
            Handloom clothing from Bengal and South India,
            <br />
            thoughtfully selected for life in the US.
          </p>
          <div className="footer__links">
            <a href="#new">Shipping & returns</a>
            <a href="#journal">Care guide</a>
            <a href="#journal">Our sourcing</a>
            <a href="#journal">Contact</a>
          </div>
        </div>
        <div className="footer__bottom shell">
          <span>© 2026 Kallayani</span>
          <span>New York · Kolkata · Chennai</span>
          <span>Instagram &nbsp; Pinterest</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
