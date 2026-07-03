---
id: liminal-prototype.agent-loops
type: repo.loop-pack
status: active
owner: shruti
created: 2026-06-30
parent: ~/liminal/founder-brain/ops/strategy-control-plane/08_PARALLEL_LOOP_ORCHESTRATION_2026-06-30.md
---

# Agent Loops — liminal-prototype

## Repo context

This is the **public demo surface + design-system reference**. Live at `liminalshruti.github.io/liminal-prototype/`. Houses the canonical `design-tokens.css` until reorg moves it to liminal-creative/tokens/. Stack: HTML/CSS + light build.

**Critical constraint:** This is a PUBLIC surface. Control loops must flag anything that would expose private/internal information (internal design docs, unreleased product info, private paths, credentials). Demo inventory and token drift are load-bearing because design tokens are canonical for the system.

## Parallelization model

**Read-only loops run in parallel.** Build loops run one-at-a-time, per repo.

- All `control` loops below are read-only and write ONLY to `docs/agent-loops/reports/`.
- Launch the whole read-only fleet simultaneously.
- Build loops (if any) are defined in `WRITE_QUEUE.md` and must run serially.

## Control loops (read-only, parallel-safe)

Each control loop:
- Reads code/docs only (no product changes)
- Writes a single report to `docs/agent-loops/reports/<loop-name>.md`
- Carries the loop-spec preamble: "optimize for convergence, not seeming productive…"
- Conforms to `~/liminal/founder-brain/ops/strategy-control-plane/07_LOOP_SPEC_TEMPLATE.md`

Concrete control loops defined in `control/`:

### 1. demo-inventory.md
**Objective:** Catalog all live demos, verify they run without errors, identify stale/partial implementations.

Reads: `index.html`, `cuts/*.html`, `_scratch/`, design-token dependencies.
Writes: `reports/demo-inventory.md`.

Acceptance: all demos cataloged, status assigned (green / yellow / red), blockers named.

### 2. design-token-drift-check.md
**Objective:** Audit `design-tokens.css` for drift vs. canonical design system (liminal-creative/canon/DESIGN_SYSTEM.md). Flag any tokens not aligned with the official palette / type scale / motion.

Reads: `design-tokens.css`, `~/liminal/liminal-creative/canon/DESIGN_SYSTEM.md`, `.css` files consuming tokens.
Writes: `reports/design-token-drift-check.md`.

Acceptance: all drift points listed with severity, recommended fixes named, ready-to-edit decision.

### 3. public-safety-scan.md
**Objective:** Flag any content on the public demo that should not be public: internal file paths, unreleased product info, private email addresses, founder-only research, confidential positioning, or credentials.

Reads: all HTML + CSS in the public tree, README docs.
Writes: `reports/public-safety-scan.md`.

Acceptance: full sweep done, all flagged items listed with exposure severity (critical / high / medium / low).

### 4. link-health-and-a11y.md
**Objective:** Verify all links in demos resolve and all a11y attributes (alt text, aria labels, color contrast) meet baseline standards.

Reads: HTML markup, CSS, any linked external sources.
Writes: `reports/link-health-and-a11y.md`.

Acceptance: all links tested, status reported (live / dead / redirect), a11y gaps named.

## Write queue

See `WRITE_QUEUE.md` for serialized build items (if any are ready). This repo is lower-stakes than desktop/agents-v1, so build items are founder-defined; loops do not invent write work.

## Loop state and registry

Loop STATE (proposed / ready / active / blocked / completed) lives in `~/liminal/founder-brain/ops/strategy-control-plane/04-LOOP_REGISTRY.md`, not here. These files are contracts; the registry is the live tracker.

## Key constraints

1. **Public surface:** Do not ship anything that exposes non-public info.
2. **Design tokens are canonical:** Drift vs. liminal-creative canon is a blocker for readiness.
3. **No product changes from control loops.** Read-only on the public tree.
4. **One writer at a time if build loops run.** See WRITE_QUEUE for serialization.

## Reporting format

Every loop report must follow the template format in `07_LOOP_SPEC_TEMPLATE.md` (§ Final report format):

1. Summary
2. Files read
3. Files changed (all read-only = none for control loops)
4. Acceptance-criteria checklist
5. Verification results
6. Risks/gaps
7. Risk level (Low/Med/High)
8. Exactly ONE recommended next loop

---

For the orchestration model and launch checklist, see `~/liminal/founder-brain/ops/strategy-control-plane/08_PARALLEL_LOOP_ORCHESTRATION_2026-06-30.md`.
