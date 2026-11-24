import assert from 'node:assert/strict';
import test from 'node:test';
import { emptyRow, parseScoreboard } from './scoreboard.ts';

test('a saved game survives the round trip', () => {
  const state = {
    numPlayers: 3,
    playerNames: ['Ada', 'Bo', 'Cy', ''],
    scores: [
      [1, -2, 3],
      [0, 5, 1],
    ],
    currentRound: ['4', '', '', ''],
    currentCategoryRound: { carte: ['1', '', '', ''] },
  };
  assert.deepEqual(parseScoreboard(JSON.stringify(state), ['carte'], 2), state);
});

test('missing or corrupt data falls back to an empty game', () => {
  const empty = {
    numPlayers: 4,
    playerNames: emptyRow(),
    scores: [],
    currentRound: emptyRow(),
    currentCategoryRound: { carte: emptyRow() },
  };
  for (const raw of [null, '', 'null', '{', '[]', '"x"', '{"scores":[[1]],"numPlayers":9}']) {
    assert.deepEqual(parseScoreboard(raw, ['carte'], 4), empty, String(raw));
  }
});

test('rows that do not match the player count are dropped', () => {
  assert.deepEqual(parseScoreboard('{"numPlayers":2,"scores":[[1,2,3]]}', [], 2).scores, []);
});

test('categories added after the game was saved get an empty row', () => {
  const raw = JSON.stringify({ currentCategoryRound: { old: ['1', '', '', ''] } });
  assert.deepEqual(parseScoreboard(raw, ['carte'], 2).currentCategoryRound, { carte: emptyRow() });
});
