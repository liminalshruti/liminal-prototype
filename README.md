# liminal-prototype

Public, click-able, interactive prototype for Liminal Agents — the bounded multi-agent system from the [AgentHansa AI Agent Economy Hackathon](https://luma.com/jmfpws97) submission, Apr 25 2026.

This isn't the production product. It's a single-file embodiment of the four loops:

1. **Refusal** — agents out of lane refuse and name the right one
2. **Deliberation** — three (or more) bounded specialists read the same task and disagree
3. **Correction** — when you push back, the semantic delta becomes first-party data
4. **Vault** — corrections compound; the record is the moat

## Run locally

```bash
npm run dev
```

Open <http://localhost:5173>. The server live-reloads on any `.html` / `.css` / `.js` change in this directory.

## What's here

- `index.html` — the whole prototype, single self-contained file (HTML + CSS + JS, no build step)
- `server.mjs` — zero-dependency dev server with SSE-based live reload
- `_baseline/` — design baselines from earlier iteration passes

## Conventions

- No banned words: transformation, journey, companion, unlock, manifest, healing, optimize, breakthrough, flourishing, wellness, emotional intelligence, empathic
- No em dashes
- Brand sentence: *Liminal gives form to inner life.*

## Related

- Hackathon plugin (Claude Code skill, MIT): <https://github.com/liminalshruti/liminal-agents>
- Desktop client: ships May 12, separate repo
- Founder brain: see `~/liminal/founder-brain/` (not public)

MIT-licensed.
