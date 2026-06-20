# Product

## Register

brand

> The public cuts catalog is a **persuasion surface** first. The cuts are real product UI — app shells of the Tray → bounded-agents → correction → Vault → next-move loop — but their *job in this repo* is to convince a first-time investor or operator that judgment infrastructure is inevitable. Design IS the product here. (Per-task, an individual cut can be treated as `product` when the work is purely workflow refinement; PRODUCT.md carries `brand` as the default.)

## Users

**Primary: investors and operators encountering Liminal for the first time**, usually via the GitHub Pages link, often on a desktop, often mid-evaluation (a pitch follow-up, a cold-inbound diligence pass, a "show me the thing" moment). They arrive skeptical and time-boxed. Their job-to-be-done is to answer one question fast: *is there a real, defensible idea here, or is this another agent wrapper?* They are not the end-operator of the product yet — they are deciding whether to take it seriously.

**Secondary: the founder and collaborators**, using the catalog as a coherence surface — a place to see every register side-by-side, check that the loop reads, and keep the canon honest across cuts.

The context is evaluative, not operational. Nobody is getting daily work done in these screens; everyone is forming a judgment about the thesis behind them.

## Product Purpose

Liminal is **judgment infrastructure for founders running multi-agent systems**. The thesis: when anyone can build, the bottleneck moves from output to judgment — so the substrate where judgment gets *recorded, corrected, and compounded* is where the value accrues. The architectural signature is **refusal**: bounded agents that say "that's not my ground, talk to the Healer" increase trust rather than erode it.

This repo's purpose is narrower than the product's: it is the **public, no-build, click-able catalog** that makes the loop legible — Tray, bounded agents, correction-as-data, Vault-as-moat, signed next-move — and that consumes the canonical visual substrate every other Liminal surface shares. Success is a viewer who leaves thinking *"of course judgment is the bottleneck — why doesn't this already exist?"* — the thesis landing as obvious-in-hindsight, not as a pitch they have to be talked into.

## Brand Personality

**Three words: bounded, forensic, inevitable.**

- **Bounded** — the product refuses; the design should too. Restraint is a feature, not a limitation. No surface tries to do everything or impress by maximalism.
- **Forensic** — evidence over assertion. Charts, provenance, custody chains, real recomputed loops. The register is closer to a declassified instrument panel than a marketing site.
- **Inevitable** — calm, declarative, almost understated. The thesis is presented as already-true. Persuasion happens by demonstrated depth, not by volume or hype.

**Voice & tone:** precise, confident, unhurried. States claims plainly and marks the line between what ships and what's designed (the README's "Status: what's shipping vs. designed" honesty is the brand voice in miniature). Never breathless, never salesy.

**Emotional goal:** *inevitability.* The viewer should feel the conclusion was waiting for them, not sold to them.

**Visual register is LOCKED and canonical** — do not reinvent it. The 12-wheel canon (7 factors + 5 ornaments × 10-stop tonal scales) + the two-palette dialectic (iridescent content layer + named saturated chrome layer: `--diligence`, `--judgment`, `--synthesis`, `--outreach`, `--alarm`, `--watch`, `--signal`, `--ambient`, `--depth`, `--liminal`). Type stack locked: Nineties Headliner + Perfectly Nineties + Geist Mono (no Inter / Helvetica / system-ui as primary). Tokens are a synced consumer copy of the upstream canon at `liminal-creative/tokens/design-tokens.css` — never edit values locally; run `npm run tokens:sync`. Core brand sentence (locked): **"Liminal gives form to inner life."**

## Anti-references

What this must NOT look or feel like:

- **Generic AI-SaaS.** No Linear/Vercel-clone dark gradients, glassmorphism, hero-metric templates, or indistinct "modern startup" polish. This is the saturated default and the fastest way to read as one-more-agent-wrapper.
- **Enterprise-trust theater.** No navy-and-gold "we take security seriously" corp aesthetic, stock-photo dashboards, or compliance-badge soup. Defense-adjacency is earned by the custody/provenance substance, not signaled by costume.
- **Wellness-spiritual softness.** No pastel gradients, rounded-everything, or breathing-circle calm-app language. The bounded/forensic register is the literal opposite. (CLAUDE.md also bans the framing: not a wellness app, coaching tool, AI companion, mood tracker, or meditation app.)
- **Demo-toy looseness.** Nothing may read as a hackathon prototype: no placeholder data that announces itself as placeholder, no jitter, no untrustworthy charts. The claim is "the record is the moat" — every pixel of evidence must look like it could survive scrutiny, or the thesis undercuts itself.

## Design Principles

1. **Inevitability over persuasion.** Don't argue the thesis; stage it so the conclusion is unavoidable. Calm, declarative, understated. If a surface feels like it's *selling*, it has failed the register.
2. **Refusal is the signature — show the bounds.** The product's distinctive act is saying no. Designs should make boundedness visible and legible (out-of-lane refusals, named hand-offs, the loop returning), not hide it as an error state.
3. **Evidence must survive scrutiny.** Every chart, provenance trail, and number is a trust claim. Real-loop output over decorative viz; honest "shipping vs. designed" labeling over overclaim. The moment data reads as fake, the moat reads as fake.
4. **Consume the canon; never fork it.** The locked 12-wheel canon + nineties type stack is the identity. Work *within* it — apply, compose, refine — and pull from upstream via `tokens:sync`. Local token edits and off-canon fonts are drift, not creativity.
5. **Code toward a concrete image, not an abstract brief.** (Per impeccable's own guidance.) Every cut commits to a specific, named register — forensic instrument, custody ledger, OSINT console — rather than a generic "clean dashboard." Specificity is what makes it not look AI-made.

## Accessibility & Inclusion

- **Contrast is non-negotiable and already load-bearing in the canon** — the token file logs a11y passes (e.g. `--text-faint` bumped to #6B6862 for WCAG AA body-text contrast). Body text ≥4.5:1, large text ≥3:1; verify against the actual canon tokens, never against an off-canon fallback (`lib/cut-shell.css` carries a `:root` ink fallback that must track canon or it silently shadows it — known drift risk).
- **Reduced motion is required**, not optional — the cuts use boot animations and reveals; every one needs a `prefers-reduced-motion: reduce` alternative (crossfade or instant).
- **Forensic register cannot rely on color alone** — custody/classification/refusal states must carry shape, label, or icon as well as hue, for color-blind viewers evaluating evidence.
- No stated formal WCAG-level mandate yet; treat **AA as the floor** given the investor/diligence audience and the trust-centric thesis.
