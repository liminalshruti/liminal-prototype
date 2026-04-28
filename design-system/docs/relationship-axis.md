# Relationship-typed surfaces · the fifth axis

> Status: principle · 2026-04-28
> Owner: design-system canon
> Supersedes: prior 4-axis model (product · density · role · clearance)

## The principle

Most design systems handle RBAC (role-based access control). Liminal needs more: **relationship-typed surfaces**. The same component renders differently depending on the operator's *relationship to the subject* — not just their role.

This is the operationalization of two locked product canons:

- **Brand OS Canon v4** — "the operator's correction is the unit's doctrine"
- **v0.3.7 spec Decision 11** — "the runtime taxonomy is shape-stable across products"

Same primitives · different relationship · different rendering.

## The five axes

A surface (any HTML page rendering Liminal components) declares a five-tuple on its body:

```html
<body data-product="..."
      data-density="..."
      data-role="..."
      data-clearance="..."
      data-relationship="...">
```

| Axis | Values | Controls |
|---|---|---|
| `data-product` | `personal` · `team` · `business` | Top-level register · accent · scenario set |
| `data-density` | `anointed` · `shared` · `analyst` | Spacing-scale multiplier · spatial register |
| `data-role` | per-product enum | Operator's named role (manager · analyst · subject · oversight) |
| `data-clearance` | consent class OR classification level | Permitted reads · refused tiles · gate severity |
| `data-relationship` | `self` · `peer` · `cofounder-mutual` · `direct-report` · `advisor` · `institutional-subject` · `self-as-subject` · `oversight` · `public` | Operator's relationship to the subject being read |

The first four are role-based. The fifth — **relationship** — is about *who you are to the person being read*.

## Why relationship is distinct from role

A `manager` role and a `cofounder` role both produce *peer reads*, but the relationship determines:

- **Visibility** of refused tiles (mutual cofounders see each other's refusals; managers do not see direct-reports' refusals)
- **Symmetry** of corrections (mutual cofounders both write to the joint vault; managers write only to their own)
- **Audit-chain access** (subjects can request §552a(d) disclosure of their own read-history; managers can request only their own actions)
- **Refusal copy** (a manager hitting a consent gate sees "out of pattern-baseline-only consent"; a cofounder hitting a gate sees "mutual class · joint correction required")

Two managers can have different *relationships* to the same subject (one is a direct-report relationship, one is an advisor relationship). The component renders to the relationship, not the role.

## Relationship-typed views

For any non-personal scenario, the system supports up to five relationship-typed views of the same underlying data:

### 1 · Operator view (the read)
**Who sees:** the person doing the reading
**What they see:** the full slate · all tiles within their consent/clearance · the brief composed · their corrections · the audit chain of *their own actions* on this subject
**Default body:** `data-relationship="direct-report"` or `data-relationship="institutional-subject"` (depending on product)

### 2 · Subject view (the looked-at)
**Who sees:** the person being read
**What they see:** their consent class · what's been logged about them in the vault · the audit chain on themselves · timestamps of reads-by-whom · refusals registered against their consent · their own corrections (if mutual-class) · ability to request §552a(d)-style disclosure
**Default body:** `data-relationship="self-as-subject"` · `data-role="subject"`
**Critical:** the subject view never shows raw read-content from operators · only metadata (when read · by whom · what consent class · what disposition). The audit chain *is* the surface.

### 3 · Peer view (sanitized)
**Who sees:** a third person in the same product surface
**What they see:** sanitized · subject-anonymized where consent forbids · only their own slate context · reads about *other people* are not visible to them
**Default body:** `data-relationship="peer"`
**Critical:** the peer view is what makes Team-product safe at scale · "I'm on this team" doesn't mean "I see all reads about my teammates."

### 4 · Oversight view (audit-only)
**Who sees:** legal · audit · governance · compliance
**What they see:** the audit chain · timestamps · reads-by-whom · refusal events · escalations · WPA/PPD-19 compliance telemetry. **NOT the read content in most cases** · oversight is process-review, not content-review (with exceptions for legal hold)
**Default body:** `data-role="oversight"` · `data-relationship="oversight"`

### 5 · Public view (refused surface)
**Who sees:** anyone outside the consent boundary
**What they see:** Nothing · the surface refuses to render · explains the consent class · suggests the right escalation path
**Default body:** `data-relationship="public"`

## Implications for the component contract

Every reusable component (every file in `design-system/components/*.css`) declares its relationship matrix in its contract block:

