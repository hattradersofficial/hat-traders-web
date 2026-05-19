import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

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
  backgroundImage?: string;
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
  backgroundImage = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&q=80&auto=format&fit=crop",
}: ProductCategoryPageProps) {
  return (
    <>
      <PageHeader
        title={title}
        subtitle={description}
        backgroundImage={backgroundImage}
        breadcrumb={[{ label: breadcrumb, href: breadcrumbHref }]}
      />

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
