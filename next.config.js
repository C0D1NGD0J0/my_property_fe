/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5100/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
