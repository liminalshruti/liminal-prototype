import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { SkeletonLine } from "../../desktop/src/components/ui/Skeleton";
// The canon sheet, verbatim, as text. Its selectors are `.skeleton…`, the same class the Panda
// recipe emits, so the two would style each other on one page; the sheet is scoped by renaming
// its selectors to `.ref-skeleton…` before injection. Tokens (--frame-bg-2, --card-border,
// --radius-2) come from the page's design-tokens.css, which is desktop's synced canon copy.
import sheet from "../../../components/empty-loading-skeleton.css?raw";
import { scopeSheet } from "./scope";

const scoped = scopeSheet(sheet);

const meta = { title: "reference/Skeleton" } satisfies Meta;
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

/**
 * Port (desktop `skeleton` recipe) beside Reference (canon sheet markup + CSS).
 * `data-panel` marks each side for the reference-delta spec.
 */
export const PortVsReference: Story = {
  render: () => (
    <>
      <style>{scoped}</style>
      <div style={{ display: "grid", "grid-template-columns": "1fr 1fr", gap: "32px", width: "720px" }}>
        {/* Port lines carry no margin (ruled 2026-09-22); the 8px gap here stands in for the sheet's
            margin-bottom so the two panels stay visually comparable. The delta spec reports it. */}
        <section data-panel="port" role="status" aria-busy="true" aria-label="Loading" style={{ display: "grid", gap: "8px", "align-content": "start" }}>
          <div style={label}>port · desktop recipe</div>
          <SkeletonLine width="short" />
          <SkeletonLine width="long" />
          <SkeletonLine width="mid" />
        </section>
        <section data-panel="reference" role="status" aria-busy="true" aria-label="Loading">
          <div style={label}>reference · canon sheet</div>
          <div class="ref-skeleton ref-skeleton-line is-short" />
          <div class="ref-skeleton ref-skeleton-line is-long" />
          <div class="ref-skeleton ref-skeleton-line is-mid" />
        </section>
      </div>
    </>
  ),
};
