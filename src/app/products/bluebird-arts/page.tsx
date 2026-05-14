import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, ArrowRight } from "lucide-react";
import { bluebirdProducts } from "@/lib/data/bluebirdProducts";

export const metadata: Metadata = {
  title: "Bluebird Arts Supplies – Professional Art Materials in Pakistan | Hat Traders",
  description:
    "Shop premium Bluebird Arts supplies at Hat Traders. Acrylic paints, fabric paints, brushes, canvas, mediums and accessories. Order online today.",
  alternates: { canonical: "https://hattraders.com/products/bluebird-arts" },
};

export default function BluebirdArtsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-indigo-50 to-blue-100 text-blue-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-4 opacity-70">
            <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/products"
              className="hover:opacity-100 transition-opacity"
            >
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Bluebird Arts</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Bluebird Arts</h1>
          <p className="max-w-xl leading-relaxed opacity-80">
            Discover a wide range of high-quality art supplies from Bluebird Arts. We offer professional-grade acrylic paints, fabric paints, chalk paints, brushes, canvas, and accessories for artists of all levels.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">
              Our Bluebird Arts Collection
            </h2>
            <div className="text-sm font-semibold text-gray-500 mt-4 md:mt-0">
              Showing {bluebirdProducts.length} products
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bluebirdProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/bluebird-arts/${product.slug}`}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-4">
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
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-2.5 py-1 rounded-md text-blue-700 uppercase tracking-wide">
                    {product.category.replace('-', ' ')}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>
                  <div className="flex items-center text-blue-600 font-bold text-sm mt-auto">
                    View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-gray-900 mb-3">
              Need Expert Advice on Art Supplies?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Our specialists are ready to help you choose the perfect
              art materials for your creative project. Contact us today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-all"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+923001234567"
                className="inline-flex items-center gap-2 border border-blue-300 text-blue-700 hover:bg-blue-100 font-bold px-6 py-3 rounded-lg transition-all"
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
