import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { ExaminationLoading } from "../../desktop/src/components/tray/ExaminationLoading";

// In-situ view of the Skeleton port: the tray's read phase, three agent slot cards on
// frontier.shell, each holding three SkeletonLines. This is where the gradient's contrast
// and the line margin vs the card's flex gap are judged: not on the page background.
const meta = { title: "tray/ExaminationLoading", component: ExaminationLoading } satisfies Meta<typeof ExaminationLoading>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeAgents: Story = {
  render: () => (
    <div style={{ width: "720px" }}>
      <ExaminationLoading
        substrateContext="Q3 hiring plan: two senior engineers vs one staff, budget flat, runway 14 months."
        agents={[
          { name: "Analyst", register: "diligence" },
          { name: "SDR", register: "outreach" },
          { name: "Auditor", register: "judgment" },
        ]}
        startedAt={Date.now() - 4000}
      />
    </div>
  ),
};
