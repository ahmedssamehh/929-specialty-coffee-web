import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,

  images: {
    // AVIF first (~30% smaller than WebP), WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Widths actually used by the layouts' `sizes` attributes.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [64, 96, 128, 200, 256, 320, 420],
    // Optimized derivatives are immutable — cache them hard.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  experimental: {
    // Tree-shake icon/animation barrels so a single import doesn't drag the
    // whole package into the client bundle.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  compiler: {
    // Strip console.* from production while keeping errors/warnings.
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
