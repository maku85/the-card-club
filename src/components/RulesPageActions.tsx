'use client';

interface RulesPageActionsProps {
  gameName: string;
}

export function RulesPageActions({ gameName }: RulesPageActionsProps) {
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
    </>
  );
}
