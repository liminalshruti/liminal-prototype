# Extraction-Foundry Audit — `liminal-prototype`

*Branch: `foundry/proof-to-port-architecture` · 2026-06-18*

---

## Preface — how to read this repo

**`liminal-prototype` is a proof-to-surface porting repo.** Its job is not to be a
finished product; it is to *prove* surfaces and loops, then hand portable pieces of
that proof to the product spine (`liminal-desktop`) and the canon upstream
(`liminal-creative`).

It contains **two architectures today**:

1. **The modular slate-tray wedge app** — `cuts/01-slate-tray.html` → `lib/boot.js`,
   a properly layered ES-module app (pure state → render modules → glue, with a
   `ctx` callback object to avoid import cycles). This is the only cut that consumes
   the `lib/` stack.
2. **Monolithic showroom cuts** — the other ~9 `cuts/*.html` are self-contained
   single files that share only `design-system/tokens/design-tokens.css` and
   `lib/cut-shell.css`. Each is a fork of shared concepts that drifts independently.

**The goal of this audit is not to immediately refactor every cut.** It is to
identify, in order of leverage:

- **Portable primitives** — logic/components/schemas that can be lifted into shared
  `@liminal/*` modules and consumed by desktop/agents/prototype alike.
- **Proof/status metadata** — what is hi-fi vs mock vs aspirational, so a port never
  carries an overclaim into the product spine.
- **Convergence seams** — the places where the two architectures (and the three
  canon-mirrored artifacts) should collapse to a single source instead of drifting.

The refactor itself is staged (see §8). This document is the Stage 0 map.

> **Framing fact that drives every finding below:** only `01-slate-tray.html`
> consumes the modular `lib/` stack via `boot.js`. Every other cut is a
> self-contained single-file HTML sharing only `cut-shell.css` + `design-tokens.css`.
> So this repo is really *two architectures coexisting*: one modularized app (the
> slate-tray wedge) and ~9 monolithic demo files. That split drives almost
> everything that follows.

---

## 1. Repo shape

- **Framework/build:** **None.** Vanilla ES modules + HTML + CSS, zero bundler.
  `package.json:type=module`. The only "build" is `build:kernel` (a `bun build` of an
  *external* repo `../liminal-test/src/browser.ts` → `lib/osint-kernel.bundle.js`).
  Buildless is deliberate — it is served raw by GitHub Pages.
- **Entry points:**
  - `index.html` — the catalog/launcher (links to 10 cuts; inline `<style>`, no lib).
  - `cuts/01-slate-tray.html` → `lib/boot.js` — the **only** JS-app entry.
  - Each other `cuts/*.html` — independent entry, self-contained.
  - `server.mjs` — dev server (SSE live-reload + read-only git `/__state` endpoint).
- **Directories:**
  - `lib/` — the modular JS app (state, tray, slate, agency, vault-store, undo,
    keyboard) + bundled kernel + two big CSS files (`cut-shell.css` ~104KB,
    `brand-upgrade.css` ~30KB).
  - `cuts/` — the demo catalog; `_archive/`, `_explore/`, `_template.html`,
    `_console.html` are scaffolding.
  - `design-system/` — `tokens/` (canon `design-tokens.css` + `token-contract.md`),
    `components/` (`buttons.css`, `framing.css`), `atlas/`, `docs/`, `fonts/`.
  - `scripts/tokens/` — `sync-upstream.mjs` (md5 drift guard), `pre-push-check.sh`.
  - `molehunt/`, `team-drift/` — standalone mini-apps (own `index.html`).
- **Important config:** `package.json`, `v0_3_config.js` (1460 lines — the product
  data spine), `design-system/tokens/design-tokens.css` (the canon token file),
  `.gitignore` (extensive scratch-exclusion).
- **Runtime assumptions:** browser-only; `window.indexedDB`; sibling repos exist for
  tooling (`../liminal-creative`, `../liminal-test`) but the *deployed* site never
  needs them (committed copies); fonts loaded from local `fonts/` + Geist Mono from
  Google Fonts.

---

## 2. Product surface map

- **Screens/routes:** file-based, no router. `index.html` (catalog) → each cut is a
  "screen": `01-slate-tray` (the wedge workspace), `00-agency` (subject-as-parameter
  master), `02-forensic`, `03-calibration` (vault heatmap), `04-onboarding`,
  `08-custody`, `09-osint` (live kernel), `10-today` (re-entry), `11-govern`. Plus
  `molehunt/`, `team-drift/`.
