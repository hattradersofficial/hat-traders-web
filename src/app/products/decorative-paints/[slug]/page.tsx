import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, ArrowRight } from "lucide-react";

// Sub-brand data for all decorative paint brands
const brandData: Record<
  string,
  {
    name: string;
    title: string;
    description: string;
    longDescription: string;
    products: string[];
    color: string;
  }
> = {
  "glorex-paints": {
    name: "Glorex Paints",
    title: "Glorex Paints – Vibrant Colours & Deep Coverage",
    description:
      "Glorex Paints at Hat Traders. Deep, rich colour coverage for interior and exterior walls. Affordable quality for every project.",
    longDescription:
      "Glorex Paints deliver exceptional colour depth and smooth coverage, making them a favourite for adding character and warmth to living spaces. Available in hundreds of shades with excellent tinting capacity.",
    products: [
      "Glorex Interior Matt",
      "Glorex Exterior Shield",
      "Glorex Semi-Gloss",
      "Glorex Tinted Primer",
      "Glorex Luxury Finish",
      "Glorex Anti-Mould Paint",
    ],
    color: "from-purple-50 to-pink-50 text-purple-900",
  },
};

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandData[slug];
  if (!brand) return { title: "Product Not Found" };
  return {
    title: brand.title,
    description: brand.description,
    alternates: {
      canonical: `https://hattraders.com/products/decorative-paints/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(brandData).map((slug) => ({ slug }));
}

export default async function DecorativePaintBrandPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const brand = brandData[slug];

  if (!brand) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Product Not Found
        </h1>
        <Link
          href="/products/decorative-paints"
          className="text-orange-500 hover:underline font-semibold"
        >
          ← Back to Decorative Paints
        </Link>
      </div>
    );
  }

  return (
    <>
      <section
        className={`bg-gradient-to-br ${brand.color} py-20`}
      >
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
            <span>{brand.name}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">{brand.name}</h1>
          <p className="max-w-xl leading-relaxed opacity-75">
            {brand.longDescription}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-8">
            Available Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {brand.products.map((product, i) => (
              <div
                key={product}
                className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center text-lg font-black mb-3">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{product}</h3>
                <p className="text-sm text-gray-500">
                  Premium quality {brand.name.toLowerCase()} product available
                  at Hat Traders.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-3">
              Need Expert Advice?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Our paint specialists are ready to help you choose the perfect
              product for your project. Contact us today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:++923395566700"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg transition-all"
              >
                <Phone className="w-4 h-4" /> Request Quote
              </a>
              <a
                href={`https://wa.me/+923395566700?text=${encodeURIComponent(`Hi, I'm interested in ${brand.name} products and want to know more about the range.`)}`}
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
