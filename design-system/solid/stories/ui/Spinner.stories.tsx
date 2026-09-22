import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Spinner } from "../../desktop/src/components/ui/Spinner";

// Wiring proof: an UNCHANGED desktop primitive rendered through the gallery's own codegen.
const meta = { title: "ui/Spinner", component: Spinner } satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = { args: { size: "md" } };
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const Muted: Story = { args: { size: "md", accent: "muted" } };
