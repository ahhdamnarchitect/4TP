import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for better development
  reactStrictMode: true,

  // Image optimization config
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
},

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['framer-motion'],
},
}

export default nextConfig
