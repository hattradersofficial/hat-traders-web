import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Product {
  name: string;
  href: string;
  description: string;
  badge?: string;
}

interface ProductCategoryPageProps {
  title: string;
  subtitle: string;
  description: string;
  breadcrumb: string;
  breadcrumbHref: string;
  products: Product[];
  icon: string;
  color: string;
}

export default function ProductCategoryPage({
  title,
  subtitle,
  description,
  breadcrumb,
  breadcrumbHref,
  products,
  icon,
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
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{icon}</span>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-1">
                {subtitle}
              </p>
              <h1 className="text-4xl lg:text-5xl font-black">{title}</h1>
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
                className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
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
