# Design System: Liminal Prototype

## 1. Overview

**Creative North Star: "The Judgment Ledger"**

Every surface in this catalog is a page of one append-only ledger: a decision
enters, bounded agents read it, dissent and refusal are recorded rather than
smoothed over, the accountable human signs, and the entry seals with its
provenance attached. Design decisions are judged the same way the product
judges work — what was trusted, what was corrected, what was refused, and can
you prove it later. The register is a precision instrument whose evidence has
been made public, not a marketing site: calm, declarative, forensic.

The system explicitly rejects (per PRODUCT.md): generic AI-SaaS polish
(Linear/Vercel-clone gradients, glassmorphism, hero-metric templates),
enterprise-trust theater (navy-and-gold, compliance-badge soup),
wellness-spiritual softness (pastel gradients, breathing-circle calm), and
demo-toy looseness (placeholder data that announces itself, untrustworthy
charts). Persuasion happens by demonstrated depth; if a surface feels like
it's selling, it has failed the register.

**Key Characteristics:**
- Dark void substrate (#0A0A0B) with framed "windows" of work; one deliberate
  cream exception (molehunt's ink-on-paper analyst console).
- Ten named saturated chrome registers, each meaning one register of judgment —
  color is semantic, never decorative.
- Three-voice type: display serif announces, body serif carries reasoned
  prose, mono carries data and labels. Never swapped.
- Evidence survives scrutiny: real counts, hash-linked trails, and claim
  labels (fixture / receipt / roadmap) on anything that could overclaim.

## 2. Colors

Two palettes in dialectic: a near-black iridescent content layer, and ten
named chrome registers that each carry one meaning. Four of the ten carry the
brand, in a fixed order.

Register→hue bindings are indirections in the token file (`--diligence:
var(--clarity)`), which is what let the Brand 4 rebind on 2026-07-29 remap
meaning without touching a single call site. That cheapness is also the hazard:
a rebind moves what a name points at while every document that spelled the old
pairing out in prose keeps asserting it. Read the resolved hex from the
generated front matter above, never from memory.

### The brand four (in order — pink leads)
- **Judgment Magenta** (#E90095): the brand lead, `--ui-brand-primary` →
  `--wholeness-500`. Holds verdict and the moat: adversarial review, refusal
  accents, the sealed record. The color that appears when the system pushes
  back — and the one that carries the brand.
- **Diligence Violet** (#8E66FB): `--ui-brand-secondary` → `--clarity-500`.
  Holds intelligence and insight — the auditor's color. Carries the brand
  diamond, primary highlights, focus rings, and the "reading" state across cuts.
- **Synthesis Cerulean** (#197EEB): `--ui-brand-third` → `--cerulean-500`.
  Holds pattern and emergence; the institutional/infra register — allocation,
  custody, subject switching.
- **Outreach Green** (#31E682): `--ui-brand-fourth` → `--connection-500`.
  Holds the relational and the outward.

### The remaining register chrome (use only with their meaning)
- **Alarm Red** (#ED214F), **Watch Amber** (#FDC237), **Signal Lime**
  (#70F32F), **Ambient Teal** (#1E9692), **Depth** (#1E9692 — pending its own
  hue, see below), **Liminal Orchid** (#CC24F5).

**The Pink-Leads Rule** (Brand 4, ruled 2026-07-29). Four colors carry the
brand and pink leads: wholeness → clarity → cerulean → connection. Orange is
retired; there is no separate accent slot (`--ui-brand-accent` was removed, not
re-pointed). Any surface that leads with violet is carrying the pre-Brand-4
hierarchy.

**Read the register off the slot, not off the name.** `--ui-brand-third`
resolves to `--cerulean-500`, and cerulean is bound to the **synthesis**
register — not depth. Depth held cerulean before PR #75 moved it to Expression,
and the old pairing has outlived the change in more than one document. The
front matter above is derived, so it is the arbiter.

### Neutral
- **Void** (#0A0A0B) page ground · **Frame** (#0E0E11) window chrome.
- Dark ink ramp: **Bright** #F4F2EE (headings/body) · **Mid** #C9C5BD ·
  **Dim** #8A8780 (5.5:1) · **Faint** #807D78 (4.8:1 — the AA floor for
  small forensic labels on dark).
- Cream ramp (light surfaces only): **Cream** #F3F1EF ground ·
  **Cream-deep** #EBE8E4 cards · **Cream-body** #4A4538 text ·
  **Mute** #3A3833.

**The Mute-Is-Cream Rule.** `--text-mute` (#3A3833) is a cream-surface ink.
It never touches a dark surface — on the void it measures 1.7:1 and text
disappears. The dark faint tier is `--text-faint` (#807D78), AA-verified.

**The One-Meaning Rule.** A chrome register is used only for its named
meaning. Judgment magenta on a decorative divider is a lie the viewer can
feel.

> **Ruled 2026-08-02 — depth gets its own hue.** `--ambient` and `--depth`
> both alias the Expression ladder today, so the ten named registers cover
> nine hues and these two are chromatically identical. PR #75 moved depth off
> cerulean onto Expression deliberately; that the move collided with ambient
> was not noticed. Under the One-Meaning Rule a reader cannot tell "ambient"
> from "depth" by looking, which is the rule failing on the register list it
> governs.
>
> The founder ruling is to give depth its own wheel position rather than
> retire either name. Until that canon change lands, `design:gen` warns on
> every run — the warning is load-bearing and should not be silenced first.

## 3. Typography

**Display Font:** Nineties Headliner (with Perfectly Nineties, Georgia)
**Body Fonts:** Space Grotesk (sans, UI/body) + Perfectly Nineties (serif, reasoned prose)
**Label/Mono Font:** Space Mono

The sans and mono faces moved on 2026-07-29 (canon §5). The chains keep the
previous faces one position back so a build that has not yet loaded the new
faces degrades to them rather than to the OS default; they are fallbacks, not
the stack. Never name a fallback as the face.

**Character:** A 1990s broadsheet masthead running on lab instrumentation —
warm authoritative serifs for what the humans and agents *say*, cold precise
mono for what the system *records*.

### Hierarchy
- **Display** (700, 64px canon / clamp to 76.8px hero, 1.05): screen titles
  and hero statements. Never exceeds the 96px landing register.
- **Headline** (300, 28px, 1.18): the subject question — the line the eye
  lands on inside a work surface.
- **Body** (400, 14–15px Space Grotesk, 1.5): UI copy, descriptions, ≤65–75ch.
- **Read** (400, 14–15.5px Perfectly Nineties, 1.55–1.7): agent reads and
  rationale — reasoned prose is always serif, never mono.
- **Label** (400, 9–11px Space Mono, 0.08–0.12em, uppercase): source tags,
  counts, audit meta. On dark, labels at this size use ink-faint or brighter.

**The Fallbacks-Are-Not-The-Stack Rule** (ruled 2026-07-29). The sans is Space
Grotesk and the mono is Space Mono. `Geist` and `Geist Mono` survive only as
fallback entries in the `--sans` / `--mono` chains, to be dropped once every
surface loads the new faces. Naming a fallback as the primary face is how the
stack silently reverts — and it is what this file itself did for three months.
`design:check` now fails on it, with the offending `file:line`.

(The two fallback faces are written in code spans throughout this file. That is
the lint's escape hatch: a bare mention is treated as a claim about the stack
and fails the check, while a code span reads as quoting a literal token value.
A rule about fallbacks has to be able to name them.)

**The Three-Voices Rule.** Announcement = display serif; reasoning = body
serif; record = mono. A mono paragraph carrying narrative is drift (the
molehunt re-skin fixed exactly this).

**The Title-Dash Rule.** Em-dashes are a *naming* grammar ("Govern — Opus 4.8
spend against company goals"), not a prose cadence. Body copy uses commas,
colons, periods; ≤2 em-dashes per surface in prose.

## 4. Elevation

Depth is carried by borders and light, not by stacking shadows: 1px
`--card-border` hairlines define every plane, and the window shells float on
one deep ambient shadow (`0 40px 90px rgba(0,0,0,0.6)`). Inside a frame,
surfaces are flat — tonal steps (`--frame-bg` → `--frame-bg-2` →
`--frame-bg-3`) do the layering. Glows are semantic, not decorative: the seal
glow (600ms bifurcated ceremony) and register pulses are *events*, never
resting states.

**The Flat-Inside Rule.** Cards inside a shell never carry their own drop
shadows. If a card needs separation, it gets a hairline border or a tonal
background step.

## 5. Components

### Window Shell (signature)
- The catalog's atom: a framed desktop window (traffic lights, brand
  wordmark, surface title) on the void.
- **Canonical source (ruled 2026-07-13): the converged `.shell` /
  `.titlebar-converged` layer in `lib/cut-shell-base.css`.** Inline chrome
  copies in cuts are legacy; adoption = delete the copy, import the sheet.
- Shape: 14px frame radius, 1px card-border, `0 40px 90px` ambient shadow,
  `width:min(1180px,97vw)`. Phone layer (≤760px): shell pins `min-width:0`,
  rails collapse, center column `minmax(0,1fr)`, wide tables scroll inside.

### Tabs / Surface Nav
- 9px uppercase mono, ink-dim → ink-bright on hover/active, hover tint
  background, 4px radius. Number-key shortcuts mirror tab order; ⌘K palette
  appears when a cut has >4 surfaces. Esc always closes/backs out.

### Claim Chip
- Bordered mono label (10px, 0.08em, uppercase, 4px radius) carrying ONE term
  from the seven-term register: LIVE · DOGFOOD · RECEIPT · DETERMINISTIC
  FIXTURE · PROTOTYPE · DESIGN INTENT · ROADMAP.
- The word "live" is reserved for this register (see Don'ts).

### Buttons
- **Primary (dispo/sign):** frame-bg fill, bright ink, 4px radius, 10–16px
  padding; confirm actions never use chrome registers as fills.
- **CTA pill (front door only):** pill radius, hairline border, uppercase
  mono, ≥44px touch height.
- **Hover:** border/background shifts only; reduced-motion kills transforms.

### Artifact Card (signature)
- The sealed record: stamp ("ratified"/"Captured"), decision text in body
  serif, allow/deny policy chips, anchor line in mono, next-action handoff.
- Arrives via `artifact-arrive` (520ms rise, demo surfaces) or instant +
  600ms orbital glow (bifurcated, master ceremony) per Run-B rulings.

### Toast
- Bottom-anchored mono confirmation, 2.4–2.6s, one at a time; every
  irreversible-feeling action confirms ("Decision captured · vault entry
  written").

## 6. Do's and Don'ts

### Do:
- **Do** consume canon tokens for every color, radius, spacing, and type
  value; the token file is a synced copy — `npm run tokens:sync`, never
  hand-edit values here.
- **Do** put a claim chip on any surface or statement that could read as
  shipped/live/production; classify with the seven-term register.
- **Do** make refusal visible and legible — it is the product's signature
  act, styled as information (bordered block, register hue, plain language),
  never as an error toast.
- **Do** ship the C8-safe reduced-motion block (assert the revealed
  end-state; never freeze content hidden) on every animated surface.
- **Do** keep `--text-faint` (#807D78) as the floor for small text on dark;
  verify anything smaller than 11px against 4.5:1.
- **Do** use the number-key / ⌘K / Esc keyboard contract on every
  multi-surface cut.

### Don't:
- **Don't** produce generic AI-SaaS polish: no Linear/Vercel-clone dark
  gradients, no glassmorphism, no hero-metric template, no identical card
  grids (PRODUCT.md anti-reference, verbatim).
- **Don't** do enterprise-trust theater: no navy-and-gold "we take security
  seriously" costume, no stock-photo dashboards, no compliance-badge soup.
- **Don't** drift toward wellness-spiritual softness: no pastel gradients,
  no rounded-everything, no breathing-circle calm-app language.
- **Don't** let evidence read as fake: no placeholder data that announces
  itself, no fabricated algorithm claims ("sha256:" on a random hex — label
  it "anchor"), no "real"/"live" wording on fixture-driven behavior.
- **Don't** use `--text-mute` on a dark surface (The Mute-Is-Cream Rule).
- **Don't** use Inter, Helvetica, system-ui as a primary face, or Newsreader
  / Fraunces anywhere — the stack is locked.
- **Don't** name `Geist` or `Geist Mono` as a primary face; they are fallback
  entries only (The Fallbacks-Are-Not-The-Stack Rule).
- **Don't** lead a surface with Diligence Violet as though it were the brand
  colour — pink leads (The Pink-Leads Rule, Brand 4).
- **Don't** trust a register name printed next to a hex in prose; the derived
  front matter is the arbiter. Two documents currently disagree about which
  register owns cerulean.
- **Don't** use `border-left` > 1px as a decorative stripe; the artifact
  card's seal edge is the one sanctioned, meaning-bearing exception.
- **Don't** animate layout properties (padding, width) — transform and
  opacity only, with blur/glow reserved for seal events.
