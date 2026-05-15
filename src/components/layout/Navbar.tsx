"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About US", href: "/about" },
  {
    name: "Decorative Paints",
    href: "/products/decorative-paints",
    dropdown: [
      "Gobis Paints",
      "Sparco Paints",
      "Nippon Paints",
      "ICI Dulux Paints",
      "Glorex Paints",
      "Spray Paints",
    ],
  },
  { name: "Bluebird Arts", href: "/products/bluebird-arts" },
  {
    name: "Paint Accessories",
    href: "/products/paint-accessories",
    dropdown: ["Brushes", "Rollers", "Deco Sets", "Scrappers"],
  },
  {
    name: "Hardware & Tools",
    href: "/products/hardware-tools",
    dropdown: [
      "Power Tools",
      "Sandpapers",
      "Hand Tools",
      "Drill Bits",
      "Grinder Discs",
      "Blades",
    ],
  },
  {
    name: "Sanitary",
    href: "/products/sanitary",
    dropdown: ["Faisal", "Porta", "Sunny", "Accufit", "Water Tanks"],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Layer: Logo, Company Name, Search & Contact */}
      <div className="w-full border-b border-gray-50 bg-white">
        <div className="px-4 py-2 md:py-3 flex items-center justify-between gap-4 max-w-[1920px] mx-auto">
          {/* Logo & Company Info */}
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all p-1 border border-gray-50">
              <Image
                src="/cropped-HAT-Traders-logo-.png"
                alt="Hat Traders Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="ml-3 hidden sm:block">
              <div className="text-lg md:text-xl font-black text-gray-900 tracking-tighter leading-none uppercase">Hat Traders</div>
              <div className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Complete Construction Solutions</div>
            </div>
          </Link>

          {/* Search Bar (Visible on md+) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                placeholder="Search products, brands or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:border-orange-500 transition-all text-sm outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1.5 rounded-lg text-[10px] font-black hover:bg-orange-600 transition-all active:scale-95">
                SEARCH
              </button>
            </form>
          </div>

          {/* Contact Number (Visible on md+) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
              <Phone className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Call Us Now</span>
              <a href="tel:+923001234567" className="text-xs md:text-sm font-black text-gray-900 hover:text-orange-500 transition-colors tracking-tight mt-0.5">
                +92 300 123 4567
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle (Below md) */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Bottom Layer: Navigation Menus */}
      <div className="w-full bg-white shadow-sm md:block hidden">
        <nav className="flex items-center justify-center gap-1 py-0 max-w-[1920px] mx-auto">
          {navItems.map((item, idx) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "px-4 xl:px-6 py-3 text-xs xl:text-[13px] font-black text-gray-700 hover:text-orange-600 transition-all relative flex items-center gap-1.5 uppercase tracking-wide",
                  activeDropdown === item.name && "text-orange-600"
                )}
              >
                {item.name}
                {item.dropdown && (
                  <ChevronDown className={cn(
                    "w-3.5 h-3.5 transition-transform duration-300 opacity-40 group-hover:opacity-100",
                    activeDropdown === item.name && "rotate-180"
                  )} />
                )}
                {/* Active Indicator */}
                <div className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-center",
                  activeDropdown === item.name && "scale-x-100"
                )} />
              </Link>

              {/* Dropdown Menu */}
              {item.dropdown && (
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute top-full left-0 min-w-[240px] bg-white shadow-2xl rounded-b-2xl border border-gray-100 py-4 z-50 overflow-hidden"
                    >
                      <div className="grid grid-cols-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem}
                            href={`${item.href}/${subItem.toLowerCase().replace(/ /g, "-")}`}
                            className="block px-8 py-3 text-[13px] text-gray-600 hover:bg-orange-50 hover:text-orange-600 font-bold transition-all border-l-4 border-transparent hover:border-orange-500"
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Nav (Below md) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 space-y-6">
              {/* Mobile Contact Bar */}
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-bold text-gray-900">+92 300 123 4567</span>
                </div>
                <span className="text-[10px] font-black text-orange-600 uppercase">Call Now</span>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 border-none rounded-2xl text-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </form>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-50 last:border-0">
                    <div className="flex items-center justify-between py-4">
                      <Link
                        href={item.href}
                        className="text-lg font-black text-gray-900 hover:text-orange-500 transition-colors uppercase tracking-tight"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileActiveDropdown(mobileActiveDropdown === item.name ? null : item.name);
                          }}
                          className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                        >
                          <ChevronDown className={cn(
                            "w-6 h-6 transition-transform duration-300",
                            mobileActiveDropdown === item.name && "rotate-180"
                          )} />
                        </button>
                      )}
                    </div>
                    
                    {item.dropdown && (
                      <AnimatePresence>
                        {mobileActiveDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-gray-50 rounded-2xl mb-4"
                          >
                            <div className="py-2 px-4 space-y-4">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem}
                                  href={`${item.href}/${subItem.toLowerCase().replace(/ /g, "-")}`}
                                  className="block text-[15px] font-bold text-gray-600 hover:text-orange-600 transition-colors border-l-2 border-transparent hover:border-orange-500 pl-2"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
