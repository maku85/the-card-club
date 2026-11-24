/** @type {import('next').NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  // Static export has no image optimizer; deck covers are pre-compressed WebP.
  images: { unoptimized: true },
};

export default withPWA(nextConfig);
