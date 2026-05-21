import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // ⭐ IMPORTANT for GitHub Pages

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],

    unoptimized: true, // ⭐ REQUIRED for static export
  },

  allowedDevOrigins: ["192.168.20.149"],
};

export default nextConfig;