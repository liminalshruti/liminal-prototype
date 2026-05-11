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

This is a **single-file prototype** — a public, click-able embodiment of the four loops above. It's not the production product (that ships in the desktop client, separate repo). This is the prior-art surface and the substrate referenced in the SR007 application.

| File | What it is |
| --- | --- |
| `index.html` | The full prototype — single self-contained file (HTML + CSS + JS, no build step) |
| `embed-slate-tray-demo.html` | Tray + Slate demo, embeddable |
| `embed-agent-hack.html` | Bounded agents demo (the AgentHansa hackathon cut) |
| `embed-vault-demo.html` | Local vault demo |
| `design-system.html` + `design-system/` | Design tokens, type ramp, motion |
| `server.mjs` | Zero-dependency dev server with live reload |

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
