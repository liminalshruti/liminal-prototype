---
id: prototype.scratch.2026-04-29-marketing-architecture-double-diamond
type: architecture-decision-doc
status: draft · in-Discover-phase
created: 2026-04-29
updated: 2026-04-29
author: shruti + creative-director
purpose: |
  Step 0 (architectural decision) for the three-site marketing surface.
  Three sites: liminalos.ai (brand), liminalos.app (product/try-now), liminalos.dev (build/IP-evidence).

  Process frame: Double Diamond (Discover → Define → Develop → Deliver).
  Same frame the Apr 25 Saturday hackathon prep used for agent-flow design;
  applied here at the cross-site marketing-architecture altitude.

  This doc answers cross-site structural questions BEFORE per-site wireframes ship.
  Per the wireframe-first discipline established this week, plus the audit-then-correct
  cascade pattern proven 3x today (CHI 2027→Heron, packet abstraction across 4 zones,
  prototype P0+P1 fixes).

frame: Double Diamond
phase_status: Define ✅ COMPLETE 2026-04-29 evening (all 25 locks landed) · Develop phase clear to start

canon:
  - liminal-creative/CLAUDE.md (Brand OS Canon v4 expressiveness policy)
  - liminal-ip/THESIS.md (post-pivot positioning)
  - liminal-ip/06-evidence/INVENTIONS.md §10 (PPA #8 Packet Abstraction)
  - liminal-prototype design-tokens.css + cut-shell.css
  - personae/_meta/PERSONA_ARCHITECTURE.md (multi-ICP framing)
  - personae/maya-chen-founder-os/identity.json (three-tagline strategy)
  - PRIVACY_INVARIANTS.md (Options D + E substrate-preserving deliverable patterns)
  - COPY_AUDIT_2026-04-28.md (inspo register correction)
  - SR007-APPLICATION-DRAFT.md v4 (cites Company Website field)
  - this morning's URL audit (theliminalspace.io = v0 wellness app, contradicts post-pivot positioning)

deferred_action: Porkbun checkout for liminalos.ai + liminalos.app + liminalos.dev (parked Apr 29 evening)
---

# Marketing Architecture — Three-Site Decision Doc

## Process frame: Double Diamond

The Double Diamond is a four-phase design-process model:

```
       DISCOVER     →     DEFINE     →     DEVELOP     →     DELIVER
       (divergent)        (convergent)     (divergent)        (convergent)
       Research the       Frame the        Generate           Ship the
       problem space      actual problem   solutions          chosen solution
       widely             tightly          widely             tightly
```

**Why this frame here.** The marketing-site work has been collapsing into solution-mode (which TLD? which domain? which copy? which wireframe?) without first running the discovery/definition phases. **The wireframe I shipped earlier this evening jumped from Discover to Develop without going through Define** — exactly the failure mode the Double Diamond exists to prevent. This doc resets to phase 1 and runs the cycle properly.

Each diamond has a tight gate at its midpoint (Define) and end (Deliver). **Approval at the Define gate is the most important single decision in this entire architecture.** If Define lands wrong, every downstream wireframe + HTML + DNS work compounds the wrong choice across three URLs and 10-16 hours of build work.

---

## DISCOVER (divergent) — what's the problem space?

**Goal:** name every constraint, audience, surface-coordination requirement, and prior-decision the architecture has to honor. Stay wide. Don't converge yet.

### What's already locked from prior work

These are decisions made + landed canonically across the corpus — they're constraints on the architecture, not open questions:

| Decision | Source | Constraint imposed |
|---|---|---|
| Three URLs · `liminalos.ai` + `liminalos.app` + `liminalos.dev` | Apr 29 evening, this session | Three sites, three domains, MECE coverage |
| MECE JTBD split: brand / product / build | Apr 29 evening | Each site answers one visitor question only |
| Packet abstraction as canonical IP primitive | INVENTIONS.md §10 PPA #8, propagated across 4 zones | The packet is the deliverable layer; substrate is the moat — must be visible on at least the brand site |
| Maya Chen synthetic-substrate two-track discipline | personae/_meta/PERSONA_ARCHITECTURE.md | Marketing must use synthetic substrate, not real-Shruti substrate, for any persona/scenario rendering |
| Inspo register correction · instrumentation-grade, not atmospheric | COPY_AUDIT_2026-04-28.md | Hard-edged SVG over soft gradient; mono labels with accent dots; orbital diagram vocabulary; no glow halos / atmospheric blur / decorative ambient washes |
| Brand OS Canon v4 expressiveness policy | liminal-creative/CLAUDE.md | Every expressive surface must answer "what signal does this render?" — gradients/grain/glass require measured-data justification |
| Locked brand sentence | "Liminal gives form to inner life." | Must appear on every site, brand-canon-protected |
| Three taglines per audience-keyed surface swap | personae/maya-chen-founder-os/identity.json | Each site can use its register-appropriate tagline (YC-aligned for `.ai`, Speedrun-aligned for `.app`, dev-aligned for `.dev`) without contradicting the others |
| PRIVACY_INVARIANTS Options D + E (Persona Export + Packet Sharing) | PRIVACY_INVARIANTS.md | Marketing can NOT introduce telemetry or vault-content-leaving-device patterns that contradict the structural-privacy invariants |
| v0 wellness app at `theliminalspace.io` retired but preserved as artifact | This morning's URL audit | v0 must be honestly named + linked, not hidden |
| `liminalwoman.substack.com` is the founder-voice publishing surface | Apr 28 corpus | Substack stays where it is; marketing sites link to it as JTBD-3 / publishing surface |
| SR007 application Company Website field currently `theliminalspace.io` | SR007-APPLICATION-DRAFT.md v4 | Migration to `liminalos.ai` requires either pre-submit field swap or post-submit edit (form editability TBD) |
| Sibling repos: `liminal-prototype/`, `liminal-site/` (empty), `liminal-agents/` (public on GitHub MIT) | REPOS.md | Architecture must integrate with existing repo structure, not invent new ones |

### Open structural questions surfacing across the work

These are the questions Discover-phase has surfaced. Each needs an answer in Define-phase before any per-site wireframe lands:

**Per-site scope:**
1. What's the exact content boundary for `liminalos.ai`? (Brand-only single-page, vs brand + about + contact, vs brand + essays mirror, vs brand + about + contact + essays + research)
2. What's the exact content boundary for `liminalos.app`? (Prototype redeployed verbatim, vs curated cut subset, vs new shell wrapping cuts as iframes, vs entirely new app surface)
3. What's the exact content boundary for `liminalos.dev`? (Static landing linking to GitHub, vs GitHub Pages of an actual repo, vs hybrid pulling live README/PR data, vs documentation site for the open-source agents)
4. Where does the packet abstraction live across the three? (Brand site only, all three, primary on brand + abbreviated on others, dedicated subdomain for IP-claim depth)
5. Where does the Maya Chen persona system live? (Internal substrate only — never shipped to marketing, vs surfaced on `liminalos.dev` as canonical demo persona, vs spotlight-rotated across brand site)
6. Where does the AgentHansa judge quote live? (One site, all three, primary on brand + abbreviated on others)

**Cross-site shared infrastructure:**
7. Single shared design-system source (one CSS file imported by all three) vs duplicated copies across repos vs npm-published design-tokens package
8. Shared chrome (top nav, footer) across all three sites vs per-site chrome
9. Cross-site nav: do visitors jump between the three URLs (top-nav links across sites) or are the three URLs orthogonal surfaces with footer cross-references only
10. Shared analytics: none / Plausible / Splitbee / server-log-only / per-site choice
11. Shared favicon + meta-image system

**Coordination with existing surfaces:**
12. Prototype's role: `liminalos.app` IS the prototype redeployed, OR `liminalos.app` is a different surface and the prototype stays internal-only at `liminal-prototype/`
13. `theliminalspace.io` migration: redirect to `liminalos.ai`, OR preserve at `v0.theliminalspace.io` subdomain, OR kill entirely, OR keep as v0 product surface indefinitely, OR sell/transfer
14. Substack canonicalization: stay at `liminalwoman.substack.com` indefinitely, OR canonicalize to `essays.liminalos.ai` at some future date (Substack supports custom domains)
15. Founder personal social (X, LinkedIn) — link from where, with what register
16. GitHub linking: `github.com/liminalshruti/*` repos as the canonical engineering surface, OR a `github.com/liminalos/*` org rename, OR both

**Build / deploy / hosting:**
17. Hosting per site: GitHub Pages all three, Cloudflare Pages all three, Vercel all three, mixed
18. Repo structure: one `liminal-site` repo with subdirectories per site, vs three separate repos (`liminalos-ai-site`, `liminalos-app-site`, `liminalos-dev-site`), vs marketing-monorepo
19. Build process: vanilla HTML (no build step) vs static-site-generator (Eleventy / Astro / 11ty) vs Next.js
20. CMS: none (everything in-repo) vs lightweight (Decap / TinaCMS) vs founder-edits-markdown-only

**Founder-decision-only questions** (not technical, founder-direction):
21. Brand register per site: each site uses its register-tagline (YC / Speedrun / dev) or all three converge on one tagline for marketing coherence
22. Voice register: three sites speak in three voices (formal-investor / casual-founder / engineer-direct) or all three speak in one voice
23. Pricing visibility: any of the three sites mentions pricing yet (recommended NO — pre-product, would name a number that locks too early)
24. Lead capture: any of the three sites captures emails / runs a waitlist (recommended NO — wrong JTBD per the brand-only framing)
25. v0 footer link: present on all three, primary site only, hidden entirely

### Audiences (full enumeration, no convergence yet)

Every audience that visits any of the three sites:

| Audience | Likely entry point | What they want to see |
|---|---|---|
| Speedrun partner cold-reading SR007 application | Click-through from form Company Website field | Brand-anchor / category-claim / "what is this company" |
| Speedrun partner warm-introduced via referral | Direct link from referrer | Same as above + signal that founder thinks structurally |
| Hackathon judge during/after submission review | README link from hack submission | Product-try-now or build-evidence depending on judge type |
| Hack-room attendee browsing post-event | Lateral curiosity | Any of the three; product-try-now most likely |
| Speedrun Slack member following recommendation | Internal share | Brand + then product-try-now |
| YC partner doing diligence (post-RFS thesis-alignment recognition) | Cold-search after seeing the application referenced | Brand-anchor with explicit YC RFS #4/#15 alignment (kept internal per the deploy-NO rule, surfaced via architectural claims not category-numbers) |
| SPC member browsing peer founders | Internal share / referral | Brand + founder voice (Substack) |
| Technical investor doing diligence | Cross-reference from application + GitHub | Build / IP-evidence / verification path |
| Engineer evaluating for hire-from / collaboration | Cold-search / GitHub navigation | Build / IP-evidence + agents repo + Heron paper |
| Founder-peer browsing for adjacent-company tracking | Lateral curiosity / X recommendation | Brand + founder voice + maybe product-try-now |
| Hostile reviewer (competitor analyst, journalist) | Cold-search post-press-mention | Brand + would try to find compromising material; v0 footer-link reframes this from gotcha to discipline-receipt |
| Future hire candidate | Recruiting pipeline / Substack reader | Brand + founder voice + build / IP-evidence |
| Press / journalist | Press inquiry / cold-search | Brand + maybe a press-kit page |
| User of the eventual product | Post-launch consumer-direct | Product-try-now (would dominate post-launch; near-zero pre-launch) |

### What the corpus has already produced as raw material for these sites

Inventory of substrate that exists on disk and would feed the marketing surfaces:

- **Locked sentences:** brand sentence, three taglines, video script v3 hooks, Apr 23 cheat sheet phrasings, Section 2 Anything Else paragraphs from application v4, packet-abstraction copy from INVENTIONS.md §10
- **Locked visual elements:** orbital glyph (small + large), packet card pattern (5 instances in liminal-agents-v1), HUD-readout layout, register accent system (clarity / vitality / wholeness / connection / cerulean), grain texture, mono-label pattern
- **Locked photography:** none (deliberate per the inspo register correction — the design system is the photography)
- **Locked illustrations:** the orbital diagram, the packet shape, the substrate-vs-deliverable diagram (the two-layer rendering from PPA #8 explanation)
- **Locked external receipts:** AgentHansa judge quote (1 quote, full attribution), Peter Dimov 14K Substack rec (1 receipt), MENA Group + YC finalist (2 institutional anchors), Heron paper (1 co-authored research artifact), 12-agent count + MIT-license + GitHub link (3 shipping receipts)
- **Locked founder-voice copy:** Substack masthead, founder-note from application Section 2 ("How I came to this idea / What I changed my mind about / Hard decision Shayaun and I made / Signals I'm not hiding / The Andrew callback / The counter-cyclical bet")
- **Existing prototype surfaces ready to repurpose:** Cut 01 canonical, Cut 01 Speedrun-cut variant, Cut 02 alt UI, Cut 03 calibration, orbital agency rail with 5-step demo loop

---

## DEFINE (convergent) — what's the actual problem to solve?

**Goal:** narrow Discover's wide-cast to a single clear problem statement that the three sites collectively solve. **This is the gate.** Locking it wrong cascades into 10-16 hr of misdirected work; locking it right makes Develop + Deliver mechanical.

### Proposed problem statement (single sentence)

> *Build three audience-routed brand surfaces — `liminalos.ai` (category), `liminalos.app` (product), `liminalos.dev` (engineering) — that each render the post-pivot Liminal positioning in the audience's native register, share enough infrastructure to be visually coherent across visits, and integrate with the existing prototype + agents + Substack surfaces without duplicating them.*

This problem statement does five things:

1. **Names the three sites by URL + JTBD** — locks the MECE structure
2. **Names "audience-routed" as the architectural primitive** — same audience-keyed surface swap pattern as Maya Chen's three-tagline strategy
3. **Names "share enough infrastructure to be visually coherent"** — but doesn't lock to monolithic single-source vs distributed (that's a Develop-phase decision)
4. **Names "integrate without duplicating"** — protects the prototype + agents + Substack from being re-implemented on the marketing surfaces
5. **Excludes scope-creep** — doesn't mention pricing, lead capture, blog, docs, careers, press kit, anything else

### Architecture decisions Define-phase locks (proposals — need approval)

For each of the 25 open structural questions surfaced in Discover, here are the proposed locks. **These are recommendations under Auto Mode discipline; founder-decision questions are flagged separately.**

#### Per-site scope (locks 1-6)

| # | Question | Proposed lock | Rationale |
|---|---|---|---|
| 1 | `liminalos.ai` content boundary | **Single static page, brand-anchor only.** Hero + packet abstraction + counter-cyclical claim + judge quote + founder note + three-doors + footer. No about, no contact, no essays mirror. | JTBD-1 stays JTBD-1. Drift to about/contact/essays fragments the 5-second category-legibility goal. About + contact live at the foot of every site as one-line links. Essays canonical at Substack |
| 2 | `liminalos.app` content boundary | **Prototype redeployed verbatim.** `liminalos.app` IS `liminal-prototype/index.html` served from a static host. No curation, no shell rewrite. Cuts catalog stays, Cut 01 default | The prototype already does its job. Re-implementing it under a different chrome = duplicate work + drift between prototype and product-site. The prototype's catalog rail IS the product-site's nav |
| 3 | `liminalos.dev` content boundary | **Single static landing page** with three sections: (a) GitHub repo cards (`liminal-agents` first, `liminal-desktop` second), (b) Heron paper download + abstract, (c) packet schema + INVENTIONS.md §10 highlights + PRIVACY_INVARIANTS verification snippet. No GitHub Pages of an actual repo. No live API pulls | Static = cheapest to maintain + most auditable. Live API pulls add infrastructure for visitor-uncertain benefit. Engineers click through to GitHub for live state anyway |
| 4 | Packet abstraction location | **Primary on `liminalos.ai` (Section 2 visual centerpiece). Abbreviated mention on `liminalos.dev` (one card in the IP section). Absent on `liminalos.app`** (the product itself demonstrates packets via the agency rail) | Brand site carries the IP claim; engineering site carries the verifiable evidence; product site shows the architecture working. No duplication |
| 5 | Maya Chen persona location | **Internal substrate only — never publicly shipped.** `liminalos.app` runs the prototype which currently uses synthetic-but-non-Maya try-one cards. If Maya Chen substrate eventually lands in the prototype, it lands as part of the deterministic-replay theatre cut, not on the marketing sites directly | The persona system is a marketing-discipline tool (synthetic substrate for hack submissions + recordings), not a brand-asset to surface publicly. Surfacing Maya on the marketing sites would dilute the audience-routing — visitors would start asking "who is Maya" |
| 6 | AgentHansa judge quote location | **Primary on `liminalos.ai` (Section 4 receipt). One-line abbreviated mention on `liminalos.dev` (under shipping receipts). Absent on `liminalos.app`** (the prototype IS the architecture the judge endorsed) | Same logic as #4 — one site carries the testimonial weight; the others reference it in their native register |

#### Cross-site shared infrastructure (locks 7-11)

| # | Question | Proposed lock | Rationale |
|---|---|---|---|
| 7 | Design-system source | **Single shared `design-tokens.css` in `liminal-site/tokens/` (or wherever the marketing-monorepo lives). All three sites import it via relative path.** No npm-publishing, no duplication across repos | One source of truth. Token edit → all three sites pick it up at next deploy. Same discipline as the prototype's relationship to its `design-system/tokens/` dir |
| 8 | Shared chrome | **Yes — single shared header + footer, identical across all three sites.** Static orbital glyph + `LIMINAL` wordmark + 3-link top nav (Brand · Product · Engineering, with current site's link disabled). Footer shared with v0 link, social links, address | Visual coherence across visits. Visitor jumping between sites pattern-matches "same company, three surfaces" not "three different sites that happen to share a name" |
| 9 | Cross-site nav | **Yes — top nav links to all three sites by URL.** `liminalos.ai/.app/.dev` directly, opening in same tab. Current-site link visually disabled (mono-caps with reduced opacity, no underline, not clickable) | Visitor self-routes by JTBD. The top nav IS the JTBD-routing primitive. No drop-down menus, no nested nav — three top-level links and that's it |
| 10 | Analytics | **Plausible (or self-hosted analytics).** Privacy-respecting, no cookies, no GDPR-banner-required. Shared script across all three sites. Not Splitbee (heavier, more tracking). Not Google Analytics (contradicts PRIVACY_INVARIANTS posture explicitly) | Founder needs to know visit volume + referrer pattern to optimize the corpus — but using surveillance-coded analytics on a structural-privacy-claim company breaks the brand-product coherence the corpus has fought to establish all session |
| 11 | Favicon + meta-image | **Single shared favicon (small orbital glyph) across all three sites. Single shared OG meta-image (locked brand sentence on warm-cream-on-warm-black background)** | One brand-asset set, used across three URLs. Visitor sharing any URL on social/Slack/X gets the same preview card |

#### Coordination with existing surfaces (locks 12-16)

| # | Question | Proposed lock | Rationale |
|---|---|---|---|
| 12 | Prototype's role | **`liminalos.app` IS `liminal-prototype/` redeployed.** Same static HTML, same cuts, same catalog rail. The prototype repo stays canonical; `liminalos.app` is just the public-deploy URL for it | Per lock #2. Prototype = product-site, no duplication |
| 13 | `theliminalspace.io` migration | **(a) Root → 301-redirect to `liminalos.ai`. (b) `v0.theliminalspace.io` subdomain → preserves the existing v0 wellness app artifact verbatim, accessed only from the v0 footer link** | Founder-discipline receipt move. Doesn't kill v0 (loses the honest-frame footer), doesn't keep v0 as primary (contradicts post-pivot positioning). Subdomain split is the cleanest version |
| 14 | Substack canonicalization | **Stay at `liminalwoman.substack.com` indefinitely.** No migration to `essays.liminalos.ai` planned. Substack as third-party canonical is fine | Substack handles distribution / SEO / RSS / email-list / subscriber payment infrastructure for free. Custom-domain-canonicalizing buys nothing of value and breaks the existing 14K-Peter-Dimov-rec audience routing |
| 15 | Personal social linking | **X + LinkedIn linked from footer of all three sites.** Mono-caps text links, no icons. Goes to founder personal accounts | Standard. Personal social is the founder-voice surface; LinkedIn is the diligence/employment-history surface. Both belong in the footer, not the chrome |
| 16 | GitHub canonical | **Stay at `github.com/liminalshruti/*` indefinitely.** No org rename to `github.com/liminalos/*` planned | Org renames break every existing link in every existing artifact (corpus + investor materials + Substack + prototype READMEs + agents repo references + Heron paper + INVENTIONS.md). Rename cost > rename benefit |

#### Build / deploy / hosting (locks 17-20)

| # | Question | Proposed lock | Rationale |
|---|---|---|---|
| 17 | Hosting per site | **Cloudflare Pages all three sites.** Free tier, supports custom domains, supports build-from-repo, free SSL, low-margin (consistent with Cloudflare's registrar pricing if you ever migrate domains there) | GitHub Pages is fine but Cloudflare Pages handles `.app` and `.dev` HTTPS-required TLDs more cleanly. Vercel is great but free-tier limits + their-AI-everywhere brand register is slightly noisier than Cloudflare's quiet-infrastructure register. Cloudflare wins on signal-to-noise |
| 18 | Repo structure | **Single `liminal-site` repo with three top-level directories: `ai/`, `app-deploy/`, `dev/`. Each directory deploys to its respective URL via Cloudflare Pages multi-project setup** | Single-repo discipline. Three top-level dirs = three Cloudflare Pages projects pointing at three subpaths. Easier to maintain shared design-tokens (one path, three imports) than three separate repos. **Note:** `app-deploy/` is a thin wrapper that references `liminal-prototype/` as a git submodule or direct copy; the prototype stays canonical |
| 19 | Build process | **Vanilla HTML for `liminalos.ai` and `liminalos.dev` (no build step). For `liminalos.app`, the prototype's existing structure is the build process — no SSG layer added** | Simplest possible. No Eleventy / Astro / Next.js / 11ty. The marketing sites have ~5-7 sections each; SSGs would be overkill. Vanilla HTML stays editable in any text editor by anyone, no toolchain dependency |
| 20 | CMS | **None.** All copy lives in-repo as HTML or markdown that compiles to HTML. Founder edits directly | Same logic as #19. CMSs add infrastructure for low-velocity content (these sites change ~monthly, not daily). Founder-edits-markdown is the standard for this scale |

#### Founder-decision questions (locks 21-25 — flagged for explicit decision)

| # | Question | Proposed default | Override path |
|---|---|---|---|
| 21 | Brand register per site | **Each site uses its register-appropriate tagline.** `.ai` uses YC-aligned ("Operational knowledge layer for solo operators running agentic teams"). `.app` uses Speedrun-aligned ("A founder OS where AI agents disagree, deliberate, and prompt you"). `.dev` uses dev-aligned ("12 bounded agents, MIT-licensed, the audit-grade artifact for agentic operations") | Override: all three converge on one tagline. Cost of override: loses the audience-routing precision the three-tagline system was built for |
| 22 | Voice register | **All three sites speak in one voice — Shruti's founder voice, declarative, no hedging.** No "we" — first-person singular throughout | Override: three separate voices per site (formal-investor / casual-founder / engineer-direct). Cost of override: visitors jumping between sites detect voice-shift and pattern-match "team" vs "founder" inconsistency |
| 23 | Pricing visibility | **None of the three sites mentions pricing.** Pre-product launch. Naming pricing locks expectations too early | Override: surface "pre-seed packets, $X/yr" pricing on `.ai`. Cost of override: investor pattern-matches "founder is committing to a number that may move." Strong default to NO |
| 24 | Lead capture | **None of the three sites captures emails or runs a waitlist.** Substack handles all email capture. The marketing sites are JTBD-1/2/3 brand surfaces, not conversion funnels | Override: add email capture to `.ai`. Cost of override: changes JTBD from brand-anchor to lead-funnel; partner perception shifts from "founder thinks structurally" to "founder is in growth mode." Strong default to NO |
| 25 | v0 footer link | **Present on `liminalos.ai` only (the founder-note section already names v0 honestly).** Absent from `liminalos.app` (prototype doesn't need v0 self-reference; cuts catalog already shows the company's evolution). Absent from `liminalos.dev` (technical-evidence audience doesn't need v0 narrative) | Override: present on all three. Cost of override: v0 mention on `.app` reads weird (visitor wonders "is the prototype also v0 then?"); on `.dev` reads off-thesis (engineering audience doesn't care about wellness app history) |

---

## DEVELOP (divergent) — what are the candidate solutions per site?

**Status:** Not yet entered. Develop-phase work is per-site wireframe specs (steps 1a, 1b, 1c per the marketing-task chain). Each per-site wireframe runs its own micro-Double-Diamond with Define-phase decisions from this doc as locked constraints.

**Develop-phase deliverables (next sessions):**

1. **`_scratch/2026-04-29_liminalos-ai-wireframe.md`** — upgrade the existing `_scratch/2026-04-29_marketing-site-wireframe.md` (the premature `cuts/00-marketing.html` wireframe I shipped earlier this evening) against this doc's locks. ~1 hr
2. **`_scratch/2026-04-29_liminalos-app-wireframe.md`** — small doc, mostly "redeploy prototype as-is, swap chrome to add cross-site nav." ~30 min
3. **`_scratch/2026-04-29_liminalos-dev-wireframe.md`** — three-section spec (GitHub repo cards / Heron paper / packet schema + verification snippet). ~30 min

Each wireframe runs its own approval-gate cycle before HTML build.

---

## DELIVER (convergent) — how do the three sites ship?

**Status:** Not yet entered. Deliver-phase work is HTML build + Cloudflare Pages deploy + DNS + verification.

**Deliver-phase deliverables (after Develop approval):**

1. **Build `liminalos.ai`** — 3-4 hr against approved wireframe. Vanilla HTML.
2. **Wrap prototype for `liminalos.app`** — 1-2 hr (nav chrome adjustments + Cloudflare Pages config; prototype itself stays untouched in `liminal-prototype/`). May involve adding the cross-site top nav to the catalog shell as the only modification
3. **Build `liminalos.dev`** — 2-3 hr against approved wireframe. Vanilla HTML.
4. **DNS + Cloudflare Pages deploy** — 1 hr per site after Porkbun checkout completes (action item parked Apr 29 evening)
5. **`theliminalspace.io` migration** — set up 301-redirect to `liminalos.ai`, set up `v0.theliminalspace.io` subdomain pointing to existing v0 wellness-app deploy. ~1 hr
6. **Verification** — visit each URL from a fresh browser, verify cross-site nav works, verify favicon + OG image render, verify SR007 application Company Website field can be updated to `liminalos.ai`. ~30 min

**Total Deliver-phase cost:** 8-12 hr work + DNS propagation wait time. Could ship across May 1-10 window cleanly.

---

## Approval gates (Define-phase locks need your call before Develop starts)

The Define-phase proposed-locks above are organized by category. **Approval pattern:** approve the whole table at category level (per-site scope / cross-site infra / coordination / build/deploy / founder-decisions), or per-row override.

**Most critical locks to confirm:**

- **Lock 7 (single shared design-tokens.css)** — gates whether the build is single-repo or three-repo
- **Lock 8 + 9 (shared chrome + cross-site nav)** — gates whether the three sites read as "one company, three surfaces" or "three separate sites that share a name"
- **Lock 12 (prototype IS liminalos.app)** — gates whether the prototype evolves as the product-site or stays internal-only
- **Lock 13 (theliminalspace.io migration plan)** — gates the v0 preservation strategy
- **Lock 17 + 18 (Cloudflare Pages + single liminal-site repo)** — gates the entire deploy infrastructure
- **Lock 21 (per-site tagline register)** — gates the audience-routing precision

Founder-decision locks (21-25) are the only ones where my proposal is opinion-grade rather than discipline-grade. The other 20 follow from established corpus patterns + the inspo register correction + the wireframe-first discipline.

---

## What this doc deliberately does NOT do

- **Doesn't draft per-site wireframes.** Those are Develop-phase work; need Define gate to close first
- **Doesn't write per-site copy.** Copy comes after wireframes
- **Doesn't decide on visual layout per site.** Layout is wireframe-level concern, not architecture-level
- **Doesn't address the prototype's evolution roadmap** — the prototype is a separate substrate with its own iteration cadence; this doc only addresses how the marketing surfaces relate to it
- **Doesn't address fundraise contact / partnerships page / about page.** Out of scope for the three locked sites; would need separate JTBD-mapping if added

---

## Change log

| Date | Change |
|---|---|
| 2026-04-29 | Initial Double Diamond architecture decision doc. Discover phase complete, Define phase proposed-locks landed. Develop + Deliver phases pending Define-gate approval. Earlier-tonight `_scratch/2026-04-29_marketing-site-wireframe.md` is preserved as raw material for Develop-phase step 1a (`liminalos.ai` wireframe). |
| 2026-04-29 evening | **Locks 1-20 ✅ APPROVED.** Founder approved discipline-grade locks at category level (per-site scope #1-6, cross-site infrastructure #7-11, coordination with existing surfaces #12-16, build/deploy/hosting #17-20). All 20 inherit from established corpus patterns + inspo register correction + wireframe-first discipline. **Locks 21-25 awaiting founder Path B walk-through** (voice register, brand-register-per-site, pricing visibility, lead capture, v0 footer placement). |
| 2026-04-29 evening | **Locks 21-25 ✅ APPROVED-DEFAULT (Path B → Option A).** Founder approved all 5 founder-decision-only defaults after walk-through: (21) three taglines per audience-routed site, (22) one founder-voice across all three, (23) no pricing on any site, (24) no email capture / Substack handles list, (25) v0 footer link present on `liminalos.ai` only. **Define phase ✅ COMPLETE — all 25 architectural locks landed.** Develop phase (per-site wireframes × 3) clear to start. |
