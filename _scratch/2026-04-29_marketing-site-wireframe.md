---
id: prototype.scratch.2026-04-29-marketing-site-wireframe
type: wireframe-spec
status: draft
created: 2026-04-29
updated: 2026-04-29
author: shruti + creative-director
purpose: |
  Wireframe-first spec for the post-pivot Liminal marketing site. Ships as `cuts/00-marketing.html`
  inside `liminal-prototype/` (Path C from the marketing-site-work decision: build in prototype,
  port to `liminal-site` repo when DNS lands).

  This site replaces what's currently at `theliminalspace.io` (the v0 wellness app, retired Apr 28
  per the corpus convergence). The v0 artifact is preserved as a footer link to a future
  `v0.theliminalspace.io` subdomain (or archived URL until DNS work happens).

canon:
  - prototype shell · liminal-prototype/index.html v0.8.4
  - design tokens · design-system/tokens/design-tokens.css (12-wheel canon)
  - shared shell · lib/cut-shell.css
  - cut template · cuts/_template.html
  - locked brand sentence · "Liminal gives form to inner life."
  - locked one-sentence pitch (Speedrun register) · "A founder OS where AI agents disagree, deliberate, and prompt you. The corrections are the moat."
  - locked tagline · "Operational knowledge layer for solo operators running agentic teams." (primary, YC-aligned)
  - inspo register correction · COPY_AUDIT_2026-04-28.md (instrumentation grade, not atmospheric)
  - packet abstraction · liminal-ip/06-evidence/INVENTIONS.md §10 (PPA #8)
  - persona system · personae/maya-chen-founder-os/identity.json
  - existing prototype Speedrun cut · cuts/01-slate-tray-speedrun.html (hero stack precedent)

target_domain:
  primary: liminalos.ai (when registered)
  bridge: cuts/00-marketing.html standalone (works at file:// and inside catalog)
  fallback: theliminalspace.io (where existing application Company Website field points)

approval_gates: 8 (listed at end)
---

# Marketing Site — Wireframe Spec (v0.1)

## What this doc gates

A single static HTML page that serves the **JTBD-1 brand-anchor / category-claim** job from the three-domain MECE split (the other two: `liminalos.app` = product/try-now, `liminalos.dev` = build/IP-evidence). This site answers one question for a cold-read visitor: **"What is this company?"** in 5 seconds, and **"Why is it different?"** in 30 seconds.

**Wireframe-first per the discipline established this week** — structural argument before HTML, all 8 approval gates explicit, no copy until structure approved.

---

## Audience and JTBD

| Audience | Visit context | Optimization target |
|---|---|---|
| Speedrun partner reading SR007 application | Click-through from Company Website field | 5-sec category legibility (founder OS, not wellness) |
| Hackathon judge / community member | Click-through from hack submission README or Gdrive link | 30-sec "I see why this is different" → maybe → request demo / DM |
| Founder operating in adjacent space | Substack reader, X recommendation, peer-founder DM | 60-sec "this team thinks like I do" → engagement loop (Substack subscribe / GitHub watch) |
| Technical investor doing due diligence | Cross-reference from application + GitHub + X | 90-sec verification path → click through to liminalos.dev (or GitHub directly) for IP evidence |

The site is **not** trying to: convert to a product trial, capture leads, monetize traffic, run a waitlist. Those are JTBD-2 product-site jobs. This site's only conversion goal is *category-legibility-then-credibility-anchor* — the visitor leaves understanding what Liminal is and that the team ships.

---

## Visual register (per inspo investigation)

**Inherits from prototype canonical:**
- Warm-cream-on-warm-black palette (`design-tokens.css` foundation)
- Geist Mono for chrome / Geist for body / Newsreader for display
- 12-wheel accent system, register-tinted (clarity violet, vitality orange, wholeness gold, connection green)
- Atmospheric grain (subtle, not v0.2-deck-push intensity)

**Inherits from inspo register correction (Apr 28):**
- Hard-edged SVG over soft gradient
- Mono labels with accent dots
- Orbital diagram vocabulary where architectural claims appear
- HUD-readout register where receipts appear
- **Anti-pattern explicitly avoided:** atmospheric blur, mix-blend-mode mist, hero text-shadow halos, decorative ambient washes (the v0.2 deck failure modes)

**One new visual element:** a small static orbital glyph in the page header (matches the agency-rail static glyph from `cut-01` post-P1-fix #3). Visual continuity signal across surfaces — every Liminal page carries the orbital mark in its chrome.

---

## Section-level wireframe

Eight sections, top-to-bottom. Each has: (a) one anchor (one structural claim per section, ruthlessly), (b) one visual element, (c) what the visitor sees in 3 sec, (d) what the visitor sees in 30 sec, (e) cut-tier.

### Section 1 — Hero

**Layout:** prototype canonical layout 01 Hero, Speedrun-cut variant ordering (founder-OS sentence first, brand sentence as italic byline).

**Anchor:** the locked one-sentence pitch. Everything else on the page subordinates to this sentence.

**Visual:** static orbital glyph (top-left chrome). Hero text large, centered, breathable. No glow halo, no atmospheric wash, no orb. Just typography.

**Copy (verbatim, locked):**

> [glyph] LIMINAL · founder OS [eyebrow, mono caps]
>
> # A founder OS where AI agents disagree, deliberate, and prompt you. The corrections are the moat.
>
> *Liminal — gives form to inner life.* [italic byline beneath]

**3-second read:** "Founder OS, multi-agent, corrections matter."
**30-second read:** "This is in the agentic AI category, not wellness. Architecture-first claim."

**Cut-tier:** Spine. Never cut.

---

### Section 2 — What it is (the packet abstraction made visible)

**Layout:** prototype canonical layout 04 Three-card row.

**Anchor:** the packet abstraction is the deliverable; the substrate (vault + 12 agents + correction stream) is the moat. *Substrate is what we keep; packets are what users produce.*

**Visual:** three small "packet card" thumbnails in a row. Each card is a tiny rendering of one packet type, showing the same architectural shape (header / subject / bounded reads / refusals / disagreements / corrections / disposition / audit chain / outcome strip) with different content per ICP. Per the inspo register: hard-edged, mono-typography, accent-tinted.

**Card 1 — Board Decision Packet (Founder OS)**
**Card 2 — Mission Trust Packet (Defense / xTech)**
**Card 3 — AgentAction Packet (Enterprise rollout)**

Each card shows: title, ICP eyebrow, accent color tint per register, two-line description, "audit-grade · single-decision · signed" mono-caps tag at bottom.

**Copy block above the cards:**

> *Five buyers, one substrate.* A packet is the audit-grade artifact a buyer pays for — signed, single-decision, multi-agent reads with refusals and corrections as first-class content. Same architecture, different content per ICP.

**3-second read:** "Three different packets, same shape — this is a real product, not a positioning slide."
**30-second read:** "Multi-ICP claim. Substrate-vs-deliverable distinction. Honest about the architecture being persona-portable."

**Cut-tier:** Spine. Never cut. (The packet abstraction is the load-bearing IP claim — without it, the site reads as positioning and not architecture.)

---

### Section 3 — Why now / counter-cyclical claim

**Layout:** prototype canonical layout 03 Two-column thesis.

**Anchor:** Liminal gets *stronger* as AI capability improves; most AI startups get squeezed. The disagreement is the data category we own.

**Visual:** small inline graph — two diverging lines on a time-axis. Bottom line: "Most AI startups (correction loop converges)." Top line: "Liminal (correction loop deepens)." Hard-edged SVG, no animation, no glow.

**Copy block:**

> *Counter-cyclical to AI capability.*
>
> Most AI startups have an inverse relationship with model improvement — better GPT means less need for the wrapper. The correction loop converges toward zero.
>
> Liminal has a positive relationship. Better models produce higher-resolution disagreements. More interesting disagreements produce a more valuable vault. The architecture gets stronger as AI gets better, not weaker.
>
> Every other AI startup runs scared from superintelligence. This one runs toward it.

**3-second read:** "Counter-cyclical. They claim to get stronger as AI improves."
**30-second read:** "Architectural moat claim, not product-feature claim. They thought about defensibility under AI commoditization."

**Cut-tier:** Spine. Never cut.

---

### Section 4 — The receipt (judge endorsement + shipping evidence)

**Layout:** prototype canonical layout 06 Evidence card.

**Anchor:** External voice — not founder voice. The strongest single third-party validation the corpus has produced.

**Visual:** quote in inset card with mono-caps attribution. Three small shipping metrics in a row beneath the quote.

**Copy:**

> *"Refusal as designed output is the most original architectural idea in our cohort. The local-first vault for corrections shows you take audit/compliance seriously."*
>
> — AgentHansa AI Agent Economy Hackathon judge feedback, Apr 26 2026

**Three shipping metrics row beneath:**
- 12 BOUNDED AGENTS · 4 registers · MIT-licensed · public on GitHub
- 17 ESSAYS · liminalwoman.substack.com · Peter Dimov rec to 14K subscribers
- 4 PPAs IN PREPARATION · packet primitive + bounded refusal + correction stream + structural privacy

**3-second read:** "Real judge endorsement, real shipping metrics."
**30-second read:** "External validation + verifiable shipping receipts. Not vapor."

**Cut-tier:** Spine. Never cut. (External voice is what breaks the founder-only register.)

---

### Section 5 — Founder note (the Dec retro reframed)

**Layout:** prototype canonical layout 07 Long-form prose with emphasis.

**Anchor:** The pivot is honest and the founder-discipline pattern is the moat.

**Visual:** quiet long-form text. Small accent dot at the start. No image, no orb, no decoration. The honesty IS the visual move.

**Copy (verbatim, locked):**

> *I built v0 as a wellness-adjacent inner-life check-in tool for 18 months. 248 production checks. Then I found the instrument was measuring noise, named the bug in my own data, and rebuilt the company around the actual learning.*
>
> The retro that should have existed four months ago is now live in the corpus. The Dec rejection from a16z Speedrun was about legibility, not traction. I rewrote the architecture, not the pitch — bounded agents, correction-as-data, the packet as the deliverable a buyer pays for.
>
> Substrate is the moat. Packets are what users produce. Two layers, one product, every persona maps to a packet shape.
>
> — Shruti Rajagopal, founder

**3-second read:** "Founder built v0, found the bug in her own data, rebuilt."
**30-second read:** "Dec retro discipline applied to the product. This is a founder who runs corrections on herself, not just claims them as a feature."

**Cut-tier:** Spine. Never cut. (The honest-frame is the differentiator — most AI founder sites pretend v0 didn't exist.)

---

### Section 6 — Three doors (the three URLs MECE)

**Layout:** prototype canonical layout 04 Three-card row (mirrors Section 2 structure for visual rhyme).

**Anchor:** Three URLs, three jobs, no overlap. Visitor self-routes by need.

**Visual:** three large cards, each linking to a different URL, each in its own register accent. Hard-edged, mono-caps subtitles.

**Card 1 — Try the prototype** (clarity violet)
- Subtitle: "Live build · 12-agent orbital console · deterministic-replay theatre"
- Link: `liminalos.app` (eventual) or `cuts/01-slate-tray-speedrun.html` (current)

**Card 2 — Read the essays** (vitality orange)
- Subtitle: "Founder voice · 17 published · weekly cadence"
- Link: `liminalwoman.substack.com`

**Card 3 — See the engineering** (connection green)
- Subtitle: "GitHub · Heron paper · 4 PPAs in preparation · MIT-licensed bounded agents"
- Link: `liminalos.dev` (eventual) or `github.com/liminalshruti/liminal-agents` (current)

**3-second read:** "Three places to go: product, writing, code."
**30-second read:** "MECE — no overlap. Founder thinks structurally about her own surfaces."

**Cut-tier:** Spine. Never cut.

---

### Section 7 — Footer (quiet honesty)

**Layout:** prototype canonical layout 18 Footer.

**Anchor:** The v0-preservation footer link reframes the legacy as honest founder-discipline receipt.

**Visual:** small mono-caps row, no decoration. Static orbital glyph at left mirrors the header.

**Copy:**

> [glyph] LIMINAL · 2026
>
> * Try the prototype → liminalos.app (or cuts/01-slate-tray-speedrun.html until DNS lands)
> * Read the essays → liminalwoman.substack.com
> * See the engineering → liminalos.dev (or github.com/liminalshruti/liminal-agents)
> * **See v0 (the wellness app I built and learned from) → v0.theliminalspace.io**
> * shruti @ theliminalspace.io · @ShrutiRajagopal · linkedin.com/in/shrutirajagopal

**3-second read:** "Footer. Has the v0 link openly."
**30-second read:** "She names her own legacy. That's the founder-discipline signal."

**Cut-tier:** Spine. Never cut. (The v0 footer link is the most strategically important footer item in the entire site.)

---

### Section 8 — Page chrome (top of every section)

Not a content section — applies across all sections.

**Top-of-page chrome strip:**
- Static orbital glyph (left, 14×14px, accent-tinted)
- "LIMINAL" wordmark (mono, small)
- Eyebrow nav: 3 anchor links matching the three doors (Product · Essays · Engineering)
- No login, no signup, no CTA in the chrome — just the brand mark + nav

**Bottom-of-section gradient rule:** 1px hairline between sections, accent-tinted to next section's register. Carries visual rhythm. **Inherits from v0.2 deck push** (the slide-bottom-rule was a load-bearing visual unification move that survived the inspo register correction).

---

## What this site deliberately does NOT have

Per the inspo register correction + Brand OS Canon v4 expressiveness policy:

- ❌ Hero text glow halo / luminous brand-sentence rendering (atmospheric, not instrumental)
- ❌ Bookend orbs at scaled opacity (decorative)
- ❌ Per-section ambient washes (decorative)
- ❌ Animated SVG / on-scroll reveals / parallax (movement without signal)
- ❌ Lead-capture modal / waitlist / email-gate (wrong JTBD)
- ❌ Customer testimonials beyond the AgentHansa judge quote (no real customers yet, honest)
- ❌ Pricing page / pricing CTA (pre-product launch, premature)
- ❌ "Backed by [VC logos]" trust strip (not yet, honest)
- ❌ Manifesto-length founder essay (long-form lives at the Substack)
- ❌ Roadmap / "what's next" timeline (gives investors leverage they don't have yet)

---

## Mobile considerations

**Two breakpoints:** desktop (>1024px) + mobile (<640px). No tablet breakpoint — the prototype's catalog rail collapses below 900px and that's the established pattern.

**Mobile changes:**
- Hero: same copy, reduced font scale
- Section 2 packet cards: vertical stack instead of three-card row
- Section 4 metrics row: vertical stack
- Section 6 three doors: vertical stack
- Footer: same content, vertical stack

No mobile-specific copy. No responsive image swaps. **Inherits prototype's "responsive collapses gracefully" discipline.**

---

## Tech / build constraints

**Single static HTML file** (`cuts/00-marketing.html`). Same build constraints as every other cut per `_template.html` contract:
- Imports tokens from `design-system/tokens/design-tokens.css` (no token redefinition)
- Imports shared shell from `lib/cut-shell.css` (where applicable)
- Owns its own DOM bubble — works standalone AND inside catalog parent
- No new lib/ modules (the marketing page has no runtime; pure presentation)
- No JavaScript framework. No build step. Vanilla HTML + the canonical CSS.

**Estimated file size:** ~12-15 KB (HTML only) plus tokens/shell from design-system already cached.

**Deployment path when DNS lands:**
- Phase 1 (now): `cuts/00-marketing.html` standalone, accessible at file:// or via prototype catalog
- Phase 2 (DNS landed): copy to `liminalos.ai` repo, GitHub Pages or Cloudflare Pages deploy
- Phase 3 (eventual): `theliminalspace.io` 301-redirects to `liminalos.ai`

---

## What ports to the `liminal-site` repo when DNS lands

Per Path C (build in prototype, port to repo):

1. Copy `cuts/00-marketing.html` → `liminal-site/index.html`
2. Copy `design-system/tokens/design-tokens.css` → `liminal-site/tokens/design-tokens.css`
3. Update CSS import paths (relative paths shift)
4. Add minimal `package.json` (if Cloudflare Pages) or just `index.html` (if GitHub Pages)
5. Push to `liminalshruti/liminal-site` repo (currently empty placeholder)
6. Set up DNS: `liminalos.ai` → GitHub Pages or Cloudflare Pages

**Cost of port:** ~30 min. The artifact is reusable; the porting work is mechanical.

---

## Approval gates (need your call before HTML)

| # | Gate | Default | Override |
|---|---|---|---|
| 1 | 8-section structure (Hero / Packet / Counter-cyclical / Receipt / Founder note / Three doors / Footer / Chrome). Right? | Yes | If different, name which section to add/cut/reorder |
| 2 | Hero copy locked verbatim per Speedrun-cut variant (founder-OS first, brand sentence as italic byline). Right? | Yes | If you want canonical-cut ordering (brand sentence first), say so — but this site is post-pivot register, Speedrun-cut framing is correct |
| 3 | Packet abstraction in Section 2 with three cards (Board Decision / Mission Trust / AgentAction). Right? | Yes | If you want different packet types or a single-card-only version, say so |
| 4 | AgentHansa judge quote in Section 4 verbatim with attribution. Right? | Yes | If you want the quote edited, that's a Criterion 7 violation (we should use it as-said) |
| 5 | Founder note in Section 5 names v0 honestly + reframes as founder-discipline receipt. Right? | Yes | If you want the v0 mention removed entirely, the site loses its strongest differentiator |
| 6 | Three-doors section uses the three MECE URLs (liminalos.app + Substack + liminalos.dev or current GitHub equivalents until DNS). Right? | Yes | If you want to add a 4th door (e.g., a "raise contact" door), name it — but JTBD-1 sites with 4+ doors lose focus |
| 7 | Footer v0-preservation link is in. Right? | Yes | If you want v0 hidden (anti-recommendation), say so |
| 8 | Inspo register: hard-edged, instrument-grade, no atmospheric blur. Right? | Yes | If you want the warm-soft brand-canon-protected register, that's the canonical-cut path; this is the Speedrun-cut path |

---

## What ships if all 8 gates green

One new file: `cuts/00-marketing.html` (~12-15 KB). Update `index.html` parent shell to add the new cut to the catalog rail (1 nav-item add). Zero changes to existing cuts, zero changes to design-system tokens. ~3-4 hours of focused HTML/SVG work.

The deck cites this URL on slide 7 (Ask). The video cites this URL in the cover note. The SR007 application cites this URL in the Company Website field (when DNS swaps). The hack submissions cite this URL in their READMEs. **Same artifact, multiple downstream surfaces.**

---

## Change log

| Date | Change |
|---|---|
| 2026-04-29 | Initial wireframe spec for `cuts/00-marketing.html`. Path C (build in prototype, port to liminal-site repo when DNS lands). All 8 gates open for approval before HTML. |
