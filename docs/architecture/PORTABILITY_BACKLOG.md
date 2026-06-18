# Portability Backlog — `liminal-prototype`

*Branch: `foundry/proof-to-port-architecture` · 2026-06-18*
*Source: `docs/architecture/EXTRACTION_FOUNDRY_AUDIT_2026-06-18.md` §6 (ranked candidates) + §9 (reconciliation), `cuts/cut-manifests.json`.*

---

## How to read this

This is the ordered extraction plan derived from the Stage-0 audit. It groups the audit's
ranked candidates by **risk-to-extract**, not by score alone — because a 5/5-portable
schema with zero blockers is a different task than a 5/5 token file that is canon owned
elsewhere.

**Two disciplines from the operating model apply here:**

1. **First extractions are schemas / adapters / tools — not UI rewrites.** The "extract
   now" tier is deliberately non-visual.
2. **"Extract" means re-implement against a contract, not lift-and-shift.** The spine is
   SolidJS/Tauri + Panda. A portable asset here is a portable *contract/schema/logic*;
   landing it on the spine is a re-implementation. Scores are **conceptual portability**,
   not drop-in code reuse (audit §9).

**Source / mirror / consumer legend:**
- **SOURCE** — authored here; this repo is the origin of truth.
- **MIRROR** — synced copy of canon authored elsewhere (e.g. `liminal-creative`).
- **CONSUMER** — this repo uses it but does not own it.

No runtime code is changed by this document.

---

## Tier 1 — Extract now / low-risk

Non-visual, zero or near-zero blockers. These are the operating model's "schemas /
adapters / tools first."

| Candidate | Location | Value | Score | Blocker | Next action | Destination | Src/Mirror/Consumer |
|---|---|---|---|---|---|---|---|
| **correction-tags** | `lib/vault-store.js` (top: `CORRECTION_TAGS`/`_LABELS`/`_DESCRIPTIONS` + `isValidTag`) | The canonical 9-tag schema, currently MIRRORED across 3 repos by hand | 5 | None — pure data + a validator | Lift the frozen schema into a standalone module; make this (or a shared pkg) the SOURCE | `@liminal/correction-tags` | **MIRROR today → should become SOURCE.** Comment in file admits it mirrors `liminal-agents/lib/correction-tags.js` |
| **vault-store** | `lib/vault-store.js` | Credible local-first persistence (IndexedDB); every surface needs it; already standalone | 5 | None for the contract; `window.indexedDB`-bound for the impl | Extract the *contract* (append/read/count/clear + schema_version); re-implement on the spine against it | `@liminal/vault-store` | SOURCE (the contract); impl is browser-specific |
| **token-sync** | `scripts/tokens/sync-upstream.mjs` | md5 drift-guard; already mirrors `liminal-desktop`'s copy | 5 | None — path-config only | Externalize the file-map config; share one tool across prototype + desktop | `@liminal/token-sync` | SOURCE-ish (this is a duplicated tool — consolidate the two copies) |
| **working-tree-state** | `server.mjs` · `workingTreeState()` | Parallel-session git awareness (the `/__state` endpoint backing the Substrate Console) | 4 | Node-only; embedded in the dev server | Extract the function out of `server.mjs` into a module | `@liminal/git-introspect` | SOURCE |

---

## Tier 2 — Extract after decoupling

Genuinely portable logic, but each has a named coupling that must be cut first. These are
the audit's "change before extraction" items.

| Candidate | Location | Value | Score | Blocker | Next action | Destination | Src/Mirror/Consumer |
|---|---|---|---|---|---|---|---|
| **undo-stack** | `lib/undo.js` + undo bits in `lib/state.js` | Framework-agnostic ctx-injection undo (5 deep) | 4 | Touches `document.body.dataset` + tab `classList` directly | Route all DOM writes through the injected `ctx` callback; then the logic is pure | `@liminal/undo` | SOURCE |
| **agent-register model** | `lib/agency.js` · `REGISTERS`/`REGISTER_AGENTS`/`AGENT_FLAT` | The 4-register / 12-agent ontology (data) | 4 | Data is entangled with the liveness ticker in one file | Split the data (pure) from `tickAgencyRail` (render) | `@liminal/agent-ontology` | **MIRROR-ish** — overlaps the agent ontology in `liminal-agents`; reconcile to one source |
| **keyboard layer** | `lib/keyboard.js` · `wireKeyboard(ctx)` | Reusable ⌘-shortcut layer + help overlay | 3 | DOM-id coupled; imports `v0_3_config.js` for sibling lookup | Pass element refs not ids; drop the config import (inject the sibling list) | `@liminal/keymap` | SOURCE |
| **UI state core** | `lib/state.js` | Pure mutable state + derived accessors — the cleanest seam in the repo | 3 | Hard import of the 1460-line `v0_3_config.js` | Split `v0_3_config.js` into data/copy/ontology so `state.js` imports only data | (pairs with the app, not a standalone pkg yet) | SOURCE |

