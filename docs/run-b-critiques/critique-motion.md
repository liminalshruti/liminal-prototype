# Motion Grammar Audit — Liminal Prototype Cuts
## Fable Run-B Adjudicator Pass (2026-07-02)

---

## 1. THE EMERGENT SYSTEM — Agreed Motion Rules with Evidence

### Timing Vocabulary (Duration Dictionary)
Across all cuts, a consistent palette of transition/animation durations:

| Duration | Canonical Source | Usage | Cuts |
|----------|-----------------|-------|------|
| 0.15s | button states | color/background transitions on hover | All |
| 0.2s | orbital/refusal | opacity transitions on agent states | 00, 01, 11 |
| 0.22s | magnetic-hover | transform (translateY -1.5px) on button hover | 00, 01, 08, 09, 11 |
| 0.32s–0.4s | easing-family | primary motion timing (ease-out, ease) | All |
| 0.5s–0.6s | emergence | bar fills, disposition rise, hypothesis width | 09 |
| 1.1s–2.4s | pulse-rhythm | ambient animations (glyph pulse, ring pulse, live indicator) | 00, 01, 08, 09, 11 |
| 16s | map sweep | single-cycle background animation (no loop state) | 08 |

**Source evidence:**
- design-tokens.css:956 declares `--ease: cubic-bezier(0.4, 0, 0.2, 1)` (canonical easing)
- design-tokens.css:1175 declares `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` labeled "gentle overshoot · sign-packet moment"
- cut-shell.css:190 specifies button transition: `transform .22s var(--ease-spring, ease), color .15s, …` (line cited)
- cuts/00-agency.html:195 declares `@keyframes rin{to{opacity:1;transform:none}}` (staggered via animation-delay)
- cuts/01-slate-tray.html:158 declares `@keyframes pulse-glyph` opacity pulse 0.55↔1 over 4.2s (synced to orbital step duration)
- cuts/08-liminal-custody.html visual: sweep animation observable in viewport (16s single loop per inventory §28)
- cuts/09-osint-custody.html:244 hyp-fill animates `width .6s cubic-bezier(.2,.7,.2,1)` (gentle ease-out curve)

### Easing Curves Inventory
- **Standard ease (canonical default):** cubic-bezier(0.4, 0, 0.2, 1) — all text fade-in, background transitions
- **Spring ease (magnetic hover):** cubic-bezier(0.34, 1.56, 0.64, 1) — button press-lift, always .22s duration
- **Custom ease-out-quint (04-onboarding):** used in screen-rise keyframe (line 68, 520ms)
- **Cubic-bezier(.2,.7,.2,1):** hypothesis bar fill (09, custom ease favoring deceleration)

**Consensus:** Two canonical easings (standard ease, spring ease) applied consistently. Custom eases appear only in localized scenarios (onboarding entry, hypothesis reveal). **This is coherent — the spring is reserved for gesture/magnetic UI, standard ease for state transitions.**

### Motion Meaning Consistency — RISE/TRANSLATEY as Arrival Ceremony
Across cuts, `translateY(upward)` consistently means **arrival of an artifact or decision moment**:

1. **cuts/00-agency.html:195 `@keyframes rin`** — register reads rise from -5px opacity:0 → full opacity, staggered per register index (arrival of the read block)
2. **cuts/01-slate-tray.html:340 `@keyframes rise`** — 360ms ease, 0→360px translateY (arrival of sealed box when outcome confirmed)
3. **cuts/04-onboarding.html:75-78 `@keyframes screen-rise`** — 520ms ease-out-quint, children staggered 0/45/90/135/170ms (sequential screen entry)
4. **cuts/05-plugin-seed.html:95-96 `@keyframes rise`** — 520ms cubic-bezier, beat entrance from translateY(8px) (sequenced reveal)
5. **cuts/06-margin-read.html:340 `@keyframes rise`** — 360ms ease (sealed-verdict rise on outcome click)
6. **cuts/09-osint-custody.html:274 `@keyframes rise`** — 0.5s ease, dispo artifact from translateY(8px) (disposition card rise on beat 4)
7. **cuts/11-govern.html:435 `@keyframes work-in`** — translateY(8px)→none, appears in refuse-in animation

