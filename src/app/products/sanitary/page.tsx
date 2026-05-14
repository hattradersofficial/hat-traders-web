import type { Metadata } from "next";
import ProductCategoryPage from "@/components/ui/ProductCategoryPage";

export const metadata: Metadata = {
  title: "Sanitary Ware – Faisal, Porta, Sunny, Accufit & Water Tanks",
  description:
    "Premium sanitary ware at Hat Traders. Shop Faisal, Porta, Sunny, Accufit brands and water tanks for your bathroom and kitchen projects in Pakistan.",
  alternates: { canonical: "https://hattraders.com/products/sanitary" },
};

const products = [
  {
    name: "Faisal Sanitary",
    href: "/products/sanitary/faisal",
    description:
      "Faisal offers a comprehensive line of sanitary ware designed for modern bathrooms – combining elegance with durability.",
    badge: "Popular",
  },
  {
    name: "Porta Sanitary",
    href: "/products/sanitary/porta",
    description:
      "Porta's range of bathroom fixtures and fittings are crafted from premium vitreous china, offering style and longevity.",
  },
  {
    name: "Sunny Sanitary",
    href: "/products/sanitary/sunny",
    description:
      "Sunny sanitary products bring affordable quality to residential and commercial projects across Pakistan.",
  },
  {
    name: "Accufit Sanitary",
    href: "/products/sanitary/accufit",
    description:
      "Accufit delivers precision-engineered sanitary solutions with a focus on water efficiency and contemporary design.",
    badge: "New",
  },
  {
    name: "Water Tanks",
    href: "/products/sanitary/water-tanks",
    description:
      "Durable overhead and underground water storage tanks in multiple capacities – UV-resistant and built for Pakistani climate.",
    badge: "Best Seller",
  },
];

export default function SanitaryPage() {
  return (
    <ProductCategoryPage
      title="Sanitary Ware"
      subtitle="Premium Brands"
      description="Transform your bathroom and kitchen with our premium sanitary ware collection. Explore top brands offering style, durability and water efficiency for every project."
      breadcrumb="Sanitary"
      breadcrumbHref="/products/sanitary"
      products={products}
      icon="🚿"
      color="from-teal-50 to-teal-100 text-teal-900"
    />
  );
}
