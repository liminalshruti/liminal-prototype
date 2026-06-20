# Situation × Persona × Tier × Cut Matrix

*2026-06-19 · the converged design spec from the persona/cut working session.*
*Canon-safe: uses only locked pseudonyms. Real names (the Rubrik chain, real employers) NEVER appear — see Cast.*

> **What this is:** every situation Liminal serves, cast with a fixed persona, set at a tier,
> and composed from a **sequence of prototype cuts** — where the cut sequence shows *how the
> situation unfolds on screen* and *what each cut reveals.* This is the spec the cut-refactor
> builds against. The organizing truth: **one operator loop, parameterized by
> (persona × tier × subject).** Every row below is that loop at a coordinate.

---

## The Cast (LOCKED 2026-06-19)

| Persona | Invariant role | Inspo (Layer-2 substrate, scrambled) | Tier home |
|---|---|---|---|
| **Maia** | Founder-operator | the real founder | Founder (node-count=1) |
| **Devon Reyes** | Cofounder / subject | the real cofounder (cofounder context) | Founder |
| **Sam** | IC operator — the SEED | the real cofounder (FTE/IC context) + the validated interviewee | Enterprise IC |
| **Rhea** | Manager / GOVERNOR — the LAND node | the real manager | Enterprise mgr |
| **Tariq Osei** | Failing team-lead — read-about, the ethical center | the real 9-yr team lead | Enterprise IC-lead |
| **Hollis** | Exec — TOP-OF-CASCADE | the real exec | Enterprise exec |
| **Cole** | Lateral peer / ex-boss (re-org edge, drift subject) | the real peer-ex-boss | Enterprise mgr |
| **Priya, Jordan** | Team fill | synthetic | any |

**Invariant:** every persona is an **operator** running their own accountable-handoff loop.
**Variables:** the **relational edge** (subject / peer / oversight, flips by perspective, RACI-like)
and the **tier** (solo → IC → manager → exec → org), which sets node-count and coupling-density.

---

## The Matrix

Legend for cut maturity: **live** · **refining** · **sketch** · **(gap)** = situation needs a cut that does not exist yet.

### Tier: ENTERPRISE — the validated seed→land→expand→explode motion

