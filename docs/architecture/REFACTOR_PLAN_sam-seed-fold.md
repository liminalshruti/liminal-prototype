# Refactor Plan — Sam-Seed Situation: Fold + Build, 3 Swimlanes

*2026-06-19 · the execution plan from the persona/cut session. Canon-safe (locked cast).*
*Source: `SITUATION_PERSONA_TIER_CUT_MATRIX.md` (the situation spec).*

> **Goal:** produce ONE cut — `00-agency` rendering the full **Sam-seed situation** (B1) —
> by **folding** the donor cuts into one continuous gap-free surface AND **building** the
> coverage gaps no cut currently renders. One surface, one situation, three parallel lanes.
>
> **Two kinds of work, deliberately combined:**
> - **FOLD (refactor):** harvest the best region of each donor cut into the `00-agency` host,
>   closing the *visual/interaction seams* so it reads as one screen, not four cuts clicked through.
> - **BUILD (net-new):** the coverage gaps that no cut renders — these are the *connective
>   tissue* between regions, so building them IS the seam-closing.

---

## The situation (what the cut must demo, from the validated interview)

**Sam** (IC, locked persona) leads a pen-test team drowning on ~1,000 frontier-model vuln
findings — no observability, misclassifications, a second team pulled in to audit. He installs
the plugin, drops the mess in, the bounded agents read & disagree, the contradictions surface,
the reframe lands — *"not a person problem, a system-optimization problem"* — and he gets a path
that doesn't burn bridges. Single-player value, free, day one. His words: *"scoping therapy, not
a sales pitch."*

## The donor cuts (harvest map) + the host

| Cut | Lines | Arch | Region it donates | Fold or Build |
|---|---|---|---|---|
| `00-agency` | 422 | monolithic | **THE HOST** (subject-as-parameter shell) | host |
| `01-slate-tray` | 1166 | **MODULAR** | CAPTURE→READ→DECIDE (the rich centerpiece) | fold (donor) |
| `02-forensic` | 510 | monolithic | CONTRADICTION / read-detail | fold (donor) |
| `04-onboarding` | 131 | monolithic | ENTRY / first-run | fold (donor) |
| `10-today` | 608 | monolithic | RE-ENTRY | fold (donor) |

## The coverage gaps (confirmed absent — must be BUILT, they are the seam-fillers)

