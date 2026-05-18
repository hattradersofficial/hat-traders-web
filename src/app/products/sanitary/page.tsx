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
    image: "https://faisalsanitary.com/wp-content/uploads/2025/08/vanity-bowl-mixer-scorpion-chrome-gold-item-9000-600x600.png",
  },
  {
    name: "Porta Sanitary",
    href: "/products/sanitary/porta",
    description:
      "Porta's range of bathroom fixtures and fittings are crafted from premium vitreous china, offering style and longevity.",
    image: "https://porta.pk/wp-content/uploads/2026/04/HD6N-800x520.jpg",
  },
  {
    name: "Sunny Sanitary",
    href: "/products/sanitary/sunny",
    description:
      "Sunny sanitary products bring affordable quality to residential and commercial projects across Pakistan.",
    image: "https://fittings.com.pk/wp-content/uploads/2025/10/xsunny_toilet_leaf.webp.pagespeed.ic.uPP2-RxgsA.webp",
  },
  {
    name: "Accufit Sanitary",
    href: "/products/sanitary/accufit",
    description:
      "Accufit delivers precision-engineered sanitary solutions with a focus on water efficiency and contemporary design.",
    badge: "New",
    image: "https://iysqidwpmfcierwdnxsp.supabase.co/storage/v1/object/public/product-images/sub/1752679369628-tso1uufpo6s.JPG",
  },
  {
    name: "Water Tanks",
    href: "/products/sanitary/water-tanks",
    description:
      "Durable overhead and underground water storage tanks in multiple capacities – UV-resistant and built for Pakistani climate.",
    badge: "Best Seller",
    image: "https://www.smartmaterials.pk/wp-content/uploads/2025/09/Master-Water-Tank-1.png",
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
      image="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop"
      color="from-teal-50 to-teal-100 text-teal-900"
    />
  );
}
