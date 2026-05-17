import type React from 'react';
import type { ItalianSuit } from '@/types';

interface IconProps {
  size?: number;
}

export function CoppeIcon({ size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size * 1.18}
      viewBox="0 0 24 28"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5 4 Q5 15 12 16.4 Q19 15 19 4 Z" />
      <rect x="11" y="16" width="2" height="6" />
      <ellipse cx="12" cy="23.5" rx="6" ry="1.6" />
    </svg>
  );
}

export function DenariIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="11" />
      <circle cx="12" cy="12" r="7" fill="var(--paper, #fff)" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  );
}

export function BastoniIcon({ size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 24 28"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="9.5" y="3" width="5" height="22" rx="2.2" />
      <circle cx="12" cy="5" r="3.2" />
      <circle cx="12" cy="23" r="3.2" />
    </svg>
  );
}

export function SpadeIcon({ size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 24 28"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2 Q14.5 12 12 18 Q9.5 12 12 2 Z" />
      <rect x="5" y="17.5" width="14" height="2" rx="0.5" />
      <circle cx="12" cy="22.5" r="3.2" />
    </svg>
  );
}

interface SuitIconProps {
  deck: string;
  italianSuit: ItalianSuit | null;
  suit: string;
  size?: number;
}

export function SuitIcon({ deck, italianSuit, suit, size = 14 }: SuitIconProps) {
  if (
    deck === 'Napoletane' ||
    deck === 'Genovesi' ||
    deck === 'Romagnole' ||
    (deck !== 'Francesi' && deck !== 'Speciali' && italianSuit)
  ) {
    const map: Record<ItalianSuit, React.ComponentType<IconProps>> = {
      coppe: CoppeIcon,
      denari: DenariIcon,
      bastoni: BastoniIcon,
      spade: SpadeIcon,
    };
    const C = italianSuit ? map[italianSuit] : null;
    return C ? <C size={size} /> : <span style={{ fontSize: size }}>{suit}</span>;
  }
  return <span style={{ fontSize: size, lineHeight: 1 }}>{suit}</span>;
}
