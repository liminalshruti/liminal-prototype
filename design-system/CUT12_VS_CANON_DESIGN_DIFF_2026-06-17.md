# Cut 12 vs. Canonical Design System — Design Diff

**Date:** 2026-06-17 · **Subject:** `cuts/_archive/12-agency-govern-iter.html` · **Reference:** cut 01 (canonical front door) + the shared canon layers

## The one structural fact that explains everything

| | Stylesheets consumed | Shared canon lines | Own inline CSS |
|---|---|---|---|
| **Canonical (cut 01)** | 4 (`design-tokens` + `cut-shell` + `surface-nav` + `brand-upgrade`) | **~3,600** | 440 |
| **Cut 12** | 1 (`design-tokens` only) | **0** (just raw tokens) | 141 |

Cut 12 runs on **~4% of the canonical design system**. It hand-rolls in 141 inline lines what the canon expresses in ~3,600 shared lines. **Every divergence below is a symptom of this:** cut 12 is a *frozen fork from before the shared layers (`cut-shell.css`, `brand-upgrade.css`) were extracted.* It doesn't "violate" canon so much as *predate* it.

---

## Axis 1 — TYPE

| | Canonical | Cut 12 | Status |
|---|---|---|---|
| Source | `brand-upgrade.css` (the canon type layer) | inline `@font-face` + token overrides | **fork** |
| Faces | NinetiesHeadliner 700 + PerfectlyNineties 100–900 + Cougar/Space Mono | **same (grafted today)** | ✅ matches |
| `--display/--serif/--sans/--mono` | overridden to Nineties/Cougar stack | **same (grafted today)** | ✅ matches |
| Type scale | **18-step token scale** (`--text-*`, `--fs-*`, ratio 1.25/1.375) | **hardcoded px** in `font:` shorthands, 8–17px ad-hoc | ❌ **no scale** |
| Letter-spacing | token scale (`--ls-app-*`) | hardcoded em values (.06–.2em) | ⚠️ values close, not tokenized |

**Verdict:** Type *faces* now match (fixed this session). But cut 12 has **no type scale** — it hardcodes every size (8px, 9px, 9.5px, 10px, 11px, 12.5px, 14px, 17px) instead of using `--text-*`/`--fs-*` tokens. The canon's "weight replaces italic, scale by 1.25 ratio" discipline isn't expressed.

---

## Axis 2 — COLOR

| | Canonical | Cut 12 | Status |
|---|---|---|---|
| Register colors (diligence/synthesis/judgment/outreach) | `var(--diligence)` etc. from tokens | **same token refs** | ✅ matches |
| Neutral/surface (`--bg`, `--frame-bg/-2/-3`, `--text*`) | token refs | **same token refs** | ✅ matches |
| Semantic (`--good`/`--alarm`) | token refs | **same (fixed this session)** | ✅ matches |
| 12-wheel system | full system via `brand-upgrade` | not present (only the 4 registers used) | ⚠️ subset (fine for this surface) |
| Hardcoded hex | traffic lights + `#fff` only | **traffic lights + `#fff` only** | ✅ matches (both intentional) |

**Verdict:** Color is the **strongest axis** — cut 12 was already token-disciplined on color, and the two artifact-chip hexes were fixed this session. No real drift remains. The only gap is it doesn't pull `brand-upgrade.css`'s 12-wheel extras, but it doesn't need them for this surface.

---

## Axis 3 — SURFACE & SPACE

| | Canonical | Cut 12 | Status |
|---|---|---|---|
| Surface layering (`--frame-bg/-2/-3`) | token-correct, by role | **same token usage, same roles** | ✅ matches |
| Radius | **5-step token scale** (`--radius-1..5`) | hardcoded (2/3/4/5/10px) | ❌ **not tokenized** |
| Spacing | **10-step token scale** (`--space-*`) | hardcoded px everywhere | ❌ **not tokenized** |
| Shadows | token scale (`--shadow-*`, `--shadow-window`) | hardcoded rgba shadows | ⚠️ values plausible, not tokenized |
| Atmosphere | `--p-accent`-tinted stage gradient (register-aware) | fixed diligence+depth corner washes | ⚠️ static, not register-reactive |

**Verdict:** Surface *colors* are token-correct, but **radius and spacing are entirely hardcoded** — cut 12 doesn't consume the `--radius-*` / `--space-*` scales. Its shadows and background atmosphere are bespoke literals rather than the canon shadow tokens / register-reactive gradient.

---

## Axis 4 — SHELL STRUCTURE (the biggest divergence)