- **Core flows:** The **product loop** (Tray → bounded agents read → disagree/refuse
  → correct → vault → next move). Only `01-slate-tray` implements it fully via lib;
  `11-govern` re-implements a "correction-as-primary" variant inline.
- **Core entities/nouns:** `Product` (personal/team/business), `Context` /`Subject`
  /`Case`/`Thread`, `Tile` (a tray source), `Slate` (composition), `Agent` (12, in 4
  registers), `Correction` (9-tag taxonomy), `Decision`/`Disposition`, `Vault` entry,
  `ConsentClass`/clearance-level.
- **User actions:** drag/tap tile → slate; correct an agent read (tagged); disposition
  (primary/defer); undo (⌘Z, 5 deep); surface/context switch (⌘1/2/3, ⌘[ ]); keyboard
  palette.
- **Where behavior lives:** `v0_3_config.js` (all scenario data), `lib/state.js`
  (state machine), `lib/slate.js` (the heaviest behavior file, 728 lines —
  brief/disposition/audit), `lib/agency.js` (agent liveness ticker).

---

## 3. Design-system map

- **Tokens:** centralized and *canon-governed* — `design-system/tokens/design-tokens.css`
  is the single source (12-wheel color, type scale, spacing, motion, app-scale
  register). It is a **mirror** of `../liminal-creative/tokens/design-tokens.css`,
  kept byte-identical by `sync-upstream.mjs` (md5 check). This is the healthiest part
  of the repo.
- **Component primitives:** `design-system/components/buttons.css`, `framing.css`
  (also canon-synced). `lib/cut-shell.css` (~104KB) is the shared chrome consumed by
  **every** cut.
- **Centralized vs scattered:** **Tokens centralized; component CSS scattered.**
  `cut-shell.css` is shared, but each monolithic cut also carries large inline
  `<style>` blocks (e.g. `index.html` has ~200 lines of inline CSS *redefining*
  `:root` surface vars that already exist in tokens — see the `--text-faint` cascade
  comment, a known footgun).
- **True primitives vs one-offs:** Primitives = tokens, `buttons.css`, `framing.css`,
  `cut-shell.css` chrome. One-offs = the per-cut inline styles and the
  `classification.js` banner (Business-surface-specific).
- **Repeated patterns to extract:** the agent-register console (4 registers × agents),
  the tile/preview card, the correction-tag picker, the disposition/"next move" panel,
  the audit ribbon, the ⌘K palette (appears in `11-govern` and `surface-nav.js`
  independently). These recur visually across cuts but are reimplemented per-file.

---

## 4. Logic map

| Logic | File · symbol | What it does | Deps | Portable? | Blocker |
|---|---|---|---|---|---|
| **Domain: persistence** | `lib/vault-store.js` · `init/appendCorrection/read/...` | IndexedDB store for corrections + decisions; frozen 9-tag schema + validation | `window.indexedDB` only | **Yes (5/5)** | None — already standalone |
| **Domain: correction taxonomy** | `lib/vault-store.js` · `CORRECTION_TAGS/_LABELS/_DESCRIPTIONS` + `isValidTag` | The canonical 9-tag schema (mirror of `liminal-agents`) | none | **Yes (5/5)** | Should become the shared source, not a mirror |
| **UI state** | `lib/state.js` · all | Pure mutable state + derived accessors (subject/tiles/clearance) | `v0_3_config.js` | Partial (3/5) | Hard import of 1460-line config |
| **Interaction: undo** | `lib/undo.js` · `popUndo(ctx)` | Inverts last slate action w/ surface-hop, via injected `ctx` | `state.js` + ctx | **Yes (4/5)** | Touches `document.body.dataset` directly |
| **Interaction: keyboard** | `lib/keyboard.js` · `wireKeyboard(ctx)` | Unified ⌘-shortcut layer + help overlay | `state.js`, config | Partial (3/5) | DOM-id coupled, config import |
| **Render: agency rail** | `lib/agency.js` · `tickAgencyRail/renderConsole` | 12-agent liveness ticker + disagreement edge | `state.js` | Partial (3/5) | `Math.random` ticker + DOM-id coupled |
| **Render: tray** | `lib/tray.js` · `renderTray(ctx)` | Tile catalog render + drag/drop wiring | `state.js`, `previews.js` | Low (2/5) | Per-surface copy baked in |
| **Render: slate** | `lib/slate.js` (728 ln) · 10 exports | Composition + brief + disposition + audit | `state.js`, config, vault-store | Low (2/5) | Largest file, mixes everything |
| **Glue** | `lib/boot.js` (~700 ln) · ctx wiring | Wires all modules; the `ctx` callback object avoids import cycles | everything | No (1/5) | It IS the app glue |
| **Data transform** | `lib/osint-kernel.bundle.js` | Built artifact from `../liminal-test` | external | N/A | Generated; edit upstream |
| **Adapter** | `server.mjs` · `workingTreeState()` | Read-only git introspection → JSON for Substrate Console | `node:child_process` | **Yes (4/5)** | Node-only, self-contained |
| **Tooling** | `scripts/tokens/sync-upstream.mjs` | md5 drift guard copying canon → local | `node:fs/crypto` | **Yes (5/5)** | Path-config only |

---

## 5. Coupling audit

- **Rendering + business logic:** `lib/slate.js` — `materializeDisposition` /
  `renderBrief` mix DOM building with disposition rules and vault writes in one file.
- **Rendering + styling tokens:** `index.html` and each monolithic cut redefine
  `:root` surface vars inline (the `--text-faint` cascade comment in `index.html`
  literally documents the inline block *overriding* `design-tokens.css`). That is
  drift waiting to happen.
- **Product state + local component state:** Mostly clean — `state.js` isolates
  product state. The leak is direct DOM mutation from `undo.js`
  (`document.body.dataset.product`, tab `classList`) instead of going through a
  render callback.
- **Domain logic + framework APIs:** Minimal (no framework). The Node coupling in
  `server.mjs` is correctly isolated.
- **Reusable primitive + one-off assumptions:** `tray.js`/`agency.js` hardcode
  per-surface vocabulary (personal/team/business copy branches inside the render loop)
  — a generic tile/console primitive is buried under product-specific
  `if (activeProductId === ...)` ladders.
- **Side effects + pure transforms:** `agency.js` ticker uses `Math.random()` +
  `setInterval` inline with render — nondeterministic, untestable as-is.

---

## 6. Extraction candidates (ranked)

| # | Name | Location | Why valuable | Module kind | Score | Deps | Change before extraction | Destination |
|---|---|---|---|---|---|---|---|---|
| 1 | **vault-store** | `lib/vault-store.js` | Credible local-first persistence; every surface needs it | schema + adapter | **5** | IndexedDB | Parameterize DB name; accept schema config | `@liminal/vault-store` |
| 2 | **correction-tags** | `lib/vault-store.js` top | The 9-tag canon, currently *mirrored* in 3 repos | schema | **5** | none | Make this the source; others import it | `@liminal/correction-tags` |
| 3 | **token-sync** | `scripts/tokens/sync-upstream.mjs` | Drift guard reused across desktop too | transformer/tool | **5** | node fs/crypto | Externalize file-map config | `@liminal/token-sync` |
| 4 | **design-tokens.css** | `design-system/tokens/` | Already canon; the visual contract | token | **5** | none | Already portable (it is a mirror) | stays in `liminal-creative` |
| 5 | **working-tree-state** | `server.mjs` `workingTreeState()` | Parallel-session git awareness | adapter | **4** | node child_process | Extract from server into module | `@liminal/git-introspect` |
| 6 | **undo-stack** | `lib/undo.js` + `state.js` undo bits | ctx-injection undo, framework-agnostic | interaction primitive | **4** | ctx | Remove direct `document.body` writes → callback | `@liminal/undo` |
| 7 | **keyboard layer** | `lib/keyboard.js` | Reusable ⌘-shortcut + help overlay | interaction primitive | **3** | DOM ids, config | Pass element refs not ids; drop config import | `@liminal/keymap` |
| 8 | **agent-register model** | `lib/agency.js` `REGISTERS/REGISTER_AGENTS/AGENT_FLAT` | The 4-register/12-agent ontology (data) | schema | **4** | none | Split data from the ticker render | `@liminal/agent-ontology` |
| 9 | **agency ticker** | `lib/agency.js` `tickAgencyRail` | Liveness/disagreement state machine | state machine | **2** | random, DOM | Make pure: inject RNG + return state, render separately | `@liminal/agency-fsm` |
| 10 | **cut-shell chrome** | `lib/cut-shell.css` | Shared chrome across all 10 cuts | theme/layout | **3** | tokens | Audit for per-cut dead rules (~104KB); split into layers | `@liminal/cut-shell` |

---

## 7. Refactor/redesign risks

- **Fragile:** `index.html` inline `:root` override of canon tokens (`--text-faint`
  comment is a self-documenting footgun). Any token change can silently lose to the
  inline block.
- **Overly large:** `v0_3_config.js` (1460 ln, 32 exports — product data, copy, ethics,
  scenarios all in one), `lib/cut-shell.css` (~104KB), `lib/slate.js` (728 ln),
  `lib/boot.js` (~700 ln), `08-liminal-custody.html` (~104KB single file),
  `11-govern.html` (~70KB).
- **Duplicated concepts:** correction-tag taxonomy mirrored across 3 repos (admits it
  in the comment); ⌘K palette built twice (`surface-nav.js` IIFE *and* inside
  `11-govern`); per-surface vocabulary duplicated in `tray.js` + `slate.js` + `agency.js`.
- **Unclear naming:** "cut" (a demo), "surface"/"product"/"context"/"subject"/"case"
  /"thread" overlap; `00-agency.html` vs `lib/agency.js` are unrelated.
- **Dead-code candidates:** `index-pre-modular.html.bak` (~180KB), `embed-agent-hack.html`,
  multiple `*-specimen.html`, `cuts/_archive/*`, `cuts/_explore/*`, `_baseline/`.
- **Design-system drift:** the inline-`:root` pattern in monolithic cuts;
  `brand-upgrade.css` is flagged *non-canon* (uses Cougar font, predates the 2026-05-14
  lock) yet still in `lib/`.
- **Architectural seams (the good news):** `lib/state.js` ↔ render modules, the `ctx`
  callback object, and the canon-token contract are clean seams to build extraction on.
- **Vibe-coded maintenance traps:** the 9 monolithic cuts — each is a fork of shared
  concepts that will drift independently. `11-govern`'s +722-line growth (recently
  merged) is the warning sign: product logic accreting inside a "demo" file.

---

## 8. Recommended hardening plan (staged)

**Stage 0 — document & map** *(this audit)*
- Persist this audit; reconcile against existing
  `CUT_TAXONOMY_AND_PORT_FINDINGS_2026-06-16.md` and
  `design-system/DESIGN_SYSTEM_SYSTEMATIZATION_2026-06-17.md` (they overlap — dedupe).
- Mark dead-code candidates (§7) explicitly.

**Stage 1 — isolate experiments**
- Move `*.bak`, `embed-*-hack.html`, `*-specimen.html`, and confirm `cuts/_archive`,
  `_explore`, `_baseline` are quarantined (not deployed). Decide: delete vs `_archive`.
- Quarantine `lib/brand-upgrade.css` (non-canon per its own comment).

**Stage 2 — extract obvious primitives** *(scores 5)*
- Pull `vault-store.js`, `correction-tags` (from inside it), and
  `scripts/tokens/sync-upstream.mjs` into standalone modules. These have zero blockers.
- Extract `workingTreeState()` out of `server.mjs`.

**Stage 3 — separate domain/state from UI**
- Split `v0_3_config.js` into `data/` (scenarios) vs `copy/` vs `ontology/` modules so
  `state.js` imports only what it needs.
- Make `agency.js` pure: separate the data (`REGISTERS`/`REGISTER_AGENTS`) from the
  ticker; inject RNG so the FSM is testable.
- Remove direct `document.body` writes from `undo.js` (route through `ctx`).

**Stage 4 — formalize design-system tokens/components**
- Kill all inline `:root` overrides in `index.html` + monolithic cuts; consume tokens
  only. Add a CI check (extend `sync-upstream.mjs --check`) that fails on inline token
  redefinition.
- Audit `cut-shell.css` (~104KB) for per-cut dead rules; split into
  `chrome` + `register` + `cut-specific` layers.

**Stage 5 — prepare portable packages**
- Promote the Stage-2 extractions to `@liminal/*` packages (vault-store,
  correction-tags, token-sync, git-introspect).
- Reconcile the agent ontology + correction taxonomy so `liminal-prototype`,
  `liminal-desktop`, and `liminal-agents` import *one* source instead of mirroring.

---

## Through-line

The highest-leverage move is **not** refactoring the cuts — it is recognizing that the
three canon-mirrored artifacts (**design-tokens**, **correction-tags**,
**agent-ontology**) are the real portable assets, already half-extracted. They are
"mirrors" today; making them *sources* eliminates the cross-repo drift.

The repo has good bones in exactly one place (`lib/state.js` + the `ctx`-injection
pattern), and that pattern is the template for everything else. The monolithic cuts are
not the foundry — `lib/` is. The cuts are the showroom.

---

## 9. Reconciliation with `REPO_ATLAS.md` (added 2026-06-18)

A parallel session produced `REPO_ATLAS.md`, a second Stage-0 map of this repo. The two
documents were written independently and partly disagree. This section reconciles them so
the branch has one operating frame, not two competing ones.

**Resolved direction (per the branch premise `foundry/proof-to-port-architecture`):**
this repo *is* the proof-to-port foundry. Where `REPO_ATLAS` left extraction direction
open (its §5 "decision menu" A/B/C) and leaned toward "this is NOT the foundry; the spine
is `liminal-desktop`," the branch name records the founder decision: **Direction C — make
this the proof-to-port repo.** `REPO_ATLAS`'s findings are folded in below as *inputs* to
that frame, not as a competing thesis.

### Where the two maps agree (cross-validated — treat as high-confidence)
- **Cleanest seams are the same.** Both independently name `vault-store`, `undo`,
  `keyboard`, and `state` as the most portable `lib/` modules. Two independent reads
  landing on the same shortlist is strong signal.
- **Tokens are the canon contract.** Both treat `design-system/tokens/design-tokens.css`
  as a synced mirror of `liminal-creative`, governed by `sync-upstream.mjs`.
- **The inline-`:root` blind spot is real.** Both flag that monolithic cuts (and
  `cut-shell.css`) carry `:root` token redefinitions that `tokens:check` cannot see — the
  true alignment risk. (See §5, §7 here; `REPO_ATLAS` §4 "second drift surface.")
- **`osint-kernel.bundle.js` is a frozen artifact.** Source not in workspace;
  `build:kernel` cannot regenerate it. Treat as opaque.

### Where `REPO_ATLAS` corrects this audit (fold these in)
1. **"Extract" means re-implement against a contract, not lift-and-shift.** This audit's
   §6 destination column (`@liminal/vault-store`, etc.) reads as if vanilla-JS modules
   drop into the spine directly. They do not: the spine is **SolidJS/Tauri + Panda**, so a
   portable module here is a portable *contract/schema/logic*, and landing it on the spine
   is a re-implementation against that contract. The §6 portability scores should be read
   as **conceptual portability** (how clean the logic/schema is to re-express), not
   drop-in code reuse. (`REPO_ATLAS` §5-B.)
2. **`liminal-desktop` is the product spine, not a peer extraction target.** The foundry's
   *output direction* is toward the spine. This repo proves surfaces and hands contracts
   to desktop; it is not a second source-of-truth for the product itself. Holding this
   distinction is what prevents Direction C from becoming "two competing spines" (the
   precise risk `REPO_ATLAS` §5-C names).
3. **The live token drift `REPO_ATLAS` recorded is now closed.** `REPO_ATLAS` §4 logged
   `tokens:check ❌ FAILED` (local `e138b7a6…` ≠ canon `a02db42b…`). As of 2026-06-18 a
   `tokens:sync` has been run; `tokens:check` now passes (`a02db42b…` matches canon). The
   working-tree edit to `design-tokens.css` is that sync (the pigment-physics
   `-wash`/`-stain`/`-dry` layer), verified canon — not a hand-edit.

### What `REPO_ATLAS` adds that this audit lacked (adopt as companion data)
- **A canon-vs-exhaust file census** (`REPO_ATLAS` §1): classifies every root entry as
  CANON / DOC / ARCHIVE / EXHAUST. This is the concrete backing for this audit's Stage 1
  ("isolate experiments") — the ~33 root PNGs, `index-pre-modular.html.bak` (~180KB),
  `v0_3_config.js` (pending dead-code confirmation), `_scratch/`, `_baseline/` are the
  named cleanup targets.
- **Measured reuse counts per `lib/` module** (`REPO_ATLAS` §3): how many surfaces load
  each module by `grep`. `cut-shell.css` (loaded by 16) is the genuine spine;
  `surface-nav` (6), `brand-upgrade` (5). This quantifies the "shared vs one-off" claim in
  §3/§4 here.
- **An upstream-enforcement menu** (`REPO_ATLAS` §4): drift dashboard, inline-`:root`
  linter, symlink option — concrete ways to harden the token contract from the
  `liminal-creative` side. Feeds this audit's Stage 4.

### Net frame for the branch
- **This audit** = the *portability* view (what's portable, coupling, ranked candidates).
- **`REPO_ATLAS`** = the *navigability + drift* view (canon vs exhaust, measured reuse,
  alignment topology).
- **Together** = the Stage 0 map. Read this audit for *what to extract and in what order*;
  read `REPO_ATLAS` §1 for *what to clean up first* and §4 for *the token-contract state*.
- **The one open item neither resolves and the branch does:** "is this the foundry?" —
  answered **yes**, with the discipline that its output flows *to* the `liminal-desktop`
  spine as contracts, never as a second product source-of-truth.
