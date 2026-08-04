# SIRA MAG

Site vitrine du média panafricain SIRA MAG, dédié aux femmes d'Afrique : actualités, mode de vie, success stories, SIRA TV et podcasts.

## Stack technique

- [Next.js 13](https://nextjs.org/) (App Router)
- React 18 + TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI)
- Lucide React (icônes)

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure du projet

```
app/                 Pages et routes (App Router)
components/
  layout/            Header, footer, menus
  home/               Sections de la page d'accueil
  shared/             Composants réutilisables (cartes articles, badges...)
  ui/                 Composants shadcn/ui
lib/                 Données de contenu et navigation
public/              Images et assets statiques
```

## Déploiement

Le projet est prêt pour un déploiement sur [Netlify](https://www.netlify.com/) :

- `netlify.toml` configure la commande de build (`npx next build`) et le plugin `@netlify/plugin-nextjs`.
- Il suffit de connecter le dépôt à Netlify (build automatique à chaque push), ou de builder localement et de déposer le résultat via l'interface Netlify.

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build de production |
| `npm start` | Lance le serveur en production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run typecheck` | Vérifie les types TypeScript |
