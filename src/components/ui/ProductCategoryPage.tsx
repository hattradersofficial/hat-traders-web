import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface Product {
  name: string;
  href: string;
  description: string;
  badge?: string;
  image?: string;
}

interface ProductCategoryPageProps {
  title: string;
  subtitle: string;
  description: string;
  breadcrumb: string;
  breadcrumbHref: string;
  products: Product[];
  image: string;
  color: string;
}

export default function ProductCategoryPage({
  title,
  subtitle,
  description,
  breadcrumb,
  breadcrumbHref,
  products,
  image,
  color,
}: ProductCategoryPageProps) {
  return (
    <>
      {/* Hero */}
      <section className={`bg-gradient-to-br ${color} py-20`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-4 opacity-70">
            <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={breadcrumbHref} className="hover:opacity-100 transition-opacity">
              {breadcrumb}
            </Link>
          </div>
          <div className="flex items-center gap-6 mb-4">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-white/40 backdrop-blur-sm rounded-3xl p-4 border border-white/50 shadow-xl group-hover:rotate-3 transition-transform">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain p-2"
                unoptimized={image.startsWith('http')}
              />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-1">
                {subtitle}
              </p>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight">{title}</h1>
            </div>
          </div>
          <p className="max-w-xl leading-relaxed opacity-75 mt-2">{description}</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {product.image && (
                  <div className="relative w-full h-40 mb-6 bg-gray-50 rounded-xl overflow-hidden p-4 group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      unoptimized={product.image.startsWith('http')}
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h2>
                  {product.badge && (
                    <span className="text-xs bg-orange-50 text-orange-500 border border-orange-200 px-2 py-0.5 rounded-full font-semibold shrink-0 ml-2">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="flex items-center gap-1 text-orange-500 text-sm font-bold">
                  View Products{" "}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link
              href="/contact"
              className="text-orange-500 hover:text-orange-600 font-bold"
            >
              Contact our team
            </Link>{" "}
            for personalised assistance.
          </p>
        </div>
      </section>
    </>
  );
}
