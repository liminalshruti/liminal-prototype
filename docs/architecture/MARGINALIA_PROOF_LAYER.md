# Marginalia Proof Layer — `liminal-prototype`

*Branch: `foundry/proof-to-port-architecture` · 2026-06-18*
*Source: `lib/marginalia.js` (current annotations), the Stage-0 audit, and `cuts/cut-manifests.json`.*

---

## Why this layer

`lib/marginalia.js` already carries the founder's hand on the build — 9 hand-authored
notes anchored to v0.6 vocabulary (slate, tray, agency, audit ribbon), toggled with ⌘N.
They are real and load-bearing as *voice*, but they are **untyped**: a note explaining
*what is proven* sits in the same shape as a note explaining *narrative intent* or *a
hard boundary*. The reader cannot tell a claim of proof from a claim of aspiration.

This document defines a **typed marginalia vocabulary** so an annotation declares *what
kind of statement it is*. This is the in-surface companion to the manifest layer
(`cuts/cut-manifests.json`): the manifest is the machine-readable proof record; typed
marginalia is the same discipline expressed *on the surface itself*.

**This document changes no code.** `lib/marginalia.js` is not edited. This is the
conceptual migration target; the actual refactor is a later, separately-gated step.

---

## The seven marginalia types

| Type | Asserts | The reader should treat it as | Example posture |
|---|---|---|---|
| **PROOF** | This is demonstrated, here, by this surface. | Evidence. Verifiable against the running cut. | "The kernel recomputes the loop live each run." |
| **STATE** | The maturity/reality of what you're seeing. | A hi-fi / mock / aspirational / frozen-artifact disclosure. | "This heatmap is a seeded illustrative baseline." |
| **CHOREOGRAPHY** | The intended interaction/motion sequence. | A description of behavior, not a claim it's proven. | "⌘K drives it; correction is the primary move." |
| **NARRATIVE** | The founder's framing / why this matters. | Voice and intent — not a proof or a state claim. | "The disagreement is the signal." |
| **BOUNDARY** | A hard rule / invariant / what this is NOT. | A constraint the surface must hold. | "12 bounded co-workers, not Jungian archetypes." |
| **PORT** | This is (or contains) a portable contract/primitive. | A pointer to the portability backlog. | "This store is the vault contract; it travels." |
| **QUESTION** | An open/unresolved item anchored to this spot. | A tracked uncertainty, not a settled fact. | "Is this cut a cut-00 subject or standalone?" |

### Why these seven (and not the existing untyped shape)

The Stage-0 audit's core risk is **overclaim leaking into a port**: a demo's narrative
gets read as proof and ships onto the spine as if demonstrated. Typed marginalia makes
that confusion structurally impossible at the annotation level —
**PROOF / STATE / NARRATIVE are forced apart.** The remaining four (CHOREOGRAPHY,
BOUNDARY, PORT, QUESTION) cover the other things a build-note actually does: describe
behavior, hold a line, flag a portable asset, or mark an open question.

---

## How the current annotations migrate (conceptual map)

The 9 notes in `lib/marginalia.js` today, classified into the new vocabulary. This is the
migration map — it shows the target type for each existing note. **No note is rewritten
here; this is the classification, not the edit.**

| Current note (target → text, abbreviated) | Today | Migrates to |
|---|---|---|
| `product-row` → "three reads of one substrate. apr 25 locked the fork." | untyped | **NARRATIVE** (framing of the product split) |
| `tab-team` → "ships first. brian DRIFT is the demo bridge…" | untyped | **NARRATIVE** + **STATE** (sequencing + maturity claim) |
| `tab-business` → "snowden/hansen-class. classification ladder is the consent contract." | untyped | **BOUNDARY** (the consent contract is an invariant) |
| `slate-canvas` → "composition surface, not a feed. placing tiles is the agency move." | untyped | **BOUNDARY** (what it is NOT) + **NARRATIVE** |
| `tray` → "palette. inkwell. mixing plate. live windows… what makes this not a webpage." | untyped | **NARRATIVE** (the metaphor) |
| `agency-rail` → "12 bounded co-workers · not jungian archetypes. apr 21 rule." | untyped | **BOUNDARY** (a hard rule, dated) |
| `audit-ribbon` → "the disagreement is the signal. correction stream is the moat." | untyped | **NARRATIVE** (thesis framing) |
| `vault-pill` → "encrypted local. one consent primitive. two contracts." | untyped | **BOUNDARY** (the privacy invariant) — note: verify against actual shipped state, may need a STATE caveat |
| corner → "spec → config → shell. one source of truth, evolving in tandem." | untyped | **NARRATIVE** (the build philosophy) |

### What the migration reveals

- **Most current notes are NARRATIVE or BOUNDARY** — voice and invariants. That is
  appropriate for a founder's-hand layer.
- **There is currently no PROOF-typed note and no STATE-typed note** on the slate-tray
  surface. That is itself a finding: the surface asserts *framing* and *rules* but does
  not, in marginalia, declare *what is demonstrated* vs *what is aspirational*. The
  manifest (`cut-manifests.json`) now carries that; typed marginalia would surface it
  in-place.
- **The `vault-pill` note is the one to watch.** "encrypted local" reads as PROOF but,
  per the audit and `LIMINAL_END_TO_END`, vault encryption/signing is *architecture built,
  not shipped on the live Tauri vault*. Under typed marginalia this becomes a **STATE**
  disclosure, not an unqualified claim — exactly the overclaim-prevention the type system
  exists for.
- **No PORT or QUESTION notes exist yet.** Those types connect marginalia to the
  portability backlog and the manifest's open questions — a future surfacing, not present
  today.

---

## Conceptual shape of a typed note (illustrative — not a code change)

The current note shape is `{ target, pattern, side, text, sig }`. The typed shape would
add one field — `type` — drawn from the seven above. Illustratively:

```
{ target: "audit-ribbon", type: "NARRATIVE", text: "the disagreement is the signal…", sig: "· sr" }
{ target: "vault-pill",   type: "STATE",     text: "encryption-at-rest: built in agents-v1, not yet wired to the live vault", sig: "· sr" }
```

The render layer would key off `type` for styling (e.g. PROOF/STATE rendered distinctly
from NARRATIVE) so a reader can tell a claim of proof from a claim of intent at a glance.
**This is the target; implementing it edits `lib/marginalia.js` and is out of scope for
this doc.**

---

## Relationship to the other authority docs

- **`cut-manifests.json`** is the machine record of proof/state/portability per cut.
- **This doc** is how that same discipline appears *on the surface*, in the founder's-hand
  layer, typed.
- **`PORTABILITY_BACKLOG.md`** is where PORT-typed marginalia would point.

Together they ensure the repo's claims are typed and traceable in three places: the
manifest (data), the margin (surface), and the backlog (extraction plan).

---

## Boundaries

- Does **not** edit `lib/marginalia.js`. Migration is conceptual.
- Does **not** add or rewrite any annotation text.
- Does **not** introduce the `type` field in code — that is a later, gated refactor.
