import type { Collection, HeroSlide, Product } from "@/types/catalog";

const media = {
  women: {
    src: "/images/bengal-edit.webp",
    alt: "Woman wearing an ivory and vermilion handwoven saree",
    position: "50% 24%",
  },
  south: {
    src: "/images/south-edit.webp",
    alt: "Woman wearing an ink-black silk saree with antique gold border",
    position: "50% 20%",
  },
  womenCampaign: {
    src: "/images/kallayani-hero.webp",
    alt: "Two women in handwoven red and black sarees in a bright colonnade",
    position: "center top",
  },
  menCampaign: {
    src: "/images/men-campaign.webp",
    alt: "Two men wearing indigo and ivory handwoven kurtas",
    position: "center top",
  },
  indigo: {
    src: "/images/men-indigo.webp",
    alt: "Man wearing a deep indigo handloom panjabi",
    position: "50% 18%",
  },
  ivory: {
    src: "/images/men-ivory.webp",
    alt: "Man wearing an ivory handloom kurta with indigo motifs",
    position: "50% 18%",
  },
  kids: {
    src: "/images/kids-edit.webp",
    alt: "Two children in vermilion and ivory festive clothing",
    position: "50% 25%",
  },
  home: {
    src: "/images/home-edit.webp",
    alt: "White bedroom layered with vermilion and ink hand-blocked textiles",
    position: "50% 60%",
  },
  jewellery: {
    src: "/images/jewellery-edit.webp",
    alt: "Handcrafted gold and garnet jewellery arranged on black silk",
    position: "center",
  },
} as const;

const product = (
  id: string,
  name: string,
  craft: string,
  region: string,
  price: number,
  image: Product["image"],
): Product => ({ id, name, craft, region, price, image });

const menProducts = [
  product("niloy-indigo", "Niloy cotton panjabi", "Handloom cotton", "Bengal", 148, media.indigo),
  product("sada-kurta", "Sada motif kurta", "Supplementary-weft cotton", "Nadia", 136, media.ivory),
  product("neel-evening", "Neel evening panjabi", "Tonal hand embroidery", "Kolkata", 172, media.indigo),
  product("kaash-kurta", "Kaash relaxed kurta", "Textured handloom", "Shantipur", 154, media.ivory),
  product("indigo-longline", "Indigo longline panjabi", "Low-impact dye", "Bengal", 188, media.indigo),
];

const womenProducts = [
  product("rakta-jamdani", "Rakta Jamdani saree", "Jamdani", "Bengal", 248, media.women),
  product("nila-kanjeevaram", "Nila Kanjeevaram saree", "Pure silk · Korvai border", "Kanchipuram", 320, media.south),
  product("sindoor-silk", "Sindoor silk saree", "Supplementary-weft silk", "Bengal", 286, media.womenCampaign),
  product("kajal-zari", "Kajal zari saree", "Kanjeevaram silk", "Tamil Nadu", 348, media.south),
  product("shada-tant", "Shada Tant saree", "Handloom cotton", "Phulia", 168, media.women),
];

const genericProducts = (prefix: string, names: string[], image: Product["image"], craft: string, region: string) =>
  names.map((name, index) => product(`${prefix}-${index}`, name, craft, region, 96 + index * 18, image));

export const heroSlides: HeroSlide[] = [
  {
    id: "bengal",
    kicker: "The Bengal edit",
    title: "Cloth with",
    italic: "a memory.",
    description: "Weightless Jamdani and luminous silk, selected for a life between places.",
    href: "/women",
    cta: "Shop the story",
    secondary: "Explore sarees",
    image: media.womenCampaign,
    align: "left",
    tone: "light",
  },
  {
    id: "men",
    kicker: "New forms for him",
    title: "Cut for",
    italic: "the present.",
    description: "Handwoven cloth, easy proportions, and detail that rewards a closer look.",
    href: "/men",
    cta: "Shop menswear",
    secondary: "Meet the makers",
    image: media.menCampaign,
    align: "right",
    tone: "light",
  },
  {
    id: "jewellery",
    kicker: "Adornment, considered",
    title: "Small objects.",
    italic: "Long stories.",
    description: "Hand-finished forms in antique gold, garnet, and pearl.",
    href: "/jewellery",
    cta: "Explore jewellery",
    secondary: "Our craft standard",
    image: media.jewellery,
    align: "left",
    tone: "dark",
  },
];

