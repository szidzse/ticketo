import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "neat-vulture-496.convex.cloud",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
