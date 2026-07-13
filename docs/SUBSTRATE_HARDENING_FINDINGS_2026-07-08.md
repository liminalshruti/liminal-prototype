# Substrate-hardening pass — findings & fixes (2026-07-08)

**Scope:** the two surfaces Run-B never audited (`molehunt`, `team-drift`) + a
targeted off-canon-font / dead-keyframe scan of the live cuts. Discipline: apply
only fixes where canon is **settled and not already in flight elsewhere**; *flag*
everything founder-gated, D1-deferred, upstream-owned, or already handled on the
unmerged `canon/run-b-rulings` branch.

Branch: `claude/frontend-design-upgrade-i12dhj`.

---

## Fixes applied (verified in headless Chromium)

### `team-drift/index.html` — two canon-aligned a11y fixes
Neither touches the surface's founder-gated palette/font fork.

1. **Restored AA `--text-faint`.** The local `:root` re-pinned `--text-faint: #5A5852`,
   a value canon explicitly retired for measuring sub-AA. Dropped the override so it
   inherits canon `#807D78`. Affects the small mono forensic labels that use it
   (phase num, person role, sparkline `<text>`, governance-log timestamps).
2. **Added the mandatory `prefers-reduced-motion` block** (was entirely absent —
   a canon requirement). This surface is a 12s auto-loop where much of the content
   rests at `opacity:0` / collapsed and is only revealed mid-cycle, so a blunt
   `animation:none` would freeze it **hidden** (the C8 trap). The block stops motion
   **and** asserts the revealed end-state (drift card expanded to its own 540px peak,
   detail + calibration shown, sparklines fully drawn, gap highlight on); transient
   overlays (toast, virtual cursor, button flash) correctly stay rest-hidden.
   Verified with `--force-prefers-reduced-motion`: the still surface shows the full,
   legible state with nothing clipped or hidden.

---

## Coverage-debt audit — the two never-reviewed surfaces

### `molehunt/index.html` — deliberate full fork (governance exposure, not mechanics)
- **Consumes neither canon tokens nor the canon type stack.** Self-contained parallel
  token system (`--paper/--ink/--rule/--hash/--accent`); the only font is *system*
  monospace (not even canon Geist Mono). No display/serif voice at all.
- **Correctly loads no Newsreader** (loads no web fonts).
- **A11y is genuinely canon-aligned where it counts:** severity encoded by
  border-thickness + weight (not color); timeline perimeter encoded by shape
  (solid/hollow/hatched), explicitly "no color used" — satisfies *don't distinguish
  by color alone*.
- **The exposure is governance, not code:** the fork's justification (header comment,
  ~line 18) cites `DESIGN_SYSTEM_RECONCILIATION_PLAN_2026-06-12.md §2 / Amendment 2.1`
  — **that document does not exist in the repo.** The core moves (full token fork;
  **mono carrying narrative prose** in alt-hypothesis / action bodies) are exactly the
  kind of decision that must not be "fixed" mechanically.
- **FLAG (founder):** ratify or retire the monochrome system-mono sub-register; if it
  stands, decide whether the mono role should at least be canon Geist Mono; supply or
  drop the missing reconciliation-plan reference. Minor safe cosmetics noted but left
  untouched to avoid editing the fork's rationale: a dead selector
  (`.panes.alth-prominence-high .alt-h-body`) and sub-AA `--ink-4`/`--ink-3` used as
  text.

### `team-drift/index.html` — canon-consumer with a founder-gated fork
- Imports canon, then overrides in a local `:root`. Two fixes applied above.
- **FLAG (founder-gated — untouched):** the file's own comment gates these together:
  - **Palette fork:** register redefinitions `--diligence/--outreach/--judgment/--synthesis`
    (`--outreach`/`--synthesis` diverge from canon hex) + a telemetry sub-register
    (`--drift/--good/--queued`) pinned to **pre-migration retired** values.
  - **Type fork:** loads **Fraunces + Newsreader** (both off-canon) as `--display`/`--serif`;
    neither canon face (Nineties Headliner / Perfectly Nineties) is loaded. The brand
    sentence renders in Fraunces. Type axes (`opsz`/`SOFT`) are authored for Fraunces.
  - Redundant surface/text token re-declarations are byte-identical to canon and could
    be dropped for hygiene (low value; left alone this pass).

---

## Off-canon font scan (live surfaces) — no independent action needed

- Newsreader references in **01 / 04 / 05 / 06** are **documentation comments only**
  ("NO Newsreader" / "never rendered") — not actual loads.
- The only real remaining Newsreader load is **`cuts/custody.html`** (Google-Fonts
  `<link>` line 46 + `var(--serif,'Newsreader')` fallbacks ~1733/1737).
- **FLAG (pending merge, do not duplicate):** C3 ("Perfectly Nineties only, kill
  Newsreader") is already ratified for 00/01/06/11/**custody** on the unmerged
  `canon/run-b-rulings` branch. Removing it independently here would collide. Resolve
  by merging that branch. (04-onboarding / 05-plugin-seed are already clean.)

---

## Not touched this pass (by design)

| Item | Why |
|---|---|
| Type-scale / spacing / radius token **binding** | Gated on the unresolved D1 "tokens as infrastructure vs documentation" decision |
| team-drift palette fork; molehunt token fork & mono-narrative | Founder-gated (surfaces' own comments / missing sanction doc) |
| Newsreader removal in cuts | Already ratified on `canon/run-b-rulings` (unmerged) — merge, don't duplicate |
| Upstream `--text-faint` and any `design-tokens.css` value | `design-tokens.css` is a **synced consumer copy**; token changes belong upstream in `liminal-creative` (out of this repo's scope) |
| C1 seal / C4 correction / C5 refusal choreography values | Open founder decisions in the Run-B rulings |
| Custody behavior transplant | Large behavior port, spec'd separately (`CUSTODY_TRANSPLANT_SPEC.md`) |

---

## Recommended next steps (for the founder)
1. **Merge `canon/run-b-rulings`** — unblocks C3 (Newsreader), C5 (refusal 320ms),
   C8 (reduced-motion floor) across the cuts in one move.
2. Rule on **molehunt** (is the monochrome system-mono register ratified?) and
   **team-drift** (palette + Fraunces/Newsreader fork) so those surfaces can be
   hardened rather than flagged.
3. Resolve **D1** (token binding) to unblock the largest substrate-hardening item.
