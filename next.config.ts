import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ข้าม ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ ข้าม TypeScript checking
  },
  images: {
    domains: [
      "www.gourmetandcuisine.com",
      "d3h1lg3ksw6i6b.cloudfront.net",
      "upload.wikimedia.org",
    ],
  },
};

export default nextConfig;
