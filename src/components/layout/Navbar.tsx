"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X } from "lucide-react";
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

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 lg:h-32">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              {/* Simple SVG Logo representing the one in the image */}
              <div className="w-12 h-12 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-orange-500 rounded-full scale-75 opacity-20 animate-pulse" />
                <svg
                  viewBox="0 0 100 100"
                  className="w-10 h-10 text-orange-500 fill-current"
                >
                  <path d="M50 10 L10 40 L10 80 L90 80 L90 40 Z" />
                  <circle cx="50" cy="50" r="15" className="text-black" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-black uppercase leading-none">
                  Hat Traders
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                  Complete Construction Solutions
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-0">
            {navItems.map((item, idx) => (
              <div
                key={item.name}
                className="relative group flex items-center h-full"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center">
                   {idx !== 0 && <span className="text-gray-300 mx-2">|</span>}
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-semibold transition-all duration-200 border-b-2 border-transparent hover:border-black",
                      activeDropdown === item.name && "border-black"
                    )}
                  >
                    <span className="flex items-center gap-1">
                      {item.name}
                      {item.dropdown && (
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                      )}
                    </span>
                  </Link>
                </div>

                {/* Dropdown */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-100 py-2 z-50"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem}
                            href={`${item.href}/${subItem.toLowerCase().replace(/ /g, "-")}`}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black font-medium transition-colors"
                          >
                            {subItem}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center ml-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search Products"
                className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-64 text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Products"
                  className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.name} className="py-2">
                    <Link
                      href={item.href}
                      className="block text-base font-bold text-gray-800 hover:text-orange-500"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="mt-2 ml-4 space-y-2 border-l-2 border-gray-100 pl-4">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem}
                            href={`${item.href}/${subItem.toLowerCase().replace(/ /g, "-")}`}
                            className="block text-sm text-gray-500 hover:text-black"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
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
