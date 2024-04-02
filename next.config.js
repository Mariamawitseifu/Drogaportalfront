/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
       domains: ['127.0.0.1'],
       unoptimized: true,
    },
   }
   
   module.exports = nextConfig;
   