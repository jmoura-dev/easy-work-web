/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/jmoura-dev.png',
      },
    ],
    domains: ['pub-68dc3f8180aa4075afc2795966a9c582.r2.dev'],
  },
  env: {
    URL_DOMAIN: process.env.URL_DOMAIN,
  },
}

export default nextConfig