**Conclusion:** Across all cuts, `rise` (translateY upward + opacity 0→1) is **ceremony meaning — a witnessed moment, not background state**. Duration ranges 360–520ms (mid-range). All declare `from` (opacity 0, translateY positive offset), no variations. **This is ONE motion meaning, expressed consistently.**

### Fade-In as State-Change (Non-Rise)
When motion does NOT rise (no translateY), fade-in alone means **background state transition, not ceremony**:

- cuts/01-slate-tray.html:208 reveal-failsafe: opacity 0→1, 240ms ease-out, NO translateY (safety net for render delay, not a ceremony)
- cuts/03-calibration.html:55-61 body fade-in: opacity 0→1 on `.ready` class, 240ms, applied before DOM ready (prevent flash)
- cuts/06-margin-read.html:388 .ed-note entrance: opacity 0→1, translateY 4px (marginalia reveal, supportive not ceremonial)
- cuts/09-osint-custody.html:176-178 .obs fade-in: opacity 0→1, translateX(-6px) (observations slide-in horizontally, data-driven not event)

**Pattern:** Fade-in without rise = **state change or background activity**. With rise = **witnessed moment / ceremony**. **This distinction is maintained across all cuts.**

---

## 2. CONTRADICTIONS — Numbered Findings with Evidence

### Finding 1: ORBITAL DEMO LOOP — Glyph Animation Durations Inconsistent
**Cuts affected:** 01 (slate-tray), 11 (govern)

**Evidence:**
- cuts/01-slate-tray.html:158 declares `@keyframes pulse-glyph { 0.55→1→0.55 opacity over 4.2s }` (named `pulse-glyph`, synced to 5-step orbital demo, 4.2s per step per line 1182)
- cuts/11-govern.html:385 declares `@keyframes pulse-glyph { 0%,100%{opacity:.55} 50%{opacity:1} }` — identical keyframe, but **no duration specified in the 11 CSS** (duration would come from animation property, not visible in grep result)
- Both cite the same keyframe name but lines 151-158 in 01 vs 385 in 11 show **identical keyframe definition, yet duration source differs**

**Why ambiguous for canon:**
- If cut 01's glyph pulse is 4.2s (step-synced), and cut 11 uses same keyframe name, should 11's duration also be 4.2s?
- Or does cut 11 apply a different duration via the `.agent-glyph` or `.pulse-glyph` class rule (not visible in the grep)?
- The keyframe definition is shared, but the **animation duration binding is not documented in the inventory.**

**Canonical implication:** Orbital glyph pulsing needs explicit duration rule. If step-synced in 01 (4.2s), should 11 match or adapt per register state?

---

### Finding 2: DISPOSITION/SEAL RISE — Competing Timing and Animation States
**Cuts affected:** 01 (slate-tray), 06 (margin-read), 09 (osint-custody), 11 (govern)

**Evidence — Duration inconsistency:**
- cuts/01-slate-tray.html:340 `@keyframes rise { 360ms ease }` (sealed box at outcome confirmation)
- cuts/06-margin-read.html:340 `@keyframes rise { 360ms ease }` (sealed verdict on outcome click)
- cuts/09-osint-custody.html:274 dispo.in animation: `rise .5s ease` (disposition artifact, beat 4)
- cuts/11-govern.html — sign button yields dispo artifact in cut 00 style, but no explicit rise keyframe for dispo on sign

**Duration variance:**
- 01, 06 use 360ms
- 09 uses 500ms (50ms slower, 14% longer)
- 11 inherits from cut-shell.css `.db.sign` behavior (appends artifact inline, no keyframe cited)

**Behavior difference:**
- 01/06: outcome button → CSS class toggle → rise animation via .is-sealed or .sealed class
- 09: beat counter → dispo.classList.add("in") → CSS rule `.dispo.in { animation: rise .5s ease }`
- 11: sign button → inline DOM manipulation, artifact appended to #artwrap (cut 00 pattern), **no animation class** (line 389: ".sealed" class on center-orb, not on dispo artifact)

