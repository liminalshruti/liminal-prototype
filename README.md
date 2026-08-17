# Liminal prototype

**Live demos: <https://liminalshruti.github.io/liminal-prototype/>**

This is the public prototype surface for **Liminal**. The primary enterprise demo is the local AI Spend Control Workstation; the remaining cuts explore the broader human-decision record and design system.

The core claim: when anyone can build, the bottleneck moves from output to **judgment**. Liminal is the substrate where that judgment gets recorded, corrected, and compounded.

## The primary enterprise loop

1. **Qualify** the product surface, native unit, period, revision, and approved source.
2. **Reconcile** independent observations, identities, and coverage gaps without choosing a winner by inference.
3. **Allocate** credits under an effective-dated Finance policy whose direct, shared, and residual lines conserve the source total.
4. **Decide and control** by disposing a deterministic finding, signing the exact before/change/rollback plan, and guiding an authorized administrator through the vendor console.
5. **Verify and export** only after fresh after-state evidence is bound. `applied_unverified` is not `verified`.

## Why this matters

Frontier labs ship omniscience. Liminal ships **refusal**.

Bounded agents that say "that's not my ground, talk to the Healer" increase trust, not decrease it. Refusal as designed output is the architectural answer to the "agent hallucinates capability" problem.

The thesis: better models don't erode this — they deepen it. Higher-resolution reads should produce more interesting disagreements, which produce richer corrections, which compound in the vault. (This is the architectural bet, not yet a demonstrated result — the cuts show the bounded-refusal loop running, not a weak-vs-strong-model comparison.)

## What's in this repo

This is a **single-file prototype catalog**. Cut 11 is the current AI Spend route; the other public cuts are separate explorations and design references.

