import type { Metadata } from "next";
import ProductCategoryPage from "@/components/ui/ProductCategoryPage";

export const metadata: Metadata = {
  title: "Paint Accessories – Brushes, Rollers, Deco Sets & Scrappers",
  description:
    "Complete your painting project with Hat Traders' range of paint accessories including professional brushes, rollers, deco sets and scrappers at the best prices in Pakistan.",
  alternates: { canonical: "https://hattraders.com/products/paint-accessories" },
};

const products = [
  {
    name: "Brushes",
    href: "/products/paint-accessories/brushes",
    description:
      "High-quality paint brushes in all sizes – from fine detail brushes to wide wall brushes – for a flawless finish every time.",
    badge: "Popular",
    image: "/tools/captain-brush.webp",
  },
  {
    name: "Rollers",
    href: "/products/paint-accessories/rollers",
    description:
      "Professional paint rollers with smooth and textured options for fast, even coverage on walls and ceilings.",
    image: "/tools/UNIVERSAL-ROLLER-N-EXT-1.webp",
  },
  {
    name: "Deco Sets",
    href: "/products/paint-accessories/deco-sets",
    description:
      "Complete decorative paint sets with all the tools you need for creative patterns, textures and decorative finishes.",
    badge: "New",
    image: "/tools/istockphoto-495665869-612x612.jpg",
  },
  {
    name: "Scrappers",
    href: "/products/paint-accessories/scrappers",
    description:
      "Durable scrapers and putty knives for surface preparation, paint removal and applying fillers to walls.",
    image: "/tools/scrapper.png",
  },
];

export default function PaintAccessoriesPage() {
  return (
    <ProductCategoryPage
      title="Paint Accessories"
      subtitle="Professional Tools"
      description="A great paint job starts with the right accessories. Browse our premium selection of brushes, rollers, deco sets and scrappers to achieve professional results on every project."
      breadcrumb="Paint Accessories"
      breadcrumbHref="/products/paint-accessories"
      products={products}
      image="/tools/captain-brush.webp"
      color="from-purple-50 to-purple-100 text-purple-900"
    />
  );
}
