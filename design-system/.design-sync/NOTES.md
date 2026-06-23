# design-sync notes — Liminal design-system

## Repo classification (2026-06-23, first import)

This repo is **outside the converter's normal envelope**:
- No `package.json`, no `dist/`, no Storybook, no JS/TS sources.
- It is a **pure CSS + design-token system**: `tokens/design-tokens.css` (12-wheel
  canon, single source of truth), `components/*.css` (class + 5-axis `data-*` contract),
  `fonts/*.otf` (brand faces), docs.

Therefore the standard converter (`package-build.mjs`) **cannot run** here. Per the
skill's "genuinely outside the converter's envelope" clause, the upload layout is
produced **by hand** (`./ds-bundle/`) and verified before upload. The verification
gates still apply: every component preview is graded before upload.

## What the hand-built bundle is

The design tool renders **React**. The honest, non-reimplementing way to ship these
CSS components is a **thin React wrapper layer** that maps props → the repo's real
class names (e.g. `<Button variant="primary">` → `class="btn btn-primary"`). The CSS
remains the source of truth; no design logic is duplicated. This wrapper layer is also
the first concrete increment of the dual-framework component system (Solid twin later).

`styles.css` `@import`s the canon + component CSS so every rendered design inherits the
real tokens, fonts, and component styles.

## Scope of first sync (2026-06-23)

- **Button** — wrap existing `components/buttons.css`
- **Framing** — wrap existing `components/framing.css`
- **Input** — author new token-bound CSS (`components/inputs.css`) then wrap
- **Tag** — author new token-bound CSS (`components/tags.css`) then wrap

## Token facts learned (verified against canon)

- Text hierarchy: `--text` `--text-mid` `--text-dim` `--text-faint` `--text-mute`.
- Surfaces: `--bg --frame-bg --frame-bg-2 --frame-bg-3 --frame-border --card-border --rail-bg`.
- Action tokens: `--ui-action-{primary,secondary,destructive}[-hover|-active|-bg|-border]`.
- State tokens (for Input/Tag): `--ui-state-{error,success,info,warning}[-bg|-border]`.
- Focus: `--ui-focus-ring` (= clarity-500), `--ui-focus-bg`.
- Spacing: `--space-1..10` (× `--density-scale`); radius `--radius-1..5`, `--radius-pill`.
- Type: `--mono --serif --sans`; `--fs-mono-{xs,sm,lg}`, `--ls-mono-{sm,lg}`; `--tx-base`, `--ease`.
- Chrome registers (named saturated layer): `--diligence --judgment --synthesis --outreach
  --alarm --watch --signal --ambient --depth --liminal`.
- 5-axis body model scopes density/relationship: `data-product` `data-density`
  `data-relationship` (+ `data-role` `data-clearance`).

## Known pre-existing drift (NOT fixed in this run)

- `components/framing.css` references `--fg-1`, `--fg-4`, `--type-eyebrow` which are
  **not defined** in the canon (grep = 0). They fall back to inherited/initial. Left
  as-is — out of scope for the sync; flag to canon owner separately.

---

## How this was ACTUALLY built (2026-06-23 — supersedes "by hand" above)

Rather than hand-produce the layout, I synthesized a **real React wrapper package**
and ran the **real converter** on it (deterministic, on-script verification). The
wrappers are thin: props → the repo's real CSS classes (`<Button variant="primary">`
→ `class="btn btn-primary"`). This is the first increment of the dual-framework
component system; a SolidJS twin can share the same CSS contract later.

**The synthetic package lives in an EPHEMERAL scratch dir** (not committed):
`…/scratchpad/build/` with `src/{Button,Input,Tag,Framing}.tsx` + `index.ts`,
`package.json` (name `@liminal/design-system`, module `dist/index.js`), tsconfig.
Built with `tsc` → `dist/` (+ `.d.ts`). React/types/esbuild installed there.

**Converter inputs that must be reproduced on a fresh machine:**
1. Recreate the synthetic package (src wrappers + tsc build) — the 4 wrapper sources
   are the only non-committed code that matters. Consider promoting them into the repo
   (e.g. `design-system/react/`) so re-sync doesn't depend on scratch.
2. **Mirror the real CSS/fonts into the package dir** before building — the converter
   resolves `cssEntry`/`extraFonts` relative to the package, not this repo:
   copy `design-system/{tokens,components,fonts}` + the generated `ds-styles.css`
   into the build dir.
3. `cfg.cssEntry` = **`ds-styles.css`** — a GENERATED single self-contained stylesheet
   (tokens + all 4 component CSS concatenated, NO `@import`s). Regenerate by
   concatenation when token/component CSS changes. This is required because the
   converter copies `cssEntry` verbatim to `_ds_bundle.css`; external `@import`s in it
   would break the closure (`[CSS_IMPORT_MISSING]`).

## Re-sync risks (the watch-list)

