# Ontology Reconciliation — prototype demo cast vs liminal-agents canon

*2026-07-01 · the adjudication the PORTABILITY_BACKLOG Tier-2 "agent-register model"
row calls for ("reconcile to one source"). Authority unchanged per the 2026-06-18
decision: **liminal-agents-v1 is the schema authority.***

## The finding

The two "overlapping" ontologies are not one drifted list — they are three different
things that were never distinguished:

1. **Canon production ontology** (`liminal-agents-v1/lib/agents/index.ts:55-80`):
   - `INTROSPECTIVE_AGENTS` — 12 agents across 4 registers
     (Structural/Somatic/Temporal/Symbolic): Architect, Strategist, Economist,
     Witness · Physician, Child, Historian · Cartographer, Elder, Contrarian ·
     Mystic, Betrayer. Locked by that repo's CLAUDE.md (bounded architecture,
     patent-adjacent).
   - `AGENCY_AGENTS` — 4 agents by phase (discover/decide/do): Analyst, SDR,
     Auditor, Forensic.
2. **Prototype demo cast** (`lib/agency.js:17-27`): 9 agents across 4 registers
   (diligence/outreach/synthesis/judgment): Operator, Synthesizer, Witness ·
   Planner, SDR · Strategist, Editor · Contrarian, Manager. The file's own header
   says "12 agents" — a stale comment; the roster is 9. Three names (Strategist,
   Witness, Contrarian) are borrowed from the introspective canon, one (SDR) from
   the agency canon, five are demo-only inventions.
3. **The presentation register vocabulary** (diligence/judgment/synthesis/outreach):
   these are the **brand chrome tokens** (`--diligence`, `--judgment`,
   `--synthesis`, `--outreach` — locked 2026-05-14 visual register) doing double
   duty as the demo's register names. They are owned by the design canon
   (liminal-creative), not by the agent ontology, and are NOT the canon's
   introspective registers or agency phases.

## The verdict

- **V1 · Authority:** liminal-agents-v1 remains the single schema source for agent
  ontology + correction taxonomy. The prototype never becomes an authority.
- **V2 · Correction-tags:** TAGS + DESCRIPTIONS are already at parity. The
  prototype's `CORRECTION_TAG_LABELS` (`lib/correction-tags.js:55-65`,
  canon-candidate since 2026-06-18) are **accepted upstream** — they move into
  liminal-agents beside TAGS/DESCRIPTIONS, exported via a package subpath, so both
  consuming repos read one source.
- **V3 · Demo cast:** `lib/agency.js`'s roster is a **presentation-layer cast, not
  an ontology claim** — documented as such in the file header (this change).
  Where a surface needs production-real agent names, it uses `AGENCY_AGENTS`
  (cut 04 already does: Analyst/SDR/Auditor, PR#36). No forced rename of the demo
  rail today; whether demo surfaces should adopt canonical names wholesale is a
  founder/content call flagged in the Run-B brief.
- **V4 · Registers:** diligence/judgment/synthesis/outreach stay as the
  presentation register vocabulary, owned by the design canon. The consolidation
  engine (`lib/loop.js`) treats register names as a skin parameter (fold map §3a),
  which is exactly what they are.
- **V5 · Stale comment:** `lib/agency.js:3` "12 agents in 4 registers" corrected to
  the actual 9 (this change).

## What lands where

| Repo | Change |
|---|---|
| liminal-agents-v1 (branch `shruti/ontology-single-source`) | `CORRECTION_TAG_LABELS` added beside TAGS/DESCRIPTIONS; ontology subpath export; tests green |
| liminal-prototype (this branch) | This doc; `lib/correction-tags.js` header re-pointed from "pending upstream reconciliation" to synced-with pin; `lib/agency.js` header documents the demo-cast status |

*Relates: `docs/CUT_CONSOLIDATION_MAP.md` §1 (the engine absorbs the register-skin
parameter), PORTABILITY_BACKLOG Tier-2 row + 2026-07-01 addendum.*
