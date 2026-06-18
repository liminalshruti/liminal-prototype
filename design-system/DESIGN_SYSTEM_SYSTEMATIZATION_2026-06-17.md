# Design-System Systematization Plan

**Date:** 2026-06-17 · **Scope:** all 9 live cuts + shared layers · **Goal:** stop cuts forking the design system; pay down drift debt; add drift-checks so it can't recur.

Built from three parallel audits (duplicated patterns · hardcoded values · class-vocabulary forks). All three triangulate on the **same conclusion**.

---

## The finding in one sentence

**Only 1 of 9 cuts (cut 01) speaks the canonical design system.** The other 8 fork it to varying degrees — and the three worst (00-agency, 11-govern, 08-custody) carry ~75% of the total drift debt.

## The single root cause

The shared shell (`cut-shell.css`) was extracted **after** several cuts were already built. Cuts written before the extraction (00, 11) never adopted it; cuts written after (01) did. There is no mechanism preventing a new cut from hand-rolling its own shell — so they do. Every symptom below flows from this.

---

## The drift, measured

### Adoption tiers (who imports the canon)

| Tier | Cuts | cut-shell? | brand-upgrade? | State |
|---|---|---|---|---|
| **Canonical** | 01 | ✅ | ✅ | Speaks the full system, zero forks |
| **Hybrid (sound)** | 02, 03, 10 | ✅ | partial | Canon chrome, custom interior — OK |
| **Hybrid (forked)** | 08, 09 | ✅ | mixed | Imports canon but overrides names + widths |
| **Pure fork** | 00, 11 | ❌ | ❌ | No canon import; entirely hand-rolled |
| **Outlier** | 04 | ❌ | — | React SPA — different paradigm, exclude |

### Three forms of drift (all corroborated)

**1. Forked/duplicated patterns** — same component reimplemented per-cut:
- `.shell` / `.rb-top` / `.rb-bot` (the frame chrome): hand-rolled in 00 + 11, drifted ±1–2px from each other. Not in `cut-shell.css` at all.
- `.dispo` (disposition row): 3 forks (00, 11, 09) with real styling drift.
- `.artifact` (ratified card): now canonical in `cut-shell.css` (we promoted it) — but cut 11 still has its own inline copy.
- Agent-coverage orbital viz: two idioms (00's `svg.orbit` vs 01's `.orbital-rail`) for the same job.

**2. Class-vocabulary forks** — different names for the same thing:

| Component | Canonical | Forks in the wild |
|---|---|---|
| Window | `.stage` | `.shell` (00, 11) |
| Title bar | `.titlebar` | `.rb-top` (00, 11), `.cut-02__topbar` (02) |
| Left rail | `.rail-left` | `.rail-l` (00, 11), `.left-rail` (08) |
| Center | `.slate-area` | `.work` (00, 11), `.center` (09), `.pane` (02), `.tdy` (10) — **zero canonical adoption outside 01** |
| Right rail | `.rail-right` | `.rail-r` (00, 11) |
| Disposition | `.disposition` | `.dispo` (00, 09, 11) |

**3. Hardcoded values** (not on the token scales). Token-discipline grades:

| Grade | Cuts | Headline |
|---|---|---|
| **A** | 04 | token-driven (React) |
| **B** | 01, 03, 10 | mostly tokenized |
| **C–D** | 02, 09 | mixed |
| **F** | 00, 08, 11 | ~300–400 hardcoded px each; durations hardcoded |

Totals across all cuts: **~1,600 hardcoded values** (~80% spacing/radius px, ~10% durations, ~10% color — most color is intentional/fallback). Genuine *color* drift is small (~4 real instances, mostly the `#1FBA67`/`#BF183C` we already fixed). The real debt is **spacing, radius, and duration** not using `--space-*`/`--radius-*`/`--tx-*`.

### Rail-width divergence (why cuts feel inconsistent)

Canonical is **280 / 320**. Forks: 00 (230/250), 09 (232/250), 11 (212/232), 08 (264/392). Every fork narrows the left rail; cut 11 is tightest. This is the concrete reason agency widgets feel cramped and don't reflow consistently.

