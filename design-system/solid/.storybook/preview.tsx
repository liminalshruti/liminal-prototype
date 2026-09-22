import addonDocs from "@storybook/addon-docs";
import { createJSXDecorator, definePreview } from "storybook-solidjs-vite";
import provenance from "./provenance.json";

// Mirror desktop's load order exactly: index.html <link>s, then index.tsx imports.
// `/fonts/*` and `/styles/*` inside these files resolve through staticDirs (desktop/public).
import "../desktop/public/styles/google-fonts-selfhost.css";
import "../desktop/public/styles/design-tokens.css";
import "../desktop/public/styles/cut-shell.css";
import "../desktop/public/styles/brand-upgrade.css";
import "../desktop/public/styles/expressiveness-override.css";
import "../styled-system/styles.css";
import "../desktop/src/styles/index.css";

/**
 * Provenance banner: which desktop tree these pixels came from. A picture that cannot
 * name its baseline is not evidence (desktop PR #236). Amber when dirty or stale.
 */
const withProvenance = createJSXDecorator((Story) => {
  const warn = provenance.stale || provenance.dirty > 0;
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
      </div>
      <div style={{ "padding-top": "28px" }}>
        <Story />
      </div>
    </>
  );
});

/** Register context desktop sets in App.tsx: data-density on the stage, data-relationship on <html>. */
const withRegister = createJSXDecorator((Story, context) => (
  <div
    data-density={context.globals.density}
    data-relationship={context.globals.relationship}
    style={{ padding: "24px", "min-height": "calc(100vh - 28px)", background: "var(--bg)" }}
  >
    <Story />
  </div>
));

export default definePreview({
  addons: [addonDocs()],
  decorators: [withRegister, withProvenance],
  globalTypes: {
    density: {
      description: "data-density register — scales spacing only (anointed 1.10 · shared 1.00 · analyst 0.85)",
      toolbar: { title: "density", icon: "component", items: ["anointed", "shared", "analyst"], dynamicTitle: true },
    },
    relationship: {
      description: "data-relationship (desktop sets this on <html>)",
      toolbar: { title: "relationship", icon: "user", items: ["operator", "oversight"], dynamicTitle: true },
    },
  },
  initialGlobals: { density: "shared", relationship: "operator" },
  parameters: { backgrounds: { disable: true } },
});
