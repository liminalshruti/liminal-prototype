# Liminal design system — how to build with it

Dark-substrate, forensic/instrument-panel register. Bounded, calm, declarative.
Type: Perfectly Nineties (serif/display, ships), Geist + Geist Mono (UI/labels,
host-served), Caveat (marginalia hand, host-served). Core sentence: *"Liminal
gives form to inner life."*

## Wrapping and setup (required)

Every design must render inside a **dark body that declares the 5-axis model**, or
components inherit the wrong ground (ink tokens are tuned for `--bg` #0A0A0B; on a
white page they wash out or invert). Set this on the root:

```jsx
<body data-product="personal" data-relationship="self"
      style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--sans)' }}>
  {/* design here */}
</body>
```

- `data-product` (`personal` | `team` | `business`) — sets the default `--density-scale`.
- `data-density` (`anointed` | `shared` | `analyst`) — optional override; scales spacing only.
- `data-relationship` (`self` · `cofounder-mutual` · `direct-report` · `advisor` ·
  `institutional-subject` · `self-as-subject` · `peer` · `oversight` · `public`) —
  gates capability registers (e.g. `oversight` renders actions review-only).

Load Geist, Geist Mono, and Caveat from Google Fonts in the host page — the bundle
ships only Perfectly Nineties + Nineties Headliner as files.

## The styling idiom — tokens + component classes

Style with **CSS custom properties** (`var(--token)`) and the **component classes**;
never raw hex, never new hues. Real token families (all defined in the shipped CSS):

| Family | Real names | Use |
|---|---|---|
| Surface | `--bg` `--frame-bg` `--frame-bg-2` `--frame-bg-3` `--frame-border` `--card-border` `--rail-bg` | backgrounds, borders |
| Ink | `--text` `--text-mid` `--text-dim` `--text-faint` `--text-mute` | text hierarchy (high→low) |
| Action | `--ui-action-primary` / `-secondary` / `-destructive` (+ `-hover` `-active` `-bg` `-border`) | buttons, links |
| State | `--ui-state-success` / `-error` / `-warning` / `-info` (+ `-bg` `-border`) | validation, status |
| Chrome registers | `--diligence` `--judgment` `--synthesis` `--outreach` `--alarm` `--watch` `--signal` `--ambient` `--depth` `--liminal` | named agent/register accents |
| Focus | `--ui-focus-ring` `--ui-focus-bg` | focus-visible |
| Space / radius | `--space-1`…`--space-10` (× `--density-scale`), `--radius-1`…`--radius-5`, `--radius-pill` | spacing, corners |
| Type | `--display` `--serif` `--sans` `--mono`; `--fs-mono-xs/sm/lg`; `--ls-mono-sm/lg` | fonts, sizes, tracking |
| Motion | `--tx-base` `--ease` | transitions |

Component classes (used by the React components, available directly too): `.btn`
+ `.btn-primary/-secondary/-destructive/-ghost/-icon` (+ `.is-joint` `.is-review`);
`.input` + `.field` `.field-label` `.field-hint`; `.tag` + `.tag-success/-error/-warning/-info`
(+ `.tag-dot`); `.seam` (serif framing) and `.thesis-line` (mono framing).

**The full component layer ships in the styles closure** — these have no React
wrapper card yet but are fully styled, so hand-write the markup with these classes:
`.banner` (+ `.is-good/-amber/-red/-accent`), `.toast`, `.modal-frame` + `.modal-actions`,
`.drawer-panel` + `.drawer-pill`, `.tooltip` (+ `.tooltip-host`), `.popover` (+ `.pop-host`),
`.tabs` + `.segmented` (+ `.is-active`), `.avatar-base` (+ `.is-accent/-drift`),
`.tag-base` (+ `.is-good/-amber/-red/-judgment/-accent`), `.ck` `.rd` `.sw` `.sld`
(checkbox/radio/switch/slider), `.progress`, `.skeleton` + `.skeleton-line` (+ `.is-short/-mid/-long`),
`.spinner`, `.empty-state`, `.consent-chip`, `.classification-strip`, `.audit-ribbon-frame`,
`.sparkline-frame`, `.slate-frame`, `.tile-frame` (+ `.is-on-slate/-refused/-vault`).

## Where the truth lives

Read these bound files before styling: `_ds/<folder>/styles.css` (the import
closure — fonts + `_ds_bundle.css` which holds the full token canon + every
component rule). Per-component API + usage: each `components/general/<Name>/<Name>.prompt.md`.

## Build snippet (real, renders)

```jsx
import { Button, Tag, Input, Framing } from '<global>';
// inside the dark 5-axis body above:
<div style={{ display: 'grid', gap: 'var(--space-4)' }}>
  <Framing register="serif" lead="What came back overnight —"
           payload="one decision, due today." />
  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
    <Tag variant="warning" dot>almost ready</Tag>
    <Tag variant="info">in-lane · Judgment</Tag>
  </div>
  <Input label="Vault key" placeholder="enter key…" />
  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
    <Button variant="primary">Seal entry</Button>
    <Button variant="ghost">Defer 2d</Button>
  </div>
</div>
```

Refusal is the signature: when an action is out of an agent's lane, show it handed
back (a named redirect), not hidden as an error.