- **Synthetic package is not committed.** A fresh clone has no `dist/` to point
  `--entry` at. Promote the wrappers into the repo to fix this permanently.
- **`ds-styles.css` is generated and can go stale.** If `tokens/design-tokens.css`
  or any `components/*.css` changes, regenerate `ds-styles.css` (concatenation) or the
  uploaded styles drift from canon silently.
- **Geist / Geist Mono / Caveat are host-served** (`runtimeFontPrefixes`), NOT shipped.
  Designs render correctly only if the host page loads them (Google Fonts). The
  conventions header tells the design agent to load them. Only Perfectly Nineties +
  Nineties Headliner ship as files.
- **Playwright pin:** render check needs playwright **1.60.0** (matches the cached
  chromium build 1223 at `~/Library/Caches/ms-playwright/chromium_headless_shell-1223`).
  A different cache build → install the matching playwright version (check browsers.json).
- **Component group is `general/`** (docs didn't map to Actions/Forms/etc.). To regroup,
  add `cfg.docsMap.<Name>` → a stub `.md` with `---\ncategory: <Group>\n---`.

## Known render warns (triaged)

- `Button` carries `cfg.overrides.Button: {"cardMode": "column"}` — ActionRow is a
  wide 3-button row; column mode keeps each story full-width. Presentation-only.

## Project

- Uploaded to claude.ai/design project **Liminal DS — cuts substrate**
  (`ae960dee-babe-4c97-a198-bb2e62379c22`). 4 components, all graded good,
  render check clean. Incremental path (project created fresh + empty this run).

---

## Scope expansion (2026-06-23, same session) — full component layer

The design system renders far more than 4 components: `design-system.html` (root,
specimen page) inlines the FULL canon + ~18 components whose CSS was never extracted
into the README-promised `components/*.css` files. Per founder call ("use
design-system.html as the styling source"), the styling closure now ships the WHOLE
component layer so every design renders fully on-brand; only 4 have React wrapper
cards (Button/Input/Tag/Framing), the rest are reachable as classes (listed in
conventions.md).

**9 component CSS files extracted from design-system.html into `components/`:**
selection-controls, avatars-badges, tabs-segmented-nav, tooltips-popovers,
modals-drawers, banners-toasts-alerts, empty-loading-skeleton, audit-classification,
product-surfaces. Faithful extraction (verbatim rules, de-indented, contract-block
headers, provenance line). This completes most of the README's promised component set.

**`ds-styles.css` generator now concatenates ALL 13 component files** (was 4). Order:
tokens → buttons framing inputs tags selection-controls avatars-badges tabs-segmented-nav
tooltips-popovers modals-drawers banners-toasts-alerts empty-loading-skeleton
audit-classification product-surfaces. REGENERATE this on any token/component change.

### Re-sync risks (additions)
- **The extracted CSS still lives in BOTH `components/*.css` AND inline in
  `design-system.html`.** They can drift. The specimen page is the older source; the
  extracted files are the new canonical home the README always intended. A future task
  should make design-system.html `@import` the component files instead of inlining,
  closing the drift. Until then, treat design-system.html as the source if they disagree.
- **Raw rgba() in extracted files** (pre-existing specimen choices, faithfully copied):
  `.banner.is-good/-amber/-red` and `.tag-base.is-good/-amber/-red` use
  rgba(69,201,163/245,165,36/240,64,64) overlays; `.tile-bar-line` uses rgba(0,0,0,.18).
  Canon discipline says no raw hex in components — candidates for tokenizing
  (--banner-good-border etc.) but functional as-is (they pair with var(--good/-amber/-red)).
- **"Iowan Old Style"** added to runtimeFontPrefixes — it's a system serif FALLBACK in
  the canon --display/--serif stacks, not a brand font; intentionally host-provided.

---

## Wrapper expansion (2026-06-23) — all 26 components now have React cards

Wrapped the remaining ~22 components (Banner, Toast, Avatar, Badge, Tabs, Segmented,
Tooltip, Popover, Modal, Drawer, Checkbox, Radio, Switch, Slider, Progress, Skeleton,
Spinner, EmptyState, ConsentChip, ClassificationStrip, AuditRibbon, Tile) as thin React
wrappers over the extracted CSS classes. Sources in `react/src/`. All 26 components now
ship as both styles AND pickable, prop-typed, graded cards. Previews authored in
`.design-sync/previews/*.tsx` (each wraps content in `_surface.tsx`, the dark canon
canvas); all graded good; render check 26/26.

Overrides: Button + AuditRibbon use `cardMode: column` (wide rows).
Skipped: Slate (`.slate-frame`) — a drop container, not statically previewable; its CSS
ships (reachable as a class) but no wrapper/card.

Tooltip/Popover cards show only their trigger (hover/click overlay can't render in a
static screenshot) — graded good with that noted; the .prompt.md documents the behavior.
