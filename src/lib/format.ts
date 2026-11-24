export const fmtPlayers = (p: [number, number]) => (p[0] === p[1] ? `${p[0]}` : `${p[0]}–${p[1]}`);
export const fmtDuration = (m: number) =>
  m < 60 ? `${m}'` : `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}'` : ''}`;
export const complexityDots = (c: number) => '●'.repeat(c) + '○'.repeat(3 - c);
