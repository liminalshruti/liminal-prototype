# Cuts · contributing guide

> Studio architecture for sustaining design quality across desktop / mobile / web / brand
> work, across multiple sessions, without slop accruing.

This directory holds **cuts** · self-contained mock treatments that share canonical
tokens and a shared desktop-app shell. Each cut answers to a spec section (UI_GAP_SPEC,
matrix doc, scenario spec) and demonstrates one experience or design experiment.

---

## The cascade · how design-system changes flow

```
design-system/tokens/design-tokens.css        ← canon · 12-wheel · single source of truth
            │
            ▼
lib/cut-shell.css                             ← cascade bridge · prototype-vocabulary
            │      :root tokens var() into canon, with hardcoded fallbacks
            │      so cut-shell works standalone too
            ▼
cuts/01-slate-tray.html                       ← cut · imports tokens + shell
cuts/02-forensic-agent.html                   ← cut · same imports
cuts/03-calibration.html                      ← cut · same imports
            │
            ▼
index.html                                    ← parent catalog · iframes the cuts
            │      parent shell uses --shell-* aliases that var() into canon too
            ▼
                                              the user sees consistent canon
```

**Edit a token in `design-system/tokens/design-tokens.css` → next page load,
every cut that imports the canon picks up the change.** No per-cut CSS forks.

---

## Discipline · the four rules that prevent slop

### 1 · Tokens come from canon. Cuts cannot redefine them.

**Wrong**
```css
/* cuts/03-calibration.html */
:root {
  --diligence: #9966FF;   /* ✗ redefining canon · breaks cascade */
}
```

**Right**
```css
/* cuts/03-calibration.html */
.cal-cell {
  background: var(--diligence-bg);   /* ✓ consume canon */
  color: var(--diligence);
}
```

If you need a hue the canon doesn't have, **add it to canon first**, not to a cut.
Open a follow-up commit on `design-system/tokens/design-tokens.css`. Document the
addition in canon's docblock.

### 2 · Use the shared shell. Adopt the desktop-app frame.

Every cut imports both:

```html
<link rel="stylesheet" href="../design-system/tokens/design-tokens.css">
<link rel="stylesheet" href="../lib/cut-shell.css">
```

This gives you:

- Frame chrome (titlebar, traffic lights, product-row tabs)
- Three-pane main layout (left rail / slate / right rail)
- Audit ribbon, brief area, disposition paper-card
- Marginalia (Caveat editor's notes), keyboard help overlay, toast
- Per-surface register accents (Personal/Team/Business/Creative)
- Prefers-reduced-motion support, staged-boot animations

If a cut needs a divergent shell (e.g., calibration view is a temporal grid · not
the slate-tray surface), document why at the top of the cut HTML, then either:

- **Override only what's necessary** in a `<style>` block in the cut HTML, OR
- **Add a per-cut shell** at `lib/cut-XX-shell.css` that imports `cut-shell.css`
  and overrides specifically named rules.

Never · ever · copy `cut-shell.css` into a cut and edit the copy.

### 3 · Each cut declares a contract block at the top.

Every cut HTML opens with:

```html
<!--
  Cut XX · [name] · [one-line purpose]
  ──────────────────────────────────────────────────────────────────────
  ICP        · founder · operator · creative · [specific role]
  Surface    · personal · team · business · [or new]
  Spec ref   · [path to spec doc + section]
  Status     · stub · sketch · refining · live
  ──────────────────────────────────────────────────────────────────────
-->
```

The contract names what the cut is, what spec it answers to, what state it's in.
Future-you (or another session) reads this before changing anything.

### 4 · Each cut works standalone AND inside the catalog iframe.

Open `cuts/01-slate-tray.html` directly in a browser → it works.
Load `index.html` and route to cut 01 → it works inside the iframe.

This is the load-bearing test. If a cut depends on parent-side state to render,
the studio architecture is broken. Use `postMessage` for parent ↔ cut communication
when needed (see `index.html`'s message bus seam).

---

## Adding a new cut

```bash
cp cuts/_template.html cuts/06-name.html
```

Fill in the contract block, write the cut, then in `index.html`:

1. Add a `.cn-item` to the catalog rail
2. Add an `<iframe>` (or inline `<div class="cut-stub">` for early sketch) to `.cut-stage`

That's it. No shell forking. No token redefinition. No central coordination.

---

## When the canon changes

If `design-system/tokens/design-tokens.css` changes a token value:

1. **Hard refresh the catalog** (`?reset` or Shift+Reload) · all cuts pick it up
2. **Visually check each cut** to confirm cascade landed correctly
3. **Audit any hardcoded values that should now use the new token** · grep for
   the old hex value across `cuts/` and `lib/cut-shell.css`

If `design-system/components/*.css` adds a new component CSS file, decide:

- **Is this a new shared primitive?** → Update `lib/cut-shell.css` to consume it
- **Is this cut-specific?** → Import the component CSS in just the cuts that need it

---

## Future surfaces · what this architecture unblocks

| Surface | How |
|---|---|
| **Tauri desktop client** | Each cut HTML loads as a webview · parent shell maps to native window chrome |
| **Marketing site** | `theliminalspace.io/calibration` serves `cuts/03-calibration.html` standalone |
| **Mobile app** | Each cut becomes a screen · mobile shell replaces parent shell · cuts unchanged |
| **Brand / creative work** | Static demos for investor decks · open any cut HTML directly |
| **A/B testing** | Serve different cuts to different testers without forking the build |

The cascade is the discipline. The cuts are the experimentation surface. The canon
is the contract.
