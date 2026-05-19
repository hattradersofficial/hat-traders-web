import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Building2, Handshake, Target, MessageSquare } from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Hat Traders – Pakistan's trusted supplier of premium construction materials, decorative paints, hardware tools and sanitary ware. Decades of experience and a commitment to quality.",
  alternates: { canonical: "https://hattraders.com/about" },
};

const stats = [
  { value: "100%", label: "Genuine Products" },
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
      <PageHeader
        title="About Hat Traders"
        subtitle="Pakistan's complete construction solutions provider — serving contractors, designers and homeowners for over two decades."
        backgroundImage="https://media.fortuneindia.com/fortune-india/import/2022-06/1cb83231-d836-44d1-8209-930186557f09/paint.jpg?w=1920&auto=format,compress&q=80"
        breadcrumb={[{ label: "About Us" }]}
      />

      {/* Stats */}
      <section className="bg-orange-500 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center text-white">
                <div className="text-4xl md:text-5xl font-black mb-1 tracking-tighter">{s.value}</div>
                <div className="text-orange-100 text-[10px] md:text-xs font-black uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-orange-500 text-xs font-black uppercase tracking-[0.2em] mb-4">
                OUR JOURNEY
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
                Building Pakistan,{" "}
                <span className="text-orange-500">One Project at a Time</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-base">
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
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-xl transition-all hover:-translate-y-1 shadow-xl shadow-orange-500/20 uppercase text-xs tracking-widest"
                >
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products/decorative-paints"
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-black px-8 py-4 rounded-xl transition-all hover:-translate-y-1 shadow-xl shadow-black/10 uppercase text-xs tracking-widest"
                >
                  View Products
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-64 bg-gray-50 rounded-3xl relative overflow-hidden group border border-gray-100">
                    <Image
                      src="https://nipponpaint.com.pk/wp-content/uploads/2022/01/Odourless-Air-Care.png"
                      alt="Paints"
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="h-44 bg-gray-50 rounded-3xl relative overflow-hidden group border border-gray-100">
                    <Image
                      src="/tools/PT_SMT-6326_RotaryHammerDrill_600x600.webp"
                      alt="Tools"
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="h-44 bg-gray-50 rounded-3xl relative overflow-hidden group border border-gray-100">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0667/7748/1411/files/Signature-Canvas-Pad-Mockup-1.jpg"
                      alt="Art Supplies"
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="h-64 bg-gray-50 rounded-3xl relative overflow-hidden group border border-gray-100">
                    <Image
                      src="https://thestationers.pk/cdn/shop/products/nylon-paint-brush-set-for-base-making-6pcs-the-stationers-3.jpg?v=1708445531"
                      alt="Sanitary Ware"
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-10" />
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

      {/* Quick Support Banner */}
      <section className="pb-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Pattern Accent */}
            <div className="absolute inset-0 bg-grid-white/[0.03] -z-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />
            
            <div className="max-w-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/20 text-white px-3 py-1 rounded-full inline-block mb-4">
                FAST ESTIMATES
              </span>
              <h3 className="text-2xl lg:text-4xl font-black mb-4 leading-tight tracking-tight">
                Need a Custom Quote or Bulk Estimate?
              </h3>
              <p className="text-orange-100 text-sm lg:text-base leading-relaxed mb-8">
                Skip the waiting time! Send your list of requirements or architectural designs directly to us on WhatsApp, and our sales team will compile a customized, discounted quote for you within minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/923335093223?text=Hi%20Hat%20Traders,%20I%20need%20a%20price%20quote%20for%20a%20construction%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-black px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg uppercase text-xs tracking-widest"
                >
                  <MessageSquare className="w-4 h-4" /> Start Quick Chat
                </a>
                <a
                  href="tel:+923335093223"
                  className="inline-flex items-center gap-2 bg-orange-400/30 hover:bg-orange-400/50 border border-white/30 font-black px-8 py-4 rounded-xl transition-all uppercase text-xs tracking-widest"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
