# Next stages — queued work (2026-06-02)

Spec of follow-ups surfaced during the consolidation + tool-shell session.
Branch: `refactor/combine-cuts`. Each is independently buildable; none blocks
the current branch from merging.

---

## Resolution log — 2026-06-11 (branch consolidation + founder decisions)

`refactor/combine-cuts` merged to `main` (clean, only `index.html` overlapped;
auto-resolved). Founder decisions taken on the gated items:

- **S3 / F3 (menu off-canon type) — DONE.** Founder call: *drift, fix.* `index.html`
  now adopts the LOCKED brand stack — `--display` → NinetiesHeadliner, `--sans` →
  PerfectlyNineties (local `@font-face`, root-relative `fonts/`). `--mono` kept as
  **Geist Mono** per the 2026-05-14 lock (brand-upgrade.css predates the lock and
  uses Cougar — not adopted). Newsreader + Geist dropped from the Google Fonts
  link; Geist Mono retained. Render-verified: all three families load, wordmark
  computes PerfectlyNineties. Evidence: `audit-f3-menu-brandtype-after.png`.
- **S4 (12 vs 13 agents) — DECIDED: twelve is canon.** The 13-agent desktop roster
  is treated as drift to reconcile later, not adopted. Brand hard-stop (twelve)
  stands; no CLAUDE.md rewrite. All new work stays register-named, never
  count-named (as already mandated). The dedicated Agents register/refusal cut
  stays blocked until/unless 13 is ever formally adopted.
- **S6 (speedrun byline) — DONE.** `cuts/01-slate-tray.html` `.is-speedrun
  .entry-brand` switched from eyeballed `13px`/`#8A8780` to the archived
  original's relative idiom (`font-size: 0.85em; opacity: 0.72`).

Still open / deferred per original spec: S1 (Patterns cut — next up), S2
(split-view), S5 (in-place nav swap), S7 (vanilla onboarding). F5 (Maya/Maia)
deferred — see audit doc.

---

## S1 · Patterns cut (the self-read mirror) — Tier-2
**Why:** the journey map's Record-over-time branch. "Form to inner life," literal.
**Scope:** new single-file cut `cuts/10-patterns.html`, fresh on canon (`pat-*`
namespace, `tdy-*`/`cal-*` as reference). Three findings, each a small chart +
a plain-language sentence:
1. "You place judgment third" — ranked bar (speed · consensus · judgment).
2. State × quality — "sharp reads 9–11am, regrettable after 9pm."
3. Who you override most — ⚠️ names agents; author register-level, count-agnostic.
**Real vs faked:** mostly a composed static read; optional hover-to-expand
supporting vault entries.
**Constraints:** register-named only (12-vs-13 parked, see S4). Fix cut 03's old
flaw — must read at rest, not require interaction. Add to menu + surface-nav.
**Risk:** copy must be specific/earned or it reads as astrology.

## S2 · Split-view correction pattern — graft into cut 01
**Why:** makes the correction itself the visible deliverable ("what I said" vs
"what's true"), sharpening "corrections are the moat" at the decision beat.
**Scope:** dual-column block at the deliberation beat of cut 01. Left: founder's
draft move. Right: agent correction, delta highlighted. Fully scripted.
**Constraints:** touches the LOCKED front door — do behind a copy / verify
default unchanged, OR build as an isolated demo cut rather than mutating 01.
**Count-dependency:** none.

## S3 · F3 — index/menu off-canon type
**Why:** the menu (literal front door of the live link) uses Newsreader + Geist,
not the LOCKED brand stack (Nineties Headliner + Perfectly Nineties + Geist Mono).
The cuts load the real fonts via brand-upgrade.css; the menu doesn't.
**Scope:** decide whether the catalog menu should adopt brand type. If yes, link
brand-upgrade.css in index.html and map the wordmark/titles to the brand stack.
**Open question (founder call):** is the lighter menu type intentional (fast
catalog) or drift? Don't change unilaterally — it's a brand-canon surface.

## S4 · 12-vs-13 agent count — PARKED decision
**Why:** the zip's desktop-app surfaces (`surfaces-2.jsx`) render **13** named
agents with a renamed roster; the README, storyboard, and submission card say
**twelve**. Internal inconsistency in the source material.
**Needs:** a founder decision — hold at twelve (canon) and treat 13 as drift, OR
adopt 13 + new roster and rewrite the brand hard-stop. Until resolved, all new
work stays register-named, never count-named.
**Blocks:** a dedicated Agents register/refusal cut (can't render the roster
without resolving the count).

## S5 · Surface-nav — in-place swap (vs page-load flash)
**Why:** current cross-cut nav (surface-nav.js) does real page loads → brief
flash on navigate. Acceptable now; an SPA-style in-place surface swap would feel
more like one tool.
**Scope:** OPTIONAL upgrade. Would require a host shell that loads cuts into a
frame/region and swaps without full reload. Higher complexity; reopens the
"app-shell vs deepen-the-cuts" altitude question — defer unless the flash proves
to be a real problem in front of partners.

## S6 · Cut 01 register toggle — byline polish
**Why:** the speedrun byline sizing (12.8px) in the hero toggle was eyeballed.
**Scope:** small — review the speedrun-state `.entry-brand` sizing/spacing
against the archived speedrun cut's original treatment; tune to match.
**Risk:** low; scoped to `#entry-overlay .entry-card.is-speedrun`.

## S7 · Onboarding (04) — F8 CDN dependency
**Why:** the surviving onboarding cut still loads React + Babel from unpkg at
runtime (only CDN-dependent cut; breaks the "no build step" contract). If unpkg
is down, it shows nothing.
**Scope:** OPTIONAL — rebuild 04 as dependency-free vanilla to match the rest of
the catalog. Founder chose "keep React" for now; revisit if the dependency
becomes a problem.

---

### Sequencing suggestion
- **Next up:** S1 (Patterns) — net-new, on-thesis, no blast radius.
- **Then:** S2 (split-view) as an isolated demo cut.
- **Founder calls, no build:** S3 (menu type), S4 (agent count).
- **Defer:** S5 (in-place swap), S7 (vanilla onboarding) unless they bite.
- **Quick:** S6 (byline) whenever cut 01 is next open.
