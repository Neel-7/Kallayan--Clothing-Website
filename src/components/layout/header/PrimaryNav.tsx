import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { primaryNavItems } from "./mega-menu-data";

type PrimaryNavProps = {
  activeMenu: string | null;
  currentPath: string;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export function PrimaryNav({ activeMenu, currentPath, onOpen, onClose }: PrimaryNavProps) {
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number, id: string) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      buttons.current[(index + step + primaryNavItems.length) % primaryNavItems.length]?.focus();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      onOpen(id);
      window.requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>(`#mega-menu-${id} [role='menuitem']`)?.focus());
    }
    if (event.key === "Escape") onClose();
  };

  return (
    <nav className="primary-nav desktop-only" aria-label="Primary navigation">
      <ul>
        {primaryNavItems.map((item, index) => {
          const isOpen = activeMenu === item.id;
          const isCurrent = item.viewAllHref !== "/" && currentPath.startsWith(item.viewAllHref);
          return (
            <li key={item.id}>
              <button
                ref={(element) => { buttons.current[index] = element; }}
                className={`${isOpen ? "is-open" : ""} ${isCurrent ? "is-current" : ""}`}
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={`mega-menu-${item.id}`}
                onMouseEnter={() => onOpen(item.id)}
                onFocus={() => onOpen(item.id)}
                onClick={() => isOpen ? onClose() : onOpen(item.id)}
                onKeyDown={(event) => handleKeyDown(event, index, item.id)}
              >
                {item.label}<ChevronDown size={12} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
