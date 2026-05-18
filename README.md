# Liminal Agents — prototype

**Live demos: <https://liminalshruti.github.io/liminal-prototype/>**

This is the public prototype surface for **Liminal** — judgment infrastructure for founders running multi-agent systems.

The core claim: when anyone can build, the bottleneck moves from output to **judgment**. Liminal is the substrate where that judgment gets recorded, corrected, and compounded.

## The product loop

1. **Tray** — drag a window, doc, transcript, or session in. No pipes. No integrations. The Tray is the substrate the operator's other tools enter.
2. **Bounded agents** — twelve specialists read what's there. They disagree. Out-of-lane agents refuse and name the right one.
3. **Correction** — when you push back, the semantic delta becomes first-party data.
4. **Vault** — local-first, encrypted. Every session, every correction, signed and searchable. The record is the moat.
5. **Next move** — one signed packet. One thing the founder can stand behind.

## Why this matters

Frontier labs ship omniscience. Liminal ships **refusal**.

Bounded agents that say "that's not my ground, talk to the Healer" increase trust, not decrease it. Refusal as designed output is the architectural answer to the "agent hallucinates capability" problem.

Better models don't erode this. They deepen it — higher-resolution reads produce more interesting disagreements, which produce richer corrections, which compound in the vault.

## What's in this repo

This is a **single-file prototype catalog** — public, click-able embodiments of the four loops above PLUS the **canonical visual substrate** that every Liminal product surface consumes.

| File | What it is |
| --- | --- |
| `index.html` | The cuts catalog — single self-contained file (HTML + CSS + JS, no build step) |
| `cuts/01-slate-tray.html` | **Canonical front door** (per `FRONT_DOOR_DECISION_2026-05-12.md`) — slate-tray-vault workspace, brand-first hero |
| `cuts/01-slate-tray-speedrun.html` | Same workspace, Speedrun-register hero — for direct partner sends |
| `cuts/00-hero-demo.html` | Hero / single-scenario doc-shape (Tuesday Speedrun call) |
| `cuts/02-forensic-agent.html` | Forensic agent · contradicting-notification diligence loop (v0.3) |
| `cuts/03-calibration.html` | 12wk × 4-register vault heatmap (the moat made visible) |
| `cuts/04-07-onboarding-*.html` | First-touch onboarding variants (default + argument + compare + radical) |
| `cuts/08-liminal-custody.html` | Natsec-register custody view (DoD/IC audience) |
| `design-system/tokens/design-tokens.css` | **The canonical token file** — every product surface imports this |
| `lib/cut-shell.css` | Frame chrome + slate/tray + audit ribbon + classification + boot animations |
| `lib/brand-upgrade.css` | Brand fonts (PerfectlyNineties + NinetiesHeadliner) + type hierarchy |
| `design-system.html` + `design-system/` | Design tokens browser, type ramp, motion specimens |
| `server.mjs` | Zero-dependency dev server with live reload |
| `FRONT_DOOR_DECISION_2026-05-12.md` | Lock: cut 01-canon is the single front door for all audiences |
| `embed-*.html` | Embeddable demos (Tray + Slate, agent hackathon cut, vault) |

## The lockstep-canon contract

This repo is **the canonical visual substrate for all Liminal product surfaces**. The contract — stated since 2026-04-07 in the header of `design-system/tokens/design-tokens.css` — is:

> *"Every product surface (this prototype, the marketing site, the Tauri desktop client, future mobile, etc.) imports this file — and ONLY this file."*

**What that means concretely:**

```
                liminal-prototype  (this repo)
              ──────────────────────
                  canonical source
                                                                                                                    
              - design-system/tokens/design-tokens.css
              - lib/cut-shell.css
              - lib/brand-upgrade.css
              - cuts/* (visual canon)

                    │            │
        ┌───────────┘            └───────────┐
        ▼                                    ▼

  desktop-pilot                       liminal-desktop
  (active product · M2.0/M2.1)        (production substrate · Tauri prod)
                                                                                                                    
  imports the canonical CSS           imports the canonical CSS
  directly via index.html             directly via Tauri webview
  link tags                           link tags
                                                                                                                    
  components consume the same         components consume the same
  classes (.stage, .frame,            classes
  .slate-area, .audit-ribbon,
  .verdict-band, etc.)
```

**Drift prevention by construction.** Both downstream surfaces consume the same source. Any update here propagates to both on next page load / next deploy. There is no "pilot's copy of the canon vs. desktop's copy" — only the canon, and surfaces that import it.

**Re-derived parallel systems (Panda CSS, Tailwind, etc.) violate this contract.** If a downstream surface needs its own token system for build-tool reasons, the tokens must mirror this repo's `design-tokens.css` exactly and re-sync on every canon change. Single-source consumption is the preferred path.

### Implications for downstream maintainers

- **Adding a new visual primitive?** It lands here first (`cuts/_template.html` for new cut shapes, or `lib/cut-shell.css` for shared component classes). Downstream surfaces consume on next deploy.
- **Changing a token value?** It lands here. All consumers update simultaneously on next page load.
- **Need a divergent treatment for a specific audience?** Build a new cut (e.g., cut 08 natsec). Cuts are how this canon serves multiple audiences without forking the substrate.
- **Anointment cycles (v0.9.0 / v0.9.1 / v0.9.2 / v0.9.3)** happen on cuts in this repo. Each anointment is per-cut, scoped to that cut's `<style>` block, reversible by deleting the named block. Locked moves promote to `lib/cut-shell.css` once stable across multiple cuts.

### Why this matters

The architectural discipline is the moat. Liminal isn't shipping one product — it's shipping a substrate that ships AS multiple surfaces (desktop pilot, Tauri prod, future mobile, marketing site, natsec custody) without fragmenting. Single-source canon + cut-shape-appropriate consumption is what makes the portfolio coherent. The lockstep contract is what keeps it that way.

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

## License

MIT.

---

*Liminal gives form to inner life.*

<https://theliminalspace.io>
