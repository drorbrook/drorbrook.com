# drorbrook.com

Personal website of Dror Brook — engineering manager, podcaster, writer, and mentor.

It's a single page with a tab bar at the top. **About** is the default tab (a short
intro / hero); the rest link out to Dror's content:

- **About** — intro and short bio
- **Blogs** — curated links to posts on Medium
- **Podcast** — Beyond The Sprint (Spotify + podcast site)
- **Talks** — video lectures (e.g. Tech Gym), embedded
- **Contact** — LinkedIn & GitHub, plus a free first mentoring call via an external scheduler

Each tab links to an in-page anchor (`/#blogs`, `/#talks`, …), so tabs are deep-linkable.

## Content

No CMS. Structured content lives in typed data files under [`data/`](data/) — edit and commit to
update the site:

- `data/site.ts` — name, tagline, socials, scheduler URL, and profile photo path
- `data/blogs.ts` / `data/talks.ts` — one entry per article / talk
- `data/podcasts.ts` — the podcast entry

The profile photo lives in [`public/`](public/) (currently `public/profile.jpeg`); point
`site.photo` at it. A few values are still placeholders marked `TODO` (e.g. the mentoring
scheduler link) — swap them for real values before launch.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (light + dark themes via `next-themes`)
- Jest + React Testing Library
- Deployed on Vercel

## Development

```bash
npm run dev     # local dev server
npm test        # run test suite
npm run build   # production build
```
