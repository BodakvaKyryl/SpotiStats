import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
      },
    ],
  },
};

module.exports = nextConfig;
