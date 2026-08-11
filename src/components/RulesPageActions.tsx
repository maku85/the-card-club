'use client';

import { useState } from 'react';
import { ScoreboardModal } from '@/components/Modals';
import type { Game } from '@/types';

interface RulesPageActionsProps {
  game: Game;
}

export function RulesPageActions({ game }: RulesPageActionsProps) {
  const gameName = game.name;
  const [showScoreboard, setShowScoreboard] = useState(false);
  const showScoreboardButton = game.category !== 'Solitario';

  const printSheet = () => {
    document.body.classList.add('print-rules');
    window.print();
    setTimeout(() => document.body.classList.remove('print-rules'), 500);
  };

  const shareSheet = async () => {
    const shareData = {
      title: `The Card Club: ${gameName}`,
      text: `Scopri le regole di ${gameName} su The Card Club!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Link copiato negli appunti!');
      }
    } catch (err) {
      console.error('Error sharing', err);
    }
  };

  return (
    <>
      <button type="button" className="sheet-print" onClick={shareSheet} aria-label="Condividi">
        Condividi
      </button>
      <button type="button" className="sheet-print" onClick={printSheet} aria-label="Stampa">
        Stampa
      </button>
      {showScoreboardButton && (
        <button
          type="button"
          className="sheet-print"
          onClick={() => setShowScoreboard(true)}
          aria-label="Segnapunti"
        >
          Segnapunti
        </button>
      )}
      {showScoreboard && (
        <ScoreboardModal
          open={showScoreboard}
          onClose={() => setShowScoreboard(false)}
          game={game}
        />
      )}
    </>
  );
}
