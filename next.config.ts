import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
      "avatars.githubusercontent.com",
      "media.licdn.com",
      "cdn.jsdelivr.net",
      "cdn.sanity.io",
    ],
  },
};

export default nextConfig;
