# Fresh-session prompt — onboarding tiering · brand↔product↔demo framing · upstream token sync

Paste everything below the line into a new Claude Code session started in
`~/liminal/liminal-prototype`. It reproduces the current git state and scopes
three parked threads. It is a PLAN-FIRST brief: do the founder decisions and the
design before building.

---

You are picking up three parked threads from a prior session. Work across
`~/liminal/liminal-prototype` (the public cuts catalog), `~/liminal/liminal-agents`
(the plugin/CLI + govern pipeline), and `~/liminal/founder-brain` (canonical
strategy/IP — the source of truth; read it before asserting positioning), and
`~/liminal/liminal-creative` (the upstream design canon).

## Ground rules
- **Plan before you build.** Threads 1 and 2 contain genuine founder decisions
  (entry-model tiering, framing convergence). Do NOT make those calls yourself —
  research, lay out the options with a recommendation, and ask. Thread 3 is a
  mechanical fix you can mostly just do, but confirm the sync approach first.
- **Ground positioning claims in `founder-brain/` before stating them.** Memory
  and the prototype both LAG the live thesis — that's the core problem these
  threads address. Start at `founder-brain/meta/CORPUS_MAP.md`.
- Canon-safe: locked cast only (Maia/Devon/Sam/Rhea/Tariq Osei/Hollis/Cole;
  Priya/Jordan synthetic). NEVER use forbidden real names (Marty, Brian, Kriti,
  Magesh, Bibble, Rubrik, real employers). No gated content (patent/PPA/raise
  specifics) in public-repo files. No Co-Authored-By in commits. Separate PRs by
  concern. `design-system/tokens/design-tokens.css` is a SYNCED consumer copy —
  never hand-edit values; the upstream is `liminal-creative/tokens/design-tokens.css`.

## Current git state (as of handoff)
- `liminal-prototype` main HEAD `5ba3dfe` (merged: Sam-seed fold, onboarding canon
  rebuild + agent-name fix #36, font-drift kill #35, dev-server cut index #37).
- **Open PRs — do not disturb unless a thread requires it:**
  - prototype #38 `feat/govern-real-pipeline-seam` — the AI-spend govern cut seam +
    registry beat (companion to agents #52).
  - prototype #39 `fix/text-faint-wcag-aa` — the a11y --text-faint fix. **THREAD 3
    extends this** (the value lives in the synced consumer copy and must go upstream).
  - agents #52 `feat/govern-ai-spend-mvp` — the govern pipeline/registry/tests.
- Start each thread on its OWN fresh branch off `main`. Don't pile onto the open
  feature branches.

## Context the prior session established (verify, don't trust blindly)
- The product's **entry model moved to plugin-first** (per the Sam-seed seed→land
  motion). The desktop 7-screen onboarding (`cuts/04-onboarding.html` — just
  canon-rebuilt: vanilla, playable, Analyst/SDR/Auditor agents) is now the
  **"land"-tier (B2)** flow, NOT the seed entry. The plugin first-run is an
  ephemeral "agents read a brief & disagree → offer to install desktop to persist"
  loop and is an UNBUILT gap — **gap G1** in
  `docs/architecture/REFACTOR_PLAN_sam-seed-fold.md` (see also
  `docs/architecture/SITUATION_PERSONA_TIER_CUT_MATRIX.md`).
- The **investor/deck framing** has converged on agent-provenance / operator-
  judgment / "turns diffuse context into the next move" / "the moat is the
  correction stream," and plugin-first GTM. But the onboarding + the govern demo
  still partly speak the older solo-personal register.
- Memory file `onboarding-cut-content-drift` (in the project memory dir) records
  the parked entry-model decision; the agent-name half is already RESOLVED.

---

## THREAD 1 — Onboarding entry tiering (the founder decision + the build)

**The decision (yours to surface, not make):** is `cuts/04-onboarding.html` the
desktop **"land"-tier** onboarding (keep as-is; maybe refresh the expired
2026-06-08 pilot-key fixture), AND should the **seed entry be a NEW plugin-first
cut** (build gap G1)? Or some other tiering?

**Do:**
1. Read `cuts/04-onboarding.html` (the rebuilt desktop flow), the gap-G1 spec in
   `docs/architecture/REFACTOR_PLAN_sam-seed-fold.md`, the cut matrix, and how the
   plugin actually behaves today (`~/liminal/liminal-agents/.claude-plugin/plugin.json`,
   `commands/`, `bin/liminal-plugin-onboard.js`, `scripts/setup.js` — the `liminal
   setup` cold-start scan already exists and prints candidate streams).
2. Map: which of the desktop 7 screens (pilot key / vault / Ed25519 / daemon /
   source / three-reads / day-1) survive in a PLUGIN context vs. don't (no local
   vault, no daemon, ephemeral in-Claude). The plugin first-run is short.
