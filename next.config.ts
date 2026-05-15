import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for deployment on any static host / cPanel
  // Comment out the 'output' line if deploying to Vercel
  // output: "export",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alwaqaspaint.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "backiee.com",
      },
      {
        protocol: "https",
        hostname: "nelsonpaints.com",
      },
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "thestationers.pk",
      },
      {
        protocol: "https",
        hostname: "gobispaints.com",
      },
      {
        protocol: "https",
        hostname: "sparcopaints.com",
      },
      {
        protocol: "https",
        hostname: "www.dulux.com.pk",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "ideahobby.eu",
      },
      {
        protocol: "https",
        hostname: "media.fortuneindia.com",
      }
    ],
  },

  // Compress responses
  compress: true,

  // Add security and SEO headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
