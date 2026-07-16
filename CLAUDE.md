# liminal-prototype — CLAUDE.md

The **public demo surface + design-system reference**. Live demos at `liminalshruti.github.io/liminal-prototype/`. Houses the current canonical `design-tokens.css` (until Step 8 moves it upstream to `liminal-creative/tokens/`). See `README.md`.

## Shared core (bio / brand / voice — single source of truth, all tools)

**`~/liminal/founder-brain/meta/SHARED_CONTEXT.md`** — read for any bio/brand/voice/positioning question. Inherited by Claude Code, Cursor, and Cowork. This is a PUBLIC demo surface, so bio/brand hard-stops are load-bearing. Bio hard-stops (inlined):

<!-- BANNED: "Stanford GSB MBA" / "SPC fellow" / "Liminal Space" as entity -->
- Shruti did **NOT** attend Stanford, holds **NO** Stanford GSB MBA, is **NOT** a South Park Commons member. UC Berkeley (CogSci + CS); ex-PM Asana/Cloudflare/Robinhood/Ancestry; co-founder Sean Nejad.
- Brand is **"Liminal"** (one word). Core sentence: "Liminal gives form to inner life." Visual register + type stack per SHARED_CONTEXT §2 (Nineties Headliner + Perfectly Nineties + Geist Mono; no Inter/Helvetica/system-ui).

## Repo scope (local — what lives here)

- Public prototype + design-system reference; HTML demo cuts (`cuts/*.html`) + `index.html`.
- **Design tokens:** this repo currently holds the canonical `design-tokens.css` (the practical source until the reorg moves it to `liminal-creative/tokens/`). When editing tokens, this is the upstream — keep cuts consuming the canonical tokens, not inline hardcoded values.
- Stack: HTML/CSS + light build (`package.json`).

## Workspace navigation

- **`~/liminal/founder-brain/`** — canon. Read `meta/SHARED_CONTEXT.md` + `meta/CORPUS_MAP.md` first. **`REPOS.md`** = repo inventory ("public demo surface").
- **`~/liminal/liminal-creative/`** — brand canon + the eventual token upstream.

## Commands (verified against package.json 2026-07-15)

```bash
npm install           # deps
npm run dev           # local server (node server.mjs) — cuts served from cuts/*.html
npm run tokens:check  # verify design-tokens sync vs upstream (liminal-creative)
npm run tokens:sync   # pull upstream tokens (Step-8 interim: THIS repo's tokens file is the practical source; canonicalization deferred — keep cuts consuming tokens, never hardcode)
```
Deploy: GitHub Pages serves `main` at liminalshruti.github.io/liminal-prototype — merging to main IS the deploy.
