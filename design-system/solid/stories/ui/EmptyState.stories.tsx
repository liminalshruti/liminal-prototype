import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { EmptyState } from "../../desktop/src/components/ui/EmptyState";

// Ported 2026-09-22 to the `emptyState` slot recipe. Two registers, founder-ruled:
// chrome (default, what shipped) and canon (the design-system sheet). Density rows show
// the registers under the three spacing scales.
const meta = { title: "ui/EmptyState", component: EmptyState } satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

const frame = (props: { children: any }) => <div style={{ width: "360px" }}>{props.children}</div>;
const Frame = frame;

export const ChromeTitleOnly: Story = { render: () => <Frame><EmptyState title="nothing in the tray" /></Frame> };
export const ChromeWithHint: Story = {
  render: () => <Frame><EmptyState title="nothing in the tray" hint="drop context to start a read" /></Frame>,
};
export const ChromeWithAction: Story = {
  render: () => (
    <Frame>
      <EmptyState
        title="no packets yet"
        hint="the vault fills as you sign"
        action={{ label: "open the slate", onClick: () => {} }}
      />
    </Frame>
  ),
};

export const CanonTitleOnly: Story = { render: () => <Frame><EmptyState register="canon" title="Nothing in the tray" /></Frame> };
export const CanonWithHint: Story = {
  render: () => (
    <Frame>
      <EmptyState register="canon" title="Nothing in the tray" hint="Drop context to start a read." />
    </Frame>
  ),
};
export const CanonWithAction: Story = {
  render: () => (
    <Frame>
      <EmptyState
        register="canon"
        title="No packets yet"
        hint="The vault fills as you sign."
        action={{ label: "open the slate", onClick: () => {} }}
      />
    </Frame>
  ),
};

/** Both registers under anointed / shared / analyst. Only spacing tokens scale. */
export const Densities: Story = {
  render: () => (
    <div style={{ display: "grid", "grid-template-columns": "repeat(3, 1fr)", gap: "24px" }}>
      {(["anointed", "shared", "analyst"] as const).map((density) => (
        <div data-density={density} style={{ display: "grid", gap: "16px" }}>
          <div
            style={{
              "font-family": "var(--mono)",
              "font-size": "10px",
              "letter-spacing": "0.08em",
              "text-transform": "uppercase",
              color: "var(--text-faint)",
            }}
          >
            {density}
          </div>
          <EmptyState title="nothing in the tray" hint="drop context to start a read" />
          <EmptyState register="canon" title="Nothing in the tray" hint="Drop context to start a read." />
        </div>
      ))}
    </div>
  ),
};
