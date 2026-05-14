import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  Truck,
  Award,
  Star,
  ChevronRight,
  Phone,
} from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";

export const metadata: Metadata = {
  title: "Hat Traders – Complete Construction Solutions in Pakistan",
  description:
    "Hat Traders offers premium decorative paints, hardware & tools, sanitary ware, paint accessories and Bluebird Arts. Your trusted partner for complete construction solutions.",
  alternates: { canonical: "https://hattraders.com" },
};

const categories = [
  {
    title: "Decorative Paints",
    href: "/products/decorative-paints",
    description:
      "Premium quality interior & exterior paints from top brands like Nippon, ICI Dulux, Gobis, Sparco and more.",
    image: "/Odourless-Air-Care.png",
    color: "from-orange-50 to-orange-100",
    border: "border-orange-200",
    brands: ["Gobis", "Nippon", "ICI Dulux", "Sparco"],
  },
  {
    title: "Hardware & Tools",
    href: "/products/hardware-tools",
    description:
      "Professional-grade power tools, hand tools, drill bits, grinder discs, sandpapers and blades.",
    image: "/tools/PT_SMT-6326_RotaryHammerDrill_600x600.webp",
    color: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    brands: ["Power Tools", "Hand Tools", "Drill Bits", "Grinder Discs"],
  },
  {
    title: "Sanitary Ware",
    href: "/products/sanitary",
    description:
      "Top-quality sanitary solutions from Faisal, Porta, Sunny, Accufit, including water tanks.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop",
    color: "from-teal-50 to-teal-100",
    border: "border-teal-200",
    brands: ["Faisal", "Porta", "Sunny", "Accufit"],
  },
  {
    title: "Paint Accessories",
    href: "/products/paint-accessories",
    description:
      "Complete range of painting accessories including brushes, rollers, deco sets and scrappers.",
    image: "/tools/captain-brush.webp",
    color: "from-purple-50 to-purple-100",
    border: "border-purple-200",
    brands: ["Brushes", "Rollers", "Deco Sets", "Scrappers"],
  },
  {
    title: "Spray Paints",
    href: "/products/decorative-paints/spray-paints",
    description:
      "Professional aerosol spray paints for automotive, industrial and decorative applications.",
    image: "/tools/Paint-Spray-Bottles.png",
    color: "from-red-50 to-red-100",
    border: "border-red-200",
    brands: ["SMT", "MUBAH", "Aerosol"],
  },
  {
    title: "Bluebird Arts",
    href: "/products/bluebird-arts",
    description:
      "Exclusive Bluebird Arts collection — crafted for those who demand excellence in design and artistry.",
    image: "https://cdn.shopify.com/s/files/1/0667/7748/1411/files/Signature-Canvas-Pad-Mockup-1.jpg",
    color: "from-sky-50 to-sky-100",
    border: "border-sky-200",
    brands: ["Exclusive Collection"],
  },
];

const features = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Quality Guaranteed",
    description:
      "Every product meets strict quality standards to ensure your project delivers lasting results.",
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery across Pakistan so your project never faces delays.",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "Trusted Brands",
    description:
      "We stock only the most reputable national and international brands in the industry.",
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: "Expert Advice",
    description:
      "Our knowledgeable team helps you choose the right products for every construction need.",
  },
];

const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Civil Contractor",
    text: "Hat Traders has been my go-to for all construction materials for over 5 years. The quality of ICI Dulux paints they stock is always genuine and prices are fair.",
    rating: 5,
  },
  {
    name: "Sara Malik",
    role: "Interior Designer",
    text: "The Bluebird Arts collection and decorative paint range at Hat Traders is incredible. They always have the latest colours and finishes I need for my clients.",
    rating: 5,
  },
  {
    name: "Imran Khan",
    role: "Hardware Store Owner",
    text: "I source all my hardware tools from Hat Traders for wholesale. Their pricing, product range and reliability is unmatched in the market.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Slideshow */}
      <HeroSection />

      <section className="py-20 bg-white" id="categories">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              Our Product Categories
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From decorative paints to heavy-duty hardware, we carry everything
              you need to bring your construction vision to life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className={`group relative bg-gradient-to-br ${cat.color} border ${cat.border} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                <div className="absolute top-4 right-4 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain"
                    unoptimized={cat.image.startsWith('http')}
                  />
                </div>
                <div className="relative w-16 h-16 mb-4 overflow-hidden rounded-xl bg-white/50 p-2 border border-white/50 group-hover:scale-110 transition-transform">
                   <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-1"
                    unoptimized={cat.image.startsWith('http')}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {cat.brands.map((b) => (
                    <span
                      key={b}
                      className="text-xs bg-white/70 text-gray-700 px-2 py-0.5 rounded-full font-medium"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-orange-500 text-sm font-bold">
                  View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              Why Choose Hat Traders?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Decades of experience, a commitment to quality, and unmatched
              customer service set us apart.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-50 text-orange-500 rounded-xl mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Trusted by contractors, designers and homeowners across Pakistan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-black mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-orange-100 max-w-xl mx-auto mb-8">
            Visit our store or contact us today. Our experts are here to help
            you choose the right products at the best prices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-3 rounded-lg transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+923001234567"
              className="inline-flex items-center gap-2 bg-orange-400/30 hover:bg-orange-400/50 border border-white/30 font-bold px-8 py-3 rounded-lg transition-all"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