| Element | Canonical class | Cut 12 class | Status |
|---|---|---|---|
| Window | `.frame` / `.stage` | `.shell` | ❌ different |
| Title bar | `.titlebar` | `.rb-top` | ❌ different |
| Nav | `.product-row` + **tabs + ⌘K palette** | `.loop` (static step ribbon, **no palette, no tabs**) | ❌ different + missing nav |
| Left rail | `.rail-left` · **280px** | `.rail-l` · **212px** | ❌ name + ~25% narrower |
| Center | `.slate-area` | `.work` | ❌ different |
| Right rail | `.rail-right` · **320px** | `.rail-r` · **232px** | ❌ name + ~28% narrower |
| Registers | `.register-block` / `.reg-agent` | `.reg` / `.regblk` | ❌ different |
| Signals | (rail-left items) | `.sig` | ❌ different |
| Disposition | `.disposition` | `.dispo` | ❌ different |
| Artifact | `.dispo-artifact` (`.da-*`) | `.artifact` (`.ab/.abody/.arec`) | ❌ different (BOTH now in cut-shell.css as parallel families) |
| Chain | `.audit-ribbon` | `.rb-bot` | ❌ different |

**Verdict:** This is where cut 12 and canon genuinely **don't speak the same language.** Cut 12's entire shell vocabulary is a parallel naming system (`.rb-top` not `.titlebar`, `.rail-l` not `.rail-left`, `.dispo` not `.disposition`). Two concrete consequences:
- **Rails are ~25% narrower** (212/232 vs 280/320) — the reason cut 12's content reads cramped.
- **No command palette (⌘K) and no real tabs** — cut 12's top "loop" ribbon is decorative (CAPTURE→READ→DECIDE→RECORD→RE-ENTER as static steps), where the canonical shell has live `tabs` + `cmdk`.

---

## Axis 5 — MOTION

| | Canonical | Cut 12 | Status |
|---|---|---|---|
| Easing | `--ease` token + `--ease-spring/-in/-out` | `--ease` token + bespoke `cubic-bezier(.32,.72,.16,1)` | ⚠️ partial |
| Durations | **intent-named token scale** (`--tx-fast/base/settle/...`) | hardcoded (.15s/.3s/.5s/.56s/1.1s/1.6s) | ❌ not tokenized |
| Hover physics | magnetic-hover + press (`translateY(-1.5px)` / `scale(.97)`) | basic color/border transitions only | ❌ **missing the canon hover/press feel** |
| Keyframes | rich set (slated-arrive/settle, pulse-glyph, drift-pulse, artifact-arrive…) | `rin`, `pl`, `fr` + **`arr` (UNDEFINED — bug)** | ❌ sparse + 1 broken |
| Reduced-motion | scoped, preserves color transitions | `*{animation:none!important}` (blunt) | ⚠️ cruder |

**Verdict:** Motion is the **most under-built axis.** Cut 12 lacks the canonical magnetic-hover/press physics entirely, hardcodes all durations, and has a **confirmed bug**: `.artifact` calls `animation:arr` but only `@keyframes rin/pl/fr` are defined — `arr` doesn't exist, so the ratified card pops in with no animation. (The canonical name is `artifact-arrive`, now in `cut-shell.css`.)

---

## Summary scorecard

| Axis | Alignment | Headline gap |
|---|---|---|
| **Type** | 🟡 faces match, no scale | hardcoded px sizes, no `--text-*` scale |
| **Color** | 🟢 strong | (none material — fixed this session) |
| **Surface/Space** | 🟡 colors ok | radius + spacing not tokenized |
| **Shell structure** | 🔴 diverged | parallel class vocabulary; rails 25% narrow; no ⌘K/tabs |
| **Motion** | 🔴 weakest | no hover/press physics; hardcoded timings; broken `arr` keyframe |

## What this tells us about the path forward

The diff confirms the earlier read: **cut 12's value is its content** (the adversarial-drop, the $-denominated marketplace swap, the agency-register fidelity), and its **liability is its shell** (a pre-extraction fork that reimplements — narrower, un-tokenized, un-animated — what the canon now provides). The two honest options remain:

1. **Re-host on canon** (`cut-shell.css` + `brand-upgrade.css`): cut 12's content rendered through the live system. Closes every red/yellow cell at once. Largest change.
2. **Keep chrome-only** (current path): cut 12 stays a token-corrected standalone specimen; the *artifact* alone is promoted to canon (done — `.artifact` block now in `cut-shell.css`). Cut 12 itself keeps its narrow rails / no-palette / hardcoded scales.

The lowest-hanging *correct* fix regardless of path: **the broken `arr` keyframe** (rename to the canonical `artifact-arrive` or define it locally) — that's a live bug, not a style preference.
