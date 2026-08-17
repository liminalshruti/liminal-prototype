# Design System: Liminal Desktop (product)

Per-repo design context for Claude Design / `/design-sync` and any
design-capable agent. This repo is the PRODUCT surface; the brand canon home is
`liminal-creative/DESIGN.md`.

## Token consumption (this repo never authors tokens)

- Upstream canon: `~/liminal/liminal-creative/tokens/design-tokens.css` — the
  single source of truth (consumer contract locked 2026-05-13).
- This repo consumes via generated Panda CSS config: `panda.tokens.gen.ts` is
  GENERATED from the canon file per `SPEC_TOKEN_CODEGEN.md`. Never hand-edit
  generated token files; change the canon upstream, then regenerate.
- App-scale register: the `--*-app-*` spacing/type/leading/tracking tokens (§19
  of the canon file) are the desktop's second scale — honestly labeled,
  additive.

The front matter above is generated from the same canon file by
`liminal-prototype`'s `scripts/design/gen-design-md.mjs`. It is the
agent-readable twin of the Panda codegen: same upstream, same
regenerate-don't-edit contract, one tier up. If it disagrees with
`panda.tokens.gen.ts`, one of the two is stale — check both against canon
rather than trusting either.

## Identity constraints (Ring-0, locked)

- Core sentence: "Liminal gives form to inner life."
- Type stack: Nineties Headliner (display) · Perfectly Nineties (serif) ·
  Space Grotesk (UI sans) · Space Mono (utility). Never Inter / Helvetica /
  system-ui as primary.
- Brand name is "Liminal" on every product surface.

> The type stack moved on 2026-07-29 (canon §5). This section declared the
> previous faces for three months after that ruling while calling itself
> locked, and `impeccable` reads this file — so every design pass in that
> window was briefed off a stale stack. The front matter is now derived, and
> `design:check` fails when this prose contradicts it. Read the resolved
> chains above rather than this summary if the two ever differ.

## Product design context

- Primary surface: the tray-deliberation loop (see `CLAUDE.md` scope reframe
  2026-05-12 and `docs/may-12-launch/03-design-tokens-and-patterns.md`).
- Semantic layers in the canon file this app uses heavily: §18 PRODUCT
  SEMANTICS (agent identity colors, overlays, reveal palette), functional UI
  bindings (`--ui-action-*`, `--ui-state-*`), relationship-edge tokens
  (`--ui-relationship-edge-*` keyed by `body[data-relationship]`), density
  scales (`body[data-density]`: anointed 1.10 / shared 1.00 / analyst 0.85).
- Visual register: product surfaces follow canon defaults; FLUID exploration
  (2026-07-03 ruling) applies to exploration surfaces, not shipped product
  chrome, unless a decision doc says otherwise.

## Related design tooling

- Design directions (creative briefs from the founder's saved inspiration):
  `liminal-creative/studio/data/directions.json`.
- Brand motion assets (deck/launch use): `liminal-creative/outputs/motion/`.
- Component design sync: `.design-sync/` in this repo (project
  `8849cf4c-e885-49e3-a500-c8afb76dd488`, 98 preview components, Solid→React
  bridging in `.design-sync/overrides/`). Its reference twin is
  `liminal-prototype`'s project `ae960dee-babe-4c97-a198-bb2e62379c22`.
