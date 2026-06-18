# Archive Import Execution Check — `v0_3_config.js`

*Branch: `docs/verify-archive-import-execution-2026-06-18` · 2026-06-18 · Verification only, no deletions.*

> **Resolves the open question from `V0_3_CONFIG_STAGE1_FINDINGS.md` and the PR #25 handoff:**
> *do the frozen archive files actually execute their `v0_3_config.js` imports?*
> **Answer: NO. The archive imports cannot resolve — the path 404s. The re-export facade
> was never load-bearing for the archives.** This corrects a session-long assumption.

---

## The question

Stage 1 cleanup was gated on whether the two frozen archive files import live from
`v0_3_config.js` (which would make the re-export facade load-bearing and Group C unsafe to
delete), or whether they are inert historical files.

## The finding (evidence-based)

The archive files **do** contain real ES-module imports — but they resolve to a
**non-existent path**, so loading them fails at module-fetch time, before any export name
is consulted.

### Static evidence
- `cuts/_archive/root-experiments/index-v04-frozen.html` line 705 and
  `index-v036-frozen.html` line 1218 each contain, inside a live `<script type="module">`:
  ```js
  import { SPEC_VERSION, PROTOTYPE_VERSION, PRODUCTS, ... } from "./v0_3_config.js";
  ```
- The path is `"./v0_3_config.js"` — **relative to the archive file's own directory**,
  i.e. it resolves to `cuts/_archive/root-experiments/v0_3_config.js`.
- **No such file exists.** `v0_3_config.js` lives only at the **repo root**. There is no
  copy under `cuts/_archive/`.

### Live HTTP evidence (dev server, `node server.mjs`)
| Request | Result |
|---|---|
| `GET /cuts/_archive/root-experiments/v0_3_config.js` (what the archive import resolves to) | **HTTP 404** |
| `GET /v0_3_config.js` (the real root file — *not* what archives import) | HTTP 200 |
| `GET /cuts/_archive/root-experiments/index-v04-frozen.html` (the archive page itself) | HTTP 200 (serves) |

So: the archive page loads, its module script runs, and its `import … from
"./v0_3_config.js"` **throws a 404 module-load error**. The imported names
(`ANNOTATIONS`, `BIDIRECTIONAL_ETHICS`, `PHASE_1_STATUS`, etc.) are never resolved — the
fetch fails first.

### Why (git history)
`index-v04-frozen.html` / `index-v036-frozen.html` were **root-level index files** moved
into `cuts/_archive/root-experiments/` during the "Agency design canon + consolidation"
fold (commit `aae0945`). At the root, `./v0_3_config.js` resolved correctly. **The
directory move broke the relative path** — and it went unnoticed precisely because the
archives are retired and never loaded.

### Commands run (reproducible)
```bash
# static: confirm import is in a live module script + path
grep -n 'from "./v0_3_config.js"' cuts/_archive/root-experiments/index-v04-frozen.html
ls cuts/_archive/root-experiments/v0_3_config.js   # → does not exist

# live: 404 over HTTP
node server.mjs &                                  # dev server on :5173
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/cuts/_archive/root-experiments/v0_3_config.js  # → 404
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/v0_3_config.js                                  # → 200
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/cuts/_archive/root-experiments/index-v04-frozen.html  # → 200 (serves)
```

## Conclusion

**The frozen archives are inert: they serve as static HTML, but their JavaScript dies at
the first import (404) regardless of what `v0_3_config.js` exports.** They are
historical-record files that no longer execute. The re-export facade in `v0_3_config.js`
provides them **no** protection — they cannot reach the file.

## What this corrects

`V0_3_CONFIG_STAGE1_FINDINGS.md` concluded "leave Group C inline — the archives import it,
so deletion would break them." **That premise is false.** The archives can't import it
(path 404s). Therefore:

| Prior (STAGE1_FINDINGS) | Corrected |
|---|---|
| Group C is an honest archive dependency → leave inline | **Group C has no functional consumer** — the archive imports are dead (404). As deletable as Group D. |
| Re-export facade protects archives | Re-export protects only the **live** consumers (state/boot/slate/keyboard) for *extracted* symbols. Archives get nothing from it. |
| `ANNOTATIONS` reclassified to Group C (archive imports it) | The archive `import` is dead; `ANNOTATIONS` has **no working consumer** anywhere. |

## Implication for cleanup (NOT executed here)

- **Group D (14 dead exports):** unchanged — safe to delete (0 consumers, confirmed).
- **Group C (8 archive-only exports):** **now also safe to delete** — their only "consumers"
  are archive imports that 404. Deleting them does not change behavior of anything that
  runs.
- **The `v0_3_config.js` re-export lines** for *extracted* symbols (versions, consent,
  personal, team, business) still matter for **live** consumers and must stay until those
  consumers are confirmed re-pointed (they are). Archives are irrelevant to them.
- **The broken archive imports themselves** are a separate, pre-existing latent issue (the
  archives don't run) — out of scope here; noted for the record.

## Boundaries

- No deletions performed.
- No Group C/D removal.
- No archive-file edits (the broken imports are left as-is — archives stay frozen).
- No runtime/cuts/slate changes.
- Verification + documentation only.
