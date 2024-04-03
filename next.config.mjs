/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-68dc3f8180aa4075afc2795966a9c582.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    URL_DOMAIN: process.env.URL_DOMAIN,
    API_URL: process.env.API_URL,
  },
}

export default nextConfig