| File | What it is |
| --- | --- |
| `index.html` | The cuts catalog — single self-contained file (HTML + CSS + JS, no build step) |
| `cuts/00-agency.html` | **General decision-loop exploration.** One shell switches among pattern, notification, custody, OSINT, and a compressed spend summary. It is not the primary AI Spend pilot proof and must not substitute for Cut 11's source-to-verification sequence. |
| `cuts/01-slate-tray.html` | **General decision-record exploration.** Slate-tray-vault workspace and the former front door. It remains available as a secondary cut; it is not the AI Spend pilot route. |
| `cuts/02-forensic-agent.html` | Forensic agent · contradicting-notification diligence loop (v0.3) |
| `cuts/03-calibration.html` | 12wk × 4-register vault heatmap — the moat-visibility cut (renders a seeded illustrative baseline with any real corrections merged on top; see the cut's own in-UI disclosure) |
| `cuts/04-onboarding.html` + `cuts/onboarding/*` | First-touch onboarding (JSX/CSS in `cuts/onboarding/`). Consolidates three earlier explorations now in `cuts/_archive/`: Cut 05 Argument ("the redline IS the onboarding"), Cut 06 Compare (7-step vs 3-step), Cut 07 Radical (3 steps, "the delta IS the onboarding"). |
| `cuts/08-liminal-custody.html` | Natsec-register custody view (DoD/IC audience) |
| `cuts/09-osint-custody.html` | **OSINT Custody — wired to the real kernel.** Runs INGEST→READ→GUARD→REVIEW→VAULT live in-browser via `lib/osint-kernel.bundle.js` (real loop, recomputed each run). Custody/DISCORD register toggle. Displays a **recorded** Kafka + Algorand provenance snapshot from `lib/osint-run.json` (current: localnet, not publicly verifiable) — see "OSINT Custody" §below. |
| `cuts/10-today.html` | Today · re-entry — the loop closes; held compositions re-read overnight (renamed from `09-today` on 2026-06-11 to resolve a slot collision) |
| `cuts/11-govern.html` | **AI Spend Control Workstation.** The operator-first enterprise seam: inspect a sanitized illustrative 350K-credit workspace source without guessing, supersede a prior revision and show the exact typed delta, disposition cited offline analyst/auditor drafts, retain 500 contract, 494 directory-derived, and 501 vendor-admin as independent observations with no winner, export a conserved 260K-credit accepted-usage allocation for external Finance review against a separate 350K budget, bind before-state evidence to a same-user concentration control, then require fresh after-state evidence before calling it verified. Uses `cuts/ai-spend-workstation-demo.json`, a metadata-only fixture with no customer data or PHI. Credits never render as currency; planning never renders as application; application never renders as verification. |
| `cuts/_template.html` · `cuts/_console.html` · `cuts/_explore/` | Internal tooling: `_template.html` is the starting shape for a new cut; `_console.html` is the **Substrate Console** — a complete directory of every surface (jump) plus all live cuts side-by-side as a click-to-load coherence scan (survey), with a working-tree banner fed by the dev server's `/__state` endpoint so parallel sessions see each other's in-flight work; `_explore/ledger-directions.html` is an active exploration of the provenance chain as a decision ledger (three directions — Spine / Sealed Stack / Anchor Strand). Retired cuts and frozen baselines live in `cuts/_archive/` (incl. `root-experiments/` — frozen `index-v0.3.7`/`v0.4` + the ontology-agent-travel 3D series). |
| `lib/osint-kernel.bundle.js` | Browser build of the `liminal-test` custody kernel. Real deliberation + 7-layer structural guard + review-rule re-rank, no backend. **Frozen artifact** — `liminal-test` source is no longer in the workspace, so `npm run build:kernel` can't currently regenerate it (see "OSINT Custody" §below). |
| `molehunt/index.html` | Counterintelligence analyst console (self-contained, high-assurance) |
| `team-drift/index.html` | Team coherence telemetry (governance-as-pipe) |
| `design-system/tokens/design-tokens.css` | The token file the cuts link — a **synced consumer copy** of the upstream canon at `liminal-creative/tokens/design-tokens.css` (see "lockstep-canon contract" §below). Don't edit values here; run `npm run tokens:sync` to pull from canon, `npm run tokens:check` to verify (CI guard). |
| `lib/cut-shell.css` | Frame chrome + slate/tray + audit ribbon + classification + boot animations. (Also carries a `:root` ink-token fallback block that must track canon — re-sync on any ink-token change, else it shadows the linked tokens.) |
| `lib/brand-upgrade.css` | Brand fonts (PerfectlyNineties + NinetiesHeadliner) + type hierarchy |
| `design-system.html` + `design-system/` | Design tokens browser, type ramp, motion specimens |
| `server.mjs` | Zero-dependency dev server with live reload |
| `FRONT_DOOR_DECISION_2026-05-12.md` | Historical front-door decision, superseded for active routing on 2026-07-11 by the AI Spend workstation |
| `embed-*.html` | Embeddable demos (Tray + Slate, agent hackathon cut, vault) |

## The lockstep-canon contract

Every Liminal product surface consumes **one** token vocabulary, so a brand change lands everywhere from a single edit. The contract — stated since 2026-04-07 in the token-file header — is:

> *"Every product surface (this prototype, the marketing site, the Tauri desktop client, future mobile, etc.) consumes the canonical token set — and ONLY that set."*

**The canon topology (verified 2026-06-11):**

```
            liminal-creative/tokens/design-tokens.css
            ─────────────────────────────────────────
                    upstream canon (superset)
              named chrome + iridescent content +
              paper aliases + 12-wheel tonal scales

                    │            │            │
        ┌───────────┘            │            └───────────┐
        ▼                        ▼                        ▼
  liminal-prototype       liminal-desktop          (marketing site,
  design-system/          public/styles/            future mobile)
  tokens/design-          design-tokens.css
  tokens.css              ← in sync w/ canon
  ← synced 2026-06-11       (verified, 0 drift)
```

**Single-source consumption is the contract; sync is the discipline that enforces it.**
The honest status as of 2026-06-11 (stated at the layer actually measured):

- `liminal-desktop`'s linked CSS (`public/styles/design-tokens.css`) matches the upstream canon at the **file-diff** layer — zero value drift, no missing tokens (verified by full token-set diff; *not* render-verified — render depends on each surface's load order, see next bullet).
- This prototype's canonical token file (`design-system/tokens/design-tokens.css`) and the `lib/cut-shell.css` fallback were synced forward from canon on 2026-06-11 (`--text-faint` a11y value + `--paper-*` aliases).
- **Known render-layer override (not yet reconciled):** `lib/brand-upgrade.css` — loaded *after* the canonical tokens on index + cuts 01/08/09 — declares its own warm ink axis (`--text: #F2F0EC · --text-mid: #C4C0B8 · --text-dim: #847F79 · --text-faint: #504C47`) that **wins the cascade**. So on those surfaces the *rendered* ink scale is brand-upgrade's, not canon's — i.e. file-level lockstep does not equal render-level lockstep here. Whether that warm axis is the intended brand register or should be reconciled to canon (incl. the `--text-faint` a11y value) is an open founder/design call. **This is the concrete proof that the lockstep is sync-discipline, not by-construction** — a last-loading override silently shadows the canonical value; codegen + a single ink source is the roadmapped fix.
- **Re-derived parallel systems (Panda CSS, Tailwind, etc.) are the contract's other weak point.** `liminal-desktop` uses Panda (`panda.config.ts`); its tokens must mirror canon and re-sync on every change. Panda's `--text-faint` mirror was re-synced at source 2026-06-11 (verified: `panda codegen` regenerates `--colors-frontier-text-subtle: #6B6862` in the generated `styled-system/`, stale value gone).

### Implications for downstream maintainers

- **Adding a new visual primitive?** It lands here first (`cuts/_template.html` for new cut shapes, or `lib/cut-shell.css` for shared component classes). Downstream surfaces consume on next deploy.
- **Changing a token value?** It lands here. All consumers update simultaneously on next page load.
- **Need a divergent treatment for a specific audience?** Build a new cut (e.g., cut 08 natsec). Cuts are how this canon serves multiple audiences without forking the substrate.
- **Anointment cycles (v0.9.0 / v0.9.1 / v0.9.2 / v0.9.3)** happen on cuts in this repo. Each anointment is per-cut, scoped to that cut's `<style>` block, reversible by deleting the named block. Locked moves promote to `lib/cut-shell.css` once stable across multiple cuts.

