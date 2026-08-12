import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, ArrowRight } from "lucide-react";
import { portaProducts } from "@/lib/data/portaProducts";
import { faisalProducts } from "@/lib/data/faisalProducts";
import { accufitProducts } from "@/lib/data/accufitProducts";
import { waterTanks } from "@/lib/data/waterTanks";
import { sunnyProducts } from "@/lib/data/sunnyProducts";

type ProductItem = string | { title: string; image: string; shortDesc?: string; longDesc?: string; slug?: string; productDetailPage?: string };

const sanitaryData: Record<string, { name: string; title: string; description: string; longDescription: string; products: ProductItem[] }> = {
  faisal: {
    name: "Faisal Sanitary",
    title: "Faisal Sanitary Ware – Premium Bathroom Fixtures at Hat Traders",
    description: "Shop Faisal sanitary ware at Hat Traders. Modern bathroom fixtures combining elegance with durability at best prices in Pakistan.",
    longDescription: "Faisal offers a comprehensive line of sanitary ware designed for modern bathrooms. Their products combine elegant design with high-durability vitreous china for long-lasting performance.",
    products: faisalProducts,
  },
  porta: {
    name: "Porta Sanitary",
    title: "Porta Sanitary Ware – Stylish Bathroom Solutions at Hat Traders",
    description: "Buy Porta sanitary ware at Hat Traders. Premium vitreous china bathroom fixtures for style and longevity.",
    longDescription: "Porta's range of bathroom fixtures and fittings are crafted from premium vitreous china with contemporary designs that suit any modern or traditional bathroom setting.",
    products: portaProducts,
  },
  sunny: {
    name: "Sunny Sanitary",
    title: "Sunny Sanitary Ware – Affordable Quality at Hat Traders",
    description: "Sunny sanitary ware at Hat Traders. Affordable, quality bathroom fixtures for residential and commercial projects in Pakistan.",
    longDescription: "Sunny sanitary products bring affordable quality to residential and commercial projects. Reliable, durable and stylish – ideal for large-scale construction and budget-conscious projects.",
    products: sunnyProducts,
  },
  accufit: {
    name: "Accufit Sanitary",
    title: "Accufit Sanitary – Water-Efficient Modern Fixtures at Hat Traders",
    description: "Accufit sanitary ware at Hat Traders. Precision-engineered, water-efficient bathroom solutions with contemporary design.",
    longDescription: "Accufit delivers precision-engineered sanitary solutions with a focus on water efficiency and modern design. Their dual-flush systems and water-saving technology make them ideal for eco-conscious projects.",
    products: accufitProducts,
  },
  "water-tanks": {
    name: "Water Tanks",
    title: "Water Tanks – Overhead & Underground Storage Tanks at Hat Traders",
    description: "Buy water storage tanks at Hat Traders. UV-resistant overhead and underground tanks in all capacities for Pakistan's climate.",
    longDescription: "Our water tank range includes overhead plastic tanks and underground storage solutions in capacities from 200 to 5000 litres. UV-stabilised, food-grade material rated for Pakistan's extreme temperatures.",
    products: waterTanks,
  },
};

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = sanitaryData[slug];
  if (!item) return { title: "Product Not Found" };
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `https://hattraders.com/products/sanitary/${slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(sanitaryData).map((slug) => ({ slug }));
}

export default async function SanitarySlugPage({ params, searchParams }: { params: Promise<Params>; searchParams: { page?: string } }) {
  const { slug } = await params;
  const item = sanitaryData[slug];
  if (!item) {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-4xl font-black text-gray-900 mb-4">Not Found</h1>
      <Link href="/products/sanitary" className="text-orange-500 hover:underline font-semibold">← Back to Sanitary</Link>
    </div>
  );
}
  const sp = await searchParams;
  const page = Number(sp?.page) || 1;



  const perPage = 20;
  const totalPages = Math.ceil(item.products.length / perPage);
  const paginatedProducts = item.products.slice((page - 1) * perPage, page * perPage);
  return (
    <>
      <section className="bg-gradient-to-br from-teal-50 to-teal-100 text-teal-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-4 opacity-60">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products/sanitary" className="hover:opacity-100">Sanitary</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{item.name}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">{item.name}</h1>
          <p className="max-w-xl leading-relaxed opacity-75">{item.longDescription}</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Available Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          {paginatedProducts.map((product, i) => {
              if (typeof product === 'string') {
                return (
                  <div key={product} className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center text-lg font-black mb-3">{i + 1}</div>
                    <h3 className="font-bold text-gray-900 mb-1">{product}</h3>
                    <p className="text-sm text-gray-500">Available at Hat Traders – best price guaranteed.</p>
                  </div>
                );
              } else {
                return (
                  <div key={product.slug || product.title} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col group">
                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{product.shortDesc || product.longDesc || "Premium quality sanitary product."}</p>
                      {product.productDetailPage && (
                         <Link href={product.productDetailPage.startsWith('http') ? product.productDetailPage : product.productDetailPage} target={product.productDetailPage.startsWith('http') ? "_blank" : undefined} rel={product.productDetailPage.startsWith('http') ? "noopener noreferrer" : undefined} className="text-teal-600 font-bold text-sm hover:text-teal-700 flex items-center gap-1 mt-auto transition-colors">
                            View Details <ArrowRight className="w-4 h-4" />
                         </Link>
                      )}
                    </div>
                  </div>
                );
              }
            })}
                      </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <Link
                  key={idx}
                  href={`/products/sanitary/${slug}?page=${idx + 1}`}
                  className={`px-3 py-1 rounded ${idx + 1 === page ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-teal-500 hover:text-white`}
                >
                  {idx + 1}
                </Link>
              ))}
            </div>
          <div className="mt-12 bg-teal-50 border border-teal-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-3">Need More Information?</h3>
            <p className="text-gray-600 mb-6">Contact our sanitary experts for product specifications and pricing.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:++923395566700"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg transition-all"
              >
                <Phone className="w-4 h-4" /> Request Quote
              </a>
              <a
                href={`https://wa.me/+923395566700?text=${encodeURIComponent(`Hi, I'm interested in ${item.name} products and want to know more about the range.`)}`}
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
