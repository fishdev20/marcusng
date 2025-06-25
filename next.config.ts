import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
      "cdn.sanity.io",
      "getillustrations.b-cdn.net",
      "media.licdn.com",
      "avatars.githubusercontent.com",
      "media.licdn.com",
    ],
  },
};

export default nextConfig;
