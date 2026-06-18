# Legacy Positioning & Classification Notes

*Preserved 2026-06-18 from `v0_3_config.js` before deleting dead exports.*
*These are reference values with durable worth; the app does not consume them. Recoverable from git history regardless — this note keeps the *durable* pieces readable outside code.*

> Only the two pieces with lasting reference value are preserved here. The superseded
> positioning copy (`CATEGORY_CLAIM`, `CATEGORY_TAGLINE` — an earlier category noun,
> superseded by the current category framing) is **deliberately NOT preserved** — it is
> retired framing, and copying it forward would risk a future reader mistaking it for
> current positioning. It remains in git history if ever needed.

---

## Classification ladder (durable — the ordering)

The institutional classification ordering the Business-surface demo used, low → high.
Per Decision 12: when agents lack clearance, the tile is quarantined and the agency console
shows a routing line.

```
["unclass", "for-official-use", "secret", "top-secret", "ts-sci"]
```

Source: was `CLASSIFICATION_LADDER` in `v0_3_config.js` (deleted in the dead-export cleanup,
2026-06-18). 0 live consumers at deletion.

## Anti-positioning (durable — what Liminal is NOT)

The "not these categories" list — anti-positioning that remains broadly accurate:

```
["AI workspace", "therapy app", "productivity tool", "wellness product"]
```

Source: was `NOT_CATEGORIES` in `v0_3_config.js` (deleted 2026-06-18). 0 live consumers.
Note: the canonical, current anti-positioning lives in the brand canon
(`liminal-creative` / founder-brain), not here — this is the prototype's historical copy.

---

## NOT preserved (retired — in git history only)

- `CATEGORY_CLAIM` = "transition workspace for unresolved context" — **superseded** old
  category noun (predates the current category framing).
- `CATEGORY_TAGLINE` = "the cognitive surface that holds operators before their next step
  is clear" — **superseded** tagline.

These are retired positioning, not reference. Recoverable from git if a historical record
of the old framing is ever wanted.
