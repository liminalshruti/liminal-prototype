# Consolidation Design — Reuse & Non-Rewrite Inventory

**Purpose:** Explicit map of what gets reused vs. wrapped vs. deprecated, with line references, so implementation is mechanical not interpretive.

---

## Part 1: REUSE (No Wrapping Needed)

### state.js (80 exports verified)

All state accessors are consumed unchanged by lib/loop.js and evidence panes.

| Function | Users | Notes |
|----------|-------|-------|
| `activeProductId`, `activeContextId` (mutable) | loop.js (read), boot.js (write) | Engine reads current product/context; boot writes on tab click |
| `setActiveProductId(id)`, `setActiveContextId(id)` | boot.js only | No change |
| `slated`, `corrected`, `auditRows`, `vaultCount` (objects) | slate.js, vault-store.js | loop.js:applyBeat(SEALING) calls bumpVault() |
| `bumpVault(productId)` | slate.js (disposition seal) | loop.js calls it in seal handler |
| `setLastLandedId(id)`, `getLastLanded()` | slate.js (tile settle animation) | No change |
| `undoStack` | undo.js | No change |
| `resetAgencyState(allAgents)` | boot.js (on product switch) | loop.js calls on beat change (reads reset) |
| `agentState`, `readTimes`, `disagreementPair` | agency.js (ticker), slate.js (chips render) | loop.js reads to render agent states in evidence panes |
| `getActiveSubject()` | slate.js (header render) | loop.js queries on beat (READ, DECIDING, SEALING) |
| `getActiveCase()` | slate.js (business mode) | No change needed |
| `getActiveThread()` | slate.js (personal mode) | No change needed |
| `getTilesForActive()` | tray.js (render palette) | No change; loop.js uses indirectly via slate.js |
| `tileIsRefused(tileId)` | slate.js (render tile consent) | No change |
| `getSlatedSet()` | slate.js (brief render) | No change |
| `getOperatorClearanceLevel()` | slate.js (gate reads) | No change; evidence panes use to filter registers |
| `pushUndo(entry)`, `popUndoEntry()` | undo.js | No change |
| `pushAuditRow(productId, row)`, `getAuditRows(productId)` | slate.js (audit ribbon) | loop.js calls on READ beat |

**Verdict:** 100% reusable. lib/loop.js imports state.js and reads/writes through public exports. No modification.

---

### vault-store.js (5 exports verified)

Packet contract + hashing + persistence layer.

| Export | Users | Notes |
|--------|-------|-------|
| `vaultStore.write(packet)` | slate.js (materializeDisposition → seal → vault) | loop.js:BEAT_HANDLERS.sealing calls this |
| `vaultStore.read(id)` | vault inspector (not yet UI-wired) | No change |
| `vaultStore.search(query)` | vault inspector | No change |
| `canonicalHash(packet)` | slate.js (artifact sign) | No change |
| `PACKET_SCHEMA` | slate.js (disposition shape) | No change; evidence panes respect schema |

**Verdict:** 100% reusable. No modification. lib/loop.js calls `vaultStore.write()` in sealing beat handler.

---

### agency.js (10 exports verified)

Agent registry + liveness ticker + reader chips.

| Export | Users | Notes |
|--------|-------|-------|
| `AGENT_FLAT` (array of agents) | boot.js, tray.js, slate.js | loop.js reads to initialize agentState on beat change |
| `REGISTERS` (object of 4) | slate.js (render register reads) | loop.js reads to get register color/glyph for subject reskin |
| `REGISTER_AGENTS` (lookup) | boot.js (on product switch) | No change |
| `tickAgencyRail(ctx)` | boot.js (setInterval loop) | loop.js calls in READING beat handler |
| `renderConsole()` | console.html (debug) | No change |
| `refreshSlateReaderChips()` | slate.js (on read arrival) | loop.js calls after tickAgencyRail |
| `startAgencyTicker()`, `stopAgencyTicker()` | boot.js (on page load) | loop.js calls on beat change (resume reading, pause deciding) |
| `agentState` (mutable map) | state.js (holder), slate.js (render chips) | loop.js reads to decide which agents to show as "reading" |

**Verdict:** 100% reusable. No modification. lib/loop.js orchestrates ticker start/stop, reads agentState, calls render refresh.

---

### slate.js (8 major exports verified)

Composition surface + brief + disposition + audit ribbon.

