import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import html from 'remark-html';

import gamesData from '@/data/games.json';
import glossaryData from '@/data/glossary.json';
import mazziData from '@/data/mazzi.json';
import type { Game, GameRules, GlossaryEntry, MazziData } from '@/types';

const rulesDirectory = path.join(process.cwd(), 'src/data/rules');

export function getGames(): Game[] {
  return gamesData as Game[];
}

export function getGlossary(): GlossaryEntry[] {
  return glossaryData as GlossaryEntry[];
}

export function getMazzi(): MazziData {
  return mazziData as MazziData;
}

export async function getGameRules(id: string): Promise<GameRules | null> {
  const fullPath = path.join(rulesDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(gfm).use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    ...data,
    contentHtml,
  };
}
