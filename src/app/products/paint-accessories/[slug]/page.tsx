import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, ArrowRight } from "lucide-react";
import { accessoryProducts } from "@/lib/data/accessoryProducts";

const categoryData: Record<
  string,
  {
    name: string;
    title: string;
    description: string;
    longDescription: string;
    products: string[];
  }
> = {
  brushes: {
    name: "Brushes",
    title: "Paint Brushes – Professional Quality Brushes at Hat Traders",
    description:
      "Buy professional paint brushes at Hat Traders. Wide range of sizes and types for all painting applications in Pakistan.",
    longDescription:
      "Our paint brush collection includes natural bristle, synthetic and mixed-fibre brushes in all sizes. From fine detail work to broad wall coverage, we stock the right brush for every application and paint type.",
    products: [
      "Wall Brushes (2\", 3\", 4\")",
      "Cutting-In Brushes",
      "Detail & Trim Brushes",
      "Natural Bristle Brushes",
      "Synthetic Nylon Brushes",
      "Varnish & Enamel Brushes",
    ],
  },
  rollers: {
    name: "Rollers",
    title: "Paint Rollers – Smooth & Textured Rollers at Hat Traders",
    description:
      "Professional paint rollers at Hat Traders. Smooth, medium and deep-pile rollers for walls, ceilings and textured surfaces.",
    longDescription:
      "Paint rollers provide fast, even coverage for large surfaces. Our range covers smooth walls, textured finishes and stipple effects. Available in 7-inch, 9-inch and 12-inch widths with various pile lengths.",
    products: [
      "Smooth Foam Rollers",
      "Medium Pile Rollers",
      "Deep Pile Texture Rollers",
      "Mini Rollers (4\")",
      "Roller Frames & Handles",
      "Roller Extension Poles",
    ],
  },
  "deco-sets": {
    name: "Deco Sets",
    title: "Deco Sets – Complete Decorative Painting Kits",
    description:
      "Decorative painting sets at Hat Traders. Complete deco kits for creative wall finishes, patterns and texture effects.",
    longDescription:
      "Our deco sets are complete kits designed for creating beautiful decorative wall effects. Each set includes all necessary tools and materials to achieve professional-quality textures, patterns and artistic finishes.",
    products: [
      "Sponge Deco Kit",
      "Venetian Plaster Set",
      "Stucco Finish Kit",
      "Rag Rolling Set",
      "Combing & Dragging Kit",
      "Colour Wash Deco Set",
    ],
  },
  scrappers: {
    name: "Scrappers",
    title: "Scrappers & Putty Knives – Surface Prep Tools at Hat Traders",
    description:
      "Professional scrapers and putty knives at Hat Traders. Essential surface preparation tools for painting and plastering projects.",
    longDescription:
      "Quality scrapers and putty knives are essential for surface preparation before painting. Our range includes flexible filling knives, rigid scrapers, corner tools and multi-purpose spatulas for all plastering and prep work.",
    products: [
      "Flexible Filling Knives",
      "Rigid Scrapers",
      "Corner Tools",
      "Triangular Scrapers",
      "Multi-Tool Blades",
      "Wide Skimming Blades",
    ],
  },
};

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryData[slug];
  if (!cat) return { title: "Product Not Found" };
  return {
    title: cat.title,
    description: cat.description,
    alternates: {
      canonical: `https://hattraders.com/products/paint-accessories/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(categoryData).map((slug) => ({ slug }));
}

export default async function PaintAccessorySlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cat = categoryData[slug];

  if (!cat) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Not Found</h1>
        <Link href="/products/paint-accessories" className="text-orange-500 hover:underline font-semibold">
          ← Back to Paint Accessories
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 text-purple-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-4 opacity-60">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products/paint-accessories" className="hover:opacity-100">Paint Accessories</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{cat.name}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">{cat.name}</h1>
          <p className="max-w-xl leading-relaxed opacity-75">{cat.longDescription}</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Available Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {accessoryProducts.filter(p => p.category === slug).map((product) => (
              <Link
                href={`/products/paint-accessories/${slug}/${product.slug}`}
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
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 bg-purple-50 border border-purple-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-3">Need Help Choosing?</h3>
            <p className="text-gray-600 mb-6">Contact our experts for recommendations tailored to your project.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg transition-all">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+923001234567" className="inline-flex items-center gap-2 border border-orange-300 text-orange-600 hover:bg-orange-100 font-bold px-6 py-2.5 rounded-lg transition-all">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
