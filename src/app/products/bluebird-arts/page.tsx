import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Palette, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Bluebird Arts – Exclusive Decorative Art Collection",
  description:
    "Discover the exclusive Bluebird Arts collection at Hat Traders. Premium decorative art materials and designs that bring creativity and elegance to every space.",
  alternates: { canonical: "https://hattraders.com/products/bluebird-arts" },
};

const artCollections = [
  {
    title: "Wall Art & Murals",
    description:
      "Transform blank walls into stunning masterpieces with our curated wall art and mural collections.",
    icon: "🖼️",
  },
  {
    title: "Decorative Textures",
    description:
      "Add depth and character to surfaces with premium textured finishes and specialty coatings.",
    icon: "✨",
  },
  {
    title: "Metallic Finishes",
    description:
      "Luxurious gold, silver and copper metallic paints and coatings for a high-end, opulent look.",
    icon: "🥇",
  },
  {
    title: "Stencil Kits",
    description:
      "Professional-grade stencils for creating consistent, beautiful patterns on walls, floors and furniture.",
    icon: "📐",
  },
  {
    title: "Faux Finish Kits",
    description:
      "Complete kits for marble, wood grain, concrete and other premium faux finish effects.",
    icon: "🎭",
  },
  {
    title: "Specialty Paints",
    description:
      "Unique specialty paints including chalkboard, magnetic, glow-in-the-dark and anti-bacterial formulas.",
    icon: "💡",
  },
];

const features = [
  "Exclusive Designs",
  "Premium Materials",
  "Expert Guidance Available",
  "Unique Collections",
];

export default function BluebirdArtsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-sky-300 text-sm font-semibold mb-6">
            <Link href="/" className="hover:text-sky-200 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Bluebird Arts</span>
          </div>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/30 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <Palette className="w-3.5 h-3.5" />
              Exclusive Collection
            </div>
            <h1 className="text-5xl lg:text-6xl font-black mb-4">
              Bluebird{" "}
              <span className="text-sky-400">Arts</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Where artistry meets architecture. The Bluebird Arts collection
              brings exclusive decorative art materials, specialty finishes and
              creative solutions to transform any space into a masterpiece.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-1.5 text-sm text-sky-200"
                >
                  <Star className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                  {f}
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-sky-500/30"
            >
              Enquire Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              Our Art Collections
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Explore the full Bluebird Arts range — each collection crafted for
              those who demand the finest in decorative design.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artCollections.map((item) => (
              <div
                key={item.title}
                className="group bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-sky-100 max-w-lg mx-auto mb-8">
            Visit our store or contact us to explore the full Bluebird Arts
            collection and get expert advice from our design team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-sky-600 hover:bg-sky-50 font-bold px-8 py-3 rounded-lg transition-all hover:-translate-y-0.5 shadow-lg"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
