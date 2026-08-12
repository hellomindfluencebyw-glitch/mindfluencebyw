# Mindfluence by W

A living, cursor-reactive neural brain as the hero of the Mindfluence by W site.
Built with Next.js (App Router), TypeScript, React Three Fiber, and Framer Motion,
per the creative direction brief.

This is section 1 of the full build (Hero). The rest of the brain map — Navigation,
Frontal Lobe, Limbic System, Hippocampus, Occipital Lobe, Broca's Area, Founder,
Services, Contact — gets added the same way, one section at a time. See the
commented list in `app/page.tsx`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Hot reload is on, so edits show up instantly.

## Project structure

```
app/
  layout.tsx        — fonts (Fraunces / Inter / IBM Plex Mono) + metadata
  page.tsx           — assembles sections in order
  globals.css         — design tokens + hero styling
components/
  hero/
    Hero.tsx           — headline, CTA, layout
    BrainScene.tsx      — the R3F neural network (client-only)
    FloatingThoughts.tsx — the drifting words
    RegionsPanel.tsx    — post-zoom teaser, will become real nav
lib/
  brain.ts            — particle/edge generation + color tokens, shared
                         by every brain visualization in the site
```

## Design tokens

Defined once in `lib/brain.ts` (three.js colors) and mirrored in `app/globals.css`
(CSS variables) so every future section stays visually consistent:

| Token       | Value     |
| ----------- | --------- |
| Background  | `#05080a` |
| Teal (dim)  | `#0f4a47` |
| Teal        | `#3fe9d6` |
| Teal (hot)  | `#aefff2` |
| Ink         | `#f4f8f7` |

## Deploying

This project is configured with `output: "export"` in `next.config.mjs`, so it
builds to a static `out/` folder — the same kind of static hosting your current
portfolio uses.

### Option A — GitHub Pages (matches your current setup)

A workflow is already set up at `.github/workflows/deploy.yml`. Steps:

1. Push this repo to GitHub.
2. In the repo's **Settings → Pages**, set **Source** to "GitHub Actions."
3. Push to `main` — it builds and deploys automatically.
4. Your site will be live at `https://<you>.github.io/<repo-name>/`.

If you want a custom domain instead of the `/repo-name/` subpath, add a `CNAME`
file to `public/` and remove the `NEXT_PUBLIC_BASE_PATH` line from the workflow.

### Option B — Vercel (recommended if you ever want a real contact form / CMS)

GitHub Pages can only serve static files, so the eventual Contact section form
and any CMS-backed content (the brief asks for "easily editable CMS/content
structure") will need a small server at some point. Vercel gives you that for
free with zero config:

```bash
npx vercel
```

You can start on GitHub Pages now and move to Vercel later without touching
your component code — only `next.config.mjs` changes.

## Notes on the brief

- **Fonts**: self-hosted via `next/font/google` at build time (no external
  request at runtime, no flash of unstyled text).
- **Colour**: electric teal on near-black, as specified — this overrides the
  crimson accent from your earlier portfolio direction, per the brief.
- **Brain shape**: deliberately abstract (two offset ellipsoid lobes), not
  anatomical, per "not a medical brain."
- **Accessibility**: `prefers-reduced-motion` is respected — rotation slows,
  signal pulses are skipped, and drift animations are disabled.
- **R3F vs. Three.js**: previous in-chat prototype used raw three.js because
  the chat sandbox doesn't have React Three Fiber available; this real repo
  uses proper R3F/`@react-three/fiber` components as the brief specifies.
