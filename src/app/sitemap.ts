import type { MetadataRoute } from 'next';
import { getGames } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const gameEntries: MetadataRoute.Sitemap = getGames().map((game) => ({
    url: `${SITE_URL}/regole/${game.id}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...gameEntries,
  ];
}
