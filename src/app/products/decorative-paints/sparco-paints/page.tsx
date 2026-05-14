import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, ArrowRight } from "lucide-react";
import { sparcoProducts } from "@/lib/data/sparcoPaints";

export const metadata: Metadata = {
  title: "Sparco Paints – Superior Adhesion & Smooth Finish | Hat Traders",
  description:
    "Buy Sparco Paints at Hat Traders. Superior adhesion, smooth finish and excellent coverage for residential and commercial projects. Check our complete range.",
  alternates: { canonical: "https://hattraders.com/products/decorative-paints/sparco-paints" },
};

export default function SparcoPaintsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-red-50 to-orange-50 text-red-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-4 opacity-60">
            <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/products/decorative-paints"
              className="hover:opacity-100 transition-opacity"
            >
              Decorative Paints
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Sparco Paints</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Sparco Paints</h1>
          <p className="max-w-xl leading-relaxed opacity-75">
            Sparco Paints are engineered for superior adhesion on all surfaces, providing consistently smooth finishes whether applied by brush, roller or spray. Their advanced formula ensures maximum coverage with minimum coats.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">
            Our Sparco Paint Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sparcoProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/decorative-paints/sparco-paints/${product.slug}`}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-full h-64 bg-gray-50 flex items-center justify-center p-4">
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
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                    {product.shortDesc}
                  </p>
                  <div className="flex items-center text-red-600 font-bold text-sm mt-auto">
                    View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 bg-red-50 border border-red-100 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-gray-900 mb-3">
              Need Expert Advice on Sparco Paints?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Our paint specialists are ready to help you choose the perfect
              product for your project. Contact us today for pricing and availability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-all"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+923001234567"
                className="inline-flex items-center gap-2 border border-red-300 text-red-600 hover:bg-red-100 font-bold px-6 py-3 rounded-lg transition-all"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
