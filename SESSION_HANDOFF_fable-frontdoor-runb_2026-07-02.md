# Session handoff — Fable product-design session (2026-07-02)

> **Purpose:** let a *future Claude session working in `liminal-prototype`* understand
> what this session did, **why**, and **planned vs actual outcomes** — and make sure no
> task this session surfaced gets lost. This is NOT org/situational context (the human
> will supply that separately). Written on branch `claude/session-handoff-th499m`
> (standalone off `main`, kept off the two review PRs). Model: claude-opus-4-8.
> Repo = public demo surface; live at `liminalshruti.github.io/liminal-prototype`.

## ⬇️ Everything is landed — this session is safe to delete
All work is committed and pushed; local == remote on every branch; working tree clean.

| Branch | Tip | Is | Status |
|---|---|---|---|
| `claude/fable-product-design-th499m` | `c09220d` | **PR #45** — Run-B fixes + E8 | open, mergeable-clean |
| `claude/frontdoor-redesign` | `075989f` | **PR #46** — front-door redesign | open, mergeable-clean |
| `claude/session-handoff-th499m` | this doc | handoff only | pushed |

Nothing is merged to `main` yet — that's the human's local task. The two PRs touch
**disjoint files**, so merge order is free (suggested: #45 then #46). **No CI** in this
repo (`.github/workflows/` absent) — a "pending" status means no checks, not a failure.

---

## Planned vs actual outcomes (read this — it's where the nuance lives)

| Thread | Planned | Actual outcome |
|---|---|---|
| Run-B findings | Close them in code | Closed **C8, C3, cut-02**; **C7 partial** (contained only); **C1 prototyped in the front door, not wired into cuts**. C2/C4/C5/C6/C9/D1 **untouched** (see ledger). |
| Dataviz | "Standardize" the charts | **Surprise: already standardized** — token-driven, CVD-safe, labeled. Only one real non-gated fix existed (cut-02 ink ramp). Did NOT manufacture churn. One a11y guardrail surfaced (see insights). |
| Front door | First built a **B+C+A composite** | **Rebuilt C-led + A-catalog** after the human's design review — B's manifesto register was wrong for a prototype front door (reserved for the deck). |
| C1 seal | Ship "a seal" | Shipped the **bifurcated** seal (artifact-instant → glow-ceremony) after review flagged my first version **conflated** record + ceremony. |
| C7 | Full de-escalation | Only the **contained** cut-01 cleanup shipped; the full "claim a display scale in brand-upgrade.css" is a **gated canon decision** (touches 3 surfaces). |
| "Close all next steps / go live" | Merge & deploy | Got to **ready + split into two clean PRs**; the human chose to **merge locally**, not have me push to `main` (public deploy = outward-facing, needs their hand). |
| Two bugs | (not planned) | C8 work **surfaced 2 defects the audit missed** — invisible `.reg` content under reduced-motion in cuts 00/11, and pseudo-element pulses escaping `*{animation:none}`. Both fixed. |

---

## Run-B ledger status (so nothing gets lost)
Source: `docs/RUN_B_COHERENCE_FINDINGS.md` (NOT-CANON substrate). The **adjudication → written
canon** step was never done in-repo; the human referenced an upstream **`RUNB_DESIGN_SYSTEM_SPEC`**
(has canon C1 = bifurcated) that is **NOT in this repo** — locate it (likely founder-brain) before
wiring C1 into cuts.

| # | Finding | Status this session |
|---|---|---|
| **C1** | Sealed moment has 3–4 choreographies (HIGHEST STAKES) | **Prototyped bifurcated seal in front door #46**; cuts 00/01/11 **not wired** |
| **C2** | Tokens declared but not consumed (hardcoded sizes/tracking/rails) | **OPEN** (the D1 question) |
| **C3** | Serif: Newsreader vs Perfectly Nineties | **DONE** (#45) |
| **C4** | Correction has 3 UX models (gloss / rule-gate / visible-clause / amend) | **OPEN** |
| **C5** | Refusal: 1 grammar, 3 semantics + 2 timings (200 vs 320ms) | **OPEN** |
| **C6** | Frame restructuring in cuts 10 & 11 undocumented | **OPEN** |
| **C7** | Display-scale steps unclaimed + `!important` | **PARTIAL** — contained cut-01 fix done (#45); full scale-claim **gated** |
| **C8** | reduced-motion at 50% | **DONE + E8 shell floor** (#45) |
| **C9** | Ambient vs refined motion: no precedence rule + pulse duration | **OPEN** |
| **D1** | Meta-split: are tokens **infrastructure** (bind, canonize scales) or **documentation** (compositional sizing)? | **UNRESOLVED** — underpins C2 & C7; decides how much canon must invent vs transcribe |

---

## What shipped (detail)

**PR #45 — Run-B, all CDP-verified:** C8 reduced-motion (00/03/08/10/11) + the 2 bugs;
C3 serif→canon; C7 contained `!important` cleanup (cut 01, byte-identical render); cut-02
phantom `--ink-1..9` bound to canon; `3dba7dc` (parallel session) provenance-a11y + thread
fix; **E8** shell reduced-motion floor via the **near-instant pattern** (NOT `animation:none`
— so reveals still land visible, avoiding the C8 trap).

**PR #46 — front door:** `index.html` = C-led living-orbital hero + A hairline catalog +
**bifurcated C1 seal**; 3 direction prototypes in `cuts/_explore/frontdoor-{a-elevated,b-cinematic,c-swing}.html`;
veracity fixes across all four files.

---

## Key decisions & rationale (don't re-litigate)
- **C-led, not B-led.** B opens on the abstract brand sentence then pivots to the category noun — a *widen-before-concrete* register collision ("the Sydney landmine"), wrong for a prototype front door. B's brand-type-at-scale is for the **deck**.
- **Seal is two beats** (record instant / ceremony separate) = canon C1. Do not re-conflate when wiring cuts.
- **Veracity rules (public-surface, treat as enforced):** lead noun = **"local-first control plane for human-AI work"** (Option B, was "judgment infrastructure"); **"top 16 of 102 finalists (200 teams at start)"** (bare denominator banned); **drop the "12" agent count** (3-vs-12 unresolved) → "bounded agents" ("four registers" is fine); refusal in the **external worker register** ("ask Diligence"), not the internal "Healer" archetype. Positioning source: see `FRONT_DOOR_DECISION_2026-05-12.md` + upstream canon.
- **Verification bar = real headless Chromium (CDP), not eyeballed.** Keep it.

## Insights worth keeping (the stuff not visible in the diff)
1. **The repo's real shape:** a *mature design system with a thin design surface*. Leverage is in the consuming designs, not the tokens (which are excellent).
2. **Unifying root cause of the bugs:** there is **no enforced token-consumption contract**. Cuts consume the canon inconsistently — some load `brand-upgrade.css`, some don't; some hardcode; some fight the cascade with `!important`. C8/C3/C7/cut-02 are all symptoms of this one disease. A "substrate-hardening" sweep (enforce one consumption pattern) is the highest-leverage non-glamorous next move.
3. **Dataviz was already sound** — validated with the dataviz skill's `validate_palette.js` (register quad CVD ΔE 43.5, labeled, token-driven). **Guardrail:** canon `--signal` (lime) vs `--watch` (amber) collapse to **ΔE 2.9 in deuteranopia** → never distinguish those two by color alone; keep them glyph/label-paired. Don't re-audit; don't rebuild.
4. **Two genuine divergences are founder-gated in-code** (team-drift fork, cut-02 ink-ramp before it was green-lit) — the repo authors already found and parked them. Respect that pattern: **code where canon is settled, flag where it's a decision.**
5. **Stills can't certify motion.** The front-door orbital's *state machine* is verified; the *feel* of the 8.9s cycle + ~650ms artifact→glow gap needs a live human eyeball before final lock.

---

## Open-task ledger (prioritized — nothing here should be dropped)
1. **Merge #45, then #46** (human's local task; disjoint files, order free).
2. **Eyeball the front-door orbital motion live** before final-locking #46 (only unverified thing).
3. **C1-in-cuts** — wire the bifurcated seal into cuts **00/01/11**; first locate upstream `RUNB_DESIGN_SYSTEM_SPEC` for the exact canon.
4. **Run-B C2/C4/C5/C6/C9** — untouched coherence findings (token binding, correction-UX unification, refusal semantics/timings, frame-restructuring license, motion precedence).
5. **D1 meta-decision** — tokens as infrastructure vs documentation. Blocks a clean C2/C7-full.
6. **C7-full** — claim the display scale + de-escalate brand-upgrade's shared `.slate-title !important` (cut 01 + `embed-slate-tray-demo.html` + `liminal-desktop-specimen.html`).
7. **Run-B adjudication → canon** — the RUN_B docs are substrate for an adjudicator that writes canon; that write-up (or reconciling with the upstream spec) is still open.
8. **Verify** cut-02 provenance legibility (parallel session `3dba7dc` elevated it — confirm it reads).
9. **Founder-gated, do NOT touch without a decision:** team-drift palette fork; `cuts/thread/` positioning (superseded diffuse-context framing, deliberate Newsreader).

---

## Environment / gotchas (save time)
- **No image-gen tool** — `imagegen`/`brandkit` skills need an image model that isn't wired up. Build visual direction as **rendered HTML on real tokens** + CDP screenshots (more truthful anyway).
- **Chromium**: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Launch via Bash `run_in_background:true` (backgrounding inside a compound command dies). Drive by CDP over `--remote-debugging-port`; Node 22 has global `WebSocket`. **Capture animations deterministically by polling DOM state** (e.g. `#phase.textContent`, a stop's `stop-opacity`), not wall-clock. Long-lived instances get flaky — relaunch if a CDP call hangs.
- **Dev server**: `node server.mjs` (:5173), zero-dep.
- **`pkill` in a compound Bash line returns exit 144** in this sandbox and aborts the rest — kill/launch in separate calls.
- **Screenshot artifacts**: the front-door branch's `.gitignore` ignores `_frontdoor-*.png`; the **designated branch's does NOT** — throwaway PNGs trip the clean-tree stop hook. `rm -f _frontdoor-*.png` before ending a turn. `_scratch/` is gitignored.
- **Brand canon is UPSTREAM**: `~/liminal/founder-brain/meta/SHARED_CONTEXT.md` + `liminal-creative/tokens/`. Visual direction works from in-repo `PRODUCT.md` + `design-system/tokens/design-tokens.css` + vendored `fonts/`; **positioning/bio copy needs the upstream canon** — treat front-door copy as placeholder pending it.

## Re-verify commands (that worked)
- **reduced-motion**: CDP `Emulation.setEmulatedMedia` `prefers-reduced-motion:reduce`; eval computed `.reg` opacity (>0) and count elements with `animationName!=='none' && animationDuration>0.05s` (must be 0).
- **seal bifurcation**: poll `#phase.textContent` + `#c1` `stop-opacity`; beat1 = `sealed · vault`/`0`, beat2 = `acknowledged`/`0.5`.
- **links**: `grep -oE 'href="[^"]+"' index.html` → curl each for 200.
- **palette**: dataviz skill `scripts/validate_palette.js "<hex,…>" --mode dark` (skill-bundle path may not persist — reload the `dataviz` skill).

## Session arc
Cold-read → found the prior Fable Run-B audit (`docs/RUN_B_*`) → closed findings in code (C8/C3/C7-partial/cut-02, +2 bug fixes) → validated-audited dataviz (already sound; green-lit only the cut-02 ink ramp) → opened **#45** + watched it → explored 3 front-door directions as rendered HTML → per the human's design review, shipped **C-led + A-catalog** with the **bifurcated C1 seal** + veracity fixes → added **E8** shell floor → split the front door into **#46** so #45 stays the reviewed Run-B scope → wrote this handoff.
