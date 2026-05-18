'use client';

import Image from 'next/image';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Game, GlossaryEntry, MazziData } from '@/types';
import { BastoniIcon, CoppeIcon, DenariIcon, SpadeIcon } from './SuitIcon';

const ITALIAN_SUIT_LABELS: Record<string, string> = {
  coppe: 'Coppe',
  denari: 'Denari',
  bastoni: 'Bastoni',
  spade: 'Spade',
};
const ITALIAN_SUIT_COMPS: Record<string, React.ComponentType<{ size?: number }>> = {
  coppe: CoppeIcon,
  denari: DenariIcon,
  bastoni: BastoniIcon,
  spade: SpadeIcon,
};

function renderFormattedText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, onClose, children, size = 'md' }: ModalProps) {
  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();

      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>('.sheet-close');
      closeBtn?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="sheet-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <article
        ref={modalRef}
        className={`sheet sheet-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="sheet-close" onClick={onClose} aria-label="Chiudi">
          x
        </button>
        {children}
      </article>
    </div>
  );
}

interface GlossarioModalProps {
  open: boolean;
  onClose: () => void;
  glossary: GlossaryEntry[];
}

export function GlossarioModal({ open, onClose, glossary }: GlossarioModalProps) {
  return (
    <Modal open={open} onClose={onClose} size="md">
      <header className="sheet-head">
        <div className="sheet-deck">Lessico</div>
        <h2 className="sheet-title">Glossario</h2>
        <p className="sheet-tagline">I termini che tornano da un tavolo all'altro.</p>
      </header>
      <dl className="glossary">
        {glossary.map((g) => (
          <div className="glossary-row" key={g.term}>
            <dt>{g.term}</dt>
            <dd>{g.defn}</dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}

interface MazziModalProps {
  open: boolean;
  onClose: () => void;
  onPickGame: (game: Game) => void;
  games: Game[];
  mazzi: MazziData;
}

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

export function MazziModal({ open, onClose, onPickGame, games, mazzi }: MazziModalProps) {
  const [tab, setTab] = useState('Latini');
  const m = mazzi[tab];
  const linkedGames = games.filter((g) => DECK_TO_TAB[g.deck] === tab);

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <header className="sheet-head">
        <div className="sheet-deck">{m.eyebrow}</div>
        <h2 className="sheet-title">{m.title}</h2>
        <p className="sheet-tagline">{m.blurb}</p>
        <div className="mazzi-tabs">
          {Object.keys(mazzi).map((k) => (
            <button
              type="button"
              key={k}
              className={`mazzi-tab ${k === tab ? 'is-active' : ''}`}
              onClick={() => setTab(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </header>

      {m.suits.length > 0 && (
        <section className="mazzi-suits">
          {m.suits.map((s) => {
            const C = ITALIAN_SUIT_COMPS[s];
            return (
              <div className="mazzi-suit" key={s}>
                {C ? <C size={32} /> : <span className="mazzi-suit-char">{s}</span>}
                <span className="mazzi-suit-label">{ITALIAN_SUIT_LABELS[s] || s}</span>
              </div>
            );
          })}
        </section>
      )}

      <section className="sheet-body">
        {/* Immagine di copertina premium */}
        <div className="mazzi-cover-container">
          <Image
            src={`/images/decks/${tab.toLowerCase()}.png`}
            alt={`${m.title} Cover`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority
            className="mazzi-cover-img"
          />
        </div>

        {/* Griglia di metadati tecnici */}
        {(m.composition || m.diffusion) && (
          <div className="mazzi-specs-grid">
            {m.composition && (
              <div className="mazzi-spec-card">
                <span className="mazzi-spec-label">Composizione</span>
                <span className="mazzi-spec-value">{m.composition}</span>
              </div>
            )}
            {m.diffusion && (
              <div className="mazzi-spec-card">
                <span className="mazzi-spec-label">Diffusione</span>
                <span className="mazzi-spec-value">{m.diffusion}</span>
              </div>
            )}
          </div>
        )}

        {/* Grandi Classici Storici */}
        {m.classicGames && m.classicGames.length > 0 && (
          <div className="mazzi-classics">
            <h3>Grandi Classici Storici</h3>
            <div className="mazzi-classics-list">
              {m.classicGames.map((cg) => (
                <span className="mazzi-classic-tag" key={cg}>
                  {cg}
                </span>
              ))}
            </div>
          </div>
        )}

        <h3>Da sapere</h3>
        <ul>
          {m.notes.map((n, i) => (
            <li key={i}>{renderFormattedText(n)}</li>
          ))}
        </ul>

        {/* La Carta Simbolo */}
        {m.signatureCard && (
          <div className="mazzi-signature-card">
            <h3>La Carta Simbolo: {m.signatureCard.name}</h3>
            <p>{m.signatureCard.desc}</p>
          </div>
        )}

        {/* Aneddoto e Curiosità */}
        {m.trivia && (
          <div className="mazzi-trivia-banner">
            <span className="mazzi-trivia-icon">💡</span>
            <div className="mazzi-trivia-content">
              <span className="mazzi-trivia-label">Curiosità & Superstizione</span>
              <p className="mazzi-trivia-text">{m.trivia}</p>
            </div>
          </div>
        )}

        {linkedGames.length > 0 && (
          <>
            <h3>Giochi con questo mazzo</h3>
            <div className="mazzi-games">
              {linkedGames.map((g) => (
                <button
                  type="button"
                  key={g.id}
                  className="mazzi-game"
                  onClick={() => {
                    onClose();
                    onPickGame(g);
                  }}
                >
                  <span className="mazzi-game-name">{g.name}</span>
                  <span className="mazzi-game-meta">
                    {g.minutes < 60 ? `${g.minutes}'` : `${Math.floor(g.minutes / 60)}h`} &middot;{' '}
                    {g.players[0] === g.players[1]
                      ? g.players[0]
                      : `${g.players[0]}–${g.players[1]}`}{' '}
                    giocatori
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </Modal>
  );
}

