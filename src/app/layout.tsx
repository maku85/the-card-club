import type { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const viewport = {
  themeColor: '#f6f6f6',
};

export const metadata: Metadata = {
  title: 'The Card Club — Regole di giochi di carte',
  description:
    'Un piccolo archivio di giochi di carte — napoletane, francesi, e qualche mazzo speciale.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'The Card Club',
  },
};

const cloudflareBeaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={cormorant.variable}>{children}</body>
      {cloudflareBeaconToken && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cloudflareBeaconToken}"}`}
          strategy="afterInteractive"
        />
      )}
    </html>
  );
}