**Why ambiguous:**
- Same semantic moment (seal decision → show artifact) expressed with three different durations (360ms, 500ms, inline append)
- Cut 11 does not apply a rise animation to its dispo artifact at all — it inherits the cut-00 inline-DOM pattern, which has no animation (visual rise only via CSS gradient/border, not motion)
- An adjudicator must decide: is the seal ceremony 360ms, 500ms, or instant-with-visual-emphasis?

---

### Finding 3: REFINED MOTION vs. AMBIENT PULSE — Two Motion Tiers Collide
**Cuts affected:** All (00, 01, 03, 04, 05, 06, 08, 09, 10, 11)

**Evidence:**
- Refined motion (gesture, response): button hover (0.22s spring), disposition rise (0.36–0.5s ease), reveal animations (0.24–0.52s)
- Ambient pulse (background, always-on): live indicator dot (1.1s), glyph pulse (4.2s or unspecified), ring pulse (2.4s per 00-agency.html:112), sweep (16s per 08)

**Contradiction — when should pulse override refined motion?**
- cuts/01-slate-tray.html observes the orbital demo loop running continuously; glyph pulsing at 4.2s per step
- But button interactions (magnetic-hover, state changes) happen in 0.22s on top of the pulsing orbit
- No explicit rule for what happens when a user clicks a step button **during an active glyph pulse**
- Does the pulse halt? Restart? Cross-fade with button motion?

**Example from 01:** orbitalDemo() runs independently (line 1152–1286 in inventory), updating agent states every 4.2s. A user could click the "next" button at 2.1s into a pulse. Does the pulse:
1. Continue unaffected (two independent timelines)?
2. Fade out and restart with next step?
3. Get interrupted by a faster button-response override?

**Why ambiguous:**
- The CSS does not specify interaction precedence between ambient (pulse) and refined (button response) motion
- cut-shell.css does not declare a "when refined motion fires, pause ambient" rule
- This is a UX/craft decision, not a motion vocabulary problem per se, but it affects the **felt quality of the seal moment** if the user interacts during orbital motion

---

### Finding 4: PREFERS-REDUCED-MOTION Coverage — Incomplete Across Cuts
**Evidence:**

Cuts with explicit reduced-motion rules:
- cuts/01-slate-tray.html:222 reduced-motion disables reveal-failsafe and button hover (lines 196–208, 575–580)
- cuts/04-onboarding.html:120–127 disables screen-rise, progress-bar, button hover
- cuts/05-plugin-seed.html:179–183 disables beat rise
- cuts/06-margin-read.html:415–419, 484–486 disables ed-note entrance, spotlight pulse, guide pulse
- cuts/09-osint-custody.html:332–334 disables .obs/.read/.hyp/.dispo transitions AND animations (line 333: `animation: none !important`)
- cut-shell.css:202 disables button hover transform (universal rule)

Cuts WITHOUT explicit reduced-motion handling cited:
- cuts/00-agency.html — no @media (prefers-reduced-motion) block visible in the grep output (registry read stagger, orbital refusal opacity, toast animations have no stated reduced-motion override)
- cuts/03-calibration.html — no reduced-motion block cited in the inventory
- cuts/08-liminal-custody.html — no reduced-motion block cited
- cuts/10-today.html — no reduced-motion block cited
- cuts/11-govern.html — cut-shell.css:202 covers buttons, but no local override for orbital motion, refusal arrows, or toast

**Canonical implication:** Five cuts (01, 04, 05, 06, 09) explicitly respect prefers-reduced-motion. Five cuts (00, 03, 08, 10, 11) do not cite local reduced-motion rules. This is **inconsistent** — an adjudicator must decide if motion-heavy cuts (00, 08, 09) should require reduced-motion parity before shipping.

**Why ambiguous:**
- Some cuts aggressively disable animations (09: `animation: none !important`), others passively omit rules
- No canonical policy documented: "all cuts must declare prefers-reduced-motion," or "only ambient motion needs it"?

---

