import { MetadataRoute } from "next";
import { nipponProducts } from "@/lib/data/nipponPaints";
import { gobisProducts } from "@/lib/data/gobisPaints";
import { sparcoProducts } from "@/lib/data/sparcoPaints";
import { duluxProducts } from "@/lib/data/duluxPaints";
import { sprayPaints } from "@/lib/data/sprayPaints";
import { hardwareProducts } from "@/lib/data/hardwareProducts";
import { accessoryProducts } from "@/lib/data/accessoryProducts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hattraders.com";
  const now = new Date();

  const staticPages = [
    { url: base, priority: 1.0 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/contact`, priority: 0.8 },
    { url: `${base}/privacy-policy`, priority: 0.3 },
    { url: `${base}/terms`, priority: 0.3 },
    { url: `${base}/products/decorative-paints`, priority: 0.9 },
    { url: `${base}/products/paint-accessories`, priority: 0.9 },
    { url: `${base}/products/hardware-tools`, priority: 0.9 },
    { url: `${base}/products/sanitary`, priority: 0.9 },
    { url: `${base}/products/bluebird-arts`, priority: 0.9 },
    { url: `${base}/products/decorative-paints/nippon-paints`, priority: 0.8 },
    { url: `${base}/products/decorative-paints/gobis-paints`, priority: 0.8 },
    { url: `${base}/products/decorative-paints/sparco-paints`, priority: 0.8 },
    { url: `${base}/products/decorative-paints/ici-dulux-paints`, priority: 0.8 },
  ].map((p) => ({ ...p, lastModified: now, changeFrequency: "monthly" as const }));

  const paintSlugs = ["glorex-paints", "spray-paints"];
  const accessorySlugs = ["brushes", "rollers", "deco-sets", "scrappers"];
  const toolSlugs = ["power-tools", "sandpapers", "hand-tools", "drill-bits", "grinder-discs", "blades"];
  const sanitarySlugs = ["faisal", "porta", "sunny", "accufit", "water-tanks"];

  const dynamicPages = [
    ...paintSlugs.map((s) => ({ url: `${base}/products/decorative-paints/${s}`, priority: 0.7 })),
    ...nipponProducts.map((p) => ({ url: `${base}/products/decorative-paints/nippon-paints/${p.slug}`, priority: 0.7 })),
    ...gobisProducts.map((p) => ({ url: `${base}/products/decorative-paints/gobis-paints/${p.slug}`, priority: 0.7 })),
    ...sparcoProducts.map((p) => ({ url: `${base}/products/decorative-paints/sparco-paints/${p.slug}`, priority: 0.7 })),
    ...duluxProducts.map((p) => ({ url: `${base}/products/decorative-paints/ici-dulux-paints/${p.slug}`, priority: 0.7 })),
    ...sprayPaints.map((p) => ({ url: `${base}/products/decorative-paints/spray-paints/${p.slug}`, priority: 0.7 })),
    ...accessorySlugs.map((s) => ({ url: `${base}/products/paint-accessories/${s}`, priority: 0.7 })),
    ...toolSlugs.map((s) => ({ url: `${base}/products/hardware-tools/${s}`, priority: 0.7 })),
    ...sanitarySlugs.map((s) => ({ url: `${base}/products/sanitary/${s}`, priority: 0.7 })),
    ...hardwareProducts.map((p) => ({ url: `${base}/products/hardware-tools/${p.category}/${p.slug}`, priority: 0.7 })),
    ...accessoryProducts.map((p) => ({ url: `${base}/products/paint-accessories/${p.category}/${p.slug}`, priority: 0.7 })),
  ].map((p) => ({ ...p, lastModified: now, changeFrequency: "monthly" as const }));

  return [...staticPages, ...dynamicPages];
}
