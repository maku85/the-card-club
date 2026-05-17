'use client';

import { useMemo, useState } from 'react';
import { ChipGroup, DeckBackCard, GameCard, RulesSheet } from '@/components/GameComponents';
import { Combinatore, GlossarioModal, MazziModal } from '@/components/Modals';
import { useFavorites } from '@/hooks/useFavorites';
import type { Complexity, Game, GameCategory, GameRules, GlossaryEntry, MazziData } from '@/types';

const DECKS = ['Latini', 'Francesi', 'Tedeschi', 'Speciali'] as const;

const DECK_TO_TAB: Record<string, string> = {
  Napoletane: 'Latini',
  Romagnole: 'Latini',
  Siciliane: 'Latini',
  Bresciane: 'Latini',
  Spagnole: 'Latini',
  Piacentine: 'Latini',
  Francesi: 'Francesi',
  Genovesi: 'Francesi',
  Tedeschi: 'Tedeschi',
  Speciali: 'Speciali',
};

const CATEGORIES: GameCategory[] = ['Pesca', 'Prese', 'Rummy', 'Banco', 'Solitario', 'Party'];

interface Bucket<T> {
  label: string;
  test: (v: T) => boolean;
}

const PLAYER_BUCKETS: Bucket<[number, number]>[] = [
  { label: 'Solitario', test: (p) => p[0] === 1 },
  { label: '2', test: (p) => p[0] <= 2 && p[1] >= 2 },
  { label: '3', test: (p) => p[0] <= 3 && p[1] >= 3 },
  { label: '4', test: (p) => p[0] <= 4 && p[1] >= 4 },
  { label: '5+', test: (p) => p[1] >= 5 },
];
const DURATION_BUCKETS: Bucket<number>[] = [
  { label: "< 15'", test: (m) => m <= 15 },
  { label: "15-30'", test: (m) => m > 15 && m <= 30 },
  { label: "30-60'", test: (m) => m > 30 && m <= 60 },
  { label: "> 60'", test: (m) => m > 60 },
];
const complexityDots = (c: number) => '●'.repeat(c) + '○'.repeat(3 - c);
const COMPLEXITY: { label: string; value: Complexity }[] = [
  { label: complexityDots(1), value: 1 },
  { label: complexityDots(2), value: 2 },
  { label: complexityDots(3), value: 3 },
];

interface GameCatalogProps {
  games: Game[];
  glossary: GlossaryEntry[];
  mazzi: MazziData;
}