---

## Tier 3 — Design-system hardening

Not module extraction — contract enforcement on the canon that already flows through here.

| Item | Location | Value | Score | Blocker | Next action | Src/Mirror/Consumer |
|---|---|---|---|---|---|---|
| **design-tokens.css** | `design-system/tokens/design-tokens.css` | The visual contract; already canon | 5 | None — it is already a synced mirror | Keep consuming via `tokens:sync`; do NOT author here | **MIRROR** of `liminal-creative/tokens/design-tokens.css` (verified byte-match 2026-06-18) |
| **inline-`:root` drift** | `index.html` + monolithic cuts + `lib/cut-shell.css` | Closing the blind spot `tokens:check` cannot see | n/a | Inline token redefinitions shadow the linked canon | Add a linter (extend `sync-upstream.mjs --check`) that fails on token-name redefinition outside synced files | CONSUMER discipline |
| **cut-shell chrome** | `lib/cut-shell.css` (~104KB, loaded by 16 surfaces) | The genuine shared spine across all cuts | 3 | Monolithic; likely carries per-cut dead rules | Audit for dead rules; split into `chrome` + `register` + `cut-specific` layers | SOURCE (consumes tokens) |

---

## Tier 4 — Do not extract yet

Portable in principle but blocked, opaque, or premature. Listed so they are tracked, not
mistaken for ready.

| Candidate | Location | Why not yet | Score | Src/Mirror/Consumer |
|---|---|---|---|---|
| **agency ticker** | `lib/agency.js` · `tickAgencyRail` | Uses `Math.random()` + `setInterval` inline with render — nondeterministic, untestable. Must be made pure (inject RNG, return state, render separately) before it's a state machine worth extracting | 2 | SOURCE |
| **slate** | `lib/slate.js` (728 ln, 10 exports) | Largest behavior file; rendering + disposition rules + vault writes intertwined. Decompose first | 2 | SOURCE |
| **tray** | `lib/tray.js` | Per-surface vocabulary (personal/team/business) baked into the render loop; not generic yet | 2 | SOURCE |
| **boot** | `lib/boot.js` (~700 ln) | It IS the app glue — not meant to be portable | 1 | SOURCE |
| **osint-kernel** | `lib/osint-kernel.bundle.js` | FROZEN ARTIFACT — source (`../liminal-test`) not in workspace; `build:kernel` cannot regenerate it. Opaque. Edit upstream, not here | n/a | CONSUMER (built artifact) |
| **⌘K palette** | duplicated in `cuts/11-govern.html` + `lib/surface-nav.js` | Built twice; consolidate the duplication before considering extraction | n/a | SOURCE (needs dedupe) |

---

## The through-line (restated for the backlog)

The three **canon-mirrored** assets — **design-tokens** (MIRROR), **correction-tags**
(MIRROR→should be SOURCE), **agent-ontology** (MIRROR-ish) — are the highest-leverage
items not because they're hard, but because they're *drift surfaces*: each is maintained
by hand in more than one repo. Making them single-sourced eliminates a whole class of
cross-repo drift. Tier 1's `correction-tags` is the cleanest first move: a frozen schema,
zero blockers, currently hand-mirrored in 3 places.

Everything visual (Tiers 2–4 UI items) waits behind a contract. First the schema/adapter/
tool travels; the SolidJS re-implementation on the spine is downstream of it.

---

## Boundaries

- No runtime code changed by this document.
- "Destination `@liminal/*`" names are *proposed*, not created.
- Scores are conceptual portability (audit §9), not a promise of drop-in reuse.
