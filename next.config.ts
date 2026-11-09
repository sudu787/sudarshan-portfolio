import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // the home page is plain HTML built with the design-taste kit (public/home.html + public/assets)
  async rewrites() {
    return [{ source: "/", destination: "/home.html" }];
  },
};

export default nextConfig;
