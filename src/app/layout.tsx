import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hattraders.com"),
  title: {
    default: "Hat Traders – Complete Construction Solutions",
    template: "%s | Hat Traders",
  },
  description:
    "Hat Traders is your one-stop shop for decorative paints, hardware & tools, sanitary ware, paint accessories and Bluebird Arts in Pakistan. Premium construction solutions delivered.",
  keywords: [
    "hat traders",
    "construction solutions",
    "decorative paints",
    "hardware tools",
    "sanitary ware",
    "Nippon paints",
    "ICI Dulux",
    "paint accessories",
  ],
  authors: [{ name: "Hat Traders" }],
  creator: "Hat Traders",
  publisher: "Hat Traders",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://hattraders.com",
    siteName: "Hat Traders",
    title: "Hat Traders – Complete Construction Solutions",
    description:
      "Your one-stop shop for decorative paints, hardware & tools, sanitary ware and paint accessories in Pakistan.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hat Traders – Complete Construction Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hat Traders – Complete Construction Solutions",
    description:
      "Your one-stop shop for decorative paints, hardware & tools, sanitary ware and paint accessories.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://hattraders.com",
  },
  icons: {
    icon: "/cropped-HAT-Traders-logo-.png",
    apple: "/cropped-HAT-Traders-logo-.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
