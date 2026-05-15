import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, ArrowRight } from "lucide-react";
import { hardwareProducts } from "@/lib/data/hardwareProducts";

const toolData: Record<string, { name: string; title: string; description: string; longDescription: string; products: string[] }> = {
  "power-tools": {
    name: "Power Tools",
    title: "Power Tools – Professional Electric Tools at Hat Traders",
    description: "Buy professional power tools at Hat Traders. Angle grinders, drills, circular saws at best prices in Pakistan.",
    longDescription: "Our power tools range covers angle grinders, rotary hammers, precision drills, circular saws and more for contractors and DIY enthusiasts.",
    products: ["Angle Grinders", "Rotary Hammer Drills", "Circular Saws", "Jigsaws", "Random Orbit Sanders", "Electric Planers"],
  },
  sandpapers: {
    name: "Sandpapers",
    title: "Sandpapers – All Grits at Hat Traders",
    description: "Professional sandpapers at Hat Traders. All grits for wood, metal and wall surfaces.",
    longDescription: "Our sandpaper range covers coarse to ultra-fine grades for hand sanding and power sanders on wood, metal and painted surfaces.",
    products: ["Coarse Grit (40-60)", "Medium Grit (80-120)", "Fine Grit (150-220)", "Ultra Fine (240-400)", "Wet & Dry Sandpaper", "Sanding Sponges"],
  },
  "hand-tools": {
    name: "Hand Tools",
    title: "Hand Tools – Professional Tool Set at Hat Traders",
    description: "Professional hand tools at Hat Traders. Hammers, spanners, pliers and measuring tools for every job.",
    longDescription: "A comprehensive hand tools range including claw hammers, adjustable spanners, pliers sets, screwdriver sets and measuring instruments.",
    products: ["Claw Hammers", "Adjustable Spanners", "Pliers Sets", "Screwdriver Sets", "Tape Measures", "Spirit Levels"],
  },
  "drill-bits": {
    name: "Drill Bits",
    title: "Drill Bits – Masonry, Wood & Metal Bits at Hat Traders",
    description: "Professional drill bits at Hat Traders. HSS, carbide and masonry drill bits in all sizes.",
    longDescription: "Our drill bits cover masonry, wood, metal, tile and glass in HSS, solid carbide and SDS-plus formats for all drill types.",
    products: ["Masonry Drill Bits", "HSS Metal Bits", "Wood Spade Bits", "SDS-Plus Bits", "Tile & Glass Bits", "Hole Saw Sets"],
  },
  "grinder-discs": {
    name: "Grinder Discs",
    title: "Grinder Discs – Cutting & Grinding Discs at Hat Traders",
    description: "Professional angle grinder discs at Hat Traders. Cutting, grinding and flap discs for metal and masonry.",
    longDescription: "Cutting discs, grinding discs, flap discs and wire brushes compatible with all major angle grinder brands for heavy-duty use.",
    products: ["Metal Cutting Discs", "Stone Cutting Discs", "Grinding Discs", "Flap Discs (40-120 Grit)", "Wire Cup Brushes", "Diamond Cutting Discs"],
  },
  blades: {
    name: "Blades",
    title: "Blades – Saw Blades & Utility Blades at Hat Traders",
    description: "Professional cutting blades at Hat Traders. Saw blades, utility and hacksaw blades for precise cuts.",
    longDescription: "TCT circular saw blades, hacksaw blades, utility knife replacements and jigsaw blades for clean cuts on wood, metal and tile.",
    products: ["TCT Circular Saw Blades", "Hacksaw Blades", "Jigsaw Blades Set", "Utility Knife Blades", "Reciprocating Saw Blades", "Diamond Tile Blades"],
  },
};

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolData[slug];
  if (!tool) return { title: "Product Not Found" };
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `https://hattraders.com/products/hardware-tools/${slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(toolData).map((slug) => ({ slug }));
}

export default async function HardwareToolSlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tool = toolData[slug];
  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Not Found</h1>
        <Link href="/products/hardware-tools" className="text-orange-500 hover:underline font-semibold">← Back to Hardware & Tools</Link>
      </div>
    );
  }
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-4 opacity-60">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products/hardware-tools" className="hover:opacity-100">Hardware & Tools</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{tool.name}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">{tool.name}</h1>
          <p className="max-w-xl leading-relaxed opacity-75">{tool.longDescription}</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Available Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hardwareProducts.filter(p => p.category === slug).map((product) => (
              <Link
                href={`/products/hardware-tools/${slug}/${product.slug}`}
                key={product.slug}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col"
              >
                <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center p-4">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      unoptimized={true}
                    />
                  ) : (
                    <div className="text-gray-400 font-medium">No Image</div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-3">Need Expert Advice?</h3>
            <p className="text-gray-600 mb-6">Our specialists will help you choose the right product.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+923335093223"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg transition-all"
              >
                <Phone className="w-4 h-4" /> Request Quote
              </a>
              <a
                href={`https://wa.me/923335093223?text=${encodeURIComponent(`Hi, I'm interested in ${tool.name} products and want to know more about the range.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-orange-300 text-orange-600 hover:bg-orange-100 font-bold px-6 py-2.5 rounded-lg transition-all"
              >
                Message Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
