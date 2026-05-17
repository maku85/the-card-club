import type { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Card Club — Regole di giochi di carte',
  description:
    'Un piccolo archivio di giochi di carte — napoletane, francesi, e qualche mazzo speciale.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={cormorant.variable}>{children}</body>
    </html>
  );
}
