import { Link } from "react-router-dom";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`brand ${light ? "brand--light" : ""}`} aria-label="Kallayani home">
      <span className="brand__flower" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="brand__name">Kallayani</span>
    </Link>
  );
}
