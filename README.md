# The Card Club

Archivio di regole di giochi di carte (napoletane, francesi, tedesche e mazzi speciali). Next.js, completamente statico, installabile come PWA. Pubblicato su Netlify.

## Sviluppo

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # export statico in out/
pnpm lint
```

## Contenuti

- `src/data/games.json`: catalogo dei giochi (metadati, filtri, tavolo virtuale)
- `src/data/rules/<id>.md`: regole di ogni gioco (fonte principale: [pagat.com](https://www.pagat.com))
- `src/data/glossary.json`, `src/data/mazzi.json`: glossario e schede dei mazzi
- `public/images/decks/*.webp`: copertine dei mazzi (anche immagini Open Graph)

## Variabili d'ambiente

- `NEXT_PUBLIC_SITE_URL`: URL pubblico, usato per canonical, sitemap e Open Graph
- `NEXT_PUBLIC_CF_BEACON_TOKEN` (opzionale): Cloudflare Web Analytics
