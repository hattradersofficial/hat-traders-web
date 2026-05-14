import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Building2, Handshake, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Hat Traders – Pakistan's trusted supplier of premium construction materials, decorative paints, hardware tools and sanitary ware. Decades of experience and a commitment to quality.",
  alternates: { canonical: "https://hattraders.com/about" },
};

const stats = [
  { value: "20+", label: "Years in Business" },
  { value: "5000+", label: "Happy Customers" },
  { value: "100+", label: "Brands Stocked" },
  { value: "50+", label: "Product Categories" },
];

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Our Mission",
    description:
      "To provide every customer with the highest quality construction materials and expert guidance, making every project a success.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Customer First",
    description:
      "Our customers are the foundation of everything we do. We go above and beyond to ensure satisfaction on every order.",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Quality Assurance",
    description:
      "We source only from verified, reputable manufacturers ensuring every product meets the highest industry standards.",
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "Trusted Partnerships",
    description:
      "Our long-standing relationships with leading global brands like Nippon, ICI Dulux and more give us a competitive edge.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold mb-4">
            <Link href="/" className="hover:text-orange-300 transition-colors">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">About Hat Traders</h1>
          <p className="text-gray-300 max-w-xl leading-relaxed">
            Pakistan&apos;s complete construction solutions provider — serving
            contractors, designers and homeowners with premium materials for
            over two decades.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-500 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center text-white">
                <div className="text-4xl font-black mb-1">{s.value}</div>
                <div className="text-orange-100 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-2">
                Our Story
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
                Building Pakistan,{" "}
                <span className="text-orange-500">One Project at a Time</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Hat Traders was founded with a simple vision: to make
                  high-quality construction materials accessible to every
                  builder, contractor and homeowner in Pakistan. What started as
                  a small paint shop has grown into one of Pakistan&apos;s most
                  trusted names in complete construction solutions.
                </p>
                <p>
                  Over the years, we have expanded our product range to include
                  premium decorative paints from global leaders like Nippon, ICI
                  Dulux, Gobis and Sparco, professional-grade hardware and
                  tools, a comprehensive sanitary ware collection, and the
                  exclusive Bluebird Arts line.
                </p>
                <p>
                  Today, Hat Traders serves thousands of customers ranging from
                  individual homeowners to large-scale construction contractors,
                  providing not just products but expert consultation to ensure
                  every project exceeds expectations.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-500/25"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl relative overflow-hidden group">
                    <Image
                      src="/Odourless-Air-Care.png"
                      alt="Paints"
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl relative overflow-hidden group">
                    <Image
                      src="/tools/PT_SMT-6326_RotaryHammerDrill_600x600.webp"
                      alt="Tools"
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl relative overflow-hidden group">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0667/7748/1411/files/Signature-Canvas-Pad-Mockup-1.jpg"
                      alt="Art Supplies"
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="h-48 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl relative overflow-hidden group">
                    <Image
                      src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop"
                      alt="Sanitary Ware"
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The principles that guide every decision we make at Hat Traders.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-50 text-orange-500 rounded-xl mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
