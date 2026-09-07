import { useEffect, useState } from "react";
import {
  CaretDown,
  Handbag,
  HeartStraight,
  List,
  MagnifyingGlass,
  User,
} from "@phosphor-icons/react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { collections } from "@/data/catalog";
import type { RootState } from "@/store/store";
import { BrandMark } from "./BrandMark";

function IconAction({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return <button className="icon-action" aria-label={label} onClick={onClick}>{children}</button>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const bagCount = useSelector((state: RootState) => state.shop.bagCount);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className="site-header" onMouseLeave={() => setMenuOpen(false)}>
      <div className="announcement">
        <span>Complimentary US shipping over $150</span>
        <span>New York appointments now open</span>
      </div>

      <div className="header-main shell">
        <div className="mobile-only">
          <Sheet>
            <SheetTrigger asChild>
              <IconAction label="Open navigation"><List size={22} weight="light" /></IconAction>
            </SheetTrigger>
            <SheetContent side="left" className="mobile-menu">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">Browse Kallayani collections</SheetDescription>
              <BrandMark />
              <nav className="mobile-nav" aria-label="Mobile navigation">
                <NavLink to="/">New arrivals</NavLink>
                {collections.map((item) => <NavLink key={item.slug} to={`/${item.slug}`}>{item.name}</NavLink>)}
                <a href="/#craft">Craft stories</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="header-main__side header-main__side--left desktop-only">
          <button className="text-action" onClick={() => setSearchOpen(true)}><MagnifyingGlass size={18} weight="light" /> Search</button>
          <span className="header-divider" />
          <button className="text-action">USD</button>
        </div>

        <BrandMark />

        <div className="header-main__side header-main__side--right">
          <IconAction label="Search" onClick={() => setSearchOpen(true)}><MagnifyingGlass size={20} weight="light" /></IconAction>
          <IconAction label="Account"><User size={20} weight="light" /></IconAction>
          <IconAction label="Wishlist"><HeartStraight size={20} weight="light" /></IconAction>
          <IconAction label={`Shopping bag with ${bagCount} items`}>
            <Handbag size={20} weight="light" />
            {bagCount > 0 && <span className="bag-count">{bagCount}</span>}
          </IconAction>
        </div>
      </div>

      <nav className="desktop-nav desktop-only" aria-label="Primary navigation">
        <NavLink to="/">New arrivals</NavLink>
        {collections.map((item) => <NavLink key={item.slug} to={`/${item.slug}`}>{item.name}</NavLink>)}
        <button onMouseEnter={() => setMenuOpen(true)} onFocus={() => setMenuOpen(true)} aria-expanded={menuOpen}>
          Discover <CaretDown size={12} weight="bold" />
        </button>
      </nav>

      {menuOpen && (
        <div className="mega-menu">
          <div className="mega-menu__inner shell">
            <div className="mega-menu__intro">
              <p>Read the cloth</p>
              <h2>The weave is part of the design.</h2>
              <a href="/#craft">Our sourcing standard <span aria-hidden="true">→</span></a>
            </div>
            <div className="mega-menu__columns">
              {collections.map((item) => (
                <div key={item.slug}>
                  <strong>{item.name}</strong>
                  {item.subcategories.slice(0, 4).map((subcategory) => (
                    <Link key={subcategory.name} to={`/${item.slug}#shop-category`}>{subcategory.name}</Link>
                  ))}
                </div>
              ))}
            </div>
            <Link className="mega-menu__media" to="/women">
              <img src="/images/bengal-edit.webp" alt="Woman in an ivory and vermilion Jamdani saree" />
              <span>The Bengal edit <b aria-hidden="true">→</b></span>
            </Link>
          </div>
        </div>
      )}

      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="right" className="search-sheet">
          <SheetTitle>Search the collection</SheetTitle>
          <SheetDescription>Try a garment, weave, region, or technique.</SheetDescription>
          <label className="search-field">
            <MagnifyingGlass size={22} weight="light" />
            <input autoFocus placeholder="Jamdani, panjabi, wedding guest…" />
          </label>
          <div className="search-suggestions">
            <span>Suggested</span>
            {["Ivory sarees", "Indigo panjabis", "Kantha home", "Gold jewellery"].map((item) => <button key={item}>{item}<span aria-hidden="true">→</span></button>)}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
