export type MediaAsset = {
  src: string;
  alt: string;
  position?: string;
};

export type Product = {
  id: string;
  name: string;
  craft: string;
  region: string;
  price: number;
  image: MediaAsset;
};

export type Subcategory = {
  name: string;
  image: MediaAsset;
};

export type Collection = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  hero: MediaAsset;
  heroAlign: "left" | "right";
  subcategories: Subcategory[];
  products: Product[];
};

export type HeroSlide = {
  id: string;
  kicker: string;
  title: string;
  italic: string;
  description: string;
  href: string;
  cta: string;
  secondary: string;
  image: MediaAsset;
  align: "left" | "right";
  tone: "light" | "dark";
};
