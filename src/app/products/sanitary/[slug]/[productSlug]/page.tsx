import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, CheckCircle2 } from "lucide-react";
import { accufitProducts } from "@/lib/data/accufitProducts";
import { portaProducts } from "@/lib/data/portaProducts";
import { faisalProducts } from "@/lib/data/faisalProducts";
import { waterTanks } from "@/lib/data/waterTanks";
import { sunnyProducts } from "@/lib/data/sunnyProducts";
import ProductGallery from "@/components/ui/ProductGallery";

type Params = { slug: string; productSlug: string };

const getProductData = (brandSlug: string, productSlug: string) => {
  let products: any[] = [];
  if (brandSlug === 'accufit') products = accufitProducts;
  if (brandSlug === 'porta') products = portaProducts;
  if (brandSlug === 'faisal') products = faisalProducts;
  if (brandSlug === 'water-tanks') products = waterTanks;
  if (brandSlug === 'sunny') products = sunnyProducts;

  return products.find(p => p.slug === productSlug || p.slug === decodeURIComponent(productSlug));
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const product = getProductData(slug, productSlug);
  
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.title} | ${slug.charAt(0).toUpperCase() + slug.slice(1)} - Hat Traders`,
    description: product.longDesc || product.shortDesc,
    alternates: {
      canonical: `https://hattraders.com/products/sanitary/${slug}/${productSlug}`,
    },
  };
}

export function generateStaticParams() {
  const brands = [
    { slug: 'accufit', products: accufitProducts },
    { slug: 'porta', products: portaProducts },
    { slug: 'faisal', products: faisalProducts },
    { slug: 'water-tanks', products: waterTanks },
    { slug: 'sunny', products: sunnyProducts }
  ];

  const params: Params[] = [];

  brands.forEach(brand => {
    brand.products.forEach(product => {
      if (product && typeof product === 'object' && product.slug) {
        params.push({
          slug: brand.slug,
          productSlug: product.slug
        });
      }
    });
  });

  return params;
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { slug, productSlug } = await params;
  const product = getProductData(slug, productSlug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Product Not Found</h1>
        <Link href={`/products/sanitary/${slug}`} className="text-orange-500 hover:underline font-semibold">← Back to {slug.charAt(0).toUpperCase() + slug.slice(1)} Products</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-8 text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products/sanitary" className="hover:text-teal-600 transition-colors">Sanitary</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/products/sanitary/${slug}`} className="hover:text-teal-600 transition-colors capitalize">{slug}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{product.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-gray-100">
            {/* Image Gallery Area */}
            <div className="w-full lg:w-1/2 flex-shrink-0">
              <ProductGallery mainImage={product.image} gallery={product.gallery} title={product.title} />
            </div>

            {/* Product Details Area */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full mb-4 w-max capitalize tracking-wider">
                {slug} Authorized Dealer
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">{product.title}</h1>
              
              <div className="text-gray-600 mb-8 leading-relaxed space-y-4">
                <p className="text-lg">{product.shortDesc}</p>
                {product.longDesc && product.longDesc !== product.shortDesc && (
                  <p>{product.longDesc}</p>
                )}
              </div>

              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg border-b border-gray-100 pb-2">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+923335093223"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-600/20 hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5" /> Request Quote
                </a>
                <a
                  href={`https://wa.me/923335093223?text=${encodeURIComponent(`Hi, I'm interested in the ${product.title} (${slug.toUpperCase()}). Please provide pricing and availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  Message Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
