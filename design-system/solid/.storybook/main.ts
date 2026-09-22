import { realpathSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineMain } from "storybook-solidjs-vite";
import { desktopRoot } from "../desktop-root.mjs";

const gallery = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const root = realpathSync(desktopRoot());
const galleryStyledSystem = join(gallery, "styled-system");

/**
 * Desktop components import Panda with RELATIVE paths (`../../../styled-system/css`), which
 * would resolve to desktop's own gitignored output. This gallery runs its own codegen (D5),
 * so any `styled-system/<sub>` import whose importer lives in the desktop tree is re-pointed
 * at ours. Nothing in desktop is touched.
 */
const restyle = {
  name: "liminal-gallery-styled-system",
  enforce: "pre" as const,
  async resolveId(this: any, source: string, importer?: string) {
    if (!importer) return null;
    let imp = importer;
    try { imp = realpathSync(importer); } catch { /* virtual importer */ }
    if (!imp.startsWith(root)) return null;
    const m = source.match(/(?:^|\/)styled-system\/(.+)$/);
    if (!m) return null;
    return this.resolve(join(galleryStyledSystem, m[1]), importer, { skipSelf: true });
  },
};

export default defineMain({
  framework: { name: "storybook-solidjs-vite" },
  stories: ["../stories/**/*.stories.tsx"],
  // Serve desktop's public/ at / so its self-hosted fonts and synced token CSS resolve.
  staticDirs: [{ from: join(root, "public"), to: "/" }],
  async viteFinal(config) {
    const prevAlias = config.resolve?.alias;
    const aliasList = Array.isArray(prevAlias)
      ? prevAlias
      : Object.entries(prevAlias ?? {}).map(([find, replacement]) => ({ find, replacement }));
    return {
      ...config,
      plugins: [restyle, ...(config.plugins ?? [])],
      server: {
        ...config.server,
        // design-system/ (one level up) so reference stories can import the canon sheets as ?raw.
        fs: { ...config.server?.fs, allow: [...(config.server?.fs?.allow ?? []), gallery, resolve(gallery, ".."), root] },
      },
      resolve: {
        ...config.resolve,
        // Exactly one Solid instance: desktop's. Two copies = reactivity/context silently broken.
        dedupe: [...(config.resolve?.dedupe ?? []), "solid-js"],
        alias: [
          ...aliasList,
          { find: /^solid-js(\/.*)?$/, replacement: `${join(root, "node_modules", "solid-js")}$1` },
          { find: "@desktop", replacement: join(root, "src") },
        ],
      },
    };
  },
});