interface CombinatoreProps {
  open: boolean;
  onClose: () => void;
  onPickGame: (game: Game) => void;
  games: Game[];
}

export function Combinatore({ open, onClose, onPickGame, games }: CombinatoreProps) {
  const [players, setPlayers] = useState(4);
  const [maxMinutes, setMaxMinutes] = useState(60);
  const [maxComplexity, setMaxComplexity] = useState(2);

  const matches = useMemo(() => {
    return games.filter((g) => {
      if (players < g.players[0] || players > g.players[1]) return false;
      if (g.minutes > maxMinutes) return false;
      if (g.complexity > maxComplexity) return false;
      return true;
    });
  }, [games, players, maxMinutes, maxComplexity]);

  const propose = () => {
    if (!matches.length) return;
    const pick = matches[Math.floor(Math.random() * matches.length)];
    onClose();
    onPickGame(pick);
  };

  return (
    <Modal open={open} onClose={onClose} size="md">
      <header className="sheet-head">
        <div className="sheet-deck">Indicami una mano</div>
        <h2 className="sheet-title">Combinatore</h2>
        <p className="sheet-tagline">Tre parametri, una proposta. Scegliamo insieme.</p>
      </header>

      <section className="combo-controls">
        <label className="combo-row">
          <span className="combo-label">Giocatori</span>
          <div className="combo-input">
            <input
              type="range"
              min="1"
              max="8"
              value={players}
              onChange={(e) => setPlayers(+e.target.value)}
            />
            <span className="combo-value">{players}</span>
          </div>
        </label>
        <label className="combo-row">
          <span className="combo-label">Tempo max</span>
          <div className="combo-input">
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={maxMinutes}
              onChange={(e) => setMaxMinutes(+e.target.value)}
            />
            <span className="combo-value">
              {maxMinutes < 60
                ? `${maxMinutes}'`
                : `${Math.floor(maxMinutes / 60)}h${maxMinutes % 60 ? ` ${maxMinutes % 60}'` : ''}`}
            </span>
          </div>
        </label>
        <label className="combo-row">
          <span className="combo-label">Difficoltà max</span>
          <div className="combo-chips">
            {([1, 2, 3] as const).map((c) => (
              <button
                type="button"
                key={c}
                className={`chip ${c === maxComplexity ? 'is-active' : ''}`}
                onClick={() => setMaxComplexity(c)}
              >
                {'●'.repeat(c) + '○'.repeat(3 - c)}
              </button>
            ))}
          </div>
        </label>
      </section>

      <section className="combo-result">
        <div className="combo-count">
          {matches.length} {matches.length === 1 ? 'mano possibile' : 'mani possibili'}
        </div>
        <button type="button" className="combo-cta" onClick={propose} disabled={!matches.length}>
          ◆ Pesca per me
        </button>
        {matches.length > 0 && (
          <ul className="combo-list">
            {matches.slice(0, 6).map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  className="combo-game"
                  onClick={() => {
                    onClose();
                    onPickGame(g);
                  }}
                >
                  <span>{g.name}</span>
                  <span className="combo-game-meta">{g.deck}</span>
                </button>
              </li>
            ))}
            {matches.length > 6 && <li className="combo-more">e altri {matches.length - 6}…</li>}
          </ul>
        )}
      </section>
    </Modal>
  );
}

