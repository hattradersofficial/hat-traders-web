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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW4SjZ8pXCwuVCJXaJv7HW12j4BZ_TMnnH7Q&s",
  },
  {
    name: "Sparco Paints",
    href: "/products/decorative-paints/sparco-paints",
    description:
      "Sparco Paints are formulated for superior adhesion and coverage, providing beautiful, smooth finishes for residential and commercial applications.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_eSY5gH9rWyglY8n_T89PUSx65FnowM3mw&s",
  },
  {
    name: "Nippon Paints",
    href: "/products/decorative-paints/nippon-paints",
    description:
      "Nippon Paint – Asia's leading paint brand – brings world-class quality, weather resistance and an extensive colour palette to your walls.",
    badge: "Best Seller",
    image: "https://media.licdn.com/dms/image/v2/D4D0BAQGxnRqxvRIOHA/company-logo_200_200/company-logo_200_200/0/1690881965820?e=2147483647&v=beta&t=32dxzzRy8J32dfiiO1ZkImEFz5oBbe1mZ81IHDasrfk",
  },
  {
    name: "ICI Dulux Paints",
    href: "/products/decorative-paints/ici-dulux-paints",
    description:
      "ICI Dulux is synonymous with premium quality. From washable emulsions to weathershield, Dulux paints stand the test of time and climate.",
    badge: "Premium",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Qh7h37x9u-nyKSAY7fgylmOb8N6HkqAQjQ&s",
  },
  {
    name: "Glorex Paints",
    href: "/products/decorative-paints/glorex-paints",
    description:
      "Glorex Paints provide excellent coverage and stunning colour depth, ideal for adding character and style to any living space.",
    image: "https://ideahobby.eu/userfiles/productthumbs/thumb_61176.jpg",
  },
  {
    name: "Spray Paints",
    href: "/products/decorative-paints/spray-paints",
    description:
      "Professional aerosol spray paints for automotive, industrial and decorative applications, available in a wide range of finishes and colours.",
    image: "/tools/Paint-Spray-Bottles.png",
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
      subtitle="The World's Best Paint Brands"
      description="Discover our extensive range of decorative paints from the world's most trusted brands. Whether you need interior emulsions, exterior weathershields or specialty finishes, Hat Traders has you covered."
      breadcrumb="Decorative Paints"
      breadcrumbHref="/products/decorative-paints"
      products={products}
      image="https://nipponpaint.com.pk/wp-content/uploads/2022/01/Odourless-Air-Care.png"
      color="from-orange-50 to-orange-100 text-orange-900"
      backgroundImage="https://img.magnific.com/free-vector/vibrant-colorful-dynamic-modern-fluid-wave-background_1017-39229.jpg"
    />
  );
}
