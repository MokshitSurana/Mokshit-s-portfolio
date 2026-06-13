# Mokshit Surana — Portfolio

A minimal, single-page portfolio built with Next.js (App Router) and Tailwind CSS v4.

## Features

- Dark / light theme toggle (persisted, no flash on load)
- Scroll-reveal animations and a cursor-following accent glow
- Sections: About, Experience, Projects, Research, Stack, Contact
- Auto-generated favicon and Open Graph / Twitter preview image
- Static export, deploys anywhere

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Editing content

All site content lives in [`src/lib/data.ts`](src/lib/data.ts): profile, about,
experience, projects, publications, skills, education, and awards. The résumé PDF
is served from [`public/`](public/).

## Deploy

Optimized for [Vercel](https://vercel.com). After importing the repo, optionally set
`NEXT_PUBLIC_SITE_URL` to your final domain so social preview URLs resolve correctly
(otherwise Vercel's deployment URL is used automatically).
