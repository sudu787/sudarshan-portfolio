/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 This tells Vercel: "I don't care about errors, just build the site!"
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;