| # | Situation | Persona(s) | Tier / role | Cut SEQUENCE — and what each cut shows | Status |
|---|---|---|---|---|---|
| **B1 · SEED** | IC hits a structural crisis (his pen-test team is drowning on ~1,000 frontier-model findings, no observability), adopts the plugin solo & free, gets "scoping therapy" — a way out that doesn't burn bridges. | **Sam** | IC · operator | `04-onboarding` *(plugin first-run — Sam enters, no team yet)* → `01-slate-tray` *(drops the crisis in; capture→read→decide; agents read the findings + the team's setup)* → `02-forensic` *(the contradictions surface — where the classification logic is breaking)* → `10-today` *(re-entry: what the loop found overnight, the path forward)*. **Shows:** the loop delivers single-player value to one operator in crisis, alone. | live / refining · **GAP: the plugin surface + the "system-not-person" reframe as UI** |
| **B2 · LAND** | Sam invites his manager; she becomes an operator at her node — audits/tweaks/governs the team's agent setup **without snooping**, sees the drift, hands an upward-reportable trail up with the new metric (errors caught, drift corrected). | **Sam → Rhea** | manager · operator + oversight | *(from B1)* **invite seam** *(Sam→Rhea handoff)* → `11-govern` *(the seam cut: observability-without-snooping, agent fleet, amend/ratify→cascade)* → `team-drift` *(Rhea reads the team's drift — incl. Tariq — rendered as a system to tune)* → `03-calibration` *(the record over time — the "errors caught / drift corrected" metric for the exec)*. **Shows:** governance is the SAME loop at the manager node; value flows to both at the invite edge. | live · **GAP: the invite-seam cut; the "system not person" reframe** |
| **A3 · the ethical center** | The failing lead is read-about (canceled 1:1, triangulated complaints) but rendered as *a system to optimize, not a person to indict* — psychological safety for the observed team. | **Tariq Osei** (read-about), **Rhea** (reader) | IC-lead · subject (from Rhea's seat) / operator (from his own) | `team-drift` *(Tariq as drift subject — but the surface frames it as tuning, never indicting)* + `02-forensic` *(the contradictions are in the **system**, not the person)*. **Shows:** the product's hardest moment — one operator's loop pointed at another who's failing — handled without betrayal. This is what "without snooping" + the privacy-invariant protect. | refining · **the moral test of the design** |
| **B3 · EXPAND** | Exec feels the trail, mandates a high-stakes cohort onto the tool; authority→distribution; IT/security review → quarter-long free pilot → contract. | **Rhea → Hollis → cohort** | exec · top-of-cascade | `03-calibration` *(the trail rolls up to Hollis)* → **exec roll-up / cohort-mandate surface** → `00-agency` *(proves at Hollis's altitude it's one system across all the operators below)*. **Shows:** the org-scale view; authority converting to distribution. | **(GAP — the exec roll-up + cohort-mandate cut does not exist)** |
| **B4 · EXPLODE** | The cohort = peer-ICs across teams; each re-instantiates the seed at their own node and seeds their own teams. Fractal replication. | **the cohort** (peer-Sams) | cross-team IC | *(each peer re-runs B1's sequence at their own node)* → **multi-seed / cohort view** *(the graph branching)*. **Shows:** one seed spawned N seeds, each spawning its own. | **(GAP — no multi-seed/fractal view)** |
| **D4 · re-org edge** | A peer who was formerly a vertical boss — the relational edge changed direction through a re-org; he's also a drift subject. | **Cole** | manager · peer (was oversight) | `team-drift` *(Cole as the drift subject in the manager-read)* + `00-agency` *(the edge re-renders by perspective)*. **Shows:** roles are edges, not properties — they flip. | live |

### Tier: FOUNDER — the dogfood / proof / purest demo (Maia's tier, node-count=1)

| # | Situation | Persona(s) | Tier / role | Cut SEQUENCE — and what each cut shows | Status |
|---|---|---|---|---|---|
| **C1 · solo proof** | Founder runs the loop solo on her own accountable work — the purest form, the dogfood origin. | **Maia** | founder · operator | `01-slate-tray` *(the canonical front door, founder context)* → `10-today` *(re-entry, the loop closes solo)*. **Shows:** the loop needs no one else — node-count=1 is complete. | live |
| **C2 · founder reads cofounder** | Founder reads her cofounder's work/decisions (on-thesis founder-OS; replaced the off-thesis manager-report). | **Maia → Devon** | founder · operator + subject | `01-slate-tray` *(Maia drops Devon's work in)* → `02-forensic` *(contradictions in the read)* → consent-gating *(Devon opted into pattern-only — the agent refuses content reads)*. **Shows:** the loop + the privacy-invariant at the founder tier. | live |
| **C3 · the workspace** | Essays, research, fundraise, agent-convos as typed objects in one vault — the founder-OS workspace. | **Maia** | founder · operator | `thread/` series *(recall, open-loops, extract, prep-card — the non-loop workspace surfaces)*. **Shows:** the loop as substrate under *all* content, not just decisions. | **ASPIRATIONAL — renders in `thread/` cuts only, NOT in production** |

### Tier: HIGH-STAKES (L3) — proof-of-travel (the substrate generalizes)

| # | Situation | Persona(s) | Tier / role | Cut SEQUENCE — and what each cut shows | Status |
|---|---|---|---|---|---|
| **D5 · OSINT** | A live custody loop on a real intelligence dark-gap, computed in-browser. | analyst-operator | L3 · operator | `09-osint` *(INGEST→READ→GUARD→REVIEW→VAULT, live kernel)*. **Shows:** the loop at maximum constraint, real-kernel. | live (frozen-kernel) |
| **D6 · NatSec custody** | The loop under maximum operational constraint (overload, ambiguity, accountability). | operator | L3 · operator | `08-custody`. **Shows:** proof-of-travel to defense; "do not automate the moral lever." | sketch |
| **D7 · Counterintel (Molehunt)** | Tier-sorted CI dossier console, statutory gate, append-only custody. | CI analyst | L3 · operator | `molehunt`. **Shows:** the loop in a counterintelligence vertical. | live |

### Cross-cutting: the CONSENT / refusal behavior (renders inside every situation above)

| # | Situation | Cut behavior | Status |
|---|---|---|---|
| **E1 · consent-gated reads** | Subjects opt into consent levels (pattern-only, summaries-only, calendar-only); the agent **refuses** reads above the level and names why. | Renders in `01-slate-tray`, `team-drift`, `11-govern` — the tile shows "refused · out of consent." | live (the extracted CONSENT_CLASSES) |
| **E2 · observability without snooping** | See/audit/govern a team's agent *setup* without reading their work logs. | The framing across `11-govern` + `team-drift`. The validated moat. | live framing |

---

## The meta-cut: `00-agency` is the shell, situations are its parameters

`00-agency` is not a peer of the other cuts — it is the **shell that proves every situation
above is one loop with `(persona × tier × subject)` as the parameter.** The refactor target:

```
00-agency.SITUATION = (persona × tier × subject)
  Sam-seed      = (Sam,  IC,      team-crisis)   → composes 04→01→02→10
  Rhea-land     = (Rhea, manager, team-drift)    → composes invite→11→team-drift→03
  Hollis-expand = (Hollis, exec,  cohort)        → (gap) exec-rollup + cohort
  Maia-solo     = (Maia, founder, own-work)      → composes 01→10
  osint         = (analyst, L3,   dark-gap)      → composes 09
```

So the standalone cuts become **panes of the agency shell, addressed by which character's
situation is being rendered.** Refactoring them "up the taxonomy" = collapsing them into
`00-agency` parameterized by the cast.

---

## What this matrix tells the build

1. **SEED + LAND are fully cast and mostly built** (Sam: 04/01/02/10 · Rhea: 11/team-drift/03).
   These refactor into the agency shell *first* — real customer situations, existing cuts.
2. **Two cuts don't exist and the validated motion needs them:**
   - **the invite seam** (plugin-seed → desktop-land) — the B1→B2 handoff.
   - **the exec roll-up / cohort surface** (B3/B4) — the expand→explode tier.
   Build these as *new parameter values of the agency shell*, not orphan files.
3. **EXPAND/EXPLODE + the workspace (C3) are the unbuilt frontier** — the org-scale and
   inner-life tiers the canon gates. The matrix shows exactly where prototype = thesis.

---

## Boundaries

- Canon-safe: no forbidden real names. The Rubrik chain and real employers appear nowhere.
- This is a spec/map — no cuts built or refactored by this document.
- The "(gap)" cuts are named, not designed here.
