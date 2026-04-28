# Token contract · how to use design-tokens.css

> Source of truth: `design-system/tokens/design-tokens.css`
> Last updated: 2026-04-28
> Owner: design-system canon

## The contract

This file is the only token file Liminal product surfaces import. Every consuming surface (the prototype, the marketing site, the future Tauri desktop client, mobile, anywhere Liminal renders) imports this file — and only this file — to receive the canonical color · type · spacing · motion system.

```html
<link rel="stylesheet" href="../tokens/design-tokens.css">
<!-- that's it -->
```

Each consuming surface adds its own *typography overrides* and *layout*, but never redefines the tokens here.

## The five axes · what to declare on body

Every surface declares its body with up to five attributes. Only `data-product` is required; the others have product-default fallbacks.

```html
<body data-product="..."         <!-- required: personal | team | business -->
      data-density="..."         <!-- optional: anointed | shared | analyst -->
      data-role="..."            <!-- optional: per-product enum -->
      data-clearance="..."       <!-- optional: consent-class | classification-level -->
      data-relationship="...">   <!-- optional: per-axis-16 enum -->
```

If `data-density` is omitted, the product determines the default:

| Product | Default density | Scale |
|---|---|---|
| `personal` | `anointed` | 1.10 |
| `team` | `shared` | 1.00 |
| `business` | `analyst` | 0.85 |

This is set automatically by `body[data-product="..."]:not([data-density])` rules in the tokens file.

## The four naming conventions

When you author component CSS, follow these conventions in order of preference:

### 1 · Functional UI bindings (prefer)

For production components, use functional bindings. These name *what a UI surface is*, not *what hue it uses*.

```css
/* CORRECT */
.btn-primary {
  color: var(--ui-action-primary);
  background: var(--ui-action-primary-bg);
  border-color: var(--ui-action-primary-border);
}
.alert-error {
  color: var(--ui-state-error);
  background: var(--ui-state-error-bg);
}
.live-indicator {
  background: var(--ui-status-live);
}
```

The full set of functional bindings:
- `--ui-action-{primary|secondary|destructive}` (and `-hover`, `-active`, `-bg`, `-border` variants)
- `--ui-state-{error|success|warning|info}` (and `-bg`, `-border`)
- `--ui-status-{live|watch|alarm|idle|done}`
- `--ui-focus-ring`, `--ui-focus-bg`, `--ui-selection`
- `--ui-link`, `--ui-link-hover`, `--ui-link-visited`
- `--ui-brand-{primary|secondary|accent}`
- `--ui-ambient-{wash|deep|glow}`
- `--ui-role-{self|peer|cofounder|analyst|reviewer|subject|oversight}` (axis 15)
- `--ui-relationship-edge` (axis 16 · derived from body)
- `--ui-capability-{allowed|restricted|forbidden|review|joint}` (axis 17)

### 2 · Register vocabulary (for brand moments)

For *explicit brand moments* — the colophon, the wheel, the brand 3 triptych, the Liminal Pink moments — use the register words. These are the 12 register-words mapped 1:1 to the 12-wheel:

```css
/* CORRECT for explicit brand moments */
.brand-mark {
  color: var(--clarity);            /* brand primary · third eye */
}
.liminal-pink-moment {
  color: var(--wholeness);          /* brand secondary · the moat */
}
.mystic-margin {
  border-left: 2px solid var(--judgment);  /* legitimate brand register use */
}
```

The 12 registers (in wheel order):
- `--alarm` (0°), `--surge` (30°), `--vital` (60°), `--watch` (90°)
- `--synthesis` (120°), `--signal` (150°), `--outreach` (180°), `--ambient` (210°)
- `--depth` (240°), `--diligence` (270°), `--liminal` (300°), `--judgment` (330°)

Each has the full alpha family: `-faint`, `-bg`, `-tint`, `-soft`, `-edge`, `-glow`, `-strong`.

### 3 · Tonal scales (for fine-grained control)

When a register's alpha aliases aren't enough, reach for the 10-stop tonal scale. Stops 50-900, 500 = base.

```css
/* CORRECT for fine control */
.surface-with-deep-fill {
  background: var(--clarity-700);   /* darker than the alpha aliases provide */
}
.text-on-cream {
  color: var(--clarity-800);         /* deep clarity · readable on light bg */
}
```

### 4 · Canonical hue names (for canon documentation only)

Use the canonical hue names (`--stability`, `--vitality`, `--coral`, etc.) only in documentation, design-system pages, and demo content. Never in production component CSS.

## What NOT to do

```css
/* WRONG · raw hex */
.btn { background: #8E66FB; }

/* WRONG · legacy alias in production */
.btn { background: var(--accent); }

/* WRONG · semantic state alias for actual hue */
.live { color: var(--good); }

/* WRONG · canonical hue in production */
.error { color: var(--stability); }

/* WRONG · density not respected */
.card { padding: 16px; }
```

## What TO do

```css
/* CORRECT */
.btn-primary {
  padding: calc(var(--space-2) * var(--density-scale))
           calc(var(--space-3) * var(--density-scale));
  color: var(--ui-action-primary);
  background: var(--ui-action-primary-bg);
  border-radius: var(--radius-2);
  font: var(--fs-mono-sm)/1 var(--mono);
  transition: color var(--tx-base) var(--ease);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--ui-focus-ring);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .btn-primary { transition: none; }
}
```

## Density rule

**Only spacing tokens scale.** Type sizes and radius do not.

```css
/* CORRECT */
.card {
  padding: calc(var(--space-3) * var(--density-scale));
  gap: calc(var(--space-2) * var(--density-scale));

  /* unscaled · stable across densities */
  font-size: var(--fs-base);
  border-radius: var(--radius-3);
}

/* WRONG · scaling type */
.card-wrong {
  font-size: calc(var(--fs-base) * var(--density-scale));
}

/* WRONG · scaling radius */
.card-wrong-too {
  border-radius: calc(var(--radius-3) * var(--density-scale));
}
```

## Relationship rule

When a component renders differently depending on the operator's relationship to the subject, **the component reads `body[data-relationship]` from the surface**. The component does not invent its own relationship state.

Refer to `design-system/docs/relationship-axis.md` for the full per-relationship matrix.

## Adding a new component

1. Create `design-system/components/{name}.css`
2. Write the contract block at the top (see `relationship-axis.md` for format)
3. Use functional UI bindings (axis 1) for production states
4. Multiply spacing by `var(--density-scale)`
5. Declare keyboard, ARIA, refusal copy in the contract
6. Render relationship-variants in fixtures: `design-system/fixtures/component-states/{name}.html`

## Adding a new token

Don't. The 12-wheel is canon. New colors only by interpolating between adjacent hues, and only with a brand-canon update.

If you need a *new functional binding* (e.g., `--ui-state-loading`), that's allowed — bind it to an existing wheel hue + stop combination. Document it here.

## Versioning

The tokens file's docblock has the canon-current date. Increment the date when:

- A new wheel hue is added (very rare · brand-canon update only)
- A new functional UI binding is added
- A token's terminal value changes (visual breaking change)
- A new axis is added (axis 16 · `data-relationship` was the last)

Don't increment for:

- Comment changes
- Internal documentation
- Migration aliases (those preserve back-compat)
