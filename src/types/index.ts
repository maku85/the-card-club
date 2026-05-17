export type ItalianSuit = 'coppe' | 'denari' | 'bastoni' | 'spade';
export type Deck = 'Napoletane' | 'Francesi' | 'Speciali';
export type Complexity = 1 | 2 | 3;
export type GameCategory = 'Pesca' | 'Prese' | 'Rummy' | 'Banco' | 'Solitario' | 'Party';

export interface TableSetup {
  hand: number;
  table: number;
  deck: boolean;
  briscola?: boolean;
  note: string;
}

export interface Game {
  id: string;
  name: string;
  deck: Deck;
  italianSuit: ItalianSuit | null;
  suit: string;
  players: [number, number];
  minutes: number;
  complexity: Complexity;
  tagline: string;
  tableSetup: TableSetup;
  category: GameCategory;
  partnerships: boolean;
  related: string[];
}

export interface GlossaryEntry {
  term: string;
  defn: string;
}

export interface MazzoEntry {
  title: string;
  eyebrow: string;
  blurb: string;
  suits: string[];
  notes: string[];
}

export type MazziData = Record<string, MazzoEntry>;

export interface GameRules {
  id: string;
  contentHtml: string;
  [key: string]: unknown;
}
