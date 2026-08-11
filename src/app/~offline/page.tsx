export default function Offline() {
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
      <p style={{ fontSize: '4rem', lineHeight: 1 }}>♣</p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 500 }}>Sei offline</h1>
      <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>
        Questa pagina non è ancora disponibile senza connessione.
      </p>
    </div>
  );
}