interface ScoreboardModalProps {
  open: boolean;
  onClose: () => void;
}

export function ScoreboardModal({ open, onClose }: ScoreboardModalProps) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [scores, setScores] = useState<number[][]>([]);
  const [currentRound, setCurrentRound] = useState<string[]>(Array(4).fill(''));

  const totals = useMemo(() => {
    const t = Array(numPlayers).fill(0);
    scores.forEach((round) => {
      round.forEach((s, i) => {
        if (i < numPlayers) t[i] += s;
      });
    });
    return t;
  }, [scores, numPlayers]);

  const addRound = () => {
    const newRound = currentRound.slice(0, numPlayers).map((s) => parseInt(s) || 0);
    if (newRound.every((s) => s === 0) && currentRound.every((s) => s === '')) return;
    setScores([...scores, newRound]);
    setCurrentRound(Array(4).fill(''));
  };

  const reset = () => {
    if (window.confirm('Vuoi azzerare i punti?')) setScores([]);
  };

  return (
    <Modal open={open} onClose={onClose} size="md">
      <header className="sheet-head">
        <div className="sheet-deck">Strumenti</div>
        <h2 className="sheet-title">Segnapunti</h2>
        <div className="mazzi-tabs">
          {[2, 3, 4].map((n) => (
            <button
              key={n}
              type="button"
              className={`mazzi-tab ${numPlayers === n ? 'is-active' : ''}`}
              onClick={() => {
                if (
                  scores.length > 0 &&
                  !window.confirm('Cambiare giocatori azzererà i punti. Continuare?')
                )
                  return;
                setNumPlayers(n);
                setScores([]);
              }}
            >
              {n} Giocatori
            </button>
          ))}
        </div>
      </header>

      <section className="sheet-body">
        <table style={{ width: '100%', textAlign: 'center', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              {Array.from({ length: numPlayers }).map((_, i) => (
                <th key={i} style={{ textAlign: 'center' }}>
                  G{i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scores.map((round, rIndex) => (
              <tr key={rIndex}>
                {round.map((s, i) => (
                  <td key={i}>{s}</td>
                ))}
              </tr>
            ))}
            <tr>
              {Array.from({ length: numPlayers }).map((_, i) => (
                <td key={i}>
                  <input
                    type="number"
                    style={{
                      width: '80%',
                      padding: '8px',
                      textAlign: 'center',
                      borderRadius: '4px',
                      border: '1px solid var(--rule)',
                      background: 'transparent',
                      color: 'var(--ink)',
                    }}
                    value={currentRound[i]}
                    onChange={(e) => {
                      const newRound = [...currentRound];
                      newRound[i] = e.target.value;
                      setCurrentRound(newRound);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addRound();
                    }}
                  />
                </td>
              ))}
            </tr>
            <tr style={{ fontWeight: '600', fontSize: '1.25em' }}>
              {totals.map((t, i) => (
                <td key={i} style={{ paddingTop: '16px', borderTop: '2px solid var(--ink)' }}>
                  {t}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          <button type="button" className="chip" onClick={reset}>
            Azzera
          </button>
          <button
            type="button"
            className="chip"
            style={{ background: 'var(--ink)', color: 'var(--bg)', borderColor: 'var(--ink)' }}
            onClick={addRound}
          >
            + Aggiungi Turno
          </button>
        </div>
      </section>
    </Modal>
  );
}
