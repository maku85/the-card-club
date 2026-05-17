import { useCallback, useEffect, useState } from 'react';

const FAV_KEY = 'carte.favorites.v1';

export interface UseFavoritesReturn {
  favs: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export function useFavorites(): UseFavoritesReturn {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(FAV_KEY);
        if (saved) setFavs(JSON.parse(saved));
      } catch (_e) {}
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(favs));
      } catch {}
    }
  }, [favs]);

  const toggle = useCallback(
    (id: string) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    [],
  );
  const has = useCallback((id: string) => favs.includes(id), [favs]);

  return { favs, toggle, has };
}
