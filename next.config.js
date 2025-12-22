/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  outputFileTracingRoot: require('path').join(__dirname),
  transpilePackages: [
    'next-sanity',
    '@sanity/visual-editing',
    '@sanity/ui',
    '@sanity/icons',
    '@sanity/vision',
  ],
  webpack: (config, { isServer }) => {
    // Fix for emotion and Sanity UI compatibility
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

module.exports = nextConfig

