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
  },
  env: {
    URL_DOMAIN: process.env.URL_DOMAIN,
  },
}

export default nextConfig
