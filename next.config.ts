import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // This allows images from all domains with HTTPS
      },
      {
        protocol: 'http',
        hostname: '*', // This allows images from all domains with HTTP
      },
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
