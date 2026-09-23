import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { EmptyState } from "../../desktop/src/components/ui/EmptyState";
// The canon sheet as text, scoped: its `.empty-state` selector would also hit the port's
// hook classname, so every selector is prefixed `ref-` before injection. Tokens come from
// the page's design-tokens.css (desktop's synced canon copy).
import sheet from "../../../components/empty-loading-skeleton.css?raw";

const scoped = ["empty-state","glyph","es-title","es-body","skeleton","spinner"].reduce((css, name) => css.replace(new RegExp("\\." + name + "\\b", "g"), ".ref-" + name), sheet).replace(/skeleton-shimmer|spinner-rotate/g, "ref-$&");

const meta = { title: "reference/EmptyState" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const label = {
  "font-family": "var(--mono)",
  "font-size": "10px",
  "letter-spacing": "0.08em",
  "text-transform": "uppercase",
  color: "var(--text-faint)",
  "margin-bottom": "12px",
} as const;

/** Port (canon register of the desktop slot recipe) beside Reference (sheet markup + CSS). */
export const PortVsReference: Story = {
  render: () => (
    <>
      <style>{scoped}</style>
      <div style={{ display: "grid", "grid-template-columns": "1fr 1fr", gap: "32px", width: "760px" }}>
        <section data-panel="port">
          <div style={label}>port - desktop recipe, register=canon</div>
          <EmptyState register="canon" glyph={"\u25C7"} title="No results" hint="Nothing matched this filter. Clear it or try another." />
        </section>
        <section data-panel="reference">
          <div style={label}>reference - canon sheet</div>
          <div class="ref-empty-state" role="region" aria-label="No results">
            <div class="ref-glyph">{"\u25C7"}</div>
            <div class="ref-es-title">No results</div>
            <div class="ref-es-body">Nothing matched this filter. Clear it or try another.</div>
          </div>
        </section>
      </div>
    </>
  ),
};
