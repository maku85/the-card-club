import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TavoloVirtuale } from '@/components/GameComponents';
import { RulesPageActions } from '@/components/RulesPageActions';
import { SuitIcon } from '@/components/SuitIcon';
import { getGameRules, getGames } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

const fmtPlayers = (p: [number, number]) => (p[0] === p[1] ? `${p[0]}` : `${p[0]}–${p[1]}`);
const fmtDuration = (m: number) =>
  m < 60 ? `${m}'` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}'` : ''}`;
const complexityDots = (c: number) => '●'.repeat(c) + '○'.repeat(3 - c);

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getGames().map((game) => ({ id: game.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const game = getGames().find((g) => g.id === id);

  if (!game) return {};

  const title = `Regole di ${game.name} — The Card Club`;
  const description = game.tagline;
  const url = `${SITE_URL}/regole/${game.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
  };
}

export default async function RulesPage({ params }: PageProps) {
  const { id } = await params;
  const games = getGames();
  const game = games.find((g) => g.id === id);

  if (!game) notFound();

  const rules = await getGameRules(id);
  const relatedGames = game.related
    .map((relatedId) => games.find((g) => g.id === relatedId))
    .filter((g): g is (typeof games)[number] => g !== undefined);

  const isRed = game.suit === '♥' || game.suit === '♦';

  return (
    <>
      <header className="topbar">
        <Link href="/" className="logo">
          <span className="logo-mark">♠</span>
          <span className="logo-name">
            The <span className="logo-dot">Card</span> Club
          </span>
        </Link>
      </header>

      <main className="rules-page">
        <div className="rules-page-toolbar">
          <Link href="/" className="sheet-print" aria-label="Torna al catalogo">
            ← Catalogo
          </Link>
          <RulesPageActions gameName={game.name} />
        </div>

        <article className="sheet sheet-page" data-suit={isRed ? 'red' : 'black'}>
          <header className="sheet-head">
            <div className="sheet-deck">
              <SuitIcon
                deck={game.deck}
                italianSuit={game.italianSuit}
                suit={game.suit}
                size={16}
              />
              <span>{game.deck}</span>
            </div>
            <h1 className="sheet-title">{game.name}</h1>
            <p className="sheet-tagline">{game.tagline}</p>
            <dl className="sheet-meta">
              <div>
                <dt>Giocatori</dt>
                <dd>{fmtPlayers(game.players)}</dd>
              </div>
              <div>
                <dt>Durata</dt>
                <dd>{fmtDuration(game.minutes)}</dd>
              </div>
              <div>
                <dt>Difficoltà</dt>
                <dd>{complexityDots(game.complexity)}</dd>
              </div>
            </dl>
          </header>

          <TavoloVirtuale game={game} />

          {rules ? (
            <div
              className="sheet-body markdown-body"
              dangerouslySetInnerHTML={{ __html: rules.contentHtml }}
            />
          ) : (
            <div className="sheet-body sheet-empty">
              <p>Nessuna regola disponibile per questo gioco.</p>
            </div>
          )}

          {relatedGames.length > 0 && (
            <div className="sheet-related">
              <p className="sheet-related-label">Vedi anche</p>
              <div className="sheet-related-chips">
                {relatedGames.map((g) => (
                  <Link key={g.id} href={`/regole/${g.id}`} className="chip">
                    {g.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <footer className="footbar">
        <span>The Card Club</span>
        <span className="footbar-suits">♠ ♥ ♦ ♣</span>
      </footer>
    </>
  );
}