export function GameCatalog({ games, glossary, mazzi }: GameCatalogProps) {
  const fav = useFavorites();

  const [query, setQuery] = useState('');
  const [decks, setDecks] = useState<string[]>([]);
  const [playerBucket, setPlayerBucket] = useState<string | null>(null);
  const [durationBucket, setDurationBucket] = useState<string | null>(null);
  const [complexity, setComplexity] = useState<number | null>(null);
  const [category, setCategory] = useState<GameCategory | null>(null);
  const [favOnly, setFavOnly] = useState(false);
  const [openGame, setOpenGame] = useState<Game | null>(null);
  const [rulesContent, setRulesContent] = useState<GameRules | null>(null);
  const [rulesError, setRulesError] = useState<string | null>(null);

  const [showGlossario, setShowGlossario] = useState(false);
  const [showMazzi, setShowMazzi] = useState(false);
  const [showCombinatore, setShowCombinatore] = useState(false);

  const handleOpenGame = async (game: Game) => {
    setOpenGame(game);
    setRulesContent(null);
    setRulesError(null);
    try {
      const res = await fetch(`/api/rules/${game.id}`);
      if (res.status === 404) {
        setRulesError('not-found');
      } else if (!res.ok) {
        setRulesError('error');
      } else {
        setRulesContent(await res.json());
      }
    } catch {
      setRulesError('error');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filtered = useMemo(() => {
    return games.filter((g) => {
      if (query) {
        const q = query.toLowerCase();
        const parentDeck = (DECK_TO_TAB[g.deck] || '').toLowerCase();
        if (
          !g.name.toLowerCase().includes(q) &&
          !g.tagline.toLowerCase().includes(q) &&
          !g.deck.toLowerCase().includes(q) &&
          !parentDeck.includes(q)
        )
          return false;
      }
      if (decks.length && !decks.includes(DECK_TO_TAB[g.deck] || g.deck)) return false;
      if (playerBucket) {
        const pb = PLAYER_BUCKETS.find((b) => b.label === playerBucket);
        if (!pb?.test(g.players)) return false;
      }
      if (durationBucket) {
        const db = DURATION_BUCKETS.find((b) => b.label === durationBucket);
        if (!db?.test(g.minutes)) return false;
      }
      if (complexity != null && g.complexity !== complexity) return false;
      if (category && g.category !== category) return false;
      if (favOnly && !fav.has(g.id)) return false;
      return true;
    });
  }, [games, query, decks, playerBucket, durationBucket, complexity, category, favOnly, fav.has]);

  const anyFilter =
    decks.length ||
    playerBucket ||
    durationBucket ||
    complexity != null ||
    category ||
    query ||
    favOnly;

  const clearFilters = () => {
    setQuery('');
    setDecks([]);
    setPlayerBucket(null);
    setDurationBucket(null);
    setComplexity(null);
    setCategory(null);
    setFavOnly(false);
  };

  const pickRandom = () => {
    const pool = filtered.length ? filtered : games;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    handleOpenGame(pick);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo" onClick={scrollToTop}>
          <span className="logo-mark">♠</span>
          <span className="logo-name">
            The <span className="logo-dot">Card</span> Club
          </span>
        </div>
        <nav className="topnav">
          <button type="button" onClick={() => setShowMazzi(true)}>
            Mazzi
          </button>
          <button type="button" onClick={() => setShowGlossario(true)}>
            Glossario
          </button>
          <button type="button" onClick={() => setShowCombinatore(true)}>
            Combinatore
          </button>
          <button type="button" onClick={pickRandom} className="topnav-cta">
            Pesca a caso
          </button>
        </nav>
      </header>

      <nav className="mobile-nav">
        <button type="button" onClick={() => setShowGlossario(true)}>
          <span className="mobile-nav-icon">📖</span>
          <span>Glossario</span>
        </button>
        <button type="button" onClick={() => setShowMazzi(true)}>
          <span className="mobile-nav-icon">🃏</span>
          <span>Mazzi</span>
        </button>
        <button type="button" onClick={() => setShowCombinatore(true)}>
          <span className="mobile-nav-icon">⚙️</span>
          <span>Mixer</span>
        </button>
        <button type="button" onClick={pickRandom} className="mobile-nav-cta">
          <span className="mobile-nav-icon">🎲</span>
          <span>Pesca</span>
        </button>
      </nav>

      <section className="hero">
        <h1 className="hero-title">
          The <em>Card</em> Club.
        </h1>

        <div className="search">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Cerca un gioco, un tipo, un mazzo…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" className="search-clear" onClick={() => setQuery('')}>
              ×
            </button>
          )}
        </div>
      </section>

      <section className="filters" id="sfoglia">
        <ChipGroup
          label="Mazzo"
          multi
          options={DECKS.map((d) => ({ label: d, value: d }))}
          value={decks}
          onChange={setDecks}
        />
        <ChipGroup
          label="Giocatori"
          options={PLAYER_BUCKETS.map((b) => ({ label: b.label }))}
          value={playerBucket}
          onChange={(v) => setPlayerBucket(v as string | null)}
        />
        <ChipGroup
          label="Durata"
          options={DURATION_BUCKETS.map((b) => ({ label: b.label }))}
          value={durationBucket}
          onChange={(v) => setDurationBucket(v as string | null)}
        />
        <ChipGroup
          label="Difficoltà"
          options={COMPLEXITY}
          value={complexity}
          onChange={(v) => setComplexity(v as number | null)}
        />
        <ChipGroup
          label="Tipo"
          options={CATEGORIES.map((c) => ({ label: c }))}
          value={category}
          onChange={(v) => setCategory(v as GameCategory | null)}
        />

        <div className="filter-status">
          <button
            type="button"
            className={`chip chip-fav ${favOnly ? 'is-active' : ''}`}
            onClick={() => setFavOnly((v) => !v)}
          >
            ★ Preferiti{fav.favs.length ? ` · ${fav.favs.length}` : ''}
          </button>
          <span className="count">
            {filtered.length} {filtered.length === 1 ? 'gioco' : 'giochi'}
          </span>
          {anyFilter && (
            <button type="button" className="clear-link" onClick={clearFilters}>
              azzera
            </button>
          )}
        </div>
      </section>

      <section className="deck-grid">
        <DeckBackCard onPick={pickRandom} />
        {filtered.map((g) => (
          <div key={g.id} data-id={g.id} className="card-wrap">
            <GameCard
              game={g}
              isFav={fav.has(g.id)}
              onClick={() => handleOpenGame(g)}
              onToggleFav={fav.toggle}
            />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty">
            <p>Nessuna mano corrisponde.</p>
            <button type="button" className="clear-link" onClick={clearFilters}>
              azzera filtri
            </button>
          </div>
        )}
      </section>

      {openGame && (
        <RulesSheet
          game={openGame}
          rules={rulesContent}
          error={rulesError}
          relatedGames={openGame.related
            .map((id) => games.find((g) => g.id === id))
            .filter((g): g is Game => g !== undefined)}
          onPickGame={handleOpenGame}
          onClose={() => setOpenGame(null)}
        />
      )}
      {showGlossario && (
        <GlossarioModal
          open={showGlossario}
          onClose={() => setShowGlossario(false)}
          glossary={glossary}
        />
      )}
      {showMazzi && (
        <MazziModal
          open={showMazzi}
          onClose={() => setShowMazzi(false)}
          onPickGame={handleOpenGame}
          games={games}
          mazzi={mazzi}
        />
      )}
      {showCombinatore && (
        <Combinatore
          open={showCombinatore}
          onClose={() => setShowCombinatore(false)}
          onPickGame={handleOpenGame}
          games={games}
        />
      )}

      <footer className="footbar">
        <span>The Card Club</span>
        <span className="footbar-suits">♠ ♥ ♦ ♣</span>
      </footer>
    </div>
  );
}
