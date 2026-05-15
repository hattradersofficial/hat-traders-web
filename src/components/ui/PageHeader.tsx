"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  breadcrumb?: { label: string; href?: string }[];
}

export default function PageHeader({ title, subtitle, backgroundImage, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative h-[300px] md:h-[400px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="container mx-auto px-4 relative z-10 text-white">
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="flex items-center gap-2 text-orange-400 text-xs md:text-sm font-black uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-orange-300 transition-colors">Home</Link>
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="opacity-50">/</span>
                {item.href ? (
                  <Link href={item.href} className="hover:text-orange-300 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Title & Subtitle */}
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-none uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-200 max-w-2xl text-base md:text-xl leading-relaxed font-medium drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