### Why this matters

The design intent is one substrate expressed through multiple surfaces without fragmenting the evidence contracts. This repository is a prototype catalog, not proof that every illustrated surface ships in one released application.

## Status: source and artifact reality

Honest line between what runs today and what is built-but-not-yet-wired or roadmapped. This catalog is a prototype; keeping the line explicit is the point.

| Capability | Status |
| --- | --- |
| Bounded-agent cuts · refusal-as-output | **Runs in this prototype**. This does not claim the same agent behavior is present in a released desktop artifact. |
| Packet contract · canonical hashing | **Implemented and tested in source** in the `agents-v1` substrate and consumed by `liminal-desktop`. Release status is separate. |
| Canonical token lockstep | **Verified at the source-file layer on the dated checks below.** This is not a claim of current rendered parity or release readiness. |
| AI Spend pilot vault · packet signing | **Implemented in the constrained desktop pilot source, not released.** Spend imports, normalized facts, receipts, and attachments use SQLCipher; keys stay in macOS Keychain behind operator authentication; Ed25519 packets export with an offline verifier. This is not a claim that every legacy desktop storage path is encrypted, or that a Developer ID signed and notarized customer artifact exists. |
| On-chain provenance (cut 09) | **Recorded snapshot** — a real custody run was anchored once (localnet, 2026-05-28); a publicly-verifiable testnet anchor is roadmapped. |
| Real model agents (desktop) | **Partial** — agent pipeline exists; desktop falls back to heuristic reads when no model client is wired. |

## Receipts

- **AI Agent Economy Hackathon (Apr 25, 2026):** Judge feedback called the *refusal-as-designed-output* framing "the most original architectural idea in the cohort."
- **NatSec Hackathon (Cerebral Valley × Palantir × USDoD × OpenAI):** Top 16 of 102 finalists. Architecture applied to defense use case — *do not automate the moral lever, equip the human holding it.*
- **a16z Speedrun SR007:** Applied May 6, 2026. Application ID `f952b90c-5099-4e3b-af17-555306085b7f`.

## Team

- **Shruti Rajagopal** — Founder, CEO. UC Berkeley (Cognitive Science + CS). PM at Asana, Cloudflare, Robinhood, Ancestry. Background in Jungian psychology and somatic practice.
- **Sean Nejad** — CTO. Security and trust-boundary architecture. 11-year collaborator.

## Run locally

```bash
npm run dev
```

Open <http://localhost:5173>. Live-reloads on any `.html` / `.css` / `.js` change.

## OSINT Custody — the real kernel (live), recorded infra (snapshot)

Two distinct claims here; keeping them separate is the honest framing.

**The kernel loop runs live, client-side — this is real, not a scripted mock.**
`cuts/09-osint-custody.html` imports `lib/osint-kernel.bundle.js` and runs the full loop
(six bounded specialists → 7-layer structural guard → competing hypotheses → review-rule
re-rank → vault/audit) in the browser, recomputing verdicts on every run. The bundle was
built from the custody kernel in the sibling `liminal-test` repo.

> **Reproducibility note:** `liminal-test` is no longer in the workspace, so
> `npm run build:kernel` cannot currently regenerate the bundle from source — the committed
> `lib/osint-kernel.bundle.js` is a frozen artifact. Restore the `liminal-test` source (or
> re-vendor the kernel) before relying on a rebuild.

**The Kafka + Algorand provenance the cut displays is a recorded snapshot, not a live feed.**
The infra tier (Redpanda + an Algorand anchor) cannot run inside a static page; it was run
once in `liminal-test`, which wrote `lib/osint-run.json` (current snapshot: localnet,
2026-05-28). Cut 09 reads that file and renders the recorded Kafka offsets and Algorand txid.
Because the snapshot is **localnet**, the txid only resolves against the runner's own node —
it is not publicly verifiable, so the cut renders it as static text (no explorer link) and
does not badge it "verified." A public-`testnet` run would produce a verifiable txid and an
explorer link; that is roadmapped, not yet done.

To regenerate the snapshot (requires the `liminal-test` source restored):

```bash
cd ../liminal-test
docker compose up -d            # Redpanda (Kafka API broker)
algokit localnet start          # local algod/kmd/indexer  → localnet anchor (not publicly verifiable)
bun run infra:local             # custody loop → Kafka round-trip → Algorand LOCALNET anchor
# Or, for a publicly-verifiable anchor (needs a funded account):
bun run infra                   # → testnet · writes lib/osint-run.json · txid resolves on algonode explorer
```

Switch networks with `LIMINAL_ALGO_NETWORK=localnet|testnet`.

## License

MIT.

---

*Liminal gives form to inner life.*

<https://theliminalspace.io>
