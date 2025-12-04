import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For Cloudflare Pages compatibility
  experimental: {
    // Disable server actions for static export
  },
};

export default nextConfig;
