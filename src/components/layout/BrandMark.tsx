import { Link } from "react-router-dom";
import { LotusMark } from "./BrandMotif";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`brand ${light ? "brand--light" : ""}`} aria-label="Kallayani home">
      <LotusMark className="brand__lotus" aria-hidden="true" />
      <span className="brand__name">Kallayani</span>
    </Link>
  );
}
