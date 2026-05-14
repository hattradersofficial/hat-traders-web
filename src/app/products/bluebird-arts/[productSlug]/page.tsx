import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Phone, CheckCircle2 } from "lucide-react";
import { bluebirdProducts } from "@/lib/data/bluebirdProducts";

type Params = { productSlug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = bluebirdProducts.find((p) => p.slug === productSlug);
  
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.title} - Bluebird Arts | Hat Traders`,
    description: product.shortDesc,
    alternates: {
      canonical: `https://hattraders.com/products/bluebird-arts/${productSlug}`,
    },
  };
}

export function generateStaticParams() {
  return bluebirdProducts.map((p) => ({ productSlug: p.slug }));
}

export default async function BluebirdProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { productSlug } = await params;
  const product = bluebirdProducts.find((p) => p.slug === productSlug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Product Not Found
        </h1>
        <Link
          href="/products/bluebird-arts"
          className="text-blue-600 hover:underline font-semibold"
        >
          ← Back to Bluebird Arts
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-gray-900 transition-colors">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products/bluebird-arts" className="hover:text-gray-900 transition-colors">Bluebird Arts</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900">{product.title}</span>
          </div>
        </div>
      </div>

      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-square bg-gray-50 rounded-3xl border border-gray-100 p-8 flex items-center justify-center">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-8 drop-shadow-xl"
                    unoptimized={true}
                    priority
                  />
                ) : (
                  <div className="text-gray-400 font-medium">No Image Available</div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider w-max">
                {product.category.replace('-', ' ')}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {product.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {product.longDesc}
              </p>

              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-5">Key Features</h3>
                <ul className="space-y-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a
                  href="tel:+923001234567"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5" /> Request Quote
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all"
                >
                  Message Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
