import { bluebirdProducts } from "./bluebirdProducts";
import { duluxProducts } from "./duluxPaints";
import { gobisProducts } from "./gobisPaints";
import { sparcoProducts } from "./sparcoPaints";
import { nipponProducts } from "./nipponPaints";
import { sprayPaints } from "./sprayPaints";
import { accessoryProducts } from "./accessoryProducts";
import { hardwareProducts } from "./hardwareProducts";

export interface SearchableProduct {
  title: string;
  slug: string;
  image?: string;
  shortDesc: string;
  category: string;
  href: string;
  brand: string;
}

export const getAllProducts = (): SearchableProduct[] => {
  const all: SearchableProduct[] = [];

  // Bluebird
  bluebirdProducts.forEach((p) => {
    all.push({
      ...p,
      category: (p as any).category || "bluebird-arts",
      href: `/products/bluebird-arts/${p.slug}`,
      brand: "Bluebird Arts",
    });
  });

  // Dulux
  duluxProducts.forEach((p) => {
    all.push({
      ...p,
      category: (p as any).category || "decorative-paints",
      href: `/products/decorative-paints/ici-dulux-paints/${p.slug}`,
      brand: "ICI Dulux",
    });
  });

  // Gobis
  gobisProducts.forEach((p) => {
    all.push({
      ...p,
      category: (p as any).category || "decorative-paints",
      href: `/products/decorative-paints/gobis-paints/${p.slug}`,
      brand: "Gobis Paints",
    });
  });

  // Sparco
  sparcoProducts.forEach((p) => {
    all.push({
      ...p,
      category: (p as any).category || "decorative-paints",
      href: `/products/decorative-paints/sparco-paints/${p.slug}`,
      brand: "Sparco Paints",
    });
  });

  // Nippon
  nipponProducts.forEach((p) => {
    all.push({
      ...p,
      category: (p as any).category || "decorative-paints",
      href: `/products/decorative-paints/nippon-paints/${p.slug}`,
      brand: "Nippon Paints",
    });
  });

  // Glorex
  const glorexProducts = [
    { title: "Glorex Interior Matt", slug: "glorex-interior-matt" },
    { title: "Glorex Exterior Shield", slug: "glorex-exterior-shield" },
    { title: "Glorex Semi-Gloss", slug: "glorex-semi-gloss" },
    { title: "Glorex Tinted Primer", slug: "glorex-tinted-primer" },
    { title: "Glorex Luxury Finish", slug: "glorex-luxury-finish" },
    { title: "Glorex Anti-Mould Paint", slug: "glorex-anti-mould-paint" },
  ];

  glorexProducts.forEach((p) => {
    all.push({
      title: p.title,
      slug: p.slug,
      shortDesc: "Vibrant colours and deep coverage from Glorex Paints.",
      category: "decorative-paints",
      href: `/products/decorative-paints/glorex-paints`,
      brand: "Glorex Paints",
      image: "https://alwaqaspaint.com/Group-12966.png",
    });
  });

  // Spray Paints
  sprayPaints.forEach((p) => {
    all.push({
      ...p,
      category: (p as any).category || "spray-paints",
      href: `/products/decorative-paints/spray-paints/${p.slug}`,
      brand: "Spray Paints",
    });
  });

  // Accessories
  accessoryProducts.forEach((p) => {
    all.push({
      ...p,
      category: (p as any).category || "paint-accessories",
      href: `/products/paint-accessories/${(p as any).category}/${p.slug}`,
      brand: "Paint Accessories",
    });
  });

  // Hardware
  hardwareProducts.forEach((p) => {
    all.push({
      ...p,
      category: (p as any).category || "hardware-tools",
      href: `/products/hardware-tools/${(p as any).category}/${p.slug}`,
      brand: "Hardware & Tools",
    });
  });

  // Sanitary
  const sanitaryData: Record<string, any> = {
    faisal: { name: "Faisal Sanitary", desc: "Premium bathroom fixtures." },
    porta: { name: "Porta Sanitary", desc: "Stylish bathroom solutions." },
    sunny: { name: "Sunny Sanitary", desc: "Affordable quality bathroom fixtures." },
    accufit: { name: "Accufit Sanitary", desc: "Water-efficient modern fixtures." },
    "water-tanks": { name: "Water Tanks", desc: "Overhead and underground storage tanks." },
  };

  Object.entries(sanitaryData).forEach(([slug, data]) => {
    all.push({
      title: data.name,
      slug: slug,
      shortDesc: data.desc,
      category: "sanitary",
      href: `/products/sanitary/${slug}`,
      brand: "Sanitary Ware",
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop",
    });
  });

  const uniqueProducts = Array.from(new Map(all.map((p) => [p.href, p])).values());
  return uniqueProducts;
};
