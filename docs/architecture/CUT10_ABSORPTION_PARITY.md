# Cut 10 Absorption Parity Report

**Status:** Verification only (Phase B2); no modifications made to cuts 10 or 11.

**Scope:** The fold map (CUT_CONSOLIDATION_MAP.md §2) records cut 10 (Today · re-entry) as "Already absorbed into 11's Today surface." This report verifies that claim by comparing cut 10's surface elements against cut 11's Today tab rendering.

**Verdict:** SUBSTANTIALLY INCOMPLETE PARITY. Cut 11's Today surface is a simplified card layout; cut 10's two-column structure with detailed interaction flows is NOT present in cut 11's renderToday() function.

---

## 1. Surface Structure

### Cut 10: Two-column layout (cuts/10-today.html:463–544)
- **Left column:** "Needs a decision" card + "Re-surfaced overnight" list (2 held reads)
- **Right column:** "Close the loop" outcome buttons (sealed display) + "Mirror" quiet note
- **Footer:** Tray + closing philosophy statement
- **Frame:** Desktop window chrome (titlebar, lights, vault pill)

### Cut 11: Card-based grid (cuts/11-govern.html:825–850, renderToday)
- Three `tcard` buttons: "Needs a decision" → "Outcome closing" → "Mirror note"
- No two-column layout
- No "Re-surfaced overnight" section
- No close-the-loop outcome interaction
- No tray or footer narrative
- Rendered inline to `#work` container (no full-page frame)

**Parity gap:** The two-column frame, resurfaced reads list, and interactive outcome sealing are absent from cut 11.

---

## 2. Content Elements: Line-by-line comparison

| Cut 10 element | Line (10) | Present in cut 11? | Cut 11 line | Parity | Notes |
|---|---|---|---|---|---|
| **Header & intro** | | | | | |
| Eyebrow: "Today · re-entry · the loop comes back" | 458 | ✓ | 827 | ✓ | Identical wording |
| Title: "Three things came back overnight." | 459 | ✓ | 828 | ✓ | Exact match |
| Lede: "The daemon re-read your held compositions..." | 460 | ~ | 829 | △ | Rephrased slightly ("held decisions" vs "held compositions") |
| **Left column: decision** | | | | | |
| "Needs a decision" label + meta (held 2d, re-read time) | 468 | ~ | 831 | △ | Label present; meta details differ (no re-read time in 11) |
| Verdict: "NOT READY · 4 fixes" | 474 | × | — | ✗ | Not rendered in 11; context is AI-spend, not founding round |
| Decision body text | 475 | ~ | 833 | △ | Different substance; 11 is spend-specific |
| Receipt meta line (read ID, lanes, vault) | 476 | × | — | ✗ | Completely absent from 11 |
| Action buttons: "Open the read / Sign & hand off / Defer 2d" | 477–481 | × | — | ✗ | Not in 11's renderToday |
| **Left column: resurfaced reads** | | | | | |
| "Re-surfaced overnight" section label | 486 | × | — | ✗ | This entire section is absent from 11 |
| Resurfaced read cards (2 items w/ dot, name, age, body) | 487–505 | × | — | ✗ | Not rendered anywhere in 11 |
| **Right column: close the loop** | | | | | |
| "Close the loop" label + meta | 511 | × | — | ✗ | Not in 11's Today (outcome interaction exists only implicitly in the old demo) |
| Loop question & sub-text | 513–514 | × | — | ✗ | The interaction ("How did that land?") is core to cut 10's design |
| Outcome buttons (4 options: Resolved well / Mixed / Regret / Still open) | 516–521 | × | — | ✗ | Outcome sealing is NOT in 11's renderToday |
| Sealed verdict display (●, text, hash) | 523–527 | × | — | ✗ | Seal display element missing |
| Calibration counter ("7 of 9 decisions calibrated") | 530–531 | × | — | ✗ | The calibration metric doesn't appear in 11's renderToday |
| **Right column: mirror note** | | | | | |
| "◍ Mirror · a quiet note" section | 537–540 | ~ | 838–841 | △ | Present as a card in 11; much shorter in 11 (one sentence vs two paragraphs in cut 10 concept) |
| **Footer elements** | | | | | |
| Tray: "Drag any window, doc..." | 547–550 | × | — | ✗ | Not in 11's renderToday |
| Closing philosophy: "Re-entry is how the loop closes..." | 552 | × | — | ✗ | Not rendered |

---

## 3. Interactive Behaviors

