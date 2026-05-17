import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        fontFamily: 'var(--font-cormorant, Georgia, serif)',
      }}
    >
      <p style={{ fontSize: '4rem', lineHeight: 1 }}>♠</p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Pagina non trovata</h1>
      <Link href="/" style={{ opacity: 0.6, fontSize: '0.9rem' }}>
        Torna al catalogo
      </Link>
    </div>
  );
}
