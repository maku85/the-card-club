export interface ScoreboardState {
  numPlayers: number;
  playerNames: string[];
  scores: number[][];
  currentRound: string[];
  currentCategoryRound: Record<string, string[]>;
}

export const emptyRow = (): string[] => Array(4).fill('');

const isRow = (v: unknown): v is string[] =>
  Array.isArray(v) && v.length === 4 && v.every((x) => typeof x === 'string');

/** Rebuilds a saved game; anything malformed (or from an older category set) falls back to empty. */
export function parseScoreboard(
  raw: string | null,
  categoryKeys: string[],
  defaultPlayers: number,
): ScoreboardState {
  let saved: Partial<ScoreboardState> = {};
  try {
    saved = JSON.parse(raw ?? '{}') ?? {};
  } catch {}

  const numPlayers = [2, 3, 4].includes(saved.numPlayers as number)
    ? (saved.numPlayers as number)
    : defaultPlayers;
  const validScores =
    Array.isArray(saved.scores) &&
    saved.scores.every(
      (r) => Array.isArray(r) && r.length === numPlayers && r.every(Number.isFinite),
    );

  return {
    numPlayers,
    playerNames: isRow(saved.playerNames) ? saved.playerNames : emptyRow(),
    scores: validScores ? (saved.scores as number[][]) : [],
    currentRound: isRow(saved.currentRound) ? saved.currentRound : emptyRow(),
    currentCategoryRound: Object.fromEntries(
      categoryKeys.map((key) => {
        const row = saved.currentCategoryRound?.[key];
        return [key, isRow(row) ? row : emptyRow()];
      }),
    ),
  };
}

// One saved game per rules page, plus one for the generic scoreboard on the home page.
const storageKey = (gameId?: string) => `carte.scoreboard.v1.${gameId ?? 'generic'}`;

export function loadScoreboard(
  gameId: string | undefined,
  categoryKeys: string[],
  defaultPlayers: number,
): ScoreboardState {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(storageKey(gameId));
  } catch {}
  return parseScoreboard(raw, categoryKeys, defaultPlayers);
}

export function saveScoreboard(gameId: string | undefined, state: ScoreboardState) {
  try {
    localStorage.setItem(storageKey(gameId), JSON.stringify(state));
  } catch {}
}