3. Present the tiering options with a recommendation, then **ask** before building.
4. On approval: design + build the chosen cut(s) on-canon (vanilla, the locked
   type stack, reduced-motion, responsive). If it's a new plugin-seed cut, it
   should ladder into the Sam-seed motion and hand off to the desktop "land" flow
   (the B1→B2 invite seam, also a named gap).

## THREAD 2 — brand ↔ product ↔ demo framing reconciliation

**The problem:** three registers disagree. Reconcile them so the onboarding + the
govern demo speak the SAME story the deck now leads with (plugin-first,
agent-provenance, "diffuse context → next move," correction-stream moat) — without
breaking the locked brand sentence ("Liminal gives form to inner life," brand seal
only, not the investor line).

**Do:**
1. Pull the CURRENT canonical investor framing from `founder-brain/` (CORPUS_MAP →
   the positioning/thesis docs; the prior session found
   `CANONICAL_POSITIONING_FRAME_2026-05-04.md`,
   `HARMONIZED_FRAME_AGENT_PROVENANCE_2026-06-12.md`, `THESIS.md`,
   the SR007 Kirwin memo). Quote, with dates. Distinguish CURRENT from retired.
2. Audit where the onboarding cut + the govern demo (`cuts/11-govern.html`, and the
   `liminal-agents` govern pipeline copy in `lib/govern/`) still use the older
   solo-personal / off-thesis language vs. the live agent-provenance framing.
3. Produce a small, concrete **framing reconciliation** (a copy/positioning diff —
   what each surface should say) and surface it for approval BEFORE editing copy.
   This is a think-with deliverable first, edits second. Keep gated positioning out
   of public-repo files.

## THREAD 3 — upstream token sync (the mechanical one)

**The problem:** PR #39 fixed `--text-faint` #6B6862 → #807D78 (WCAG AA: 3.56:1 →
4.83/4.76:1) but the value sits in the SYNCED CONSUMER COPY
(`liminal-prototype/design-system/tokens/design-tokens.css`) plus the two mirrors
(`lib/brand-upgrade.css`, `lib/cut-shell.css`). The next `npm run tokens:sync` will
OVERWRITE it from upstream. It must go upstream or it regresses.

**Do:**
1. Confirm the upstream canon file: `liminal-creative/tokens/design-tokens.css`
   (the prototype's sync source — verify via `liminal-prototype/scripts/tokens/sync-upstream.mjs`).
   Check the contrast claim holds against the upstream's `--bg`/`--frame-bg`.
2. Apply the `--text-faint: #807D78` fix UPSTREAM in `liminal-creative` (its own
   branch + PR; carry the same WCAG-AA rationale comment). Mind: `liminal-creative`
   has worktrees — edit the canonical `tokens/design-tokens.css`, not a worktree copy.
3. Run `npm run tokens:check` in `liminal-prototype` to confirm the consumer copy
   now matches upstream (no drift). If #39 hasn't merged yet, sequence so upstream +
   consumer agree.
4. Note any OTHER consumers of the canon token (liminal-desktop, marketing) that
   should re-sync.

---

## Suggested order
Thread 3 first (small, unblocks regression, mechanical). Then Thread 2 (the framing
research feeds Thread 1's copy). Then Thread 1 (the biggest build, and it depends on
the framing being settled). But confirm sequencing with the founder — Thread 1 may be
the priority if a demo/pitch is imminent.

Begin by reading `founder-brain/meta/CORPUS_MAP.md` and the two
`docs/architecture/` specs, then propose a plan.
