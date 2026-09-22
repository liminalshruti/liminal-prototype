import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Skeleton, SkeletonLine } from "../../desktop/src/components/ui/Skeleton";

// Ported 2026-09-22 from the canon sheet (design-system/components/empty-loading-skeleton.css).
// Geometry + motion live in desktop's `skeleton` Panda recipe; these stories only pick variants.
// Reduced motion is not a story: Storybook cannot flip the media query. The Argos/test-runner
// project with `reducedMotion: "reduce"` is where that state gets captured.
const meta = { title: "ui/Skeleton", component: Skeleton } satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Container carries the ARIA contract; every skeleton inside is aria-hidden. */
const Busy = (props: { children: any; width?: string }) => (
  <div role="status" aria-busy="true" aria-label="Loading" style={{ width: props.width ?? "320px" }}>
    {props.children}
  </div>
);

export const Box: Story = {
  render: () => (
    <Busy>
      <Skeleton height="48px" />
    </Busy>
  ),
};

export const LineShort: Story = { render: () => <Busy><SkeletonLine width="short" /></Busy> };
export const LineMid: Story = { render: () => <Busy><SkeletonLine width="mid" /></Busy> };
export const LineLong: Story = { render: () => <Busy><SkeletonLine width="long" /></Busy> };

/** The sheet's intended composition: short (label) · long · mid (body). */
export const Paragraph: Story = {
  render: () => (
    <Busy>
      <SkeletonLine width="short" />
      <SkeletonLine width="long" />
      <SkeletonLine width="mid" />
    </Busy>
  ),
};

/** The tray read-slot shape from ExaminationLoading: three lines, sweep staggered 0/120/240 ms. */
export const Staggered: Story = {
  render: () => (
    <Busy>
      <SkeletonLine width="long" delay={0} />
      <SkeletonLine width="mid" delay={120} />
      <SkeletonLine width="long" delay={240} />
    </Busy>
  ),
};

/** Same paragraph under the three density registers: spacing tokens scale, the 12px line does not. */
export const Densities: Story = {
  render: () => (
    <div style={{ display: "grid", "grid-template-columns": "repeat(3, 1fr)", gap: "24px" }}>
      {(["anointed", "shared", "analyst"] as const).map((density) => (
        <div data-density={density}>
          <div
            style={{
              "font-family": "var(--mono)",
              "font-size": "10px",
              "letter-spacing": "0.08em",
              "text-transform": "uppercase",
              color: "var(--text-faint)",
              "margin-bottom": "12px",
            }}
          >
            {density}
          </div>
          <Busy width="100%">
            <SkeletonLine width="short" />
            <SkeletonLine width="long" />
            <SkeletonLine width="mid" />
          </Busy>
        </div>
      ))}
    </div>
  ),
};
