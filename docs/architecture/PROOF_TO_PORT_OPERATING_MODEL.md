# Proof-to-Port Operating Model — `liminal-prototype`

*Branch: `foundry/proof-to-port-architecture` · 2026-06-18*
*Source: `docs/architecture/EXTRACTION_FOUNDRY_AUDIT_2026-06-18.md` (Stage 0 audit).*

---

## Purpose

This document states **how this repo operates** — its job, the role of each layer, and
the rules that govern change. It is the authority layer the Stage-0 audit pointed to: the
audit established *what is here and what is portable*; this states *how we treat it going
forward*.

It changes no runtime code. It is coordination memory, not implementation.

---

## The one-line model

**`liminal-prototype` is a proof-to-surface porting repo.** It exists to *prove* surfaces
and loops, then hand portable pieces of that proof — as contracts, schemas, and tools — to
the product spine (`liminal-desktop`) and the canon upstream (`liminal-creative`). It is
not the product spine, and it is not a second source-of-truth for the product.

---

## The layers and their roles

| Layer | Role | Authority |
|---|---|---|
| `cuts/` | **Receipt / showroom surfaces.** Each cut is a *projection* of one product onto a viewing context — a proof that a loop runs, not source-of-truth architecture. A cut is allowed to be throwaway; the Product is not. | Demonstration. Not canon. |
| `lib/` | **The modular foundry nucleus.** The one place with layered architecture (pure state → render modules → glue via the `ctx` callback object). The closest thing to portable logic; the template the rest aspires to. | Source of portable logic candidates. |
| `design-system/` | **The visual canon.** A synced mirror of `liminal-creative` tokens + components, governed byte-for-byte by `scripts/tokens/sync-upstream.mjs`. Surfaces consume it; no surface edits its local copy. | Canon (mirrored, not authored here). |
| `docs/architecture/` | **Coordination memory.** Audit, operating model, manifests, backlog — the governable record of what the repo is and how it changes. This layer is *why* the repo is legible. | The authority layer. |

---

## The organizing truth (from the Stage-0 audit)

The repo has **two architectures coexisting**:

1. **One modular app** — `cuts/01-slate-tray.html` → `lib/boot.js`. A properly layered
   ES-module app. The *only* cut that consumes the `lib/` stack.
2. **~9 monolithic showroom cuts** — self-contained single files sharing only
   `design-system/tokens/design-tokens.css` and `lib/cut-shell.css`. Each is a fork of
   shared concepts that drifts independently.

This split is the organizing fact. The modular app is the foundry nucleus; the monolithic
cuts are receipts. Treating the two the same is the category error this operating model
exists to prevent.

---

## Working rules

1. **The WIP map is broader than the pitch.** What is built and proved here exceeds what
   any single demo narrative shows. The repo records the full surface area honestly
   (hi-fi vs mock vs aspirational), so a port never carries an overclaim onto the spine.
2. **Cuts must declare before refactor.** Before any cut is refactored, it must declare
   its **proof / state / choreography / portability** (the manifest layer — see
   `cuts/cut-manifests.json`). We do not refactor a surface whose proof-state is unknown.
3. **First extractions are schemas / adapters / tools — not UI rewrites.** The lowest-risk,
   highest-leverage portable assets are the non-visual ones (the correction-tag schema,
   the vault-store adapter, the token-sync tool). UI portability is a re-implementation
   against a contract on a different stack (SolidJS/Tauri), not a lift-and-shift — it
   comes later, behind the contracts.
4. **Output flows toward the spine, never competes with it.** `liminal-desktop` is the
   product spine. This repo proves and hands contracts to it. It must not become a second
   product source-of-truth (the failure mode named in the audit's §9 reconciliation).
5. **Canon is consumed, not authored.** `design-system/tokens/*` is a mirror. Changes flow
   *from* `liminal-creative`. Inline `:root` token redefinitions in cuts are drift and are
   tracked as such.

---

## What "proof-to-port" means in practice

```
prove (a cut runs the loop)
  → declare (its proof/state/choreography/portability in the manifest)
    → extract the non-visual contract (schema/adapter/tool first)
      → hand the contract to the spine (liminal-desktop re-implements against it)
```

The receipt (the cut) stays here as evidence. The *contract* is what travels. The visual
re-implementation on the spine is downstream of the contract, never the first move.

---

## Boundaries (what this model does NOT do)

- It does **not** decide the product convergence of `liminal-desktop` (Sean's spine /
  lane). It maps demos to layers; it does not propose merging surfaces on the spine.
- It does **not** author canon. Tokens and the agent ontology are mirrored/shared; their
  source is elsewhere.
- It does **not** pick the first buyer or any fundraise positioning. Those are gated and
  decided in `founder-brain`, not in this public repo.

---

## Sequence this model sets up

1. **Operating model** *(this doc)* — how the repo is governed.
2. **Cut manifests** (`cuts/cut-manifests.json`) — per-cut proof/state/portability, evidence-only.
3. **Marginalia proof layer** (`docs/architecture/MARGINALIA_PROOF_LAYER.md`) — typed annotation doctrine.
4. **Portability backlog** (`docs/architecture/PORTABILITY_BACKLOG.md`) — what to extract, in what order.

Only after this authority layer is in place does cleanup or extraction begin. The
discipline: **first make the repo governable, then make it cleaner.**
