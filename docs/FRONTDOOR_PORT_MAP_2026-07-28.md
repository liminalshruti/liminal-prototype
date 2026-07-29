# Front-door port map · 2026-07-28

**What this is.** The founder-gated handoff for replacing the live theliminalspace.io
homepage with the converged concept `cuts/_explore/frontdoor-synthesis.html`.
Nothing in this document has been executed against the live site; every step
below is gated on a founder call.

## Ground truth (verified 2026-07-28)

- **theliminalspace.io is served by `liminal-space-v0`** (Next.js on Vercel),
  not the Astro `liminal-site` repo. The live homepage is
  `src/components/landing/LiminalLanding.tsx`, last reshaped by PR #235 +
  `fix/posters-eager` (2026-07-28): hero + three committed ProductShot posters
  (`public/landing/poster-slate.png`, `poster-reads.png`, `poster-vault.png`).
- **`/demo`, `/product`, `/investor` 307-redirect to
  `liminal-prototype/cuts/01-slate-tray.html`** on GitHub Pages
  (`next.config.js` redirects block, 2026-07-28 entry). Cut 01 is the product
  link every outreach message lands on; it received a cold-open fix and the
  judgment-register copy retire in this branch.
- The synthesis concept supersedes `frontdoor-a/b/c` and `ledger-directions`
  (archived on `archive/design-concepts-2026-07-28`); liminal-site's
  `_prototypes` passes are preserved on that repo's
  `archive/design-passes-2026-05` branch (they were gitignored and never
  tracked; committed there verbatim before disk removal).

## Section mapping · synthesis → LiminalLanding replacement

| Synthesis section | Replaces in LiminalLanding | Port notes |
|---|---|---|
| Top bar (brand + "Open the live product") | `WristbandNav` usage | Keep one label per intent; the same label repeats in the hero. |
| Hero (kick / h1 / lede / CTAs + sealed orbital) | `KineticMassHero` + hero grid | Copy is already the live ratified copy, carried verbatim. The orbital replaces the hero ProductShot; render the SVG server-side in markup at the sealed state (no hydration gate), exactly as the concept does. Keep `initial={false}`-style discipline: first paint complete. |
| The loop (5 beats) | `TheMechanism` | Beats are plain markup; register colors from canon tokens. |
| Open it where it runs (poster card + 2 wash cards) | The three ProductShot sections | Lead card reuses the committed poster pattern; links point at the prototype surfaces the current posters screenshot. |
| What's real here + receipts | (new; no current equivalent) | The honesty strip is ratified index copy; receipts phrased canonically. |
| Access ("The pilot is invite-only") | Closing CTA + cohort form | Concept links to `/pilot`; in the port wire the real form/flow instead. |

## Poster refresh (after cut-01 improvements land)

The three production posters are captures of prototype surfaces; cut 01 changed
on this branch (cold-open overlay fix + titlebar copy). After merge and Pages
deploy, re-capture at 2x from a cold profile and replace
`public/landing/poster-*.png` in liminal-space-v0. Acceptance is the same bar
PR #235 set: every poster paints in a full-page capture, no lazy gates.

## Founder decisions required (not resolved here)

0. **The v0 repo is ARCHIVED (new fact, 2026-07-29).** GitHub archived
   liminal-space-v0 at 2026-07-28T22:14:42Z, one second after the last
   landing-fix push: the repo is read-only, so no branch, PR, or git-driven
   Vercel preview can reach it. The port IS implemented and verified: local
   branch `feat/frontdoor-synthesis-port` in the v0 worktree
   (`.claude/worktrees/frontdoor-port-2026-07-29`), production build passes,
   JS-on and no-JS renders verified at 1440/390. To mint the preview, either
   (a) unarchive the repo (Settings, one click) and the branch pushes + PRs
   normally, or (b) run `vercel login` on this machine and the worktree
   deploys a preview directly, no git needed. Both are your call: the archive
   looks deliberate, and unarchiving vs. finally cutting the domain over to a
   non-archived repo is exactly decision #1 below.

1. **Port target.** The domain is served by the archived `liminal-space-v0`
   while the Astro `liminal-site` (built for this domain; cutover doc
   2026-05-30) sits unused. Port the synthesis into v0's LiminalLanding
   (fastest, matches today's landing work) or use the port as the moment to
   complete the Astro cutover. This also intersects the reopened domain
   decision (2026-07-01, "Liminal"-pure domain direction).
2. **Synthesis quality gate.** The concept is built to beat the live landing
   at landing the wedge pre-click; the founder judges whether it does.
3. **Prototype index.** `index.html` still carries the C-led front door. If
   the synthesis register should propagate there, that is a follow-up cut,
   not part of this branch.

## Verification run on this branch (2026-07-28)

- Synthesis: desktop 1440 + mobile 390 full-page captures; complete wedge
  present in a **no-JS static render** (sealed orbital, refusal drawn, packet
  chip, poster, receipts); no horizontal scroll at 390.
- Cut 01: cold open from cleared storage paints the entry overlay centered
  and scrimmed; door → read → Decide → "decision captured · vault entry
  written" verified in-browser; console clean.
- Gates: no `Stanford` / `SPC fellow` / `twelve agents` / `control plane` /
  brand-name violations in changed files; no em dashes in the synthesis's
  visible copy; `npm run tokens:check` passes.
