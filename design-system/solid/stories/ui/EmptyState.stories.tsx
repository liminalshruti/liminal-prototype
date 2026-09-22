import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { EmptyState } from "../../desktop/src/components/ui/EmptyState";

// Wiring proof for the classname-styled path: `.empty-state` lives in desktop's
// public/styles/cut-shell.css, loaded by the preview, not by Panda.
const meta = { title: "ui/EmptyState", component: EmptyState } satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = { args: { title: "nothing in the tray" } };
export const WithHint: Story = {
  args: { title: "nothing in the tray", hint: "drop context to start a read" },
};
export const WithAction: Story = {
  args: {
    title: "no packets yet",
    hint: "the vault fills as you sign",
    action: { label: "open the slate", onClick: () => {} },
  },
};
