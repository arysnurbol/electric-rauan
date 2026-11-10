import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // hide the bottom-left "N" dev badge; compile/runtime errors still surface
  devIndicators: false,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // two root layouts (ru, kk) → a single 404 needs global-not-found.tsx
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
