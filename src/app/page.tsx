import { GameCatalog } from '@/components/GameCatalog';
import { getGames, getGlossary, getMazzi } from '@/lib/data';

export default function Home() {
  const games = getGames();
  const glossary = getGlossary();
  const mazzi = getMazzi();

  return <GameCatalog games={games} glossary={glossary} mazzi={mazzi} />;
}
