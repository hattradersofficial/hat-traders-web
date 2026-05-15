import type { Metadata } from "next";
import ProductCategoryPage from "@/components/ui/ProductCategoryPage";

export const metadata: Metadata = {
  title: "Hardware & Tools – Power Tools, Hand Tools, Drill Bits & More",
  description:
    "Shop professional hardware and tools at Hat Traders. Power tools, sandpapers, hand tools, drill bits, grinder discs and blades for contractors and DIY enthusiasts in Pakistan.",
  alternates: { canonical: "https://hattraders.com/products/hardware-tools" },
};

const products = [
  {
    name: "Power Tools",
    href: "/products/hardware-tools/power-tools",
    description:
      "Heavy-duty electric power tools including angle grinders, drills, circular saws and more from trusted manufacturers.",
    badge: "Best Seller",
    image: "/tools/PT_SMT-6326_RotaryHammerDrill_600x600.webp",
  },
  {
    name: "Sandpapers",
    href: "/products/hardware-tools/sandpapers",
    description:
      "Wide range of sandpaper grits for wood, metal and wall surface preparation – from coarse to ultra-fine finishing grades.",
    image: "/tools/kornish-sand-paper.png",
  },
  {
    name: "Hand Tools",
    href: "/products/hardware-tools/hand-tools",
    description:
      "Complete set of professional hand tools including hammers, spanners, pliers, screwdrivers and measuring tools.",
    badge: "Popular",
    image: "/hardware/9.jpg",
  },
  {
    name: "Drill Bits",
    href: "/products/hardware-tools/drill-bits",
    description:
      "High-speed steel and tungsten carbide drill bits for masonry, wood, metal and tile – built for precision and durability.",
    image: "/hardware/21.jpg",
  },
  {
    name: "Grinder Discs",
    href: "/products/hardware-tools/grinder-discs",
    description:
      "Cutting, grinding and flap discs compatible with all major angle grinders. Heavy-duty for continuous professional use.",
    image: "/tools/SMT-steel-cutting-disc-3.2mm-1000x1269.jpg",
  },
  {
    name: "Blades",
    href: "/products/hardware-tools/blades",
    description:
      "Saw blades, utility knife blades and hacksaw blades in various sizes for precise and clean cuts on all materials.",
    image: "/hardware/19.jpg",
  },
];

export default function HardwareToolsPage() {
  return (
    <ProductCategoryPage
      title="Hardware & Tools"
      subtitle="Professional Grade"
      description="Equip yourself with the best. Our hardware and tools range covers everything from power tools to precision hand tools, so no job is too big or too small."
      breadcrumb="Hardware & Tools"
      breadcrumbHref="/products/hardware-tools"
      products={products}
      image="/tools/PT_SMT-6326_RotaryHammerDrill_600x600.webp"
      color="from-blue-50 to-blue-100 text-blue-900"
      backgroundImage="https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=1920&q=80&auto=format&fit=crop"
    />
  );
}
