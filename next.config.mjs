/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/BrunaVilleneBeauty', 
  assetPrefix: '/BrunaVilleneBeauty/',
  images: {
    unoptimized: true, 
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://maps.googleapis.com; " +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
              "img-src 'self' data: blob: https://*.googleusercontent.com; " +
              "connect-src 'self' https://wa.me ws: wss:; " +
              "frame-src 'self' https://www.google.com https://maps.googleapis.com; " +
              "font-src 'self' data: https://fonts.gstatic.com;"
          },
        ],
      },
    ];
  }
};

export default nextConfig;