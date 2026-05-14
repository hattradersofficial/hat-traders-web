"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1920&q=80&auto=format&fit=crop",
    badge: "Decorative Paints",
    heading: "Transform Your Walls with Premium Paints",
    sub: "Gobis, Nippon, ICI Dulux, Sparco, Glorex & more — every shade, every finish.",
    cta: { label: "Shop Paints", href: "/products/decorative-paints" },
    accent: "from-orange-600 to-amber-500",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1920&q=80&auto=format&fit=crop",
    badge: "Hardware & Tools",
    heading: "Professional Tools for Every Job",
    sub: "Power tools, hand tools, drill bits, grinder discs and blades for contractors & DIY.",
    cta: { label: "Shop Tools", href: "/products/hardware-tools" },
    accent: "from-blue-600 to-cyan-500",
  },
  {
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1920&q=80&auto=format&fit=crop",
    badge: "Sanitary Ware",
    heading: "Premium Sanitary Solutions",
    sub: "Faisal, Porta, Sunny, Accufit and water tanks — style meets durability.",
    cta: { label: "Shop Sanitary", href: "/products/sanitary" },
    accent: "from-teal-600 to-emerald-500",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1920&q=80&auto=format&fit=crop",
    badge: "Paint Accessories",
    heading: "The Right Accessories for a Perfect Finish",
    sub: "Brushes, rollers, deco sets and scrappers — everything the professional painter needs.",
    cta: { label: "Shop Accessories", href: "/products/paint-accessories" },
    accent: "from-purple-600 to-violet-500",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1920&q=80&auto=format&fit=crop",
    badge: "Bluebird Arts",
    heading: "Where Artistry Meets Architecture",
    sub: "Exclusive decorative art collections, metallic finishes and specialty paints.",
    cta: { label: "Explore Arts", href: "/products/bluebird-arts" },
    accent: "from-sky-600 to-indigo-500",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "92vh", minHeight: 520, maxHeight: 800 }}>
      {/* Background Images — all pre-loaded, only active one is visible */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt={s.badge}
            className="w-full h-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div
            className="max-w-2xl transition-all duration-500"
            style={{ opacity: isAnimating ? 0 : 1, transform: isAnimating ? "translateY(12px)" : "translateY(0)" }}
          >
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${slide.accent} text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest shadow-lg`}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {slide.badge}
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 text-balance drop-shadow-lg">
              {slide.heading}
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-8 max-w-lg drop-shadow">
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={slide.cta.href}
                className={`inline-flex items-center gap-2 bg-gradient-to-r ${slide.accent} hover:opacity-90 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-xl hover:-translate-y-0.5`}
              >
                {slide.cta.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200"
              >
                <Phone className="w-4 h-4" /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Counter & Arrows */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-7 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right-side slide thumbnails (desktop only) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-2">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${s.badge}`}
            className={`group flex items-center gap-2 transition-all duration-300 ${
              i === current ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            <span
              className={`text-white text-xs font-semibold transition-all duration-300 ${
                i === current ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.badge}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? `w-1.5 h-8 bg-gradient-to-b ${s.accent}`
                  : "w-1 h-4 bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <div
          key={current}
          className={`h-full bg-gradient-to-r ${slide.accent}`}
          style={{
            animation: "progress 5s linear",
            width: "100%",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </section>
  );
}
