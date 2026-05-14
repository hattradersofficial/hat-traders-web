import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, Search as SearchIcon } from "lucide-react";
import { getAllProducts } from "@/lib/data/allProducts";

export const metadata: Metadata = {
  title: "Search Results | Hat Traders",
  description: "Search for premium construction materials, paints, and tools at Hat Traders.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;
  const allProducts = getAllProducts();
  
  const results = query
    ? allProducts.filter((p) =>
        p.title?.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDesc?.toLowerCase().includes(query.toLowerCase()) ||
        p.brand?.toLowerCase().includes(query.toLowerCase()) ||
        p.category?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <section className="bg-gray-50 border-b border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-4 opacity-60">
            <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Search</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900">
            {query ? `Search Results for "${query}"` : "Search Products"}
          </h1>
          <p className="text-gray-500 mt-2">
            {results.length} results found
          </p>
        </div>
      </section>

      <section className="py-20 bg-white min-h-[50vh]">
        <div className="container mx-auto px-4">
          {!query ? (
            <div className="text-center py-20">
              <SearchIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-400">Enter a keyword to search</h2>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-4">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        unoptimized={product.image.startsWith('http')}
                      />
                    ) : (
                      <div className="text-gray-400 font-medium text-xs">No Image</div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-0.5 rounded text-orange-600 uppercase tracking-wide border border-orange-100">
                      {product.brand}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 flex-grow leading-relaxed line-clamp-2">
                      {product.shortDesc}
                    </p>
                    <div className="flex items-center text-orange-600 font-bold text-xs mt-auto">
                      View Details <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
              <p className="text-gray-500 max-w-sm mx-auto">
                We couldn&apos;t find any products matching &quot;{query}&quot;. Please try different keywords.
              </p>
              <Link href="/" className="inline-block mt-8 text-orange-500 font-bold hover:underline">
                Return to Homepage
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