### Finding 5: ORBITAL REFUSAL ARROWS — Opacity Timing vs. Meaning Variance
**Cuts affected:** 00 (agency), 01 (slate-tray), 11 (govern)

**Evidence:**
- cuts/00-agency.html:154 `.refuse { opacity:0; transition:opacity .2s }` — refusal arrow starts invisible, fades in when agent refuses
- cuts/01-slate-tray.html:215 refusal arrows: `transition: opacity 320ms ease` — same semantic (refusal visualization), **50% longer than cut 00** (320ms vs. 200ms)
- cuts/11-govern.html:390 `.refusal-arrow { opacity:0; transition:opacity .32s }` — **160% longer than cut 00** (320ms vs. 200ms, matches 01)

**Duration variance across cuts for the SAME semantic behavior:**
- Cut 00: 200ms
- Cut 01: 320ms (1.6× cut 00)
- Cut 11: 320ms (matches 01, 1.6× cut 00)

**Meaning consistency check:**
- All three cuts use opacity 0→1 on `.refuse` or `.refusal-arrow`
- All three apply the transition on hover/state-change of agent
- Same meaning, different durations

**Why ambiguous:**
- Is the refusal arrow a "supporting detail" (fast, 200ms) or a "witnessed moment" (slow, 320ms)?
- Cut 00 is the earliest version; cuts 01 and 11 slow it by 60%. Was this intentional refinement, or a drift?
- An adjudicator must choose: is refusal timing 200ms (cut 00, simplest) or 320ms (cuts 01 & 11, converged)?

---

### Finding 6: TOAST NOTIFICATION MOTION — Inconsistent Direction and State Binding
**Cuts affected:** 00 (agency), 11 (govern), others inherit cut-shell patterns

