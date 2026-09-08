import { Heart, Search, ShoppingBag, UserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { RootState } from "@/store/store";

function IconAction({ label, children }: { label: string; children: React.ReactNode }) {
  return <Button variant="ghost" size="icon" className="icon-action" aria-label={label}>{children}</Button>;
}

export function DesktopUtilityNav() {
  return (
    <div className="header-main__side header-main__side--left desktop-only">
      <SearchSheet trigger={<Button variant="ghost" className="text-action"><Search size={17} /> Search</Button>} />
      <span className="header-divider" />
      <Button variant="ghost" className="text-action">USD</Button>
    </div>
  );
}

export function UtilityNav() {
  const bagCount = useSelector((state: RootState) => state.shop.bagCount);
  return (
    <div className="header-main__side header-main__side--right">
      <SearchSheet trigger={<IconAction label="Search"><Search size={19} /></IconAction>} />
      <IconAction label="Account"><UserRound size={19} /></IconAction>
      <IconAction label="Wishlist"><Heart size={19} /></IconAction>
      <IconAction label={`Shopping bag with ${bagCount} items`}><ShoppingBag size={19} />{bagCount > 0 && <span className="bag-count">{bagCount}</span>}</IconAction>
    </div>
  );
}

function SearchSheet({ trigger }: { trigger: React.ReactElement }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="search-sheet">
        <SheetTitle>Search the collection</SheetTitle>
        <SheetDescription>Try a garment, weave, region, or technique.</SheetDescription>
        <label className="search-field"><Search size={21} /><input autoFocus placeholder="Jamdani, panjabi, wedding guest…" /></label>
        <div className="search-suggestions">
          <span>Suggested</span>
          {["Ivory sarees", "Indigo panjabis", "Kantha home", "Gold jewellery"].map((item) => <Button variant="ghost" key={item}>{item}<span aria-hidden="true">→</span></Button>)}
        </div>
      </SheetContent>
    </Sheet>
  );
}
