/** @type {import('next').NextConfig} */
import { readFileSync } from 'node:fs';
import withPWAInit from '@ducanh2912/next-pwa';

const games = JSON.parse(readFileSync(new URL('./src/data/games.json', import.meta.url), 'utf8'));
// HTML references hashed chunks, so every build must refresh every cached page.
const revision = String(Date.now());

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    // Precache home and every rules page so the app works offline at the table, not just pages already visited.
    additionalManifestEntries: ['/', ...games.map((g) => `/regole/${g.id}`)].map((url) => ({
      url,
      revision,
    })),
  },
});

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  // Static export has no image optimizer; deck covers are pre-compressed WebP.
  images: { unoptimized: true },
};

export default withPWA(nextConfig);