| Function | Lines | Users | Reuse notes |
|----------|-------|-------|-------------|
| `renderSlate(ctx)` | 200 | boot.js (CAPTURING, then again DECIDING) | loop.js:evidence-pane-renderer calls this to populate the center pane |
| `renderSlateHeader()` | 50 | boot.js (on context switch) | loop.js calls on READING beat (populate eyebrow + title) |
| `renderBrief(subject)` | 120 | boot.js (after reads arrive) | loop.js calls to populate brief section (shows agent reads) |
| `setDispositionLabels(labels)` | 20 | boot.js (on product switch) | loop.js calls on DECIDING beat (populate disposition paper-card) |
| `materializeDisposition()` | 40 | boot.js (on sign button) | loop.js calls in SEALING beat (generate artifact + vault write) |
| `wireDisposition()` | 60 | boot.js (boot) | No change; wires event handlers |
| `appendAudit(row)` | 15 | boot.js (on seal) | loop.js calls in SEALING beat |
| `renderAuditRibbon()` | 30 | boot.js (on seal) | loop.js calls after appendAudit |
| `onTileClick(tileId, register)` | 80 | wired in renderSlate | No change; citation click handler |
| `onTileRemove(tileId)` | 40 | wired in renderSlate | No change; tile drag-off handler |

**Verdict:** ~95% reusable. `renderSlate()` is the anchor; evidence panes call it. No modification to slate.js needed; loop.js orchestrates the beat-by-beat sequence that slate.js already handles.

---

### tray.js (3 major exports verified)

Tray palette + tile previews.

| Function | Lines | Users | Reuse notes |
|----------|-------|-------|-------------|
| `renderTray(ctx)` | 150 | boot.js (boot + on product switch) | loop.js calls on CAPTURING beat to show palette |
| `tilePreviewHTML(tileId)` | 80 | slate.js (inline preview in tile) | No change |
| `toggleTray()` | 20 | keyboard.js (spacebar to open/close) | No change; wired in wireKeyboard |

**Verdict:** 100% reusable. No modification.

---

### keyboard.js (1 major export verified)

Unified shortcut layer + help overlay.

| Export | Lines | Users | Reuse notes |
|--------|-------|-------|-------------|
| `wireKeyboard()` | 250 | boot.js (boot) | No change; handler functions call beat-aware state mutations |

**Verdict:** 100% reusable. No modification. ⌘K opens agency-search; spacebar toggles tray; all wired independently.

---

### marginalia.js (3 exports verified)

Caveat editor's notes overlay.

| Export | Lines | Users | Reuse notes |
|--------|-------|-------|-------------|
| `renderAnnotations()` | 100 | boot.js (on read arrival or correction) | loop.js calls on DECIDING beat to show corrections |
| `clearAnnotations()` | 10 | boot.js (on tile remove or product switch) | loop.js calls on beat change |
| `wireMarginaliaToggle()` | 50 | boot.js (boot) | No change; wired once |

**Verdict:** 100% reusable. No modification.

---

### classification.js (2 exports verified)

Business classification banner + decode toggle.

| Export | Lines | Users | Reuse notes |
|--------|-------|-------|-------------|
| `renderClassificationBanner()` | 80 | slate.js (Business mode) | loop.js calls in READING beat for business subject |
| `clearClassificationBanner()` | 10 | slate.js (non-Business modes) | loop.js calls on subject switch |

**Verdict:** 100% reusable. No modification.

---

### correction-tags.js, undo.js, previews.js, etc.

