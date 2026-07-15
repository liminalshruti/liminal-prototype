# Maia — Founder OS Persona (Synthetic, Founder OS Wedge)

> **Provenance (added on move to liminal-prototype, LIM-1594, 2026-07-14):**
> This is the **iterable copy**. It moved here from `liminal-agents/sandbox/personae/maia-founder-os/` (the hackathon-era build location) per the reorg judgment recorded in `founder-brain/REPOS.md` §"Hackathon → product migration" item 3 — liminal-prototype is the public demo + design-reference surface, so the persona's iterable copy belongs here going forward.
>
> `liminal-agents` retains the **frozen prior-art original** at the same path, marked with a lock note (see that repo's PR for LIM-1594). Do not fork content between the two copies — this copy in `liminal-prototype` is now the one that evolves; the `liminal-agents` copy is prior-art reference only.
>
> **Naming flag (read before use):** this repo's own demo-cut system (`docs/architecture/SITUATION_PERSONA_TIER_CUT_MATRIX.md`, `data/team.js`) already uses **"Maia"** as an in-UI pseudonym for *the real founder* (Shruti) and **"Devon Reyes"** as a pseudonym for *the real cofounder*, in the Team-surface demo scenarios (`devon_eng` subject, consent-gated drift read). That is a **different persona convention** from this directory: here, "Maia" and "Devon Reyes" are **wholly fictional, structurally distinct from Shruti/Sean** (see `identity.json` → `_critical_DO_NOTS` and the "structurally adversarial-resistant" section below — different school, city, cofounder-origin story, no founder-couple framing). The two conventions were built independently in two repos and now collide by name in one repo. Flagging for founder judgment; not resolved by this move (renaming either convention is a positioning call, not a file-move call).
>
> `sandbox/personae/_meta/PERSONA_ARCHITECTURE.md` (the multi-ICP governing doc in `liminal-agents`) was **not** copied alongside this persona — see this repo's `docs/reference/personae/maia-founder-os/_META_REFERENCE_NOTE.md` for why and where it lives.

**Persona purpose:** Synthetic Founder-OS persona used in all externally-shipped demo material for the Founder OS wedge (Speedrun video, Liminal landing page, conference talks, deploy-form listings, partner walkthroughs). Architecturally identical to Liminal's real-substrate flow; content fully fictional.

**ICP register:** Founder-operator-creator at agentic scale. Solo founder + part-time technical cofounder, raising pre-seed, running a fundraise application + multi-source substrate under deadline pressure.

**Why this is the wedge:** founders raising pre-seed are the highest-stakes-per-day operator class. Every fundraise day produces 5-15 typed events across 3-4 systems (email, calendar, meeting transcripts, code repos, drafts). The substrate density per founder is exactly the load Liminal's bounded-agent architecture is built for. The Maia demo demonstrates Liminal handling that load on the most legible high-stakes operator-creator workflow.

**Cross-thesis alignment (architectural layer):** Veridian ships at solo-operator scale, but the architecture — typed event log + bounded multi-agent reads + correction stream as moat — generalizes to the substrate-layer-for-company-wide-legibility thesis. On-thesis for YC RFS Spring/Summer 2026 #4 ("Company Brain", Tom Blomfield) and #15 ("AI Operating System for Companies", Diana Hu) at the architectural layer; on-thesis for a16z Speedrun SR007's "AI does the work, the customer pays for the outcome" editorial frame at the wedge layer. Same demo asset reusable across both audiences without rebuild — Maia's Founder OS is the solo-operator instance of YC's Company Brain.

---

## Character sheet

### Persona facts

- **Name:** Maia
- **Age:** 32
- **Education:** UCLA, Computer Science + Linguistics double-major
- **Career arc:** Engineering manager at a B2B productivity platform → senior PM at a consumer mapping app → solo founder at Veridian, building "an inner workspace for solo operators running agentic teams"
- **Founder type:** Technical-product-thinker with eng background; ships full-stack solo; layer-finding operator pattern (always finding the invisible layer that makes the surface product work)
- **Location:** Austin, TX (deliberately not SF Bay — visibly not Shruti)
- **Public surface:** none deliberately specified — Maia has no Substack URL, no public X presence, no LinkedIn URL. The persona's marketing surfaces are *only* what the synthetic snapshots explicitly construct.

### Cofounder (synthetic)

- **Name:** Devon Reyes
- **Role:** Co-founder, Engineering (part-time, continuing FTE at a fictional regulated-fintech security company)
- **Background:** Distributed-systems security researcher. ML-systems papers at MICRO/ASPLOS, not security venues (deliberately different from Heron's security-research register to avoid pattern-matching to Shayaun).
- **How they met:** Sibling-of-college-roommate connection 8 years ago. Worked together briefly on a hackathon team that placed 3rd at a major academic-conference student competition, stayed in touch, started talking about a joint venture in late 2025 when Maia's day-job got constraint-bound.
- **Why he's the substrate cofounder:** he's been building distributed-systems testing infrastructure that's architecturally adjacent to Veridian's bounded-agent runtime — independent work that converges with Maia's product roadmap.

**Critical:** Maia and Devon are NOT a couple. Not married. No romantic relationship at any point. **Founder-couple framing is structurally absent from this persona** — that's the most personally-identifying shape Shruti has, and it does not get reused here.

### Veridian — the synthetic company

- **Name:** Veridian
- **Tagline (primary):** "Operational knowledge layer for solo operators running agentic teams." — lands as a Company-Brain-adjacent claim (YC RFS Spring/Summer 2026 #4 register: "extracts and structures fragmented operational knowledge").
- **Tagline (Speedrun register):** "An inner workspace for solo operators running agentic teams." — the warmer founder-OS framing the SR007 demo uses.
- **Tagline (YC register):** "Company Brain for the founder before the company exists." — lands explicitly within YC's stated RFS language for #4 (Tom Blomfield) and #15 (Diana Hu).
- **Why three taglines, not one:** Maia's demo gets reused across audiences. Same persona, same architecture, same vault state — different surface phrasing depending on whether the room is YC #4 / #15, Speedrun SR007, or general consumer-AI press. The architectural fidelity stays constant; the wedge phrasing matches the room. Per `identity.json` `_tagline_strategy` field.
- **Stage:** Pre-seed, ~$0 raised. Bootstrapped to current state.
- **Product surface:** Local-first desktop app. Drag-window-into-tray ingest pattern. Bounded-multi-agent disagreement on the ingested context. Correction stream as the moat.
- **Architectural pattern:** *exactly Liminal's*. Same 12-agent registry. Same 9-tag correction taxonomy. Same refusal-as-feature mechanic. Same local-first vault. Same synthesize-then-read pipeline.
- **Cross-thesis alignment (operationalized in tagline strategy):** Veridian is on-thesis for YC RFS Spring/Summer 2026 #4 (Tom Blomfield, "Company Brain") and #15 (Diana Hu, "AI Operating System for Companies") at the architectural layer, AND for a16z Speedrun SR007's editorial frame ("AI does the work, you guarantee the outcome") at the wedge layer. The same Maia demo asset ships to both audiences without rebuild — only the tagline swaps. See `identity.json` → `company.thesis_alignment` for per-thesis frame strings.

### The synthetic accelerator

- **Name:** Inflection Lab Spring 2026 (cohort IL-12)
- **Shape:** Pattern-faithful to Speedrun (12-week cohort, partner ecosystem, signal-triage pipeline, $1M for ~10% equity, $3M+ in vendor credits)
- **Visibly fictional:** named differently enough that no one mistakes it for a real accelerator
- **Partners (synthetic):** Daniela Park (Marketing Partner), James Okafor (Investing Partner), Yuki Tanaka (Head of People), Marcus Bell (Visiting Investing Partner — the "tone-leader" archetype)
- **Why this matters for the demo:** the demo can show stakeholder mental-model evolution against synthetic partners without exposing real partners' substrate

### The synthetic hackathon

- **Name:** AgentScale Q2 Showcase (Apr 23-24, 2026)
- **Shape:** Pattern-faithful to AgentHansa (judging cohort, judge-feedback timing pattern, public marketplace deploy-flow)
- **Judge feedback:** "Veridian's bounded-specialist refusal pattern was the most architecturally distinct entry in our cohort — most agents in the cohort hallucinated capability when given out-of-domain prompts; yours refused with named-route. That's a thoughtful answer to the AI-overreach problem and the local-first vault posture is a credible audit/compliance signal."
- **Strategic substrate this enables:** the same "judge-feedback as proof-point" beat the real corpus uses, but with constructed attribution

### The synthetic co-authored paper

- **Name:** "Argus — Distributed Systems Testing under Adversarial Latency Conditions"
- **Authors:** Devon Reyes (lead), Maia (secondary)
- **Status:** Active draft, ~12 pages
- **Architectural relevance to Veridian:** Argus orchestrates parallel test-evaluators with bounded specialization (timing analyzer, consistency analyzer, partition-tolerance analyzer) — same multi-evaluator orchestration pattern Veridian uses in its agent runtime, applied to distributed-systems testing
- **Why this paper substitutes for Heron:** Heron is security research; Argus is distributed-systems research. Different domain; same architectural-pattern claim ("bounded specialists with orchestrator that routes"). This avoids pattern-matching the Liminal team's actual paper.

### What Maia is doing during the demo session

It's late April 2026. Maia has:
- Submitted Veridian's Claude Code plugin to AgentScale Q2 Showcase last weekend
- Received judge feedback from AgentScale (Apr 26)
- Got a video-stage invitation from Inflection Lab Spring 2026 (Apr 26, before any formal application was submitted — same signal-triage pattern as the real Speedrun-pipeline-in-Liminal corpus)
- Devon committed to part-time cofounder Apr 21
- The Argus paper is active draft
- Maia's pulled inbox-zero on Inflection Lab + AgentScale emails into a dedicated repo for tracking
- Application submit deadline Apr 29
- Video record day Apr 30
- Multiple time-stamped events across .eml + meeting transcripts + GitHub PR threads + paper PDF — the substrate density that makes Liminal's tray + agents valuable

The demo is **Maia running her own Inflection Lab application + video using Veridian** — the dogfood loop closed.

---

## Why this persona is structurally adversarial-resistant

**1. No NER-recoverable real entity.** Every named person, company, accelerator, hackathon, paper is constructed. Adversarial pattern-matching against LinkedIn, GitHub, USPTO, Crunchbase produces no real-Shruti hits.

**2. Different demographic shape.** Asian-American but East-Asian (not South-Asian like Shruti). UCLA not Berkeley. Austin not SF. CS+Linguistics not CS+CogSci. Different age, different career arc, different career companies. No founder-couple framing. *No naive replacements that an adversary could reverse-engineer.*

**3. Different cofounder origin pattern.** Sibling-of-roommate hackathon-team origin ≠ MENA Group at Haas + YC at 21 + marriage. The cofounder relationship shape is intentionally distinct.

**4. Different paper domain.** Distributed-systems testing under adversarial latency ≠ LLM-assisted static analysis benchmarking against CodeQL. Same architectural claim, different research domain, different baseline tool.

**5. Different accelerator + hackathon.** Inflection Lab + AgentScale ≠ a16z Speedrun + AgentHansa.

**6. The judge-feedback quote is constructed verbatim, not paraphrased.** The synthetic .eml file produces a synthetic verbatim quote that's reusable across all marketing material without ever needing to cite the real AgentHansa quote.

---

## What this persona enables

| Use case | Substrate consumed | Marketing safety |
|---|---|---|
| Speedrun video upload | `personae/maia-founder-os/snapshots/*` | All synthetic; uploadable to Speedrun video form without disclosure risk |
| Public landing page demo at theliminalspace.io/demo | Same vault snapshot | Hostable publicly; no real substrate exposed |
| Conference talk demo | Same vault + screen-record | Reusable across conferences indefinitely |
| Deploy-form listing copy | Maia as the "founder-mid-fundraise" buyer #1 in liminal-agents README | Listing remains stable across multiple platforms |
| Partner walkthrough (cold) | Live-runs the demo against Maia | No real-Shruti substrate reaches the partner; if interest develops, real-substrate walkthrough happens post-NDA |
| Press / external interviews | "Here's how Liminal works for founders" — Maia as the example | Reporters can write about Liminal without quoting Shruti's actual fundraise |

---

## What real-substrate stays for

The real Apr 28 SR007 substrate stays useful for *internal-only* purposes:

- Internal corpus development + sharpening (the Apr 28 work this persona was generated from)
- Stakeholder-specific 1:1 conversations (Tom Hammer might see a sliver of real substrate in a private conversation, with consent)
- Investor-diligence-on-request (after term-sheet, with NDA, partners can see real artifacts to verify the dogfooding claim)
- Red-team self-review (running 12 agents against the actual application produces real internal feedback)

**Discipline: real substrate compounds in the corpus but doesn't appear in any externally-shipped artifact.**

---

## Files in this directory

- `README.md` — this file
- `identity.json` — stable named-entity registry for cross-snapshot consistency
- `snapshots/` — 6 synthetic events forming the demo session (.eml + meeting transcripts + PR thread + paper draft + application drafts) — **not yet built, see demo-script.md "What still needs to be built"**
- `corrections/trail.jsonl` — synthetic 9-tag correction stream — **not yet built**
- `corrections/decisions.jsonl` — synthetic Tier 1/2 substrate-correction decisions — **not yet built**
- `expected-vault-state.jsonl` — post-demo vault state for verification — **not yet built**
- `demo-script.md` — step-by-step screen-record script (which artifact ingests when, which agents disagree, which corrections capture, what summary produces at session end)

The construction sequence (Apr 29-30) builds the snapshots, corrections, and demo script. This README + identity.json are the foundational character sheet that grounds everything downstream. As of the LIM-1594 move (2026-07-14), only the character-sheet layer (this README, identity.json, demo-script.md) exists — the snapshot/correction/vault-state layer is still open work, now tracked against this copy rather than the frozen `liminal-agents` original.