export const collections: Collection[] = [
  {
    slug: "women",
    name: "Women",
    headline: "Woven to move with you.",
    description: "Sarees and separates chosen for their clarity of craft and ease of wear.",
    hero: media.womenCampaign,
    heroAlign: "left",
    subcategories: [
      { name: "Jamdani", image: media.women },
      { name: "Kanjeevaram", image: media.south },
      { name: "Tant", image: media.women },
      { name: "Kurta sets", image: media.womenCampaign },
      { name: "Jackets", image: media.south },
    ],
    products: womenProducts,
  },
  {
    slug: "men",
    name: "Men",
    headline: "Cut for the present.",
    description: "Handwoven cloth, easy proportions, and considered detail.",
    hero: media.menCampaign,
    heroAlign: "right",
    subcategories: [
      { name: "Panjabis", image: media.indigo },
      { name: "Kurtas", image: media.ivory },
      { name: "Shirts", image: media.menCampaign },
      { name: "Jackets", image: media.indigo },
      { name: "Trousers", image: media.ivory },
    ],
    products: menProducts,
  },
  {
    slug: "kids",
    name: "Kids",
    headline: "Made for movement.",
    description: "Soft handloom cotton and celebration clothes that still feel like play.",
    hero: media.kids,
    heroAlign: "left",
    subcategories: [
      { name: "Girls", image: media.kids },
      { name: "Boys", image: media.kids },
      { name: "Festive", image: media.kids },
      { name: "Everyday", image: media.kids },
      { name: "Gifts", image: media.home },
    ],
    products: genericProducts("kids", ["Ranga cotton set", "Shada festive set", "Aalor kurta", "Khela skirt set", "Chhoto panjabi"], media.kids, "Handloom cotton", "Bengal"),
  },
  {
    slug: "home",
    name: "Home",
    headline: "Pattern, held quietly.",
    description: "Table, bed, and living textiles made to settle into a room rather than stage it.",
    hero: media.home,
    heroAlign: "right",
    subcategories: [
      { name: "Bedding", image: media.home },
      { name: "Cushions", image: media.home },
      { name: "Table", image: media.jewellery },
      { name: "Throws", image: media.home },
      { name: "Objects", image: media.jewellery },
    ],
    products: genericProducts("home", ["Kantha coverlet", "Botanical cushion", "Batik table cloth", "Block-print throw", "Brass water vessel"], media.home, "Hand block print", "Bengal"),
  },
  {
    slug: "jewellery",
    name: "Jewellery",
    headline: "Adornment with a point of view.",
    description: "Sculptural pieces shaped by regional motifs and finished by hand.",
    hero: media.jewellery,
    heroAlign: "left",
    subcategories: [
      { name: "Necklaces", image: media.jewellery },
      { name: "Earrings", image: media.jewellery },
      { name: "Bangles", image: media.jewellery },
      { name: "Rings", image: media.jewellery },
      { name: "Silver", image: media.south },
    ],
    products: genericProducts("jewel", ["Rakta collar", "Golap drops", "Temple bangle", "Kajal ring", "Moti pendant"], media.jewellery, "Hand-finished metal", "Kolkata"),
  },
];

export const collectionBySlug = Object.fromEntries(collections.map((entry) => [entry.slug, entry]));
export const featuredProducts = [...womenProducts.slice(0, 3), ...menProducts.slice(0, 3)];
