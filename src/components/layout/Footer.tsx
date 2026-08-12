import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Share2, Globe, MessageCircle } from "lucide-react";

const footerLinks = {
  "Decorative Paints": [
    { name: "Gobis Paints", href: "/products/decorative-paints/gobis-paints" },
    { name: "Sparco Paints", href: "/products/decorative-paints/sparco-paints" },
    { name: "Nippon Paints", href: "/products/decorative-paints/nippon-paints" },
    { name: "ICI Dulux Paints", href: "/products/decorative-paints/ici-dulux-paints" },
    { name: "Glorex Paints", href: "/products/decorative-paints/glorex-paints" },
    { name: "Spray Paints", href: "/products/decorative-paints/spray-paints" },
  ],
  "Hardware & Tools": [
    { name: "Power Tools", href: "/products/hardware-tools/power-tools" },
    { name: "Sandpapers", href: "/products/hardware-tools/sandpapers" },
    { name: "Hand Tools", href: "/products/hardware-tools/hand-tools" },
    { name: "Drill Bits", href: "/products/hardware-tools/drill-bits" },
    { name: "Grinder Discs", href: "/products/hardware-tools/grinder-discs" },
    { name: "Blades", href: "/products/hardware-tools/blades" },
  ],
  "Quick Links": [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Bluebird Arts", href: "/products/bluebird-arts" },
    { name: "Paint Accessories", href: "/products/paint-accessories" },
    { name: "Sanitary", href: "/products/sanitary" },
    { name: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-white rounded-lg p-1 overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                  <Image
                    src="/cropped-HAT-Traders-logo-.png"
                    alt="Hat Traders Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-white font-black text-xl uppercase tracking-tight">
                    Hat Traders
                  </div>
                  <div className="text-[6px] text-gray-400 uppercase tracking-widest">
                    Complete Construction Solutions
                  </div>
                </div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
              Your trusted partner for premium quality paints, hardware tools,
              sanitary ware, and all construction essentials. Serving customers
              with excellence since decades.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+923335093223"
                className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                +92 339 5566700
              </a>
              <a
                href="mailto:hat.traders.official@gmail.com"
                className="flex items-center gap-2 text-sm hover:text-orange-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-orange-500" />
                hat.traders.official@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <span>Manzoor Plaza T Chowk, near wateem hospital Rawat Islamabad</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <p>© 2026 Hat Traders. All rights reserved.</p>
            <span className="hidden sm:inline text-gray-700">|</span>
            <p>
              designed by{" "}
              <a
                href="https://sharplogicians.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-400 transition-colors font-medium"
              >
                Sharplogicians
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
