import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { collections } from "@/data/catalog";
import type { RootState } from "@/store/store";
import { BrandMark } from "./BrandMark";

function IconAction({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return <Button variant="ghost" size="icon" className="icon-action" aria-label={label} onClick={onClick}>{children}</Button>;
}

export function Header() {
  const bagCount = useSelector((state: RootState) => state.shop.bagCount);

  return (
    <header className="site-header">
      <div className="announcement"><span>Complimentary US shipping over $150</span><span>New York appointments now open</span></div>

      <div className="header-main shell">
        <div className="mobile-only">
          <Sheet>
            <SheetTrigger asChild><IconAction label="Open navigation"><Menu size={21} /></IconAction></SheetTrigger>
            <SheetContent side="left" className="mobile-menu">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">Browse Kallayani collections</SheetDescription>
              <BrandMark />
              <nav className="mobile-nav" aria-label="Mobile navigation">
                <NavLink to="/">New arrivals</NavLink>
                {collections.map((item) => <NavLink key={item.slug} to={`/${item.slug}`}>{item.name}</NavLink>)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="header-main__side header-main__side--left desktop-only">
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" className="text-action"><Search size={17} /> Search</Button></SheetTrigger>
            <SearchPanel />
          </Sheet>
          <span className="header-divider" />
          <Button variant="ghost" className="text-action">USD</Button>
        </div>

        <BrandMark />

        <div className="header-main__side header-main__side--right">
          <Sheet>
            <SheetTrigger asChild><IconAction label="Search"><Search size={19} /></IconAction></SheetTrigger>
            <SearchPanel />
          </Sheet>
          <IconAction label="Account"><UserRound size={19} /></IconAction>
          <IconAction label="Wishlist"><Heart size={19} /></IconAction>
          <IconAction label={`Shopping bag with ${bagCount} items`}><ShoppingBag size={19} />{bagCount > 0 && <span className="bag-count">{bagCount}</span>}</IconAction>
        </div>
      </div>

      <NavigationMenu className="desktop-nav desktop-only" aria-label="Primary navigation">
        <NavigationMenuList>
          <NavigationMenuItem><NavLink to="/">New arrivals</NavLink></NavigationMenuItem>
          {collections.map((item) => <NavigationMenuItem key={item.slug}><NavLink to={`/${item.slug}`}>{item.name}</NavLink></NavigationMenuItem>)}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="mega-menu">
                <div className="mega-menu__inner shell">
                  <div className="mega-menu__intro">
                    <p>Browse the collection</p>
                    <h2>Clothing, jewellery, and home.</h2>
                    <Link to="/women">View new arrivals <span aria-hidden="true">→</span></Link>
                  </div>
                  <div className="mega-menu__columns">
                    {collections.map((item) => (
                      <div key={item.slug}>
                        <Link className="mega-menu__heading" to={`/${item.slug}`}>{item.name}</Link>
                        {item.subcategories.map((subcategory) => <Link key={subcategory.name} to={`/${item.slug}#shop-category`}>{subcategory.name}</Link>)}
                      </div>
                    ))}
                  </div>
                  <Link className="mega-menu__media" to="/women">
                    <img src="/images/bengal-edit.webp" alt="Woman in an ivory and vermilion Jamdani saree" />
                    <span>The Bengal edit <b aria-hidden="true">→</b></span>
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

function SearchPanel() {
  return (
    <SheetContent side="right" className="search-sheet">
      <SheetTitle>Search the collection</SheetTitle>
      <SheetDescription>Try a garment, weave, region, or technique.</SheetDescription>
      <label className="search-field"><Search size={21} /><input autoFocus placeholder="Jamdani, panjabi, wedding guest…" /></label>
      <div className="search-suggestions">
        <span>Suggested</span>
        {["Ivory sarees", "Indigo panjabis", "Kantha home", "Gold jewellery"].map((item) => <Button variant="ghost" key={item}>{item}<span aria-hidden="true">→</span></Button>)}
      </div>
    </SheetContent>
  );
}
