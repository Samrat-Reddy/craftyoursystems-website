import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for catching potential issues
  reactStrictMode: true,

  // Optimise fonts
  optimizeFonts: true,

  // Image optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig
