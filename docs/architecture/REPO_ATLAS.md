# Repo Atlas — `liminal-prototype`

**Read-only map. 2026-06-18. Zero file moves performed by this document.**

Purpose: make this repo navigable (separate canonical from exhaust), describe what it
*actually is* (vanilla cut catalog, not a framework app), and draw the
`liminal-creative → liminal-prototype` alignment topology with **measured** drift state.

Extraction direction is left **open** (§5). This is the "map first, decide later" artifact.

> **What this repo is, in one line:** a single-file *cut catalog* (HTML + CSS + JS, no
> build step, served by `server.mjs`) that is the **public demo** of the Liminal loop AND
> a **synced consumer mirror** of the `liminal-creative` token canon. It is NOT a foundry
> and NOT the product spine — `liminal-desktop` (SolidJS/Tauri) is the spine and the real
> extraction target. (Source: `README.md`, `LIMINAL_END_TO_END_2026-06-18.md`.)

---

## 1. Canonical vs. exhaust — the navigability map

The pain: the *signal* (`cuts/`, `lib/`, `design-system/`) is buried under *exhaust*
(33 root PNGs, a 180 KB `.bak`, dated audit `.md`s, one-off HTML). This table classifies
every root-level entry so you can tell at a glance what matters.

Legend: **CANON** = keep, load-bearing · **DOC** = reference doc, keep but could move to
`docs/` · **ARCHIVE** = real but superseded, candidate for `_archive/` · **EXHAUST** =
session byproduct, candidate for deletion (regenerable or one-off).

### Directories

| Entry | Class | What it is / why |
|---|---|---|
| `cuts/` | **CANON** | The 9 live cuts + internal tooling (`_template`, `_console`, `_explore`). The product surface. |
| `lib/` | **CANON** | Shared JS/CSS substrate the cuts load (see §3). The closest thing to "portable logic." |
| `design-system/` | **CANON** | Token mirror + components + atlas + docs. The design-system-reference half of the repo. |
| `fonts/` | **CANON** | Brand typefaces (PerfectlyNineties + NinetiesHeadliner). Load-bearing. |
| `scripts/` | **CANON** | `tokens/sync-upstream.mjs` — the alignment discipline itself (§4). |
| `molehunt/` | **ARCHIVE?** | Self-contained CI analyst console. Real, but orphaned from the cut catalog — not in `index.html`. Decide: promote to a cut or archive. |
| `team-drift/` | **ARCHIVE?** | Team-coherence telemetry surface. Same status as `molehunt/` — orphaned one-off. |
| `_scratch/` | **EXHAUST** | Explicitly scratch. Safe to drop or `.gitignore`. |
| `_baseline/` | **EXHAUST** | Frozen baseline captures. Regenerable; archive or drop. |
| `.playwright-mcp/` | **EXHAUST** | MCP run artifacts. Should be `.gitignore`d. |

### Root files

| Entry | Class | What it is / why |
|---|---|---|
| `index.html` | **CANON** | The cuts catalog front door. |
| `server.mjs` | **CANON** | Zero-dep dev server + live reload + `/__state` endpoint. |
| `package.json` | **CANON** | Scripts: `dev`, `build:kernel`, `tokens:sync`, `tokens:check`. |
| `README.md` | **CANON** | Authoritative repo description + lockstep-canon contract. |
| `design-system.html` | **CANON** | Token/type/motion browser. |
| `embed-*.html` (×3) | **CANON-ish** | Embeddable Tray/Slate/Vault demos. Real deliverables; could live in an `embed/` dir. |
| `*-specimen.html` (×2) | **DOC** | `liminal-desktop-specimen`, `nineties-headliner-specimen` — type/brand specimens. Move to `design-system/`? |
| `LIMINAL_END_TO_END_2026-06-18.md` | **DOC** | Cross-repo synthesis. Keep; belongs in `docs/`. |
| `FRONT_DOOR_DECISION_2026-05-12.md` | **DOC** | Lock decision (cut 01 = front door). Keep; → `docs/`. |
| `CUT_TAXONOMY_AND_PORT_FINDINGS_2026-06-16.md` | **DOC** | Cut taxonomy + port findings. Keep; → `docs/`. |
| `COPY_AUDIT_2026-04-28.md` | **DOC** | Dated copy audit. → `docs/` or archive. |
| `index-pre-modular.html.bak` (180 KB) | **EXHAUST** | Pre-modularization backup. Git already has history — safe to delete. |
| `_compare-converged-chrome.html` | **EXHAUST** | One-off compare scratch. Drop. |
| `ontology-agent-travel-3d.html` | **ARCHIVE** | 3D exploration; README says the series is frozen in `cuts/_archive/root-experiments/`. This loose copy is a stray. |
| `v0_3_config.js` (92 KB) | **ARCHIVE** | Pre-pivot v0.3 config blob. Almost certainly dead; verify no loader references it, then archive. |
| `*.png` (×33) | **EXHAUST** | `audit-*`, `refactor-*`, `ontology-*-preview`, `*-surface.png` — session screenshots. None are linked by the app. Move to `docs/screens/` or delete. **This is the single biggest source of root clutter.** |

**Headline:** ~33 PNGs + `.bak` + `v0_3_config.js` + 2 scratch dirs account for nearly all
the noise. Removing/relocating them leaves a root of ~12 canonical entries. (No moves done
here — this is the proposal; a separate review-and-run step would execute it.)

---

## 2. What this repo actually is (structure, not taxonomy)

There is **no `src/`, no framework, no component tree, no state library.** Generic foundry
taxonomies (`core/state-machines/`, `adapters/api/`, "extract this hook") have no referent
here. The real shape:

```
liminal-prototype/
  index.html              cuts catalog front door
  cuts/*.html             9 live cuts — each a self-contained surface
    _template.html        starting shape for a new cut
    _console.html         Substrate Console (directory + coherence scan)
    _explore/             active explorations (ledger directions)
    _archive/             retired cuts + frozen baselines
  lib/*.{js,css}          shared substrate the cuts <script>/<link> in
  design-system/
    tokens/               synced mirror of creative canon (§4)
    components/           framing.css, buttons.css
    atlas/                state-atlas.html
    docs/                 relationship-axis.md
  scripts/tokens/         sync-upstream.mjs — the alignment guard
  server.mjs              dev server
```

The unit of work is a **cut** (an HTML file), and the unit of reuse is a **lib module**
(`<script src>`/`<link>` loaded across cuts). That's the grammar. Any hardening should
speak in those terms, not in React/Solid terms.

---

## 3. The `lib/` substrate — what's shared vs. cut-specific

Measured by how many surfaces actually load each module (`grep` across `cuts/*.html` +
`index.html`). This is the honest "shared vs. one-off" picture.

| Module | Lines | Loaded by | Reuse signal | Purpose |
|---|---|---|---|---|
| `cut-shell.css` | — | **16** | **spine** | Frame chrome, slate/tray, audit ribbon, classification, boot anims. *Carries a `:root` ink-token fallback that must track canon (§4).* |
| `surface-nav.{js,css}` | 161 | 6 | shared | Cross-cut tool shell (the nav rail). |
| `brand-upgrade.{js,css}` | 49 | 5/2 | shared | Brand fonts + type hierarchy + rail toggle. |
| `vault-store.js` | 270 | 3 | shared | IndexedDB persistence. **Strongest portable-logic candidate** — pure-ish, framework-agnostic. |
| `boot.js` | 563 | 2 | wiring | Entrypoint; wires modules together. Cut-coupled by design. |
| `slate.js` | 749 | 1 | one-off-ish | Composition surface. Large; logic + DOM intertwined. |
| `state.js` | 135 | 1 | one-off-ish | "Pure runtime state for slate/tray." Candidate to pair with `slate.js` for extraction. |
| `tray.js` | 143 | (via boot) | shared-internal | Palette/inkwell rail, tile catalog per context. |
| `agency.js` | 221 | (via boot) | shared-internal | Right-rail agency console. |
| `previews.js` | 482 | (via boot) | content | Per-tile authentic source-app HTML. |
| `keyboard.js` | 146 | (via boot) | shared-internal | Unified shortcut layer + help overlay. Clean seam. |
| `marginalia.js` | 138 | (via boot) | shared-internal | Caveat editor's-notes overlay. |
| `classification.js` | 80 | (via boot) | shared-internal | Business classification banner. |
| `undo.js` | 49 | (via boot) | shared-internal | ⌘Z reverse (5 deep). Clean, small, portable. |
| `osint-kernel.bundle.js` | 1012 | (cut 09) | **frozen artifact** | Browser build of the `liminal-test` custody kernel. **Source no longer in workspace** — `build:kernel` cannot regenerate it. Treat as opaque. |

**Reading:** `cut-shell.css` is the genuine spine. `vault-store.js`, `undo.js`,
`keyboard.js`, and `state.js`+`slate.js` are the cleanest seams if extraction is ever
chosen. Everything routed "via boot" is coupled through the wiring entrypoint, not directly
reusable without `boot.js`'s assumptions.

---

## 4. Alignment topology — `liminal-creative` → `liminal-prototype`

The lockstep-canon contract (README + `liminal-creative/tokens/README.md`):

> **"One rule: no surface edits its local copy. All changes flow from this upstream."**

```
  liminal-creative/tokens/design-tokens.css      ← UPSTREAM CANON (source of truth)
  liminal-creative/tokens/components/framing.css     superset: 12-wheel color, --paper-*
            │                                          aliases, shadow/scrim, a11y fix
            │  scripts/tokens/sync-upstream.mjs  (md5-verify copy, NOT symlink)
            ▼
  liminal-prototype/design-system/tokens/design-tokens.css   ← MIRROR (this repo)
  liminal-prototype/design-system/components/framing.css
            │
            │  (parallel, not audited here)
            ▼
  liminal-desktop/public/styles/design-tokens.css            ← downstream consumer
```

### Measured drift state (run `2026-06-18`)

| File | `tokens:check` | Hash (local) | Hash (canon) |
|---|---|---|---|
| `design-system/tokens/design-tokens.css` | **❌ FAILED** | `e138b7a6…` | `a02db42b…` |
| `design-system/components/framing.css` | ✅ OK | `bc4ac8b4…` (matches) | — |

**The tokens half is drifted right now.** The contract's discipline (`tokens:sync`) is in
place but has not been run since the last canon change. Creative's own README corroborates
the history: this repo's token copy was historically the older `60f9dabb` variant (missing
the a11y `--text-faint` fix). One command closes it: `npm run tokens:sync`.

### Second drift surface (not caught by `tokens:check`)

- **4 cuts carry inline `:root{}` blocks** that can *shadow* the linked canon tokens.
- `lib/cut-shell.css` carries its own `:root` ink-token fallback block (README warns it
  "must track canon, else it shadows the linked tokens").

These are local token definitions *outside* the synced files, so `tokens:check` is blind to
them. They are the real alignment risk: a brand change in canon won't reach a surface that
overrides those tokens inline.

### What `liminal-creative` already does vs. could do (alignment enforcement)

Already present upstream:
- `tokens/` canon + `README.md` declaring the one-rule contract.
- `tools/` — `color-studio` (token authoring), `playwright-harness`, `scripts/`.
- The README enumerates consumers and their historical hashes (consumer-aware).

Could be repurposed to *enforce* alignment (open menu, not a recommendation yet):
1. **Drift dashboard** — a `tools/scripts` pass that runs each consumer's `tokens:check`
   and reports a single green/red board across `prototype` + `desktop`. Creative already
   knows the consumer list; this makes drift visible from the source side.
2. **Inline-`:root` linter** — extend the harness to grep consumers for token-name
   redefinitions outside the synced files (the blind spot above) and flag them.
3. **Symlink option for static surfaces** — creative's README already *recommends* symlink
   for build-less surfaces; this prototype uses build-copy. Switching the prototype's token
   file to a symlink would make drift structurally impossible (at the cost of a tracked
   symlink). Decision deferred — listed as an option, not a call.

---

## 5. Decision menu — extraction direction (left open)

Per "decide later," no frame is imposed. The evidence above supports three directions:

| Direction | For | Against |
|---|---|---|
| **A. Keep as demo + DS reference** (current doctrine) | Matches README, END_TO_END, saved handoff doctrine ("repo is the build env, make patches not cuts"). Spine already exists. | Good `lib/` logic stays trapped in vanilla JS, never reaching the SolidJS spine. |
| **B. Extract `lib/` seams → desktop** | `vault-store`, `undo`, `keyboard`, `state` are genuinely portable; desktop could consume them. | They're vanilla JS, not Solid; "extract" really means *re-implement against a clean contract*, not lift-and-shift. |
| **C. Make this the foundry** (pasted proposal) | Single place for experiments→promotion. | Contradicts the designated spine; risks two competing source-of-truth repos. Largest reorg cost. |

**No selection made here.** When you choose, the next artifact is a per-seam contract for
whichever modules cross the boundary (§3 names the candidates).

---

## 6. Lowest-risk next actions (if/when you act — none taken here)

1. `npm run tokens:sync` — close the live token drift (§4). One command, reversible.
2. Relocate the 33 root PNGs → `docs/screens/` (or delete) — biggest navigability win (§1).
3. Delete `index-pre-modular.html.bak` (git has history) and confirm `v0_3_config.js` is
   dead before archiving.
4. Decide `molehunt/` + `team-drift/`: promote to cuts or move to `_archive/`.
5. Add the inline-`:root` blind spot to whatever drift check you trust (§4).

---

*This atlas is descriptive. It moves no files and changes no tokens. Every drift/structure
claim is from a command run on 2026-06-18 against the working tree.*