All other lib/*.js files are event handlers, validators, or helpers called by the modules above.

**Verdict:** All 100% reusable. No modifications planned.

---

## Part 2: WRAP (Create Adapter Layers)

### Cut-Specific Loop JS → lib/loop.js Dispatch

Each cut (01, 02, 06, 08, 09, 10, 11) has ~200–300 lines of inline loop orchestration. None of it is thrown away; all of it is refactored into `lib/loop.js:BEAT_HANDLERS[beat]` functions.

| Cut | Current loop logic | Maps to → | New location |
|---|---|---|---|
| 01-slate-tray.html | ~200 lines inline, manual event dispatch | BEAT_HANDLERS sequence + evidence pane | lib/loop.js + lib/evidence-panes.js:spend (partial) |
| 02-forensic-agent.html | ~150 lines inline, read on tile arrival | BEAT_HANDLERS.reading + notice pane | lib/evidence-panes.js:notice |
| 06-margin-read.html | ~180 lines inline, correction on amend click | BEAT_HANDLERS.deciding + correction param | lib/loop.js (sealChoreography param) |
| 08-liminal-custody.html | ~250 lines inline, custom guards + seal | BEAT_HANDLERS sequence + custody defense mode | lib/loop.js + lib/evidence-panes.js:custody (defense) |
| 09-osint-custody.html | ~280 lines inline, kernel compute on read | BEAT_HANDLERS.reading + osint pane | lib/evidence-panes.js:osint |
| 10-today.html | ~120 lines inline, mirror + re-entry | BEAT_HANDLERS.entering | lib/loop.js |
| 11-govern.html | ~220 lines inline, agent-fit swap on seal | BEAT_HANDLERS sequence + spend pane | lib/loop.js + lib/evidence-panes.js:spend |

**Verdict:** No code is deleted. All loop logic is refactored into a canonical sequence in lib/loop.js, with subject-specific HTML moved to lib/evidence-panes.js.

---

### Evidence Pane Renderer Adapters

The tricky reuse: every evidence pane needs to:
1. Call `slate.js:renderSlate()` or `renderBrief()` or both
2. Populate a subject-specific HTML container
3. Wire subject-specific interactions (e.g., map marker click, hypothesis bar hover)

**Adapter pattern:**

```javascript
// lib/evidence-panes.js

export const EVIDENCE_PANES = {
  spend: {
    render: (state, subject) => {
      // Wrapper that calls slate.js exports + contributes HTML
      const briefHTML = renderBrief(subject); // from slate.js
      const slateHTML = renderSlate(state); // from slate.js
      const swapHTML = `<!-- from cut 11 inline: agent-fit swap card -->`;
      return `<div class="evidence spend">${briefHTML}${swapHTML}</div>`;
    },
  },
  // ... others
};

// In lib/loop.js beat handler:
export const BEAT_HANDLERS = {
  READING: (engine) => {
    const pane = EVIDENCE_PANES[engine.subject];
    if (pane) {
      document.querySelector(".evidence").innerHTML = pane.render(state, subject_context);
    }
  },
};
```

**What this means:**
- slate.js is never touched (non-rewrite)
- Evidence panes call slate.js functions and wrap their output
- Subject-specific HTML (e.g., alloc bar from cut 11) is preserved verbatim

---

## Part 3: DEPRECATE (Mark Obsolete, Archive)

### Monolithic inline loop logic in cuts

Each of these has ~200 lines of non-reusable inline beat dispatch:

```
cuts/00-agency.html:800–1000 (subject switch + render logic)
cuts/01-slate-tray.html:1200–1400 (beat sequence)
cuts/02-forensic-agent.html:600–750 (read trigger)
cuts/06-margin-read.html:900–1080 (correction handling)
cuts/08-liminal-custody.html:1100–1350 (guard + seal)
cuts/09-osint-custody.html:1300–1580 (kernel + seal)
cuts/10-today.html:700–820 (re-entry)
cuts/11-govern.html:1000–1220 (agent-fit + seal)
```

**Action:** Extract the beat dispatch (→ lib/loop.js), extract the HTML (→ lib/evidence-panes.js), delete the lines, verify cut still renders via lib/loop.js.

**Example refactor (cut 11):**

Before:
```javascript
// cuts/11-govern.html (200 lines)
document.getElementById("sign-button").addEventListener("click", () => {
  // 1. Validate all reads
  // 2. Render disposition
  // 3. Materialize artifact
  // 4. Write vault
  // 5. Flash seal animation
});
```

After:
```javascript
// cuts/11-govern.html (1 line)
import { initLoopEngine, applyBeat } from "../lib/loop.js";

document.getElementById("sign-button").addEventListener("click", () => {
  applyBeat("SEALING"); // delegates to lib/loop.js:BEAT_HANDLERS.sealing
});

// In lib/loop.js:BEAT_HANDLERS.sealing:
export const BEAT_HANDLERS = {
  SEALING: async (engine) => {
    // 1. Validate all reads
    // 2. Render disposition
    // 3. Materialize artifact
    // 4. Write vault
    // 5. Flash seal animation
  },
};
```

---

## Part 4: File-by-File Implementation Checklist

### Create (New Files)

- [ ] **lib/loop.js** (300 lines)
  - State machine (`currentBeat`, `subject`, `persona`, `tier`)
  - `initLoopEngine(spec)` function
  - `applyBeat(beat)` dispatcher
  - `BEAT_HANDLERS` object (CAPTURING, READING, DECIDING, SEALING, ENTERING handlers)
  - Choreography parameter defaults (from RUN_B divergences, unmissive until Run-B resolves)

- [ ] **lib/evidence-panes.js** (500 lines)
  - `EVIDENCE_PANES` object with 5 subjects
  - `SUBJECT_REGISTER_MAP` object (subject × tier → register hue/glyph)
  - Renderer functions calling slate.js exports
  - Subject-specific HTML from original cuts

- [ ] **lib/cut-shell-base.css** (1,200 lines, extracted from cut-shell.css)
  - Shared frame chrome, titlebar, traffic lights
  - 3-pane layout (rail-l, work, rail-r)
  - Slate composition (empty state, drag feedback, gaze stripe)
  - Tray (palette, tile styles, drag state)
  - Brief + disposition (paper-card base, no subject-specific accent)
  - Audit ribbon, boot animations, prefers-reduced-motion

- [ ] **lib/cut-shell-registers.css** (850 lines, extracted from cut-shell.css)
  - Register plate styling (concave rect, register-hue stroke)
  - Register label (mono caps, register-hue fill)
  - Agent glyph states (queued, reading, complete, refused)
  - Refusal banner (left-border, glyph, text)
  - Cite link styling (accept-color, hover state)
  - Verdict badge (alarm-hue)
  - Evidence pane borders (register-tinted)
  - Corrected row highlight (register-soft-bg)

- [ ] **lib/cut-shell-products.css** (725 lines, extracted from cut-shell.css)
  - Business classification banner + decode toggle
  - Business case-grid restructuring (2-column, 10/11 specific)
  - Custody map styling (radius, background, marker colors)
  - OSINT hypothesis bar (layer colors: connection, watch, alarm)
  - Founder marginalia accent (synthesis-hue)
  - Density modulation (tight for analyst, loose for founder)
  - Per-subject titlebar micro-text (label, unit, cohort)

- [ ] **tests/audit-beat-walks.spec.ts** (300 lines, Playwright)
  - Test matrix: all 5 subjects × beat sequence
  - For each scenario: spawn cut, trigger beats, assert transitions
  - Check choreography timing (seal rise, seal instant, etc.)
  - Report per-cut divergences vs. registered defaults

- [ ] **tests/audit-render-wall.spec.ts** (200 lines, Playwright)
  - Render each of 13 surfaces at 1440px
  - Compare pixel-by-pixel vs baseline PNG
  - Report any diff with coordinates + severity

- [ ] **docs/PORT_NOTES.md** (per-cut choreography defaults)
- [ ] **docs/LOOP_ENGINE_API.md** (lib/loop.js + lib/evidence-panes.js reference)

### Modify (Refactor, No Rewrites)

- [ ] **cuts/00-agency.html**
  - Remove: ~200 lines inline subject-switch + render logic
  - Add: `import { initLoopEngine } from "../lib/loop.js"`
  - Add: subject-button click wires to `initLoopEngine({subject: "..."})`
  - Result: 46 KB → 43 KB (3 KB inline JS removed)

- [ ] **cuts/01-slate-tray.html**
  - Extract: beat dispatch (~200 lines) → lib/loop.js:BEAT_HANDLERS
  - Result: still loads lib/boot.js; still modular; calls `loop.applyBeat()` instead of inline handlers
  - Verify: renders identically to baseline PNG

- [ ] **cuts/02-forensic-agent.html**
  - Extract: read-trigger logic → lib/evidence-panes.js:notice.render()
  - Archive original to `cuts/_archive/pre-consolidation/02-forensic-agent-original.html`
  - Create redirect stub (or delete if full fold to agency-master)

- [ ] **cuts/06-margin-read.html**
  - Extract: correction-handling logic → lib/loop.js correction param
  - Archive original
  - Create redirect stub or delete

- [ ] **cuts/08-liminal-custody.html**
  - Extract: beat dispatch → lib/loop.js
  - Extract: map SVG + legend → lib/evidence-panes.js:custody.render (mode: defense)
  - Merge with 09 into one `cuts/custody.html`
  - Archive original

- [ ] **cuts/09-osint-custody.html**
  - Extract: kernel call + beat dispatch → lib/loop.js + lib/evidence-panes.js:osint.render
  - Merge with 08 into one `cuts/custody.html`
  - Archive original

- [ ] **cuts/10-today.html**
  - Extract: re-entry beat handler + HTML → lib/loop.js:BEAT_HANDLERS.entering
  - Archive original or fold into agency-master

- [ ] **cuts/11-govern.html**
  - Extract: beat dispatch (~220 lines) → lib/loop.js
  - Extract: alloc-bar + agent-fit swap → lib/evidence-panes.js:spend.render()
  - Keep as reference implementation (or fold into agency-master)

- [ ] **lib/state.js, lib/slate.js, lib/boot.js, lib/agency.js, lib/vault-store.js, lib/keyboard.js**
  - **NO CHANGES.** lib/loop.js imports and calls their exports.

- [ ] **lib/cut-shell.css**
  - Mark deprecated: "Use cut-shell-base/-registers/-products instead (2026-07-01)"
  - Keep file for backwards-compat; copy to _archive/

- [ ] **cuts/cut-manifests.json**
  - Regenerate: update cut URLs for folded cuts
  - Mark consolidated cuts with `"ported": true`, `"engine": "lib/loop.js"`

- [ ] **README.md**
  - Update cut descriptions (consolidation complete section)
  - Note: "All loop-bearing cuts now run on lib/loop.js engine"

### Archive (Preserve, Don't Delete)

- [ ] **cuts/_archive/pre-consolidation/**
  - Preserve all originals: 00, 01, 02, 06, 08, 09, 10, 11 (pre-refactor)
  - Add `ARCHIVAL_NOTE.md` explaining each

---

## Part 5: Git Workflow for Implementation

### Main branch (baseline)

```
main (current: commit 91895e5 or later)
```

### Phase A (engine-core, feature branch)

```
main
└─ foundry/engine-core
   ├─ Create lib/loop.js
   ├─ Create lib/evidence-panes.js (stubs)
   ├─ Refactor cuts/01-slate-tray.html (call loop.applyBeat)
   ├─ Render test cut 01 vs baseline PNG
   └─ Merge to main → Phase B unblocked
```

### Phase B (parallel worktrees)

```
main
├─ foundry/css-split
│  ├─ Extract cut-shell.css → 3 files
│  ├─ Render test all 35+ surfaces
│  └─ Merge when ready
├─ foundry/ports-primary
│  ├─ Port 11, 08, 09, 00
│  ├─ Daily commits
│  └─ Merge when ready
└─ foundry/ports-secondary
   ├─ Port 02, 06, 10
   ├─ Daily commits
   └─ Merge when ready
```

### Phase C (fold, main branch or feature branch)

```
main (after all Phase B merges)
└─ foundry/fold-and-consolidate
   ├─ Merge 08/09 → custody.html
   ├─ Archive originals
   ├─ Update manifests + README
   ├─ Final render wall + beat walk tests
   └─ Merge to main
```

---

## Summary: What Gets Reused, What Doesn't

| Module | Reuse? | Effort | Notes |
|--------|--------|--------|-------|
| state.js | ✅ 100% | None | lib/loop.js reads/writes through exports |
| slate.js | ✅ ~95% | Adapter | Evidence panes call renderSlate, renderBrief |
| agency.js | ✅ 100% | None | lib/loop.js orchestrates ticker + state reads |
| vault-store.js | ✅ 100% | None | lib/loop.js calls write in SEALING beat |
| tray.js | ✅ 100% | None | lib/loop.js calls renderTray in CAPTURING beat |
| keyboard.js | ✅ 100% | None | No changes; handlers wire beats |
| marginalia.js | ✅ 100% | None | lib/loop.js calls render/clear per beat |
| classification.js | ✅ 100% | None | lib/loop.js calls per subject |
| correction-tags.js | ✅ 100% | None | Helpers; no change |
| undo.js | ✅ 100% | None | No change |
| Cut-shell.css | ✅ ~80% | Split | Base stays; registers + products extracted |
| Inline loop logic (cuts 00–11) | ❌ 0% reuse | Full refactor | Extract to lib/loop.js, no code lost |
| Subject-specific HTML | ✅ 100% reuse | Move | From cuts → lib/evidence-panes.js |

**Bottom line:** No existing code is deleted or rewritten wholesale. All modules stay as-is; lib/loop.js orchestrates them via their public exports. Inline loop logic is refactored (not deleted) into a canonical sequence.

---

*Inventory authored 2026-07-01 · implementation-ready mechanical checklist*
