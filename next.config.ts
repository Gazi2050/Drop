import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sgp.cloud.appwrite.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