### Cut 10: Outcome sealing (lines 559–599)
- Outcome button click → seal display reveals with verdict + hash
- Calibration counter bumps (520ms animation)
- CSS class `is-sealed` locks the interaction
- **Specific animation:** `calNum.classList.add('bump')` at 520ms rise

### Cut 11: No equivalent interaction in renderToday()
- The outcome interaction is described in cut 11's demo path (line 439) but NOT implemented in renderToday()
- No seal display, no calibration bump, no outcome buttons in the Today tab

**Parity gap:** The seal choreography (520ms rise for calibration counter) and the full outcome interaction are absent.

---

## 4. CSS & Styling Elements

| Element | Cut 10 | Cut 11 | Parity |
|---|---|---|---|
| Frame chrome (titlebar, lights, vault pill) | ✓ (lines 439–452) | × (uses cut-shell.css global, rendered at body level) | ✗ Different scope |
| Two-column grid (`tdy-cols`) | ✓ (line 463) | × (card layout, no grid) | ✗ |
| Seal animation (@keyframes tdy-rise) | ✓ (line 325, 360ms rise) | × | ✗ |
| Outcome button styles (.tdy-outcome) | ✓ (lines 244–270) | × | ✗ |
| Resurfaced card styles (.tdy-rcard) | ✓ (lines 280–308) | × | ✗ |
| Calibration counter bump animation | ✓ (520ms via JS, line 595) | × | ✗ |
| Mirror state styling (.tdy-state) | ✓ (lines 331–342) | ~ (cut 11 uses `.tcard.mirror`) | △ |

---

## 5. Data Model & Script Integration

### Cut 10 (lines 559–599)
- Outcome sealing via `SEALS` map (4 deterministic hashes)
- Calibration counter updates: "7 of 9" → "8 of 10" (conditional on disp !== 'open')
- Self-contained; no engine integration

### Cut 11 (no such interaction in renderToday)
- renderToday() is a static render function with no interactivity
- The demo shows outcome interaction only on the Loop tab (full-loop render)
- No seal choreography or calibration bump in the Today surface

---

## 6. Gap Summary (What Cut 10 has that Cut 11's Today lacks)

**Critical gaps for re-entry beat closure:**

1. **The two-column layout** (left: decision + resurfaced; right: outcomes + mirror)
2. **The "Needs a decision" card** with full details (verdict, body, receipt, action buttons)
3. **The "Re-surfaced overnight" section** with 2+ held read cards
4. **The "Close the loop" interaction** (outcome buttons → seal display → calibration bump)
5. **The seal choreography** (360ms for verdict display, 520ms for calibration bump)
6. **The calibration counter interaction** (bumps on non-"open" outcomes)
7. **The tray and footer narrative** (closes the loop philosophically)
8. **Frame chrome integration** (titlebar, lights, vault pill within the surface, not global)

---

## 7. Architectural Context

The fold map (§2) states: "Cut 10 · Already absorbed into 11's Today surface (fold map §1) — verify parity, then archive + redirect."

However, cut 11's renderToday() is a **spend-governance-specific** rendering, not a generalized re-entry surface. It appears the intended absorption was:
- **Concept absorbed:** re-entry closes the loop (the philosophy)
- **Interaction NOT absorbed:** the outcome sealing interaction that demonstrates loop closure
- **Substance NOT absorbed:** the held-decision narrative, resurfaced reads, calibration feedback

Cut 11 DOES have an outcome interaction on its Loop tab, but it is not a re-entry surface; it is a decision-making surface where the user ratifies a read. The re-entry surface's role (what you held comes back, you say how it landed) is distinct.

---

## 8. Recommendations for Phase C

**Option A (Absorption complete for Phase B2):**
- Archive cut 10 with a redirect to cut 11's Today tab
- **Risk:** Phase C must either (1) restore cut 10's interaction and layout to cut 11, or (2) accept that the re-entry beat's visual closure is deferred to a future run

**Option B (Parity verification blocks archival):**
- Flag cut 10's absorption as incomplete
- Phase C decides whether to:
  1. Extract cut 10's interaction into cut 11's pattern subject (as a re-entry pane variant)
  2. Keep cut 10 as a separate surface (not absorbed)
  3. Port cut 10's interaction into the loop engine as a re-entry beat handler

**Current recommendation:** The absorption is **conceptually sound but structurally incomplete**. Cut 10's outcome sealing should be ported into the notice/pattern evidence pane or into a dedicated re-entry beat handler in the engine. As-is, archiving cut 10 without porting its interaction means the re-entry beat has no visual seal choreography.

---

*Report generated Phase B2, 2026-07-01. No modifications made to cuts 10 or 11. This report informs Phase C folding decisions.*
