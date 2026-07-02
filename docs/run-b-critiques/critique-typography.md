# Typography-as-Craft Audit: Liminal Prototype Cuts

**Rendered at:** 1440px viewport. **Evidence:** wall-*.png renders + 12 cuts (00, 01, 02, 03, 04, 05, 06, 08, 09, 10, 11) + RUN_B_CUTS_INVENTORY.md + source file inspection (cuts/*.html). **Auditor lens:** DIVISION OF LABOR across the three-voice stack and consistency of scale/hierarchy/case logic.

---

## 1. The Emergent System

### Three-voice stack: declared intent vs. rendered reality

**Canon declaration** (design-tokens.css:886–890):
- `--display`: "Nineties Headliner", "Perfectly Nineties", "Iowan Old Style", Georgia, serif
- `--serif`: "Perfectly Nineties", "Iowan Old Style", Georgia, serif
- `--mono`: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas
- `--sans`: "Geist", system-ui, -apple-system, BlinkMacSystemFont, sans-serif

**Emergent division of labor across cuts:**

1. **Display voice (Nineties Headliner):** Hero moments. Used sparingly: cut 00 headline (22px, --display), cut 01 entry overlay hero (36px bold, contrast against blue buttons), cut 04 onboarding screen titles (largest type on each step). Word-spaced generously; carries the "felt moment" (per CLAUDE.md: "the felt-moment voice"). **Consistent job across cuts:** YES. Always announcement/topic-shift scale.

2. **Serif voice (Perfectly Nineties):** Claims, narratives, agent reads. Cut 00: register read bodies (13.5px), evidence pane titles (serif serif). Cut 02: forensic contradiction headline ("The decision email is bound to a different record than the application that's still in review", serif 1.45 lh). Cut 05 (plugin terminal): agent-post candidate prose in serif (128–130). Cut 06 (margin-read): title + brief in serif. Cut 10 (today): serif titles ("Three things came back overnight." / "You held the seed round to chase a cleaner close.") and body prose. Cut 11 (govern): two-column layout with serif body. **Consistent job:** YES. Serif = readable body prose + claim headings. The voice of reasoned argument.

3. **Mono voice (Geist Mono):** Labels, metadata, UI chrome, operator-grade precision. Cut 00: `.rl-h { font:9px/1 var(--mono); letter-spacing:.16em; text-transform:uppercase }` (signals rail). Cut 01: product tabs, slate headers, classifications all mono-uppercase with .14–.18em tracking. Cut 02: audit trail rows ("✓ DKIM-SPF: IMARC", timestamps, record IDs in mono). Cut 03: grid column dates (04/08, 04/15, etc.), cell tags (MISSED·COMPA…), drill panel labels all Geist Mono 9–13px. **Consistent job:** YES. Mono = always structured data, labels, evidence chains, never narrative.

**Summary:** The three voices hold their jobs consistently across cuts. No voice is asked to do a different job; each cut respects the semantic boundary.

---

## 2. Scale Discipline: Contradictions

### Finding 1: Display voice size variation without semantic justification

**Contradiction:** Cut 00 hero headline = 22px (--display, 400wt). Cut 01 entry modal hero = 36px bold (!important). Cut 04 onboarding hero = ~28–32px (var(--fs-3xl) via design-tokens.css:908). Cut 11 govern hero = ~36–40px (serif, not display, but carrying hero load).

**Evidence:**
- wall-cut00.png: "Agency — the subject is a parameter" (22px, serif+display mix, understated)
- wall-cut01.png: Large hero card text (36px!important, serif serif, high contrast against blue)
- wall-cut04.png: "A workspace for the correction stream." (28–32px range, serif+display, centered hero box)
- wall-cut11.png: "Three things came back overnight." (large serif, ~32–36px by visual measure)

**Why ambiguous:** The *semantic load* is identical across these (founder entry, high stakes, moment pause) but sizes vary 22px → 36px without a stated scale step. Cut 04 uses `--fs-3xl` (36px from canon §6, line 908); cut 00 hardcodes 22px; cut 01 hardcodes 36px. No intermediate step is labeled in the source. Is "22px display" a different moment than "36px serif"? The canon doesn't say.

**Implication for canon inference:** Is there a "display-sm" (22px) and "display" (36px) distinction, or is the difference incidental? The renders suggest moment-relative sizing (cut 00 is read-mode, smaller; cut 01 is entry, larger), but the tokens don't capture that principle.

---

### Finding 2: Register titles (serif, 13.5–15px) vs. agent reads (serif, 19–22px) — scale step unclaimed

**Contradiction:** Cut 00 register read headers (`.rname { font:10px/1 var(--mono); letter-spacing:.2em; text-transform:uppercase }`), but register *body* (`.rbody { ... 13.5px/1.55 var(--serif); ... }`) is serif. Cut 05 plugin-seed: agent posts are `.ap-name { serif, 14px }` but the read text itself is larger (~16–17px by render). Cut 10 (today): "The Judgment register led the read" (serif, ~14–15px), but the agent-name label above is smaller (.ag-lane { mono, 9px }).

**Evidence:** RUN_B_CUTS_INVENTORY.md, cuts/00-agency.html lines 135–141 (register block structure); wall-cut00.png shows serif body at legible size, mono label small above.

**Why ambiguous:** The scale between "label" (mono, 9px) and "body" (serif, 13.5px) and "subhead" (serif, 15–17px) is continuous, not stepped. Canon has `--fs-sm: 13.5px`, `--fs-base: 15px`, `--fs-md: 17px`. But no cut explicitly assigns these by name. Cut 00 uses `13.5px/1.55` inline; cut 05 uses `14px` inline; cut 10 uses implicit sizes. The voice is right (serif=readable prose) but the *scale coordination* is invisible.

**Implication:** Is there a "body scale" (serif, 13.5–17px) used consistently for agent reads, or does each surface invent? Cut 00 at 13.5px, cut 10 at ~15px, cut 05 at 14px — they're neighbors, but the system doesn't claim them as one scale.

---

### Finding 3: Monospace label tracking is highly variable

**Cut 00 upstream label taxonomy:**
- `.subj` (subject buttons): 9px mono, .1em
- `.rl-h` (signals rail): 9px mono, .16em
- `.slate-h` (slate header): 8px mono, .18em
- `.tile .src` (tray source): 8px mono, .14em
- `.ev-h` (evidence header): 9px mono, .14em
- `.subj-head .sk` (subject key): 9px mono, .2em

**Is there a rule?** Surface pattern emerges: at 8px, tracked .14–.18em; at 9px, tracked .1–.2em (variable!). Canon specifies `--ls-mono: 0.18em` (line 922) as the "default mono uppercase" but cut 00 uses .1, .14, .16, .18, .2em in the same surface. No hierarchy principle stated.

**Evidence:** cuts/00-agency.html inline styles; visual inspection shows the tracking produces different color densities even at similar sizes (8px vs. 9px).

**Why ambiguous:** Are the .1/.14/.16/.18/.2 variants intentional (e.g., .1 for dense affordances, .2 for quiet metadata)? Or is this local invention? Canon claims --ls-mono is THE default; actual usage ignores it 5 times in one cut.

**Implication for canon:** Does the prototype treat mono tracking as compositional (size+tracking pairs vary per context), or should there be one binding rule (e.g., "all mono uppercase = .18em")?

---

## 3. Hierarchy Craft: Sequence Logic

### Hierarchy on a complex surface (cut 00 center pane)

**Eye order from wall-cut00.png render (center column, agency read):**

1. **Top:** "AGENCY INVOKED" (mono, 9px, pale blue, caps) — *signal, not content*
2. **Subj key + title:** "COMPANY" mono 9px / "Is the per-test team's fleet tracking the OKRs?" (serif, ~22px, bold) — *topic*
3. **Evidence pane header:** "EVIDENCE: FLEET SPEND VS OKR" (mono, 9px, pale) — *classification*
4. **Register blocks:** Four colored left-borders, each with rname (mono 10px uppercase), rt (9px pale), rbody (serif 13.5px) — *reads*

**Order achieved by:** Size (22px title > 13.5px body > 9–10px labels), weight (title bold, body regular), and color saturation (pale mono < saturated serif body < colored borders). Hierarchy is CLEAR. Eye flow is title → evidence → register.

**Is the method consistent across cuts?**

- **Cut 01 (slate-tray):** Title 36px bold serif (dominant), metric band below (9px mono), brief prose (serif 14px). *Hierarchy: same method (size > weight > color).*
- **Cut 02 (forensic-agent):** Contradiction headline in serif (emphasize bold), audit trail below (mono checksums). *Hierarchy: bold serif > mono.*
- **Cut 03 (calibration):** 12-week grid with register labels (jade, yellow, pink) on left, grid cells in 8px mono. Eye hits color first (register hue), then date headers (9px), then cell counts. *Hierarchy: color > size.*
- **Cut 10 (today):** Agent-in-lane list (mono labels left, colored indicators) above "The Judgment register led the read" (serif 14px). *Hierarchy: structure (left rail + main) > size > color.*

**Consensus:** Hierarchy is *built by composition* (layout + color + size + weight), not by a single variable. The mono labels are *always* subordinate (smaller or paler or marginalia). The serif is *always* the main read. The display is *always* the topic anchor. This is consistent.

**Ambiguity:** Cut 01 uses `!important` on .slate-title (36px !important) — a desperate move for override priority. Is this because the cascade is fragile, or because anointment deserves to override normal CSS? The principle isn't stated.

---

## 4. Case & Letterspacing Grammar

### Mono uppercase + tracked: is the rule consistent?

**Canon statement** (design-tokens.css:922–927):
- `--ls-mono: 0.18em;` (default mono uppercase)
- `--ls-mono-sm: 0.16em;` (tighter)
- `--ls-mono-lg: 0.20em;` (loose)
- `--ls-display: -0.038em;` (negative, tight for display)

**Actual usage across all cuts:**

| Cut | Context | Size | Tracking | Notes |
|-----|---------|------|----------|-------|
| 00 | subject buttons | 9px | .1em | underspecified |
| 00 | signals rail | 9px | .16em | canon --ls-mono-sm |
| 00 | slate header | 8px | .18em | canon --ls-mono |
| 00 | tile source | 8px | .14em | below canon range |
| 01 | product tabs | 9px | .14em | (hardcoded inline) |
| 02 | audit trail | 8px | .12em | below canon range |
| 03 | grid date | 10px | .18em | (hardcoded) |
| 04 | step rail | 9px | .16em | (hardcoded) |
| 05 | beat label | 9px | .18em | (hardcoded) |
| 10 | agent lanes | 9px | .16em | (hardcoded) |
| 11 | seal label | 9px | .14em | (hardcoded) |

**Pattern:** Nearly every cut hardcodes its own tracking value (.14–.20em) instead of binding to `--ls-mono` or its variants. Only cut 00 occasionally uses the token names (none directly; values are hardcoded). No cut uses the token *property* (`var(--ls-mono)`).

**Why this matters for hierarchy:** The tracking (especially at 8–9px) affects readability and visual density. At .1em spacing feels tight (cut 00 buttons); at .2em it reads airily (cut 00 subject key). But because there's no binding to canon, no surface agrees on what "default mono label" means.

**Implication for canon inference:** Is the canonical `--ls-mono: 0.18em` aspirational (the goal, but not the practice), or does the prototype's .14–.18 variability reveal that tracking should be *contextual* (dense chrome vs. loose signage)?

---

## 5. Serif Voice Ambiguity: Perfectly Nineties vs. Newsreader

### Critical finding: Serif font is inconsistently loaded

**Canon declaration** (brand-upgrade.css, required by all cuts): `--serif: "Perfectly Nineties", Georgia fallback`

**Actual loading:**

| Cut | Loads brand-upgrade | Loads Perfectly Nineties @font-face | Loads Newsreader | Uses Newsreader inline |
|-----|:--:|:--:|:--:|:--:|
| 00 | ✓ | ✓ (inline) | ✓ (Google Fonts link) | ✓ (1 instance) |
| 01 | ✓ (12×) | – | ✓ (comment: "never rendered") | – |
| 02 | ✓ | – | – | – |
| 03 | – | – | ✓ (Google Fonts) | ✓ (5 instances) |
| 04 | ✓ | – | ✓ (Google Fonts) | ✓ (2 instances) |
| 05 | ✓ | – | ✓ (Google Fonts) | ✓ (1 instance) |
| 06 | – | – | ✓ (Google Fonts) | ✓ (1 instance) |
| 08 | ✓ | – | – | – |
| 09 | ✓ | – | ✓ (Google Fonts) | ✓ (4 instances) |
| 10 | – | – | ✓ (Google Fonts) | ✓ (8 instances) |
| 11 | ✓ | ✓ (inline) | ✓ (Google Fonts) | ✓ (1 instance) |

**Evidence:**
- cuts/00-agency.html:41–42 loads Newsreader but brand-upgrade.css declares `--serif: "Perfectly Nineties"` (should render as PN, but Newsreader is in the stack)
- cuts/03-calibration.html:41 loads Newsreader via Google Fonts; lines 129, 137, 444, 494 hardcode `font-family: Newsreader, serif` instead of using `var(--serif)`
- cuts/10-today.html: No brand-upgrade; Google Fonts link includes Newsreader; 8 instances hardcode Newsreader
- cuts/01-slate-tray.html:40 comments "Newsreader, Geist, Geist Mono marked as never rendered (status unloaded)" but Google Fonts link doesn't include Newsreader (lines 48–52)

**The contradiction:** The prototype loads Newsreader (a serif voice) in 8 of 12 cuts, but brand-upgrade.css declares Perfectly Nineties as the canonical `--serif` font. Cuts that use brand-upgrade (00, 01, 02, 04, 05, 08, 09, 11) should render as Perfectly Nineties, but Newsreader is *loaded in the browser* for cuts 00, 03, 04, 05, 06, 09, 10, 11 — so if CSS is ever ambiguous or `var(--serif)` fails to resolve, the browser will pick Newsreader.

**Why this is a craft issue:** Newsreader (Google's serif typeface, contemporary, high contrast) and Perfectly Nineties (bespoke 90s serif, lower contrast, decorative weight) are *different reads*. Newsreader feels authoritative/journalistic. Perfectly Nineties feels nostalgic/designed. On wall-cut03.png and wall-cut10.png (Newsreader dominant), the prose reads *journalistic*. On wall-cut00.png and wall-cut11.png (mixed load), the serif feels *warmer*.

**Implication for canon:** Is the serif voice Newsreader (sharper, web-native, readable at small sizes) or Perfectly Nineties (branded, recognizable, lower contrast)? The prototype hasn't chosen. Cut 01's comment ("Newsreader marked as never rendered") contradicts the Google Fonts link, suggesting uncertainty.

---

## 6. Ambition Gap

**Grade: C+ (solid craft, unresolved tensions)**

**Rationale:**

The typographic *execution* is strong: three voices are distinct and used with semantic consistency. Hierarchy is achieved through composition (layout, color, size, weight) in concert, not through any single variable. On individual renders (wall-cut00.png, wall-cut01.png, wall-cut10.png), the text is legible, the reads are clear, and the founder's voice is distinct.

*However*, against the standard of "best dense-professional-operator interfaces" (Bloomberg Terminal, Linear, Figma), the system has three unresolved tensions:

1. **Scale is compositional, not systematic.** Each cut invents its own size relationships. There's no claimed "body scale" (13.5–17px serif), no "label scale" (8–10px mono). Desktop apps of the caliber Liminal aspires to would have explicit scale steps with semantic names (e.g., "call-to-action 36px" vs. "emphasis 22px" vs. "body 15px"). The prototype's sizes are right, but unjustified.

2. **The serif identity is unresolved.** Perfectly Nineties and Newsreader are loaded side by side; the cuts don't commit. A system at this depth would have chosen one serif voice and locked it canon-wide. The prototype's ambivalence costs legibility at small sizes (Newsreader wins; Perfectly Nineties is decorative).

3. **Token binding is aspirational, not operational.** The canon declares `--ls-mono, --fs-sm, --lh-normal` etc., but no cut uses these properties (`var(--ls-mono)`). Every size, weight, and tracking is hardcoded inline. This is not a system failure (the renders work), but it means the tokens are documentation, not infrastructure.

---

## 7. Verdict

The Liminal prototype cuts express a *coherent* typographic voice across all 12 surfaces: three-voice stack (display/serif/mono) are divided by semantic job, not caprice. Hierarchy is achieved through layout + color + size + weight in ensemble. Case and tracking are contextual, not rigid. Against the cuts themselves, the typography is internally consistent and legible.

However, the system is *unresolved*: scale relationships are implicit (inferred from rendered sizes), the serif identity is dual (Newsreader + Perfectly Nineties), and tokens are declared but not consumed. An adjudicator inferring a desktop canon from these cuts will have to choose: Do you lock the scale steps (canonizing the most-used size pairs), or do you embrace compositional sizing? Do you commit to one serif, or preserve the option to swap? Do you require token binding, or tolerate inline hardcoding? The prototype's craft is sound, but its *system logic* requires founder decision.

