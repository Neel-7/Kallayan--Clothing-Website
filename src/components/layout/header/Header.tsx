import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BrandMark } from "../BrandMark";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";
import { PrimaryNav } from "./PrimaryNav";
import { primaryNavItems } from "./mega-menu-data";
import { DesktopUtilityNav, UtilityNav } from "./UtilityNav";

const OPEN_DELAY = 70;
const CLOSE_DELAY = 160;

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const menuConfig = useMemo(() => primaryNavItems.find((item) => item.id === activeMenu), [activeMenu]);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const openMenu = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (activeMenu === id) return;
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => setActiveMenu(id), OPEN_DELAY);
  };

  const closeMenu = (immediate = false) => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (immediate) setActiveMenu(null);
    else closeTimer.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY);
  };

  useEffect(() => {
    clearTimers();
    setActiveMenu(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && closeMenu(true);
    window.addEventListener("keydown", onKeyDown);
    return () => { clearTimers(); window.removeEventListener("keydown", onKeyDown); };
  }, []);

  return (
    <header
      className="site-header"
      ref={headerRef}
      onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
      onMouseLeave={() => closeMenu()}
      onBlurCapture={(event) => {
        if (!headerRef.current?.contains(event.relatedTarget as Node | null)) closeMenu();
      }}
    >
      <div className="announcement"><span>Complimentary US shipping over $150</span><span>New York appointments now open</span></div>
      <div className="header-main shell">
        <MobileNavigation />
        <DesktopUtilityNav />
        <BrandMark />
        <UtilityNav />
      </div>
      <PrimaryNav activeMenu={activeMenu} currentPath={location.pathname} onOpen={openMenu} onClose={() => closeMenu(true)} />
      {menuConfig && <MegaMenu config={menuConfig} onNavigate={() => closeMenu(true)} />}
    </header>
  );
}
