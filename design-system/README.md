# Liminal · design system

> Status: hardening · 2026-04-28
> Owner: design canon · Liminal Space
> Source of truth: `tokens/design-tokens.css`

## What this is

The canonical design system for Liminal Space. Every product surface
(this prototype, marketing site, future Tauri desktop client, mobile
when it ships) imports tokens and components from here.

## Structure

```
design-system/
├── tokens/
│   ├── design-tokens.css            single source · 12-wheel canon
│   ├── token-contract.md            how to consume · naming rules
│   └── relationship-axis.md         the 5-axis system principle
│
├── components/                      reusable component CSS · contract-bound
│   ├── _foundations.css
│   ├── buttons.css
│   ├── inputs.css
│   ├── selection-controls.css
│   ├── tags-badges-avatars.css
│   ├── tabs-segmented-nav.css
│   ├── tooltips-popovers.css
│   ├── modals-drawers.css
│   ├── banners-toasts-alerts.css
│   ├── empty-loading-skeleton.css
│   ├── liminal-marginalia.css
│   ├── desktop-shell.css            (P1)
│   ├── slate-tray-vault.css
│   └── audit-classification.css
│
├── docs/
│   ├── design-system.html           the canon · narrative · expressive
│   ├── presentation.html            (P2) engineer-facing spec view
│   ├── accessibility.html           contrast · keyboard · ARIA · motion
│   ├── desktop-primitives.html      (P1) shell · command palette
│   ├── product-surfaces.html        (P1) slate · tray · vault narrative
│   └── relationship-axis.md         the 5-axis principle (markdown)
│
├── fixtures/
│   ├── component-states/            one html per component · all states
│   ├── relationship-views/          (P1) per-relationship rendering
│   ├── density-modes.html           (P1) every component × 3 densities
│   ├── light-theme.html             (P1) every component on cream
│   ├── reduced-motion.html          (P1) all animations disabled
│   └── regression-cases.html        (P2) edge cases · long text · narrow
│
└── README.md                        this file
```

## The 5-axis model

Every surface declares its body with up to five attributes:

| Axis | Required? | Values |
|---|---|---|
| `data-product` | yes | `personal` · `team` · `business` |
| `data-density` | optional (product-default) | `anointed` · `shared` · `analyst` |
| `data-role` | optional | per-product enum |
| `data-clearance` | optional | consent-class or classification level |
| `data-relationship` | optional | `self` · `peer` · `cofounder-mutual` · `direct-report` · `advisor` · `institutional-subject` · `self-as-subject` · `oversight` · `public` |

See `tokens/relationship-axis.md` for the full principle.

## Who edits what

| Author | Writes | Reads |
|---|---|---|
| **Founder · Creative Director** | `tokens/design-tokens.css` (canon edits) · `docs/design-system.html` (narrative) | everything |
| **Component author** | `components/{name}.css` (one file per component) · contract block at top | tokens · `relationship-axis.md` |
| **Surface author** | a product surface (a page · a Tauri view) consumes tokens + components, declares its 5-axis body | tokens · components · contracts |
| **Fixture author** | `fixtures/{name}.html` (regression baselines) | components · relationship matrix |

## Canon discipline

- **Don't add new hues.** The 12-wheel is canon. Locked 2026-04-15. Brand 3 (clarity, wholeness, vitality) locked the same day. New colors only via brand-canon update.
- **Don't redefine tokens in component CSS.** Components consume tokens · they don't author tokens.
- **Don't use raw hex in components.** Hex appears only in the canon for documentation purposes (the migration before/after, the brand 3 callout). Components use functional bindings.
- **Don't fork.** A consuming surface adds layout + typography overrides. It does not maintain its own copy of tokens.
- **Don't scale type or radius.** Density only scales spacing.

## Versioning

Token canon: see docblock in `design-tokens.css` for canon-current date.
Component-level: each component file's contract block carries its own version.
Design-system docs: changelog at the bottom of `design-system.html`.

## How to consume

For any new product surface, in HTML:

```html
<link rel="stylesheet" href="path/to/design-system/tokens/design-tokens.css">
<link rel="stylesheet" href="path/to/design-system/components/buttons.css">
<link rel="stylesheet" href="path/to/design-system/components/inputs.css">
<!-- ...whichever components the surface needs -->

<body data-product="business"
      data-density="analyst"
      data-role="analyst"
      data-clearance="ts-sci"
      data-relationship="institutional-subject">
  <!-- surface content uses component classes -->
</body>
```

That's it. No build step, no preprocessor, no token transformation.

## Future · canonical home

This directory currently lives inside the prototype repo at
`liminal-prototype/design-system/`. As Liminal moves to a monorepo
or shared package, this directory moves up — to the org root or
a `@liminal/design-system` package — without internal-path changes.
The contract in this README stays the same.

## License

MIT · Liminal · 2026.
