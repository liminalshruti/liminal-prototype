import addonDocs from "@storybook/addon-docs";
import { createEffect, onCleanup } from "solid-js";
import { createJSXDecorator, definePreview } from "storybook-solidjs-vite";
import provenance from "virtual:gallery-provenance";

// Mirror what desktop's MAIN WINDOW loads before first paint: index.html <link>s, index.tsx
// imports, and App.tsx's slate-tray.css (the only file defining `.sr-only`). `/fonts/*` resolves
// through staticDirs (desktop/public/fonts).
import "../desktop/public/styles/google-fonts-selfhost.css";
import "../desktop/public/styles/design-tokens.css";
import "../desktop/public/styles/cut-shell.css";
import "../desktop/public/styles/brand-upgrade.css";
import "../desktop/public/styles/expressiveness-override.css";
import "../styled-system/styles.css";
import "../desktop/src/styles/index.css";
import "../desktop/src/styles/slate-tray.css";

// index.html sets this at boot; the register palette (--p-accent*, --reg-*) keys off it.
document.body.setAttribute("data-product", "personal");

// desktop scopes `.sr-only` under `.slate-tray`; stories render primitives outside that
// ancestor, so the gallery carries the same rule globally.
const globalStyle = document.createElement("style");
globalStyle.setAttribute("data-gallery-global", "");
globalStyle.textContent =
  ".sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}";
document.head.appendChild(globalStyle);

/**
 * Provenance banner: which desktop tree these pixels came from. A picture that cannot
 * name its baseline is not evidence (desktop PR #236). Amber when dirty, stale, or when the
 * gallery's solid-js differs from desktop's.
 */
const withProvenance = createJSXDecorator((Story) => {
  const warn = provenance.stale || provenance.dirty > 0 || provenance.solidMismatch;
  return (
    <>
      <div
        data-gallery-provenance=""
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          "z-index": "9999",
          font: "10px/1.6 var(--mono, ui-monospace, monospace)",
          "letter-spacing": "0.08em",
          "text-transform": "uppercase",
          padding: "4px 10px",
          background: warn ? "var(--watch, #6b4e00)" : "var(--frame-bg, #0e0e11)",
          color: warn ? "var(--bg, #0a0a0b)" : "var(--text-faint, #6b6862)",
          "border-bottom": "1px solid var(--card-border, #222)",
        }}
      >
        desktop {provenance.branch} @ {provenance.sha} · dirty {provenance.dirty} · behind origin/main{" "}
        {provenance.behind ?? "?"}
        {provenance.stale ? " · styled-system STALE — npm run panda" : ""}
        {provenance.solidMismatch ? ` · solid-js ${provenance.solidGallery} ≠ desktop ${provenance.solidDesktop}` : ""}
      </div>
      <div style={{ "padding-top": "28px" }}>
        <Story />
      </div>
    </>
  );
});

/**
 * Register context the way desktop sets it: data-relationship on <html> (App.tsx:782) and
 * both attributes on <body> (design-tokens.css keys `body[data-density]` / `body[data-relationship]`),
 * plus the wrapper for Panda's element-agnostic `[data-density]` rule.
 */
const withRegister = createJSXDecorator((Story, context) => {
  createEffect(() => {
    const { density, relationship } = context.globals;
    document.documentElement.setAttribute("data-relationship", relationship);
    document.body.setAttribute("data-relationship", relationship);
    document.body.setAttribute("data-density", density);
  });
  onCleanup(() => {
    document.documentElement.removeAttribute("data-relationship");
    document.body.removeAttribute("data-relationship");
    document.body.removeAttribute("data-density");
  });
  return (
    <div
      data-density={context.globals.density}
      style={{ padding: "24px", "min-height": "calc(100vh - 28px)", background: "var(--bg)" }}
    >
      <Story />
    </div>
  );
});

export default definePreview({
  addons: [addonDocs()],
  decorators: [withRegister, withProvenance],
  globalTypes: {
    density: {
      description: "data-density register — scales spacing only (anointed 1.10 · shared 1.00 · analyst 0.85)",
      toolbar: { title: "density", icon: "component", items: ["anointed", "shared", "analyst"], dynamicTitle: true },
    },
    relationship: {
      description: "data-relationship (desktop sets this on <html> and <body>)",
      toolbar: { title: "relationship", icon: "user", items: ["operator", "oversight"], dynamicTitle: true },
    },
  },
  initialGlobals: { density: "shared", relationship: "operator" },
  parameters: { backgrounds: { disable: true } },
});
