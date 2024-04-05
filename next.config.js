/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    trailingSlash: true,
    images: {
       domains: ['127.0.0.1'],
       unoptimized: true,
    },
   }
   
   module.exports = nextConfig;
   