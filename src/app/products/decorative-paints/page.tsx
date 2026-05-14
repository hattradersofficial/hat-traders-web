import type { Metadata } from "next";
import ProductCategoryPage from "@/components/ui/ProductCategoryPage";

export const metadata: Metadata = {
  title: "Decorative Paints – Gobis, Nippon, ICI Dulux, Sparco & More",
  description:
    "Shop premium decorative paints at Hat Traders. We stock Gobis Paints, Sparco Paints, Nippon Paints, ICI Dulux, Glorex and Spray Paints for all your interior and exterior painting needs.",
  alternates: { canonical: "https://hattraders.com/products/decorative-paints" },
};

const products = [
  {
    name: "Gobis Paints",
    href: "/products/decorative-paints/gobis-paints",
    description:
      "Gobis offers a wide range of high-coverage, durable paints perfect for interior and exterior walls, delivering vibrant and long-lasting finishes.",
    badge: "Popular",
    image: "https://gobispaints.com/wp-content/uploads/2021/04/Plastic-Emulsion-Gobis.png",
  },
  {
    name: "Sparco Paints",
    href: "/products/decorative-paints/sparco-paints",
    description:
      "Sparco Paints are formulated for superior adhesion and coverage, providing beautiful, smooth finishes for residential and commercial applications.",
    image: "https://sparcopaints.com/wp-content/uploads/2021/01/Luxury-Plastic-Emulsion-300x300.png",
  },
  {
    name: "Nippon Paints",
    href: "/products/decorative-paints/nippon-paints",
    description:
      "Nippon Paint – Asia's leading paint brand – brings world-class quality, weather resistance and an extensive colour palette to your walls.",
    badge: "Best Seller",
    image: "https://alwaqaspaint.com/odourless-aircare.png",
  },
  {
    name: "ICI Dulux Paints",
    href: "/products/decorative-paints/ici-dulux-paints",
    description:
      "ICI Dulux is synonymous with premium quality. From washable emulsions to weathershield, Dulux paints stand the test of time and climate.",
    badge: "Premium",
    image: "https://www.dulux.com.pk/content/dam/akzonobel-search/dulux/pk/en/products/dulux-better-living-air-clean-bio-based/Dulux-Better-Living-Air-Clean-Bio-based.png",
  },
  {
    name: "Glorex Paints",
    href: "/products/decorative-paints/glorex-paints",
    description:
      "Glorex Paints provide excellent coverage and stunning colour depth, ideal for adding character and style to any living space.",
    image: "https://alwaqaspaint.com/Group-12966.png",
  },
  {
    name: "Spray Paints",
    href: "/products/decorative-paints/spray-paints",
    description:
      "Professional aerosol spray paints for automotive, industrial and decorative applications, available in a wide range of finishes and colours.",
    image: "https://alwaqaspaint.com/Paint-Spray-Bottles.png",
  },
  {
    name: "Bluebird Arts",
    href: "/products/bluebird-arts",
    description:
      "Exclusive Bluebird Arts collection — professional quality acrylics, fabric paints and art accessories for creative excellence.",
    badge: "Artist Choice",
    image: "https://cdn.shopify.com/s/files/1/0667/7748/1411/files/Signature-Canvas-Pad-Mockup-1.jpg",
  },
];

export default function DecorativePaintsPage() {
  return (
    <ProductCategoryPage
      title="Decorative Paints"
      subtitle="Premium Paint Brands"
      description="Discover our extensive range of decorative paints from the world's most trusted brands. Whether you need interior emulsions, exterior weathershields or specialty finishes, Hat Traders has you covered."
      breadcrumb="Decorative Paints"
      breadcrumbHref="/products/decorative-paints"
      products={products}
      image="https://alwaqaspaint.com/odourless-aircare.png"
      color="from-orange-50 to-orange-100 text-orange-900"
    />
  );
}
