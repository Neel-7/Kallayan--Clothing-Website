export type MenuSection = { heading: string; items: string[] };
export type MenuData = {
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  sections: MenuSection[];
};

export const menuData: Record<string, MenuData> = {
  Shop: {
    eyebrow: "The full edit",
    title: "Find your next heirloom",
    image: "/images/kallayani-hero.webp",
    imageAlt: "Two women wearing red and black handwoven sarees",
    sections: [
      { heading: "New & noted", items: ["New arrivals", "The Monsoon Edit", "Back in stock", "Bestsellers"] },
      { heading: "By silhouette", items: ["Sarees", "Kurta sets", "Dresses", "Jackets", "Menswear"] },
      { heading: "By occasion", items: ["Everyday ease", "Wedding guest", "Festive", "Work & travel"] },
      { heading: "Services", items: ["Blouse tailoring", "Gift notes", "Virtual styling", "Care guide"] },
    ],
  },
  Women: {
    eyebrow: "For her",
    title: "Cloth with a sense of place",
    image: "/images/bengal-edit.webp",
    imageAlt: "Woman wearing a white and red Jamdani saree",
    sections: [
      { heading: "Sarees", items: ["Jamdani", "Kanjeevaram", "Tangail", "Baluchari", "Tant", "Cotton silk"] },
      { heading: "Ready to wear", items: ["Kurta sets", "Dresses", "Blouses", "Jackets & overlays"] },
      { heading: "By craft", items: ["Handloom", "Kantha", "Batik", "Ikat", "Ajrakh"] },
      { heading: "Finishing touches", items: ["Jewelry", "Stoles", "Bags", "Gift cards"] },
    ],
  },
  Sarees: {
    eyebrow: "The saree room",
    title: "Six yards, many histories",
    image: "/images/south-edit.webp",
    imageAlt: "Woman wearing a black Kanjeevaram saree",
    sections: [
      { heading: "Bengal", items: ["Jamdani", "Tangail", "Tant", "Baluchari", "Garad"] },
      { heading: "South India", items: ["Kanjeevaram", "Chettinad cotton", "Kerala kasavu", "Mangalagiri"] },
      { heading: "By material", items: ["Cotton", "Silk", "Linen", "Cotton silk", "Tissue"] },
      { heading: "By palette", items: ["Ivory & white", "Vermilion", "Jewel tones", "Monochrome"] },
    ],
  },
  Men: {
    eyebrow: "For him",
    title: "Considered, quietly distinctive",
    image: "/images/kallayani-hero.webp",
    imageAlt: "Handwoven textile campaign",
    sections: [
      { heading: "Clothing", items: ["Kurtas", "Shirts", "Panjabis", "Dhotis", "Nehru jackets"] },
      { heading: "By fabric", items: ["Handloom cotton", "Khadi", "Silk", "Linen"] },
      { heading: "Occasion", items: ["Everyday", "Wedding", "Festive", "Gifting"] },
      { heading: "Accessories", items: ["Stoles", "Pocket squares", "Footwear", "Gift cards"] },
    ],
  },
  Collections: {
    eyebrow: "Seasonal stories",
    title: "An edit, not an algorithm",
    image: "/images/bengal-edit.webp",
    imageAlt: "Contemporary Bengali saree editorial",
    sections: [
      { heading: "Current stories", items: ["Red Earth", "White After Rain", "City Puja", "Temple Shadows"] },
      { heading: "The Kallayani edit", items: ["Modern classics", "Understated silk", "Cottons for now", "Collector pieces"] },
      { heading: "Celebrations", items: ["Durga Puja", "Onam", "Pongal", "Wedding season"] },
      { heading: "Journal", items: ["Meet the makers", "How it is woven", "Drape notes", "Textile glossary"] },
    ],
  },
  Craft: {
    eyebrow: "Know the cloth",
    title: "Made slowly. Worn often.",
    image: "/images/south-edit.webp",
    imageAlt: "Black silk saree with antique gold border",
    sections: [
      { heading: "Weaves", items: ["Jamdani", "Kanjeevaram", "Baluchari", "Tangail", "Mangalagiri"] },
      { heading: "Techniques", items: ["Kantha embroidery", "Batik", "Ikat", "Block print", "Natural dye"] },
      { heading: "Regions", items: ["West Bengal", "Tamil Nadu", "Kerala", "Andhra Pradesh"] },
      { heading: "Learn", items: ["Textile glossary", "Care & repair", "Artisan notes", "Our sourcing"] },
    ],
  },
};

export const navItems = Object.keys(menuData);
