# drorbrook.com

Personal website of Dror Brook — engineering manager, podcaster, writer, and mentor.

## Sections

- **Home** — intro and links out to everything
- **About** — bio and background
- **Blogs** — curated links to posts published on Medium, giffgaff, Monzo, etc.
- **Podcast** — Beyond the Sprint
- **Talks** — video lectures (Tech Gym, etc.)
- **Contact** — get in touch, plus a free first mentoring call booked via an external scheduler, and LinkedIn & GitHub

## Content

No CMS. Structured content lives in typed data files under [`data/`](data/) — edit and commit to
update the site. Adding an article or talk means adding one entry to `data/blogs.ts` /
`data/talks.ts`. Placeholder values marked `TODO` are swapped for real content before launch.

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
