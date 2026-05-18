'use client';

import type React from 'react';
import { useEffect } from 'react';
import type { Game, GameRules } from '@/types';
import { SuitIcon } from './SuitIcon';

const fmtPlayers = (p: [number, number]) => (p[0] === p[1] ? `${p[0]}` : `${p[0]}–${p[1]}`);
const fmtDuration = (m: number) =>
  m < 60 ? `${m}'` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}'` : ''}`;
const complexityDots = (c: number) => '●'.repeat(c) + '○'.repeat(3 - c);

interface RulesSheetProps {
  game: Game;
  rules: GameRules | null;
  error: string | null;
  relatedGames: Game[];
  onPickGame: (game: Game) => void;
  onClose: () => void;
}

export function RulesSheet({
  game,
  rules,
  error,
  relatedGames,
  onPickGame,
  onClose,
}: RulesSheetProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!game) return null;

  const isRed = game.suit === '♥' || game.suit === '♦';

  const printSheet = () => {
    document.body.classList.add('print-rules');
    window.print();
    setTimeout(() => document.body.classList.remove('print-rules'), 500);
  };

  const shareSheet = async () => {
    const shareData = {
      title: `The Card Club: ${game.name}`,
      text: `Scopri le regole di ${game.name} su The Card Club!`,
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Link copiato negli appunti!');
      }
    } catch (err) {
      // User cancelled or error
      console.error('Error sharing', err);
    }
  };

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <article
        className="sheet sheet-rules"
        onClick={(e) => e.stopPropagation()}
        data-suit={isRed ? 'red' : 'black'}
      >
        <button type="button" className="sheet-close" onClick={onClose} aria-label="Chiudi">
          x
        </button>
        <div className="sheet-actions">
          <button type="button" className="sheet-print" onClick={shareSheet} aria-label="Condividi">
            Condividi
          </button>
          <button type="button" className="sheet-print" onClick={printSheet} aria-label="Stampa">
            Stampa
          </button>
        </div>

        <header className="sheet-head">
          <div className="sheet-deck">
            <SuitIcon deck={game.deck} italianSuit={game.italianSuit} suit={game.suit} size={16} />
            <span>{game.deck}</span>
          </div>
          <h2 className="sheet-title">{game.name}</h2>
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

        {rules && <TavoloVirtuale game={game} />}

        {rules ? (
          <div
            className="sheet-body markdown-body"
            dangerouslySetInnerHTML={{ __html: rules.contentHtml }}
          />
        ) : error === 'not-found' ? (
          <div className="sheet-body sheet-empty">
            <p>Nessuna regola disponibile per questo gioco.</p>
          </div>
        ) : error ? (
          <div className="sheet-body sheet-empty">
            <p>Impossibile caricare le regole.</p>
          </div>
        ) : (
          <div className="sheet-body sheet-empty">
            <p>Caricamento regole…</p>
          </div>
        )}

        {relatedGames.length > 0 && (
          <div className="sheet-related">
            <p className="sheet-related-label">Vedi anche</p>
            <div className="sheet-related-chips">
              {relatedGames.map((g) => (
                <button key={g.id} type="button" className="chip" onClick={() => onPickGame(g)}>
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

export function TavoloVirtuale({ game }: { game: Game }) {
  const setup = game.tableSetup;
  return (
    <div className="tavolo" aria-hidden="true">
      <div className="tavolo-felt">
        {setup.deck && (
          <div className="tavolo-deck">
            <span />
            <span />
            <span />
          </div>
        )}
        {setup.briscola && <div className="tavolo-briscola" />}
        <div className="tavolo-table">
          {Array.from({ length: setup.table || 0 }).map((_, i) => (
            <div
              key={i}
              className="mini-card mini-card-up"
              style={{ animationDelay: `${0.4 + i * 0.08}s` }}
            />
          ))}
        </div>
        <div className="tavolo-hand">
          {Array.from({ length: Math.min(setup.hand || 0, 13) }).map((_, i) => (
            <div
              key={i}
              className="mini-card mini-card-down"
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            />
          ))}
        </div>
      </div>
      <div className="tavolo-caption">{setup.note}</div>
    </div>
  );
}

interface MetaItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function MetaItem({ icon, value, label }: MetaItemProps) {
  return (
    <div title={label}>
      {icon}
      <span>{value}</span>
    </div>
  );
}

interface GameCardProps {
  game: Game;
  isFav: boolean;
  onClick: () => void;
  onToggleFav: (id: string) => void;
}

export function GameCard({ game, isFav, onClick, onToggleFav }: GameCardProps) {
  const isRed = game.suit === '♥' || game.suit === '♦';
  const rank = game.id.length % 10 || 'A';
  const suit = game.suit;

  return (
    <article
      className={`card ${isFav ? 'is-fav' : ''}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      data-suit={isRed ? 'red' : 'black'}
      data-category={game.category}
      data-deck={game.deck}
    >
      <button
        type="button"
        className="card-fav"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav(game.id);
        }}
        aria-label={isFav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
      >
        {isFav ? '★' : '☆'}
      </button>

      <div className="card-corner tl">
        <span className="card-rank">{rank}</span>
        <span className="card-suit">{suit}</span>
      </div>
      <div className="card-corner br">
        <span className="card-rank">{rank}</span>
        <span className="card-suit">{suit}</span>
      </div>

      <div className="card-body">
        <div className="card-deck">
          {game.deck} · {game.category}
        </div>
        <h3 className="card-name">{game.name}</h3>
        <p className="card-tagline">{game.tagline}</p>
      </div>

      <div className="card-meta">
        <MetaItem
          icon={
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          }
          label="Giocatori"
          value={`${fmtPlayers(game.players)}${game.partnerships ? ' ⇌' : ''}`}
        />
        <MetaItem
          icon={
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          }
          label="Durata"
          value={fmtDuration(game.minutes)}
        />
        <MetaItem
          icon={
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"></path>
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"></path>
            </svg>
          }
          label="Difficoltà"
          value={complexityDots(game.complexity)}
        />
      </div>
    </article>
  );
}

export function DeckBackCard({ onPick }: { onPick: () => void }) {
  return (
    <button type="button" className="card card-deckback" onClick={onPick} aria-label="Pesca a caso">
      <div className="deckback-ornament">
        <div className="deckback-grid">
          {Array.from({ length: 7 * 5 }).map((_, i) => (
            <span key={i}>◆</span>
          ))}
        </div>
      </div>
      <div className="deckback-label">
        <span className="deckback-cta">Pesca</span>
        <span className="deckback-sub">a caso</span>
      </div>
    </button>
  );
}

interface ChipOption {
  label: string;
  value?: string | number;
}

interface ChipGroupPropsMulti {
  label: string;
  options: ChipOption[];
  value: string[];
  onChange: (v: string[]) => void;
  multi: true;
}

interface ChipGroupPropsSingle {
  label: string;
  options: ChipOption[];
  value: string | number | null;
  onChange: (v: string | number | null) => void;
  multi?: false;
}

type ChipGroupProps = ChipGroupPropsMulti | ChipGroupPropsSingle;

export function ChipGroup(props: ChipGroupProps) {
  const { label, options, multi } = props;

  const isActive = (v: string | number) => {
    if (multi) return (props.value as string[]).includes(v as string);
    return props.value === v;
  };

  const toggle = (v: string | number) => {
    if (multi) {
      const cur = props.value as string[];
      const sv = v as string;
      props.onChange(cur.includes(sv) ? cur.filter((x) => x !== sv) : [...cur, sv]);
    } else {
      (props as ChipGroupPropsSingle).onChange(props.value === v ? null : v);
    }
  };

  return (
    <div className="chip-group">
      <span className="chip-label">{label}</span>
      <div className="chips">
        {options.map((opt) => (
          <button
            type="button"
            key={opt.label}
            className={`chip ${isActive(opt.value ?? opt.label) ? 'is-active' : ''}`}
            onClick={() => toggle(opt.value ?? opt.label)}
            data-value={String(opt.value ?? opt.label)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
