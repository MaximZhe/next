/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '',
  assetPrefix: '',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://testapi.intercars.ru/api/:path*',
      },
     
    ];
  },
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'kurs.intercars-tickets.com',
        port: '',
        pathname: '/Images/**',
      },
    ],
    unoptimized: true
  },
  
}

module.exports = nextConfig
