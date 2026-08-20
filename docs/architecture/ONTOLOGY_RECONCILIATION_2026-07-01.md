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

---

## Addendum — 2026-08-20 · the fourth vocabulary, and how to cite the third

The 2026-07-01 pass named three things (canon ontology · demo cast · register
vocabulary). It missed a fourth, and the miss was on the highest-traffic surface
in the repo.

### 4. Front-door cast (`index.html`, `<g id="regs">`)

The front door names one agent per register — **Auditor · Skeptic · Weaver ·
Envoy** — and matches none of the three above:

| Name | Status |
|---|---|
| Weaver | appears nowhere else in this repo |
| Envoy | appears nowhere else in this repo |
| Skeptic | retired 2026-05-12 (renamed from Operator/Skeptic in `liminal-desktop`, to align with `liminal-agents/SPEC.md` v0.6) |
| Auditor | real `AGENCY_AGENTS` name, but lanes **diligence** here and **judgment** in `cuts/04-onboarding.html:462` |

This was never adjudicated — the 2026-07-01 doc reconciled the register
*vocabulary* (§3/V4) and never looked at the front door's *cast*.

**V6 · Front-door cast stays, documented, not renamed.** Founder ruled
2026-08-20: *"document rather than rename, since renaming touches claim-adjacent
framing for a cosmetic gain."* The four **positions** are load-bearing — the
four-register framing is claim-adjacent — while the four **names** are not, so a
rename buys nothing and risks something. This settles for `index.html` the call
V3 deferred as "a founder/content call." A do-not-correct note now sits inline at
the block in `index.html`, with a pointer in `cuts/_explore/frontdoor-synthesis.html`.

Consequence for future sweeps: a roster sweep will flag Skeptic/Weaver/Envoy every
time. That is expected. **Read the note before "fixing" them.**

### Citation rule for the demo cast (corrects a live overclaim)

V3 established that `lib/agency.js` is a presentation-layer cast, not an ontology
claim. That was recorded in the file header but not as a *citation* rule, and the
gap produced a real error: PR #101 (2026-08-20) described `agency.js` as "the
roster authority," and that framing was relayed to the DARPA/AoNS lane as guidance
for verifying agent counts in proposal text. No wrong cardinal reached a submitted
volume — the DV015 volumes carry no agent cardinal at all — but the rule as stated
would have licensed *"nine bounded agents (`agency.js`)"* into an architecture
claim sourced to a self-declared demo cast: correct number, real citation, wrong
kind of claim.

**Stating it as a rule, since the header alone did not prevent the error:**

- `REGISTER_AGENTS` (9) is authoritative for **what cut 01's rail renders** — that
  surface, nothing else.
- `AGENCY_AGENTS` (Analyst/SDR/Auditor/Forensic) is what a surface uses when it
  needs **production-real names** (cut 04, cut 05).
- `liminal-agents-v1` is the **schema authority** for agent ontology. Per V1, the
  prototype never becomes one.
- **No count from this repo is an architecture claim.** External-facing text names
  the roster *and* the layer, or carries no cardinal. The stronger form, from the
  DARPA lane's `proposal-language.md` [BA-1], is to ban the bare cardinal outright.

Related: the retired **"12 bounded agents"** claim is not a fabrication either — it
traces to `INTROSPECTIVE_AGENTS` (12 × 4 registers) per §1 above, i.e. a real
schema-layer number cited at the wrong layer. Same failure mode as the front-door
fossils: the artifact outlived the state it described. A sweep that assumes those
numbers were invented will mis-explain where they came from.
