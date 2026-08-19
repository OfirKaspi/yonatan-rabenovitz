import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dudwjf2pu/**",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
        pathname: "/video/**",
      },
    ],
  },
};

export default nextConfig;
