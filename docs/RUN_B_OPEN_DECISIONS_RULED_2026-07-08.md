# Run-B open decisions — founder rulings (2026-07-08)

Three decisions that were flagged open in the substrate-hardening findings are now
ruled by the founder. Recorded here as canon; two are executed, one (molehunt) is
spec'd for a dedicated pass.

---

## D1 — tokens are INFRASTRUCTURE (hybrid). RESOLVED.

**Ruling:** Tokens are binding infrastructure for the unambiguous axes; type uses
**named tiers** with moment-relative sizing permitted only *within* a tier.

**Key fact that makes this cheap:** canon **already defines every scale** in
`design-system/tokens/design-tokens.css` — nothing new goes upstream:
- Spacing — `--space-1..10` (4px base: 4/8/12/16/22/28/36/48/64/96) — lines 930–939.
- Radius — `--radius-1..5` (2/3/4/6/14) + `--radius-none/--radius-pill` — 942–946, 1181–1182.
- Tracking — `--ls-mono[/-sm/-lg]`, `--ls-tight/-tighter/-display`, and the app set
  `--ls-app-*` — 922–927, 1225–1231.
- Type — a **named** scale already exists: `--fs-eyebrow` 9, `--fs-sm` 13.5,
  `--fs-body` 14, `--fs-base` 15, `--fs-md` 17, `--fs-lg` 19, `--fs-lede` 20,
  `--fs-xl` 22, `--fs-2xl` 28, `--fs-3xl` 36, `--fs-display` 64, `--fs-hero` 76.8 — 893–912, 1214.

So the Run-B C2 complaint ("tokens declared but never consumed") is a **consumption
gap, not a missing-infrastructure gap.** The ruling closes it:

**The binding contract (mandatory for consuming surfaces):**
1. **Color** — already bound; keep. No raw hex except traffic-lights / intentional `#fff`.
2. **Spacing** — every padding/margin/gap references `--space-*` (or `--space-app-*`
   on desktop-scale surfaces). No raw px.
3. **Radius** — every `border-radius` references `--radius-*`.
4. **Tracking** — every mono/label `letter-spacing` references `--ls-*` (default mono
   uppercase = `--ls-mono` 0.18em).
5. **Type** — every `font-size` references a **named `--fs-*` tier**. Moment-relative
   sizing is allowed ONLY as `clamp()` between *adjacent* named tiers
   (e.g. a hero may `clamp(var(--fs-2xl), 4vw, var(--fs-3xl))`), never as raw px.
   This preserves the compositional display sizing the typography critique praised
   while ending "each cut invents its own sizes."

**Migration:** staged, per consuming surface, behavior-preserving (map each hardcoded
value to its nearest existing token — the scales were reverse-engineered *from* these
cuts, so matches are near-exact). Not a rewrite. Sequence by surface; verify each in
headless Chromium. `design-tokens.css` is a synced consumer copy and is **not edited** —
this is all consumption-side.

**Resolves:** C2 (token binding) and the D1 meta-question. C7 (display scale) folds in:
display sizes become `clamp()` between named tiers; the remaining load-bearing
`!important`s stay only where they counter `brand-upgrade.css`'s own `!important`.

---

## molehunt — FULL CANON RE-SKIN. RULED (spec below; dedicated pass).

**Ruling:** bring `molehunt/index.html` fully onto canon — it currently consumes
**neither** canon tokens **nor** the brand type stack (own `--paper/--ink/--rule`
system + system-monospace everywhere), and its divergence cites a doc that doesn't
exist in the repo.

**Re-skin spec:**
1. **Import canon:** add `design-system/tokens/design-tokens.css` + `lib/brand-upgrade.css`
   (relative to `molehunt/`); add the Geist Mono web-font link. Remove the parallel
   token `:root`.
2. **Map the fork tokens → canon:** `--paper/-2/-3` → `--bg` / `--frame-bg` / `--frame-bg-2`;
   `--ink/-2/-3/-4` → `--text` / `--text-mid` / `--text-dim` / `--text-faint`;
   `--rule*` → `--card-border` / `--frame-border`; `--accent` (navy) → a canon register
   (recommend `--diligence`=clarity, matching the analyst-console read) or `--judgment`
   for the counterintel severity spine — founder's pick during the pass.
3. **Restore the three-voice stack** (the load-bearing change): console headers/section
   titles → `--display`; the alt-hypothesis / recommended-action **prose** → `--serif`
   (it currently runs in mono, the sharpest canon violation); labels / statutes / audit
   rows / timeline data → `--mono` (canon Geist Mono, not system fallback).
4. **PRESERVE** the color-independent encodings — severity by border-weight + font-weight,
   timeline perimeter by shape (solid/hollow/hatched). These are genuinely canon-aligned
   a11y and must survive the re-skin.
5. Apply the D1 binding contract while re-skinning (space/radius/tracking/type tokens).
6. Remove the citation to the non-existent `DESIGN_SYSTEM_RECONCILIATION_PLAN` / "Amendment 2.1".
7. Darken the sub-AA `--ink-4`/`--ink-3`-as-text automatically once mapped to canon `--text-*`.

Scope: ~2,000-line surface; done as its own verified pass (per-section render checks),
not bundled into a mechanical sweep. Tracked as the next task.

---

## team-drift — DE-FORK ONTO CANON, keep telemetry states. RULED + DONE.

Executed 2026-07-08 (commit on `claude/frontend-design-upgrade-i12dhj`):
- Dropped Fraunces + Newsreader; brand faces now via `lib/brand-upgrade.css`
  (Nineties Headliner / Perfectly Nineties). Removed inert Fraunces opsz/SOFT axes.
- Register hues inherit canon (diligence/judgment already matched; outreach/synthesis
  now canon connection/agency).
- Telemetry states kept, repointed off retired hexes to canon: `--drift`→`--alarm`,
  `--drift-bg`→`--stability-bg`, `--drift-soft`→`--stability-edge`, `--good`→canon
  connection, `--queued`→`--amber`.
- (Earlier this pass: AA `--text-faint` restored; mandatory reduced-motion block added.)
Verified in headless Chromium. Remaining: apply the D1 space/radius/tracking binding
(hardcoded px → tokens) in the type-binding sweep.

---

## Status

| Decision | Ruling | State |
|---|---|---|
| D1 tokens | Hybrid (infra for space/color/tracking; named type tiers) | **Resolved** — contract above; migration is staged consumption work |
| team-drift | De-fork onto canon, keep telemetry | **Done** (verified, pushed) |
| molehunt | Full canon re-skin | **Ruled** — spec above; next dedicated pass |

**Next:** (1) molehunt re-skin per spec; (2) begin the D1 binding migration surface-by-surface.