---

## The plan — three phases, prioritized by leverage

### Phase 1 — Promote the missing chrome to canon (unblocks everything)
The frame chrome (`.shell`/`.rb-top`/`.rb-bot`) and `.dispo` are forked because **they don't exist in `cut-shell.css`** — so cuts have no canonical thing to adopt. Fix the supply side first:
1. Extract canonical `.titlebar`/`.audit-ribbon`/`.disposition` shapes into `cut-shell.css` if missing, reconciling the 00/11 drift into one defensible default.
2. Add `.dispo` as an official alias of `.disposition` (it's already the de-facto name in 3 cuts).
3. Resolve the `.artifact` vs `.dispo-artifact` duplication (we added `.artifact`; decide if `.dispo-artifact` is retired or kept as a variant).
*Outcome: there is now ONE canonical version of every shell component to adopt.*

### Phase 2 — Retrofit the forks onto canon (highest-drift first)
In priority order (matches all three audits):
1. **cut 11 (govern)** — highest delta: import `cut-shell.css` + `brand-upgrade.css`; rename `.shell→.stage`, `.rb-top→.titlebar`, `.rail-l→.rail-left`, `.work→.slate-area`; widen rails to 280/320; drop its inline `.artifact` (use the canon block).
2. **cut 00 (agency)** — same retrofit. (Note: 00 is the parametric master — fixing it cascades to all subjects.)
3. **cut 08 / 09 (custody)** — already import cut-shell; just rename the overridden classes (`.left-rail→.rail-left`, `.center→.slate-area`) + reconcile widths (08's wide 392 right rail may be an intentional custody exception — confirm, don't force).

### Phase 3 — Tokenize hardcoded values
Once on the shared shell, sweep the F-tier cuts (00, 08, 11) for hardcoded px → `--space-*`/`--radius-*` and hardcoded durations → `--tx-*`. Lower-tier cuts (02, 09) follow. This is mechanical once the structure is shared.

### Phase 4 — Prevent recurrence (the durable part)
Add drift-checks to the **Substrate Console** (`cuts/_console.html`) — it already does coordinate/kernel/stamp checks; extend it to design-system drift:
- **Import check:** flag any cut that doesn't import `cut-shell.css` + `brand-upgrade.css` (catches the next pure fork at birth).
- **Vocabulary check:** scan for fork class-names (`.shell`, `.rb-top`, `.rail-l`, `.work`) and flag them against the canonical set.
- **Rail-width check:** flag any `grid-template-columns` that isn't 280/1fr/320 (with an allowlist for intentional exceptions like custody).
- **Hardcoded-hex check:** flag hex values that duplicate a token's value (the `#1FBA67`-instead-of-`--good` pattern).
*This is what makes it systematic rather than a one-time cleanup — the console becomes the enforcement layer.*

---

## Recommended starting point

**Phase 1 + the Phase 4 import-check first.** Rationale: Phase 1 creates the canonical targets (cheap, additive, breaks nothing — the `.artifact` promotion already proved this pattern is safe/inert). The import-check immediately makes the drift *visible* in the console you already use, so every future cut gets caught. Then Phase 2 retrofits can proceed cut-by-cut, verified against the console, without a risky big-bang rewrite.

Lowest-risk, highest-visibility, and it turns "systematize the design system" from a sprint into a standing capability.

---

## Honest caveats
- **cut 04** is a React SPA — exclude from CSS systematization; it's token-clean by a different mechanism.
- **cut 08's wide right rail (392px)** and **cut 03's matrix layout** may be *intentional* surface-specific designs, not drift. Phase 2 should confirm before forcing them to 280/320 — the rail-width check needs an allowlist, not a hard rule.
- Retrofitting the pure forks (00, 11) is the **highest-value but highest-touch** work — these are the master cuts. Do them one at a time, screenshot-verified against cut 01, not in a batch.
- Audit agents disagreed on a few exact pixel values (e.g. cut 00 left rail 230 vs 212); the *patterns* are solid but verify exact current values when editing each file.
