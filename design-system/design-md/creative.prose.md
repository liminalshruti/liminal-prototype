# Design System: Liminal Creative (canon)

This repo **authors** `tokens/design-tokens.css` — the single source of truth
every other Liminal surface consumes. It is the only repo where a token value
may be changed by hand.

This file exists because `liminal-desktop/DESIGN.md` cited it as "the brand
canon home" while it did not exist. An agent following that pointer found
nothing and fell back to whatever it already believed.

## What canon owns

- `tokens/design-tokens.css` — 19 sections: surface, the 12-wheel (7 factors +
  5 ornaments × 10-stop tonal scales), substrate, ink, type families, type
  scale, leading, tracking, spacing, shape, motion, shadow, legacy aliases,
  density, role, relationship, capability, product semantics, app scale.
- `tokens/components/framing.css` — the one component contract canon owns
  directly. Every other component contract is authored in `liminal-prototype`.
- `canon/DESIGN_SYSTEM.md`, `canon/CONTENT_VOICE.md`, `canon/ICONOGRAPHY.md` —
  the prose canon these tokens serve.

## The consumer contract

Consumers hold byte-identical flat copies, verified by md5, never symlinks — a
cross-repo symlink dangles on a sibling-less checkout and the CSS 404s on the
GitHub Pages deploy. Each consumer runs `sync-upstream.mjs` and a `--check`
drift guard.

Consumers today:

| Surface | Local copy | Consumption |
|---|---|---|
| `liminal-prototype` | `design-system/tokens/design-tokens.css` | raw CSS custom properties, buildless |
| `liminal-desktop` | `public/styles/design-tokens.css` | Panda codegen → `panda.tokens.gen.ts` |

## Why this file is generated

The token tier had a contract — sync script, md5, drift guard — and it held.
The agent-readable tier had none, and on 2026-07-29 canon §5 moved `--sans` and
`--mono` while every `DESIGN.md` kept declaring the previous faces. Agents read
the ungoverned tier, so the stale one is the one that shipped into design work.

Front matter here is derived from `tokens/design-tokens.css` by
`liminal-prototype`'s `scripts/design/gen-design-md.mjs`. Change a value
upstream in this repo, then regenerate. Prose lives in
`liminal-prototype/design-system/design-md/creative.prose.md`.

## Editing rules

- A token value changes **here**, never in a consumer. A consumer-local edit is
  a fork, and the drift guard exists to catch exactly that.
- Adding a hue is a canon decision, not a convenience. Read the "ADDING A -LIFT
  STOP" recipe in the token file header before adding any stop.
- Register names are indirections onto wheel hues (`--diligence:
  var(--clarity)`). Rebinding meaning is cheap; adding pigment is not. Brand 4
  (2026-07-29) remapped four registers without touching a single call site.
