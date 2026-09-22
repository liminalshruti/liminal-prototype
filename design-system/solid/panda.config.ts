/**
 * The gallery's OWN Panda codegen (founder ruling 2026-09-22, D5): desktop's config is
 * imported wholesale through the `./desktop` symlink (refreshed by desktop-root.mjs), so
 * tokens, semantic tokens, text styles, the `card` recipe and globalCss are desktop's —
 * only `include` and `outdir` are ours. Desktop's components import `../../../styled-system/*`
 * relatively; `.storybook/main.ts` re-points those imports at this outdir.
 */
import { defineConfig } from "@pandacss/dev";
import desktop from "./desktop/panda.config";

export default defineConfig({
  ...desktop,
  // Desktop's include is ./src/**; mirror it exactly so the gallery's generated CSS is a
  // superset of desktop's, never a subset (a narrower include silently drops classes that
  // desktop's build happens to have, e.g. runtime-valued props extracted from another file).
  include: ["./desktop/src/**/*.{js,jsx,ts,tsx}", "./stories/**/*.tsx", "./.storybook/**/*.tsx"],
  exclude: [],
  outdir: "styled-system",
});