**Evidence:**
- cuts/00-agency.html:194 `.toast { transform: translateX(-50%) translateY(8px); … } .toast.show { opacity:1; transform: translateX(-50%) }` — toast rises from translateY(8px) to 0, paired with opacity 0→1
- cuts/11-govern.html:408 `.toast { transition: opacity .2s, transform .2s }` — same pattern, but transition bundles opacity and transform together (vs. 00's selective binding)
- Neither 00 nor 11 explicitly document the animation duration (0.2s in 11 via transition shorthand)
- cuts/04-onboarding.html and cuts/09-osint-custody.html inherit via cut-shell but do not show toast-specific overrides in the inventory excerpts

**Coherence question:**
- Same visual (toast rises + fades in), two different codebases (00 vs. 11)
- Duration is 200ms (short, near-instant feedback)
- But does toast **also respond to prefers-reduced-motion**? Cuts 01, 04, 05 disable animations, but do they disable toast animations?

**Why ambiguous:**
- Toast motion is ambient (user action → immediate feedback), not ceremonial. Should it survive prefers-reduced-motion?
- Or should all motion disappear? No policy stated.

---

## 3. THE SEALED MOMENT — 01 vs. 08 vs. 09 vs. 11 Comparison

### Cut 00 (Agency) — Seal as Inline Artifact + Escalation Prose
**Location:** Click `.db.sign` button

**On-screen behavior (inferred from source):**
1. Sign button click → `sign()` function appends artifact to `#artwrap` (lines 389–393)
2. Artifact HTML: `<div style="margin-top:14px; border-left:3px solid var(--judgment); …">` with CSS inline (judgment-bg, serif text)
3. Sign button **disappears** (display:none, line 393)
4. Toast fires: "Sealed & handed off · the loop will return it in Today"
5. If CUR==='spend', escalation prose appends below artifact (CEO-visible chain path)

**Motion present:**
- **No explicit animation** — artifact appears instantly via DOM append + inline style
- Toast animation: implied 0.2s fade-in + rise (inherited from cut-shell.css or 00's inline rule)
- No @keyframes involved for seal artifact itself; the visual impact is immediate (CSS gradient background, left border color, typography)

**Ceremony quality:** The seal is **visual-presence based, not motion-based**. It reads as authoritative (judgment color, serif font, inline with brief text) rather than ceremonial. The lack of animation reinforces finality — "sealed" is instant, irreversible, not animated.

---

### Cut 01 (Slate-Tray) — Seal as Rise + Class-Driven State
**Location:** Click `.dispo-btn.is-primary` ("Confirm") button

**On-screen behavior (observed from screenshots + source):**
1. Confirm button click → CSS class `.is-sealed` added to disposition wrapper (line 589 per inventory §45)
2. Outcomes buttons fade out (opacity 0, hidden)
3. Sealed verdict section rises and fades in (line 315–325: `@keyframes tdy-rise`, but this is cut 10 pattern; cut 01 uses `.sealed` class to toggle display)
4. Animation: `rise` keyframe explicitly invoked on sealed box (lines 340: `@keyframes rise`, 360ms ease)
5. Sealed box displays: timestamp + verdict + "handed off" prose
6. Toast fires: implicit (state change triggers toast in lib/boot.js)

**Motion present:**
- **Rise animation: 360ms ease** — sealed artifact lifts from translateY(8px) + opacity 0→1
- Button states: Confirm/Defer buttons fade out (transition opacity, duration not specified in the cut-specific code)
- Background: **no ambient pulse interference** — outcome buttons occupy center stage, orbit is de-emphasized (right rail, visual weight reduced)

**Ceremony quality:** The seal is **multi-layered ceremonial**:
- Outcome choice is instant (button click, color change)
- Verdict reveal has **measured rise** (360ms, not too fast)
- The artifact takes center stage (scaled up, prominent border, serif text)
- The moment is **witnessed** — you see the rise, the text settles, the seal is complete

---

### Cut 08 (Liminal Custody) — Seal as Rule-Persist + Receipt Artifact
**Location:** Click save-rule-button (beat 4 transition)

**On-screen behavior (inferred from source + inventory):**
1. Save rule button click → `saveRule()` function (line 2459)
2. State.ruleSaved = true, advance to beat 4 if < 4
3. Render receipt artifact to footer (lines 2796–2812): `.frame-receipt` div with "custody-packet · case-014 · 14 events · 3 guards · 1 contested · evidence integrity before command"
4. Toast fires: "Rule saved to vault"
5. Receipt is **hidden by default** (conditional render line 2702), appears when state.ruleSaved (line 2707)

**Motion present:**
- **No explicit @keyframes for receipt** — it appears via conditional DOM rendering (if state.ruleSaved, show receipt; else hide)
- Background animation continues: map sweep (16s conic-gradient, always-on, line 637)
- Button state: save-rule button disables after click (line 2467)
- No rise animation, no fade-in; receipt is **instant visual appearance**

**Ceremony quality:** The seal is **data-state-driven, not motion-driven**. The receipt is:
- Functionally significant (rule persisted to vault)
- Visually understated (monospace font, small 1px border, footer position)
- **Not ceremonial** — no animation, instant appearance, treated as a proof-of-transaction (like a blockchain receipt)
- The moment is **legible** (metadata visible), not **felt** (no motion reinforcement)

---

### Cut 09 (OSINT Custody) — Seal as Disposition Rise + Doctrine Proof
**Location:** Beat 4 (auto-advance after beat 3, or click "Step" at beat 3)

**On-screen behavior (observed + source):**
1. doBeat() at beat 4 (line 678): `dispo.classList.add("in")`
2. `.dispo.in` CSS rule (line 273): `animation: rise .5s ease`
3. Disposition artifact rises: `from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; }` (keyframe line 274)
4. Artifact content (lines 674–677): "X cases sealed · doctrine R-001 active · latest case C-015 · disposition [result] · Y ontology nodes"
5. Vault pill updates: `.vault-pill.sealed` on color --c-ok when p.vault.length > 0 (line 615)
6. Toast fires: implicit in doBeat() (line 690 sets beat++, logs state change)

**Motion present:**
- **Rise animation: 500ms ease** — sealed disposition lifts from translateY(8px) + opacity 0→1
- Duration is 140ms longer than cut 01/06 (500ms vs. 360ms; 39% slower)
- Background motion: **no ambient pulse at beat 4** (beats are auto-stepped, no orbital glyph state conflict)
- Animation is **isolated** (no prefers-reduced-motion conflict in this read; line 333 disables it globally under reduced motion)

**Ceremony quality:** The seal is **multi-moment ceremonial**:
- Doctrine signing happens at beat 2 (rule set to .active class, line 649)
- Disposition appears at beat 4 (after re-rank with doctrine applied)
- The rise is **slower and more deliberate** than 01/06 (500ms vs. 360ms)
- Vault pill updates **simultaneously with rise** (state change + visual change, not sequential)
- The moment is **proof-of-mechanism** — the vault seal is evidence of doctrine persisted

**Contrast with cut 01:** Cut 01 seal is **personal/immediate** (360ms, centered, verdict-driven). Cut 09 seal is **systematic/deliberate** (500ms, right-rail, doctrine-driven).

---

### Cut 11 (Govern) — Seal as Inline Artifact + Orbit State
**Location:** Click `.db.sign` button

**On-screen behavior (inferred from source):**
1. Sign button click → `sign()` function appends artifact to `#artwrap` (inherits cut 00 pattern, lines matching 00-agency.html:389–393)
2. Artifact HTML: `<div style="border-left:3px solid var(--judgment); …">` with CSS inline (judgment-bg, serif text, lines 266–269 declare `.db.sign` styling)
3. Sign button **disappears** (display:none)
4. Orbital center-orb transitions to `.sealed` state (line 389: `.center-orb.sealed { fill-opacity:.32; stroke-opacity:.85; stroke-width:1.5; filter:drop-shadow(0 0 8px var(--diligence-glow)) }`)
5. Center-orb transition: `transition: fill-opacity .6s, stroke-opacity .6s` (line 387)
6. Toast fires: "Sealed & handed off" (inherited from 00)

**Motion present:**
- **No explicit animation on dispo artifact** (inline append, same as cut 00)
- **Orbital center-orb glows** via transition (600ms, line 387)
- Glow animation: fill-opacity 0→.32, stroke-opacity 0→.85 over 600ms
- Refusal arrows may also transition (opacity .32s, line 390) if agents refuse during sign

**Ceremony quality:** The seal is **bifurcated**:
- Artifact seal: **instant** (same as cut 00, inline DOM append)
- Orbital seal: **delayed witness** (600ms center-orb glow, overlaps with artifact appearance)
- The moment is **two-stage ceremonial**:
  1. Decision sealed (artifact + button hide, instant)
  2. Orbital acknowledgment (glow fades in over 600ms, reinforces magnitude)

---

### Sealed Moment Summary Table

| Cut | Seal Artifact | Animation | Duration | Ceremony Feel |
|-----|---------------|-----------|----------|----------------|
| 00 | Inline DOM append (judgment-bg, serif) | None (instant) | Instant | Authoritative, final |
| 01 | CSS class toggle → rise animation | rise keyframe | 360ms | Witnessed, centered, personal |
| 08 | Conditional render (rule receipt) | None (instant) | Instant | Proof-of-transaction, understated |
| 09 | CSS class toggle → rise animation | rise keyframe | 500ms | Deliberate, doctrine-driven, systematic |
| 11 | Inline DOM append (judgment-bg, serif) + orbital glow | Orbital transition | 600ms (glow) | Bifurcated: instant seal + delayed orbital acknowledgment |

### Contradiction — THREE Different Seal Choreographies
1. **Inline instant (00, 08, 11 artifact):** Artifact appears immediately, no animation. Feels **final/forensic**.
2. **Rise animation (01, 09 dispo):** Artifact rises and fades in, 360–500ms. Feels **ceremonial/witnessed**.
3. **Bifurcated (11 orbit + artifact):** Artifact instant, orbital glow 600ms. Feels **layered/two-moment**.

**For an adjudicator inferring canon:**
- **Same semantic event (seal decision, persist to vault), expressed three ways**
- **No policy stated:** Should all seals rise? Should some be instant? Should orbital confirmation always accompany artifact seal?
- **Duration variance:** 360ms vs. 500ms vs. 600ms for overlapping or sequential stages
- **This is THE major contradiction for the canonical design system**: what does "sealed moment" **look like, feel like, time-wise**?

---

## 4. AMBITION GAP — Grade + Rationale

**Grade: B+/A− (craft present, canon is ambiguous)**

**Rationale:**
The cuts demonstrate **sophisticated motion understanding** — consistent use of spring easing for gesture, standard easing for state, clear semantic distinction between rise (ceremony) and fade (state). Orbital pulsing, hypothesis bars, disposition reveals are all **individually well-executed**.

However, **the seal moment — the highest-stakes ceremony — is expressed three different ways across cuts**, and there is **no documented motion policy** for:
1. When to animate vs. when to be instant (transaction finality)
2. How long ceremony should take (360ms personal vs. 500ms systematic vs. instant proof)
3. Whether ambient motion (pulse, sweep) should be suppressed during user interaction
4. How prefers-reduced-motion affects ambient vs. refined motion (5 cuts do it, 5 don't)

**What's needed for canonical shipping:**
- Explicit seal-moment keyframe: is it 360ms rise, 500ms rise, or instant + orbital glow?
- Documented motion policy: when refined motion (button, seal) overrides ambient motion (pulse, sweep)
- Prefers-reduced-motion coverage: audit all cuts for consistency (currently 50/50)
- Orbital glyph pulse duration: canonicalize 4.2s (step-synced) or other value

**The cuts are a **working prototype**, not yet a locked motion system**. They demonstrate the *intent* but not the *rule*.

---

## 5. ONE-PARAGRAPH VERDICT

The prototype cuts express **one motion grammar in principle** — rise/fade for ceremony vs. state, spring ease for gesture, standard ease for transitions, ambient pulse as always-on context — yet the **seal moment contradicts itself across five implementations**, varying from instant (00, 08) to 360ms rise (01) to 500ms rise (09) to bifurcated 600ms orbital glow (11), without a documented policy for which is canonical. Prefers-reduced-motion coverage is 50% (5 of 10 cuts explicitly handle it), and orbital glyph pulsing durations drift between unnamed keyframes (01) and unspecified animation bindings (11). The craft is evident — each cut is intentional and coherent internally — but the **system is not yet canonical**; an adjudicator must resolve the seal duration, the ambient-vs.-refined motion precedence, and the reduced-motion scope before the motion vocabulary can ship.

---

## Appendix: Detailed Motion Citations

### Refusal Opacity Timing Variance
- cuts/00-agency.html:154 — `.refuse { opacity:0; transition:opacity .2s }`
- cuts/01-slate-tray.html:215 — refusal arrows: `transition: opacity 320ms ease`
- cuts/11-govern.html:390 — `.refusal-arrow { opacity:0; transition:opacity .32s }`

### Register Read Entrance (Stagger + Rise)
- cuts/00-agency.html:195 — `@keyframes rin { to{opacity:1;transform:none} }` with staggered animation-delay per data-reg (lines 82–83: `.reg { animation-delay: ${.1+i*.16}s }`)
- cuts/01-slate-tray.html:151–158 — agent glyph pulse timing linked to orbital demo step (4.2s per step, line 1182)

### Disposition Rise Timing Variance
- cuts/01-slate-tray.html:340 — `@keyframes rise { 360ms ease }`
- cuts/06-margin-read.html:340 — `@keyframes rise { 360ms ease }`
- cuts/09-osint-custody.html:273–274 — `dispo.in { animation: rise .5s ease }` with `@keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`

### Prefers-Reduced-Motion Scope Audit
- **Explicitly handled:** cuts/01, 04, 05, 06, 09
- **Not cited in inventory:** cuts/00, 03, 08, 10, 11
- **Coverage:** 50% of cuts

### Magnetic-Hover Consistency
- Universal: button { transition: transform .22s var(--ease-spring), color .15s, background .15s } (cut-shell.css:190, applied to all cuts)
- Consistent duration: .22s (all cuts)
- Consistent easing: var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)) — gentle overshoot, sign-packet moment (design-tokens.css:1175)
