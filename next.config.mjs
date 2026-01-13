/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.artic.edu',
      },
      {
        protocol: 'https',
        hostname: 'ids.lib.harvard.edu',
      },
      {
        protocol: 'https',
        hostname: 'openaccess-api.clevelandart.org',
      },
      {
        protocol: 'https',
        hostname: 'www.clevelandart.org',
      },
      {
        protocol: 'https',
        hostname: 'openaccess-cdn.clevelandart.org',
      },
    ],
  },
};

export default nextConfig;
