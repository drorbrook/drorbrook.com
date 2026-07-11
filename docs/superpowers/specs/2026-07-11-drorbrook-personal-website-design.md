# drorbrook.com — Personal Website Design Spec

**Date:** 2026-07-11
**Author:** Dror Brook (with Claude Code)
**Status:** Approved design — pending implementation plan

## 1. Overview

A personal website for **Dror Brook** — engineering manager, podcaster, writer, speaker, and
mentor. The site is a hub that introduces Dror and links out to his content across the web
(articles, podcast, video talks) and offers a way to book mentoring.

- **Audience:** engineering managers, mentees, professional network (international).
- **Language:** English only, left-to-right (LTR).
- **No backend, no database.** All content is either static, typed data files committed to the
  repo, or links/embeds to external services.

## 2. Tech Stack

| Concern    | Choice |
|------------|--------|
| Framework  | Next.js (App Router), TypeScript |
| Styling    | Tailwind CSS |
| Deployment | Vercel (git-push deploys) |
| Testing    | Jest + React Testing Library |
| CI         | GitHub Actions on every PR (`npm test` + `npm run build`) |
| Repo       | `drorbrook.com` (public) at `~/src/github.com/drorbrook/drorbrook.com` |

## 3. Pages & Navigation

Top nav (and footer socials on every page): **Home · About · Writing · Podcast · Talks ·
Mentoring · Contact**

| Route        | Purpose |
|--------------|---------|
| `/`          | Home — hero (name, one-line pitch, photo), quick links out to each section |
| `/about`     | Bio, engineering-management background, career, photo |
| `/writing`   | Curated cards linking to external posts (Medium, giffgaff, Monzo, …) |
| `/podcast`   | Beyond the Sprint — description, Spotify link, link to the podcast site |
| `/talks`     | Video lectures (Tech Gym, …) — embedded or thumbnail-linked |
| `/mentoring` | Mentoring pitch + embedded external scheduler (Calendly / Cal.com) |
| `/contact`   | LinkedIn + GitHub links + short "get in touch" prompt |

Footer (all pages): LinkedIn + GitHub.

## 4. Content Model

No CMS. Structured content lives in typed data files that Dror edits and commits. Adding a new
article/talk means adding one entry to a file.

- `data/site.ts` — site config: name, tagline, socials (LinkedIn, GitHub), scheduler URL,
  contact email.
- `data/writing.ts` — array of `{ title, publication, url, date, description }`.
- `data/talks.ts` — array of `{ title, platform, url, thumbnail?, description }`.
- `data/podcasts.ts` — Beyond the Sprint entry `{ name, description, spotifyUrl, siteUrl }`.

Each data type gets a TypeScript type/interface so entries are validated at build time.

## 5. External Integrations

- **Mentoring scheduler:** external service (Calendly or Cal.com), embedded via iframe or linked
  as a CTA. No availability logic in this codebase.
- **Podcast:** links to Spotify show and the Beyond the Sprint website.
- **Talks:** video lectures embedded (e.g. YouTube/Vimeo iframe) or thumbnail-linked out.

## 6. Design Language

Clean, professional, and personal. This is a distinct brand from the Beyond the Sprint podcast,
so it gets its own visual identity rather than reusing the podcast's orange/teal palette. A
specific palette and typography proposal will be presented during UI implementation.

## 7. Testing Strategy

- Component/render tests (Jest + React Testing Library) for each page and shared components
  (nav, footer, cards).
- Data files validated at build time via their TypeScript types.
- CI runs `npm test` + `npm run build` on every PR.

## 8. Non-Goals (YAGNI)

- No CMS or database.
- No authentication.
- No custom booking/scheduling backend (delegated to external scheduler).
- No self-hosted long-form blog posts (writing is curated external links).
- No bilingual/RTL support (English/LTR only).

## 9. Open Items (content to be supplied, non-blocking)

These are placeholders during build; real values dropped in before launch:

- Exact article URLs + metadata for the Writing page.
- The 2 Tech Gym video lecture URLs (+ any others).
- Calendly / Cal.com scheduler URL.
- LinkedIn and GitHub profile URLs.
- Contact email address.
- Profile photo(s).

## 10. Deployment

- Deployed to Vercel, connected to the GitHub repo for git-push deploys.
- Custom domain: `drorbrook.com` (to be connected in Vercel).