```css
/*
 * Component: Slate Tile
 * Purpose: drag-source representing a live source / vault entry / classified document
 *
 * Relationship matrix (what each relationship-type sees):
 *   self                    | full content · all reads · drag · drop · correct · seal
 *   cofounder-mutual        | full content · all reads · drag · drop · joint-correct
 *   direct-report (operator)| filtered by consent_class · NOT subject's own corrections
 *   self-as-subject         | metadata only · audit chain · NO drag · NO drop · request-disclosure
 *   peer                    | hidden if subject is not self · or anonymized
 *   oversight               | metadata only · audit chain · NO drag · NO drop
 *   public                  | refused · surface explains why · escalation path
 *
 * Capability gates by clearance:
 *   personal/self           | (no gate · operator-equals-subject)
 *   pattern-baseline-only   | tile.requires_level <= 1
 *   shared-on-request       | tile.requires_level <= 2
 *   full-coherence          | tile.requires_level <= 3
 *   mutual-cofounder        | tile.requires_level <= 4 · joint-correction
 *   FOUO / Secret / TS-SCI  | tile.requires_level <= operator clearance level
 *
 * Tokens:
 *   --ui-role-{role}       (color of operator-self in this surface)
 *   --ui-relationship-edge (border accent reflecting relationship type)
 *   --ui-capability-{state}(allowed · restricted · forbidden · review · joint)
 *
 * ARIA:
 *   role="article" · aria-labelledby="..." · aria-describedby="..."
 *   when refused: aria-disabled="true" · aria-roledescription="refused tile"
 *
 * Keyboard:
 *   Space / Enter — pick up tile (drag analog)
 *   Arrow keys — move within slate when picked up
 *   Escape — drop / cancel
 */
```

## Implications for fixtures

Component-state fixtures multiply by relationship · not exhaustively (most cells degenerate) but for each component, document the cells where rendering meaningfully differs:

```
fixtures/
├── relationship-views/
│   ├── slate-tile/
│   │   ├── self.html
│   │   ├── cofounder-mutual.html
│   │   ├── direct-report-operator.html
│   │   ├── self-as-subject.html
│   │   ├── peer-anonymized.html
│   │   └── oversight-audit-only.html
│   ├── audit-ribbon/
│   │   ├── operator.html        (their own actions on subject)
│   │   ├── self-as-subject.html (everything done to them)
│   │   └── oversight.html       (everything · reads-by-whom · timestamps)
│   ├── consent-chip/
│   │   ├── operator.html        (consent class as gate · their view)
│   │   └── self-as-subject.html (consent class as policy · their permission)
│   └── ...
```

## Implications for the canon docs

Section 10 of `design-system.html` becomes **The operator/subject/peer/oversight matrix**. For one canonical scenario (Brian DRIFT in Team, or the CI insider-threat case in Business), render the same scenario four ways:

- Operator view (Kriti reading Brian · pattern-baseline-only)
- Subject view (Brian seeing his own audit chain)
- Peer view (Sean — Brian's teammate — sees: nothing about Brian)
- Oversight view (legal review of the read · audit chain visible · content not)

The row-by-row diff is the system claim made visible.

## Implications for the design-system page itself

The design-system page (the canon) renders by default as `data-relationship="self"` — the founder reviewing the canon for themselves. The marginalia, the "this is the canon" notes, the brand spectrum — all are operator-self register. Future versions of the page can switch relationships to demonstrate variants.

## Implications for engineering

Engineering needs to know:

- Every component reads `data-relationship` from `body` (or a closer ancestor)
- `data-relationship` value drives which capability tokens render and which are gated
- Refusal copy is relationship-typed · not just role-typed
- Audit chain access is relationship-typed
- Subject views are first-class · not edge cases

This is the canon. The build inherits it.

---

## What this preserves from prior canon

- 12-wheel · all 12 hues stable · brand 3 locked
- 12-register vocabulary · all stable
- Two-product fork → now refined to three-product fork (Personal · Team · Business)
- Decision 11 runtime taxonomy (decider · ingester · 3 deliberators) — the runtime is relationship-agnostic; surface is relationship-typed
- Bidirectional ethics · the fifth axis is precisely how "protect humans from machines AND machines/institutions from humans" gets surfaced

## What changes from prior canon

- The four-axis model (product · density · role · clearance) becomes five-axis (+ relationship)
- Component contracts grow a relationship matrix
- Fixtures grow a `relationship-views/` directory
- Subject view becomes first-class · §552a(d) is not a future feature, it's a system primitive
- Peer view becomes the safety frame for Team-product · sanitization is a default

## Ship order

1. **Now** — this document captures the principle (✓ shipped 2026-04-28)
2. **P0** — design-tokens.css gets `data-relationship` axis + capability + role tokens
3. **P0** — every component contract block grows a relationship matrix (where applicable)
4. **P1** — fixtures multiply by relationship · cell-by-cell for the components that meaningfully vary
5. **P1** — Section 10 of design-system.html · the matrix view
6. **P2** — the design-system surface itself can switch relationships for demo

---

This is the architectural principle. Code follows.