| Gap | Where it sits in the flow | Why it's connective tissue |
|---|---|---|
| **G1 · Plugin surface** | *before* onboarding (entry-of-the-entry) | Sam enters via the Claude plugin, not a desktop download — the seed surface |
| **G2 · "system not person" reframe** | *between* the contradiction-view (02) and resolution | The reframe is the emotional turn — the depersonalization that makes it "scoping therapy" |
| **G3 · scoping-therapy resolution** | the re-entry payload (10's content, for Sam) | The "I have a path that doesn't burn bridges" payoff — what closes the loop for Sam |

**Key insight:** the build-gaps are NOT edge bolt-ons — they are the missing connective tissue
*between* the folded regions. Building them IS closing the seams. Fold + build are one act.

---

## The 3 Swimlanes

Split by **non-overlapping file ownership** AND **discipline**, so three agents/people run
cleanly in parallel. Each lane has a FOLD half and a BUILD half. Seams are typed contracts.

### LANE 1 — Scenario & Harvest *(content/narrative discipline)*
**Owns:** `data/sam-seed.js` (new) · the scenario content · harvest specs (what region of each donor to keep)
- **FOLD:** specify which region of each donor cut to harvest (the 01 slate, the 02 contradiction view, the 04 entry, the 10 re-entry) and the *data* each needs.
- **BUILD:** author the Sam-seed scenario as data — the pen-test crisis, ~1,000 findings, Sam-as-operator, the agents' reads, the classification contradictions, and the **G2 reframe copy** + **G3 resolution copy** (the "system not person" / "scoping therapy" content). Canon-safe.
- **Seam (exports):** a typed `SAM_SEED` scenario object + a harvest-manifest (region → source cut → keep/drop).
- **Done when:** `data/sam-seed.js` validates; content is canon-safe AND emotionally true to the interview (the reframe + resolution land).

### LANE 2 — The Fold (loop continuity) *(interaction-engineering discipline)*
**Owns:** `lib/` loop files (`agency.js`, `slate.js`, `state.js`) · the fold wiring in the host
- **FOLD:** wire the donor regions into ONE continuous loop-state in the `00-agency` host — capture→read→contradiction→re-entry as a single flow, not four page-loads. **Reconcile the architecture mismatch:** `01-slate-tray` is modular (loads lib), the others are monolithic — Lane 2 owns making them one coherent loop, parameterized by `subject=team-crisis`.
- **BUILD:** the *interaction* for the gaps — G1 plugin-entry as an interaction state, G2 reframe as a loop transition (the moment the read flips from indicting to tuning), G3 resolution as the loop's seal.
- **Seam (consumes/exposes):** reads `SAM_SEED` from Lane 1; exposes a single `loop-state` for Lane 3 to render.
- **Done when:** the loop runs end-to-end on Sam's data in a test harness — drop → read → disagree → reframe → seal → re-enter — as one continuous state machine.

### LANE 3 — Visual Coherence (seam-closing) *(design / taste discipline — `impeccable` + `taste-skill`)*
**Owns:** `lib/cut-shell.css` (the shared chrome) · `cuts/00-agency.html` shell layout · the unified visual language
- **FOLD:** make 4 cuts' worth of chrome read as ONE surface — one type/color/spacing/motion language across all folded regions. This is the *gap-closing* — the seams between standalone cuts become invisible. **Apply the design canon** (Nineties Headliner / Perfectly Nineties / Geist Mono — NOT the off-canon Newsreader/Geist drift in current cut-shell; fix it here).
- **BUILD:** the *visual* for the gaps — G1 plugin-surface look, G2 the reframe's visual turn (the depersonalization rendered, not just stated), G3 the resolution's visual payoff.
- **Seam (consumes):** renders Lane 2's `loop-state` into the host shell.
- **Done when:** `00-agency?situation=sam-seed` renders the full continuous surface in the dev server — no visible seams between regions, canon type/color, the gaps visually present.

---

## Why the lanes run cleanly in parallel

- **No file is owned by two lanes:** Lane 1 = `data/` only · Lane 2 = `lib/` loop only · Lane 3 = `cut-shell.css` + `00-agency` shell only.
- **Typed seams let each lane stub the others:** Lane 1 → `SAM_SEED` object · Lane 2 → `loop-state` · Lane 3 → render. Each lane builds against a stub of the others' output, integrates at the end.
- **Parallel by discipline, not just by file:** content-craft / interaction-eng / design-taste — three different skill-sets, no context-switching, mappable to three agents or you+2 subagents.

## Integration (the only sequential part · ~30 min, one person)

After all 3 lanes hit "done": replace stubs with real seams (Lane1 export → Lane2 consume → Lane3 render), then dev-server smoke check: does `00-agency?situation=sam-seed` demo Sam's full seed situation end-to-end, as one gap-free surface? That's the merge point.

## Risks (named, so they don't ambush)

1. **Architecture mismatch (Lane 2's hardest 1/3):** folding monolithic donors around a modular `01-slate-tray` into a monolithic `00-agency` host. Lane 2 must decide: make the host modular (consume lib) or inline the loop. Pick early.
2. **The build-gaps are design-heavy, not just content:** G2 (the reframe's visual turn) is the make-or-break of "scoping therapy" — if it reads as a dashboard, the whole differentiation dies. Lane 3 owns the emotional register, not just the chrome.
3. **Canon font drift:** current `cut-shell.css` carries off-canon Newsreader/Geist. Lane 3 fixes it as part of the visual-coherence pass (don't propagate the drift into the folded surface).

## What this proves

If three lanes independently produce data + loop + chrome that fold into one parameterized
`00-agency` render of a *validated* situation — the company-simulator instrument is real, the
refactor pattern works, and this is the **template to repeat** for Rhea-land, Hollis-expand, etc.
One cut proves the method.

## Boundaries

- Canon-safe: locked cast only, no forbidden real names.
- This is the plan — no cuts folded/built by this document.
- Lanes are file- and discipline-isolated; integration is the only sequential step.
