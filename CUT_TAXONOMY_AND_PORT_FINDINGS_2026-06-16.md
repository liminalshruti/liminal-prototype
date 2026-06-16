# Cut Taxonomy + Port-Readiness — session findings (2026-06-16)

> Explore-mode session. **No production code was written.** This doc records what was
> investigated and concluded, so the next session (or the parallel one) doesn't re-derive it.
> Two sessions were on `main` concurrently; the taxonomy artifacts (`cuts/TAXONOMY.md`,
> `cuts/CONTRIBUTING.md`, the cut contract-block stamps, `cuts/_console.html`, the `index.html`
> reorder) are the **parallel session's** work — referenced here, not authored here.

---

## 0 · HANDOFF ROUTING (read first — this doc splits 3 ways)

This file is the **session-capture record** — written in `_scratch/` (gitignored), then promoted to
the `liminal-prototype` repo root + committed 2026-06-16 so it's versioned. Its content routes to three
different homes. Routing actions below are `exec:shruti` (manual: Linear/handoff) or Sean-coordination
or Claude Cowork — **filed so far: LIM-1135 (OSINT 🔴) + LIM-1136 (wedge-build → Sean); the rest
remain manual.** (Claude Code's lane is code; the cross-repo/strategy hand-offs are recommendations.)
The doc stays here as the durable record; the parts get *copied/extracted* to their homes, not moved.

| Part | What | Goes to | Owner / lane | Urgency |
|---|---|---|---|---|
| **§6.5** | Wedge build-scope + pre-build checklist (Usage-Insight + Value-Quote engines) | `liminal-agents-v1` — a spec/ADR beside the existing `SPEC_USAGE_INSIGHT_ENGINE`, **and** a Linear issue w/ owner | **Sean** (coordinate-first; v1 is his spine) | **HIGH — serves O2/KR1, the raise turns on the wedge** |
| **§5, §6, §9, §10** | Positioning coupling-check, port-readiness, OSINT-🔴, deferred items | `founder-brain/` (audit doc beside `LINEAR_GROOMING_AND_PRODUCT_LAYER_MAP`; fold into decision records) | **Cowork or Shruti** (strategy docs = Cowork's lane, not Claude Code) | Med — keyed to Speedrun re-check ~2026-07-27 |
| **§2–4, §8, §11** | Taxonomy convergence, demo-fork decision, cut-08 + #32 verifications | stays in `liminal-prototype` (correctly placed near the cuts) | **parallel session** (owns `TAXONOMY.md`) | Low — sync verbally; already converged |

### Two extractions that should NOT wait in a scratch file → Linear now (exec:shruti, manual)
1. **🔴 OSINT-kernel orphan** (§7/§6 blocker): `liminal-test` source gone → cut 09 unrebuildable, "live
   kernel" claim is a diligence landmine, **no owner, no PR.** File a Linear issue: restore/re-vendor
   the kernel source, or soften cut 09's claim. *(Body: §6 port-blockers row.)*
2. **Wedge build** (§6.5): the specs say `owner: TBD`. **Assign an owner** + file a Linear issue routed
   to Sean, body = §6.5 build-scope + pre-build checklist. Highest-leverage net-new work.

### What this session CAN'T do (so it didn't)
File Linear issues, write into `liminal-agents-v1`/`liminal-desktop` (Sean's repos), or commit the
parallel session's working tree. All hand-offs above are manual/coordinated. This doc is the input to
them, formatted to route in one read.

---

## 1 · The question

The cuts had drifted into reading like ~10 standalone products when they should showcase
**one app**. The ask: what is the level *above* a cut, what is a cut vs. a feature / flow / surface,
and what taxonomy lets the prototype converge into something that informs product iteration.

## 2 · What a cut implicitly was (the diagnosis)

The repo enforced coherence on the **visual cascade** (`design-tokens.css → cut-shell.css → cut`)
and **never on the product model**. A drifted *token* gets caught; a drifted *product loop* does
not — capture→read→decide is re-implemented, slightly differently, across ~8 cut files.

The contract block's `ICP`/`Surface` fields were a junk drawer (who-buys + who-uses + access-tier
all mixed). The unit-of-everything was **the file** — doing quadruple duty as code-unit, demo-unit,
product-idea-unit, and audience-unit, with nothing forcing them to align.

**A cut is not a thing — it is a projection** of one product onto a viewing context. Projections
don't compose, which is *why* cuts read as standalone.

## 3 · The taxonomy (converged, two ways)

This session derived a model from positioning canon; the parallel session authored the same model
into `cuts/TAXONOMY.md` v2 + `cuts/CONTRIBUTING.md`. **Both paths landed on the same place** —
strong signal it's right.

The model is **two fixed axes + cross-cutting tags**, NOT a from-scratch PM ladder:

- **Loop-stage** (the substrate invariant): `Capture → Read → Decide → Record → Re-enter` /
  `full-loop` / `pre-loop`. This is literally cut 00's `SUBJECTS = {spend, custody, osint, notice,
  pattern}` object — one render loop, the subject is a parameter.
- **Altitude** (the *canonical, ORDERED* strategic ladder — from founder-brain, NOT invented):
  `L1-founder` (wedge / front door) → `L2-team` → `L3-high-stakes` (depth proof) → `L4-category`.
  This **replaces the old flat `Audience` field.** Founder is the wedge; defense/analyst is the
  proof the substrate travels — they are rungs, not peers.
- **Framing** (how a cut gets priced): `wedge` / `infra` / `wedge→infra`. From positioning's
  pricing rule — *lead with the spend cockpit → priced as a feature; lead with the judgment layer →
  priced as infrastructure.* Cut 11 (govern/AI-spend) is the only `wedge→infra` seam cut.
- Plus `surface` and `maturity`. Access tiers + who-it's-shown-to are **per-cut notes, not
  coordinate fields.**

**Coordinate = (loop-stage × altitude × surface × framing × maturity).** The convergence rule:
if a new cut shares `(loop-stage, altitude, surface)` with an existing one it's a duplicate →
merge/supersede; if it shares everything but `altitude` it belongs as a **parameter**, not a file.

**The "level above a cut" is the function that generates cuts** — Ström-Awn's dictionary→function
move. Cut 00 ("subject is a parameter") + cut 09 (real shared kernel) are that function in embryo.
The standalone cuts are deep reference renders; cut 00 is the shell that proves they're one substrate.

## 4 · The demonstration-strategy fork — DECIDED

Cut-01-forward, shell as proof. The prototype leads with cut 01 (founder front door, `live`); cut 00
sits behind as the "same loop, every subject" infrastructure proof. Most literal expression of
positioning's wedge→platform resolution: *entered as founder-OS, priced as infrastructure.* Applied
in `index.html` (card order + copy). Rejected: cut-00-forward (leads with an abstract/unfinished
surface), two-door-by-audience (two front doors dilutes the one-product story).

**Follow-through (parallel session, 2026-06-16):** the three *anchor cuts that carry the
infrastructure argument* now each state their taxonomy job in their **own register** — same
argument, different voice:
- **Cut 00 (the shell)** — "not five tools, one substrate" — serif thesis voice.
- **Cut 11 (the seam)** — "you're watching the judgment layer, pointed at a budget first" — serif voice.
- **Cut 08 (the depth proof)** — "if the loop holds here, it holds anywhere; do not automate the moral
  lever, equip the operator at it" — **mono/operator voice, not serif** (`.thesis-line`: `var(--mono)`
  10.5px, `var(--text-faint)` setup + near-white `var(--text)` payload, `var(--expression)` teal
  left-rule). A defense viewer reads it as console annotation, not a sales line. This is the `framing`
  axis + register discipline working together: the L3 register *demanded* a different voice for the
  same thesis. (Verified by reading the source, not just runtime: cut 08 line 1649 + the `.thesis-line`
  rule at 511–523; all canon/cut-local tokens, no hardcoded hex, no serif.)

  Two notes from that source read: (a) `var(--mono)` resolves to Cougar via the cascade in this cut
  (a runtime detail — static read confirms "mono, not serif"); (b) cut 08 states the loop in
  defense-register verbs (`capture · read · refuse · correct · sign`) rather than the canonical
  `capture → read → decide → record → re-enter` — a deliberate in-register translation, not drift,
  but a taxonomy audit checking "same loop everywhere" would see different verbs here.

## 5 · Positioning verification (the coupling-check)

TAXONOMY.md v2 couples the altitude ladder to founder-brain positioning. Verified by direct read:

- **`HARMONIZED_FRAME_AGENT_PROVENANCE_2026-06-12` is still the senior frame.** The only newer doc,
  `THESIS_CONVERGENCE_2026-06-15`, declares it `parent_canon` and leaves the 3 altitudes
  **"Unchanged."** So the ladder coupling is **sound, not stale.**
- **Re-check trigger is the Speedrun cohort decision (~2026-07-27), NOT 8/31.** That's the live
  clock; the convergence doc carries `stale_after: 2026-08-15` and is anchored to the Q2 objective
  (institutional commitment by 6/30).
- **The `framing` flag is fundraise-critical, not cosmetic.** `THESIS_CONVERGENCE` elevates the
  wedge→infra collision to the O2/KR1 failure mode ("a sharp VC feels the seam in 10 minutes").
- Positioning **closed** the "is natsec a separate product?" question: natsec/OSINT is the *depth
  proof the substrate generalizes*, not a separate company. The L3 cluster (08/09/molehunt) are
  subjects of one substrate.

## 6 · Port-readiness — prototype → production

Key reframe: **"port the prototype into production" is largely a false framing.** The substrate is
already in production (`liminal-agents-v1`). The prototype is a *demo* of things that already exist.

Repo routing (from `LINEAR_GROOMING_AND_PRODUCT_LAYER_MAP_2026-06-12`):
- `liminal-prototype` = public demo / design-token reference.
- `liminal-agents-v1` = live substrate, **no Sean gate** (build-ready now).
- `liminal-desktop` = product spine, **Sean's lane, coordinate-first.**
- Nothing builds in `liminal-agents` (superseded) or `liminal-space-v0` (archived).

### Token cascade — clean
Zero pin-level drift across all four sources (canon `liminal-creative` → prototype → desktop CSS →
`panda.tokens.gen.ts`). `--text-faint` closed at `#6B6862` (WCAG-AA) everywhere. The render-vs-file
gap the README flags (`brand-upgrade.css` warm-ink axis winning the cascade) was **reconciled
2026-06-11** — render = file today, but it's *manual alignment, not by-construction*. Hardening
worth doing (prototype lane, no gate): make `brand-upgrade.css` import-only so the shadow mechanism
can't recur.

### Port blockers
| Blocker | Severity | State |
|---|---|---|
| **OSINT kernel (cut 09) unrebuildable** — `liminal-test` source is GONE from workspace; `npm run build:kernel` fails; `lib/osint-kernel.bundle.js` is a frozen artifact | 🔴 CRITICAL | **No PR anywhere — orphaned.** The only ungated, unowned thread. Restore source or re-vendor from Berlin repo. |
| Vault encryption-at-rest not wired (SQLCipher built in v1, not injected into desktop) | 🟡 | In flight: desktop PR **#113** (DRAFT, stale, `codex/` branch — note Codex removed from stack Mar-5; needs reclaim or close). Gated on event-log migration + Sean. |
| Event-log migration | 🟡 | **More progressed than founder-brain docs implied** — M0 (#114) + Phase-A dual-write (#112) MERGED. Not unstarted. |
| On-chain provenance localnet-only (not publicly verifiable) | 🟡 | Testnet anchor roadmapped, discovery-gated. |
| `liminal-desktop` has no product-coordinate vocabulary | 🟡 | The taxonomy is the one *idea* worth porting upward — as a coordination proposal to Sean's spine, not a commit. |

## 6.5 · What `liminal-agents-v1` has ready to pick up — REPOSITIONED

Read the six v1 spec/port docs (2026-06-16). They were filed in a **Berlin / `sandbox/` frame** and
read as a backlog; against current state (Berlin shipped, PPA filed 64/080,639, category =
Operator-Intelligence Infrastructure, wedge = AI-spend) **two of them are not backlog — they are the
production substrate for the current fundraise wedge, mis-filed as sandbox docs.** That is the
repositioning. (Disambiguation: this is `liminal-agents-v1`, the live substrate. The suffixless
`liminal-agents` is SUPERSEDED — nothing builds there.)

### The three port-audit docs = a graded merge queue (stoplight per primitive)
| Doc | Primitive | Status | Pickup posture |
|---|---|---|---|
| `lib/TODO_PORT_AUDIT_runtime_2026-06-10` | vault · daemon · sources · flows (86 tests) | **LANDED** · review welcome | Done. Driver-injection, zero-runtime-deps, pino dropped. Reposition: this is *shipped substrate*, not a TODO. |
| `lib/substrate/TODO_PORT_AUDIT_anchor_2026-05-30` | packet-provenance anchor contract | **RESOLVED 2026-06-12** — split into 2 levers | **Lever 1 (hash-only packet anchor): RATIFIED, product-canonical, SAFE TO IMPORT.** Lever 2 (ARC-8004 public *registries*): STILL OPEN — a roadmap/positioning call, NOT a gate on Lever 1. The "Algorand = optics only" framing is dead post-Berlin (1st place, live ARC-8004 TestNet). |
| `lib/substrate/TODO_PORT_AUDIT_packet-hash_2026-05-30` | `Packet` contract + `computePacketHash` + 17b refusal taxonomy | **OPEN · DO NOT IMPORT until reviewed** | Real pickup item, with explicit pre-merge TODOs: module-shape audit, Node-vs-browser crypto (`node:crypto` vs `crypto.subtle`), schema-versioning policy, PPA-coverage cross-ref. The load-bearing vault-integrity primitive — gets desktop's `types.ts` to re-export from v1. |

### The three spend specs = the AI-spend WEDGE substrate (this is the repositioning that matters)
| Doc | Status | What it actually is now |
|---|---|---|
| `sandbox/docs/SPEC_LEGIBLE_SPEND` | **SHIPPED** | `npm run spend` runs against **real Claude Code usage** (`~/.claude/projects/**/*.jsonl`), real prices, hash-only anchor. Reposition: not a sandbox demo — a working ingest→price→bucket→anchor pipeline for the wedge. |
| `sandbox/docs/SPEC_USAGE_INSIGHT_ENGINE` | **PROPOSAL · design-to-review** | **The wedge's substrate spec.** Persona = "Matt, a manager with a thousands-a-month token bill and no idea of the value" — the exact CFO-legible beachhead `THESIS_CONVERGENCE` named. Two lenses: **cost (the wedge)** + **capability/adoption-maturity (the renewal)**. Enablement-not-indictment framing discipline baked in (matches the privacy-invariant + "do not surveil" register). This is cut 11's `wedge→infra` argument as a real engine. |
| `sandbox/docs/SPEC_VALUE_QUOTE_ENGINE` | **PROPOSAL · "the genuinely hard part"** | Scores the Insight Engine: `value_quote = base_outcome_value × purpose_weight × durability`, grounded in *outcome (did it stay shipped)* not tokens — generalizes `reputation.js#scoreFromStats` from agents to sessions. 3-tier evidence ladder (features → outcome → counterfactual replay); a downgrade/over-reliance claim never hits `high` confidence on heuristics alone. Suppress-by-default. This is what makes the wedge *defensible under challenge* rather than a guess generator. |

**The repositioning, stated plainly:** `USAGE_INSIGHT_ENGINE` + `VALUE_QUOTE_ENGINE` should be re-filed
from "Berlin sandbox proposals" to **"the AI-spend wedge's production substrate spec"** — they are the
engine under cut 11 and under `THESIS_CONVERGENCE`'s move #1 (name the wedge→platform sequence). They
are PROPOSAL-status (design-to-review), owner TBD — so they are *scoped and ready to pick up*, not
built. The cost lens is the day-one wedge; the capability lens is the renewal. Both are one dataset,
two framings — the same "one substrate, many projections" shape as the cut taxonomy, one level down.

### Pickup-readiness, de-fossilized (sorted by gate)
- **Ungated, ready now:** merge PR #32 (Sean's call); import anchor Lever 1 (ratified, safe); the
  `LEGIBLE_SPEND` pipeline (shipped).
- **Ready to pick up (design-to-review, owner TBD):** `USAGE_INSIGHT_ENGINE` + `VALUE_QUOTE_ENGINE` —
  the wedge substrate. The highest-leverage net-new work, and it serves the raise (O2/KR1).
- **Gated:** packet-hash port (do-not-import-until-reviewed); anchor Lever 2 (positioning call);
  anything that wires into `liminal-desktop` (Sean's spine).

### Build-scope (both specs read in full, 2026-06-16)

> **⚠ CORRECTION 2026-06-16 (agents-v1 builder session, verified against the actual `sandbox/` tree):**
> The scope below — and the "PROPOSAL · design-to-review · owner TBD · ~30% net-new" framing in the
> tables above — is **WRONG**, written from the specs' *docs* without checking the code. Direct
> verification in `liminal-agents-v1`:
> - **The engines are already BUILT and TESTED in the sandbox**, not proposals. `sandbox/lib/insight/`
>   has `engine.js`, `value-quote.js`, `summarizer.js`, `ledger.js`, `anchor.js`, `ingest/{claude-code,codex,session-events}.js`,
>   and **three** detectors (`abandoned`, `model-oversized`, `thrash`) — the spec described only "detector #1."
> - **18 `insight-*` test files; 21 tests pass** across engine + value-quote + detectors + privacy (run 2026-06-16).
> - **Pre-build Step 0 RESOLVED:** there is **NO production `lib/x402/`** — the x402 primitives exist
>   ONLY at `sandbox/lib/x402/` (8 files, 650 LOC). So the "~70% already exists" is true *in the sandbox*, not in production.
>
> **The real Phase 1 is therefore PROMOTION, not construction:** lift a working, tested
> `sandbox/lib/insight/` + `sandbox/lib/x402/` into production-grade `lib/` — re-vendor deps
> (`algosdk`, `@algorandfoundation/algokit-utils`), swap sandbox `node:crypto` for the browser-safe
> `sha256Hex` (same fix as the seal bug this session), port the 18 tests to `node:test`, harden the
> contracts. Much smaller and lower-risk than "build the wedge"; the unknowns are promotion-quality
> (deps, crypto, schema-versioning), not "can we build value_quote." See the revised checklist below.

**One engine, two files.** Insight = ledger + detector framework + surfaces; Value-Quote = the
`value_quote` + confidence machinery the detectors depend on. **Value-Quote is the hard-dependency**
— Insight's open-Q#1 *is* the Value-Quote engine; no trustworthy detector ships without it. Both
reuse the company's existing privacy invariant (hash-on-chain, content-off-chain, owner-keyed) — not
new architecture, the existing PPA invariant applied to a spend ledger.

**Already exists (~70%, the spec's own claim — verified against its build-map, holds up):**
x402 settlement + receipt (`lib/x402/priced-read.js`, `algorand.js`) · hash anchor
(`algorand.js#anchorNote`) · value=outcome/correction-survival (correction stream +
`lib/x402/reputation.js` `scoreFromStats`/`canonicalJson`) · session packet + hashing (v1 `Packet`,
`computePacketHash`) · lane attribution as label (`lib/x402/lane-guard.js`).

**Net-new (~30%, the actual build):**
| Component | Spec | Risk | Notes |
|---|---|---|---|
| Session summarizer | Insight | Med | Haiku → 1–2 line intent + derives `human_edit_ratio`/`authorship`; gates detectors #4–7; needs session-boundary decision (open Q#2) |
| `value_quote` engine | Value-Quote | **Med-high** | `base_outcome_value × purpose_weight × durability`; **the load-bearing unknown**; `purpose_weight` = bounded classifier on the *summary*, not transcript (privacy) |
| Confidence model | Value-Quote | Low | `high iff ≥2 independent tiers agree AND no contradiction`; contradiction = veto. Fully specified, directly testable |
| Evidence ladder T1/T2/T3 | Value-Quote | **High (T3 only)** | T1 features + T2 outcome = free, ship without T3. **T3 counterfactual replay (equivalence judge) = "the hardest sub-problem"** — research-grade; mitigation = objective signals (same tests/lint/diff) first, bounded judge only when inconclusive, sampled not universal |
| `insight_record` engine + detector interface | Insight | Low | `detect(sessions, calls) → insight_record[]`, pure-function plug-ins |
| Detector #1 `model_oversized` | Insight | Low | first plug-in; its *confidence* depends on the value_quote engine |
| Two surfaces (lead feed / director view) | Insight | — | **`liminal-desktop` = Sean's lane** |
| Structural privacy guards | both | Low effort, **mandatory** | tests asserting no `summary`/transcript/judge text ever reaches an anchored payload — PPA invariant, not polish |

**Phasing (the specs imply it — "ship the internal tier first; the chain earns nothing if Matt only
reports to himself"):**
1. **Internal tier · cost lens · T1+T2 only** — summarizer + ledger + insight engine + detector #1 +
   value_quote (outcome-grounded, no replay) + confidence model + privacy guards. **No chain, no T3,
   no desktop surface.** The daily-use wedge; almost entirely v1-substrate, lowest Sean-coordination.
2. **Provable tier** — anchor `summary_hash` + bounded scores via the existing x402/Algorand rail
   (wiring existing primitives).
3. **T3 replay + capability lens + surfaces** — the expensive/hard parts: equivalence judge,
   maturity/leverage scores, the two reader surfaces (desktop = Sean).

**Non-negotiable scope (employee-adjacent metric — budget in Phase 1, not later):** cohort-relative
comparison, score-outcome-not-activity, confidence-gates-accusation, person-sees-own-card. The spec
marks these load-bearing because one false `over_reliance` accusation kills trust. Both score families
are "gamed only by doing the real thing" (no vanity input rewards activity over durable outcome).

**Gate:** engine + detectors + value-quote (Phases 1–2) = `liminal-agents-v1` (Sean's spine,
coordinate-before-code); surfaces (Phase 3) = `liminal-desktop` (Sean's lane). **None of this is
unilaterally buildable — coordinate with Sean first**, per the routing rule. It is the
highest-leverage net-new work and directly serves O2/KR1 (the wedge→platform legibility the raise
turns on).

### Pre-build checklist (resolve these before/at the start of Phase 1)

These are NOT invented — they are the decisions the two specs flag in their own open-questions sections
plus the load-bearing verification. All are `liminal-agents-v1` work → **Sean-coordinate before code.**
Ordered so a blocker is found before effort is spent downstream of it.

**0 · ✅ RESOLVED 2026-06-16 (verified in the repo, not the docs).** The x402 primitives exist
**only at `sandbox/lib/x402/`** (8 files, 650 LOC) — **there is NO production `lib/x402/`.** AND the
whole insight engine is already built+tested in `sandbox/lib/insight/` (engine, value-quote,
summarizer, ledger, anchor, 3 detectors, ingest) with **18 test files / 21 passing.** So Phase 1 is
**promotion** (sandbox → production `lib/`), not construction. The remaining real unknowns, re-cast as
promotion concerns: (a) **deps** — `sandbox/lib/x402` pulls `algosdk` + `@algorandfoundation/algokit-utils`;
confirm these belong in production or are anchor-only/optional; (b) **crypto** — sandbox uses
`node:crypto`; swap to the browser-safe `sha256Hex` (the exact seal bug fixed this session) if any of
it runs in the webview; (c) **schema-versioning** (step 3 below) for the canonical-hash inputs;
(d) **test port** — sandbox tests → `node:test` in production. Promotion-quality, not feasibility.

**1 · Decide the session boundary** (Insight open-Q#2). What delimits a session — time gap, git branch,
task handle? It gates summary quality, `thrash` detection (#2), and the whole `session_record` grain.
Pick before the summarizer is built; everything downstream assumes a session unit.

**2 · Decide the first-target fleet** (Insight open-Q#4). Codex vs Claude vs mixed changes the task-shape
features AND the cost ladder the detectors read. Detector #1 (`model_oversized`) can't be calibrated
without it. Likely Claude Code (the `LEGIBLE_SPEND` ingester already walks `~/.claude/projects/**`).

**3 · Set the schema-versioning policy** (packet-hash port TODO + Insight `canonicalPacketPayload`).
`session_record`/`call_record`/`insight_record` need a versioning decision: per-table or per-payload?
literal string or registry-derived? This locks the canonical-hash inputs — changing it later re-hashes
everything. Resolve with the packet-hash port (§6.5, the OPEN/do-not-import-until-reviewed item).

**4 · Decide the summarizer's trust model** (Insight open-Q#3). The summary is itself an LLM output that
gates detectors #4–7. Does it get its own correction path (eat-our-own-dogfood) or stay advisory? Leaning
(per Value-Quote Q#3): advisory, sampled-audited. Cheap to defer to advisory; expensive to retrofit a
correction path — so decide now.

**5 · Define `purpose_weight` calibration** (Value-Quote open-Q#1). How the summary maps to a weight
bucket (`trivial|routine|substantive|critical`) **without leaking content into the weighting model** —
a bounded classifier on the *summary*, not the transcript. This is on the critical path: `value_quote`
(the hard-dependency) can't be computed without it.

**6 · Pin the tier default + privacy-guard test FIRST** (Insight open-Q#5 + both specs' done-when).
Decide: anchor every session (provable-by-default) or only on request (cheaper, local-first; leaning
local-first per the repo pattern). And write the structural privacy guard — *no `summary`/transcript/
judge text ever reaches an anchored payload, only hashes* — as the FIRST test, before any anchoring
code, because it's a PPA invariant and a structural guard, not a convention to add later.

**Deferred to their phase (NOT Phase-1 blockers):** replay fidelity / as-of conditions (Value-Q#2),
judge drift + correction path (Value-Q#3), verified sample size for defensible `recoverable` (Value-Q#4,
a statistician's CI call), cohort definition + avoiding it becoming its own surveillance vector
(Value-Q#5). These belong to Phase 3 (T3 replay + capability lens), not the Phase-1 wedge.

### Concrete promotion plan (sandbox → production `lib/`, verified file-by-file 2026-06-16)

Promotion is **port `.js`→`.ts` + colocate tests**, NOT copy: production `lib/` is 100% TypeScript
with colocated `*.test.ts`; sandbox is `.js` with `sandbox/test/*.test.js` (sandbox is tsconfig- and
npm-excluded). The engine logic is done and overwhelmingly **pure** — the work is typing + test port +
the crypto swap, not building.

**Phase 1 = internal tier, cost lens, NO chain. What moves into `lib/insight/` + `lib/x402/`:**

| Sandbox file | → prod | Purity | Port notes |
|---|---|---|---|
| `insight/engine.js` | `lib/insight/engine.ts` | PURE | detect()→insight_record[]; no deps. Clean. |
| `insight/value-quote.js` | `…/value-quote.ts` | PURE | the "hard part" — DONE. `value_quote = base×(purpose_weight/1.5)×durability` + confidence model. imports pricing+ledger only. |
| `insight/ledger.js` | `…/ledger.ts` | PURE + `node:crypto` | **swap `createHash`→ substrate `sha256Hex`** (same fix as the seal bug this session). |
| `insight/{prices,pricing,bucket}.js` | `…/*.ts` | PURE | prices/pricing pure; bucket has a live-LLM path (keep mock default). |
| `insight/detectors/{abandoned,model-oversized,thrash,index}.js` | `…/detectors/*.ts` | PURE | 3 detectors (spec said 1). Clean. |
| `insight/summarizer.js` | `…/summarizer.ts` | mixed | mock fallback is pure; live path = `@anthropic-ai/sdk` via `llm.js`. `process.env.LIMINAL_SUMMARIZER_MODEL`. |
| `insight/llm.js` | `…/llm.ts` | env+net | lazy `@anthropic-ai/sdk`; reads `ANTHROPIC_API_KEY`/`AUTH_TOKEN`. Keep lazy so deterministic path needs no key. |
| `insight/report.js`, `fixtures.js` | `…/*.ts` | pure/assemble | report assembles cost-lens feed + capability view; fixtures = seed data. |
| `insight/ingest/{claude-code,codex,session-events,index}.js` | `…/ingest/*.ts` | **node:fs/os/path** | reads `~/.claude/projects/**` + `~/.codex/sessions/**`. Node-only by nature (it's a file ingester) — fine for a desktop/CLI consumer, NOT browser. |
| `insight/anchor.js` | `…/anchor.ts` | chain (Phase 2) | **promote the privacy guard (`contentLeaked`, `ANCHOR_ALLOWLIST`) now; stub/defer `anchorSession`** (its only chain dep). |
| `x402/lane-guard.js` | `lib/x402/lane-guard.ts` | PURE | required (lane attribution). |
| `x402/reputation.js` | `lib/x402/reputation.ts` | PURE core | `scoreFromStats`/`canonicalJson`/`buildReputationEntry` pure; **defer `anchorReputationEntry`** (chain). swap `createHash`→`sha256Hex`. |

**Stays in sandbox for Phase 1 (provable/payment tier — Phase 2/3):** `x402/{algorand,algokit,
priced-read,facilitator,challenge,agent-pricing}.js`. These carry the only heavy deps (`algosdk`,
`@algorandfoundation/algokit-utils`) and all the chain/file/env coupling. **Phase 1 adds NO new
production dependency** — the dep surface only grows when the provable tier lands.

**The friction list (every node-only API to resolve during the port):**
1. `node:crypto` `createHash` in `ledger.js` + `reputation.js` → swap to substrate `sha256Hex` (proven this session). The ONLY browser-blocker, and it's a known one-line swap each.
2. `node:fs`/`node:os`/`node:path` in `ingest/*` → legitimate (it's a usage-file reader). Acceptable for the desktop/CLI consumer; do NOT import ingest into any browser bundle.
3. `@anthropic-ai/sdk` in `llm.js` (lazy) → deterministic path never loads it; live summarizer/bucket need a key. Keep the lazy import.
4. `process.env` reads (summarizer model, ingest roots, ANTHROPIC keys) → standard; surface as config.

**Work inventory (the honest cost):**
- ~13 source files `.js`→`.ts` (add signatures; strict mode will surface loose typing — the real time-sink).
- 18 `sandbox/test/*.test.js` → colocated `lib/**/*.test.ts` (rewrite imports `.js`→`.ts`, move beside source). 21 tests currently pass — they're the safety net for the port.
- `lib/insight/index.ts` + `lib/x402/index.ts` barrels; add `"./insight"` + `"./x402"` to `package.json` exports + root `lib/index.ts` (the `./gate` pattern).
- Swap 2 `createHash` sites → `sha256Hex`. Stub 2 chain calls (`anchorSession`, `anchorReputationEntry`).
- **Zero new production deps for Phase 1.**

**Suggested branch + sequence (TDD, the tests already exist as the spec):** `feat/insight-promote-phase1`
→ port pure core first (engine, value-quote, ledger, pricing, detectors) + their tests, green →
port ingest (node-only, desktop-scoped) + report + fixtures → port the x402 minimal pair (lane-guard,
reputation pure) → barrels + exports + typecheck green. The privacy-guard test (`contentLeaked`) ports
FIRST as the structural invariant. **This is `liminal-agents-v1` (the repo I'm building in) — buildable
on a branch; coordinate the eventual merge with Sean per the spine rule, same as `feat/gate-promote`.**

## 7 · Open PRs (checked 2026-06-16)

- **`liminal-prototype`: none open.** The taxonomy-v2 / console / fork work is **uncommitted in the
  working tree on `main`** (parallel session's, per founder's call to leave it). ⚠️ It exists only
  in the working tree — not committed, not PR'd. If the tree is reset, that work is lost.
- **`liminal-desktop`: #113** (DRAFT, vault hardening, stale Codex branch — see above).
- **`liminal-agents-v1`: #32** — **the live govern→substrate port** (see §8).

## 8 · PR #32 (agents-v1) — the live govern port — VERIFIED against sign-off

`feat(gate): Brief Gate v1 substrate (lib/gate)` — the claim→Judgment boundary, **ported out of
cut 11 (govern) into `lib/gate` as reusable substrate.** 806 add / 0 del, FF-clean, 173 tests green,
author `liminalshruti`, OPEN for Sean's review (auto-merge disabled, by design).

**Verified line-by-line against `ADR_BRIEF_GATE_PORT_V1_2026-06-15` (owner: shayaun-nejad, status:
executing): faithful execution, no drift.** Every ADR clause matches —
- composes v1 primitives, re-implements nothing (`computePacketHash`, `anchor`, `agents`);
- a Judgment **is** a v1 `Packet`; the only net-new type is the seal/disposition;
- fail-closed boundary (`state !== "survived"` ⇒ never anchored);
- spend skin dropped; anchor kept nullable (the standing open strategic call);
- lands on a feature branch, merge = spine-owner's call.

**Important nuance:** the ADR's frontmatter carries a `correction:` — the original draft proposed
*deleting* the Brief Gate from govern; the merged surface-host decision (PR #118) reversed that.
Ratified position: **govern = permanent public demo (keeps M1–M4), v1 = private substrate where IP
evolves, desktop = product home that consumes it.** #32 does only the v1-substrate half and does NOT
touch govern — which is correct. The IP logic: product IP must not *originate* in the public
clean-room (govern flips public for submission); it's *extracted* to private v1, govern keeps a demo
copy. This is the cleanest port in the three repos.

## 9 · Deferred-by-design (NOT gaps — gated elsewhere)

- **First buyer of the near-term wedge** — discovery-gated, "NOT a whiteboard pick"
  (`HARMONIZED_FRAME` §OPEN DECISION). 6 of ≥10 operator calls done.
- **Whether to actually merge 00/08/09/11** into one parametric surface — `liminal-desktop` /
  Sean-lane product-build decision. The taxonomy makes it *addressable*; executing it is downstream.
- **Shared product-behavior kernel** for all Journey cuts (only cut 09 has one) — enabled by the
  taxonomy, gated behind the console-scope "product-behavior coherence" work.

## 10 · Live action items

1. **(verbal, founder-carried)** Relay the coupling-check to the parallel session: ladder coupling
   sound; re-check after Speedrun (~7/27), not 8/31; `framing` flag is O2/KR1-critical.
2. **(ungated, unowned)** `liminal-test` source recovery — the only 🔴, underpins cut 09's "live
   kernel" claim, a diligence landmine if asked. Investigate git remotes / Berlin repo / backups.
3. **(parallel session)** Commit the uncommitted taxonomy-v2 working tree before it's lost; finish
   TAXONOMY.md (already v2 on disk).
4. **(repositioning, owner-TBD)** Re-file `SPEC_USAGE_INSIGHT_ENGINE` + `SPEC_VALUE_QUOTE_ENGINE` from
   `sandbox/` Berlin proposals to **the AI-spend wedge's production substrate spec** (see §6.5). They
   are the engine under cut 11 + `THESIS_CONVERGENCE` move #1, design-to-review, ready to pick up —
   the highest-leverage net-new work that directly serves O2/KR1. Assign an owner.

## 11 · Changes since this doc was first written (parallel session, same day)

- **Cut 08 maturity corrected `sketch → refining`** — it's a 2,805-line, 4-stage interactive console;
  the old `sketch` tag was stale and would have undersold it in any audit or the console's altitude
  view. (Contract block now carries a dated "old sketch tag was stale — 2026-06-16" note.) Any earlier
  reference to cut 08 as `sketch` (incl. the initial port-surface read) is superseded by `refining`.
- **The three anchor cuts now state their taxonomy job in-register** — see §4 follow-through. Verified
  against source.
- These join the rest of the parallel session's work in the **uncommitted working tree on `main`**
  (still exposed per §7) — read-and-synced, not authored here.

## Sources read this session (all direct, not secondhand)
`cuts/CONTRIBUTING.md` · `cuts/TAXONOMY.md` v2 · `cuts/_template.html` · cut 00/03/09 contract blocks ·
cut 08 (contract block + `.thesis-line` rule, source-read) ·
`cuts/_console.html` · `README.md` · `_scratch/{PLAN_TO_A,NEXT_STAGES,CUT_QUALITY_AUDIT}` ·
`founder-brain/liminal-ip/04-design/{layer-model,CONSOLIDATION_SPEC}.md` ·
`founder-brain/strategy/{HARMONIZED_FRAME_AGENT_PROVENANCE_2026-06-12,CANONICAL_POSITIONING_FRAME_2026-05-04,THESIS_CONVERGENCE_2026-06-15}.md` ·
`founder-brain/audits/LINEAR_GROOMING_AND_PRODUCT_LAYER_MAP_2026-06-12.md` ·
`founder-brain/liminal-ip/03-architecture/ADR_BRIEF_GATE_PORT_V1_2026-06-15.md` ·
`liminal-agents-v1`: 3 port-audit docs (runtime / anchor / packet-hash) + 3 spend specs
(`SPEC_LEGIBLE_SPEND`, `SPEC_USAGE_INSIGHT_ENGINE`, `SPEC_VALUE_QUOTE_ENGINE`) + Lane A/B/C specs ·
PRs: prototype (none), desktop #113, agents-v1 #32 · Ström-Awn essays (functions / product-thinking).

## Caveats on confidence
Cross-repo file/test counts (`agents-v1`, `liminal-desktop` internals) come from read-only subagent
sweeps + PR bodies, not personal line-by-line verification or test re-runs. The ADR↔#32 structural
match was checked directly on `gate.ts` + the PR body; the 173-tests-green claim is trusted, not rerun.
