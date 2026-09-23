import { realpathSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { mergeConfig, type Plugin } from "vite";
import { defineMain } from "storybook-solidjs-vite";
import { desktopRoot, provenance } from "../desktop-root.mjs";

const gallery = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const root = realpathSync(desktopRoot());
const rootPrefix = root + sep;
const galleryStyledSystem = join(gallery, "styled-system");

/**
 * Desktop components import Panda with RELATIVE paths (`../../../styled-system/css`), which
 * would resolve to desktop's own gitignored output. This gallery runs its own codegen, so any
 * `styled-system/<sub>` import whose importer lives in the desktop tree is re-pointed at ours.
 * The cheap specifier test runs first; the realpath syscall only on a hit. Nothing in desktop
 * is touched.
 */
const restyle: Plugin = {
  name: "liminal-gallery-styled-system",
  enforce: "pre",
  async resolveId(source, importer) {
    const m = source.match(/(?:^|\/)styled-system\/(.+)$/);
    if (!m || !importer) return null;
    let imp = importer;
    try {
      imp = realpathSync(importer);
    } catch {
      /* virtual importer */
    }
    if (!imp.startsWith(rootPrefix)) return null;
    return this.resolve(join(galleryStyledSystem, m[1]), importer, { skipSelf: true });
  },
};

/**
 * Provenance is served, not stamped: computed when the module loads (every full reload of the
 * preview), so the banner names the desktop tree as it is now, and a tree that has never run
 * codegen still boots with a STALE banner instead of a failed import.
 */
const provenanceModule: Plugin = {
  name: "liminal-gallery-provenance",
  resolveId(id) {
    return id === "virtual:gallery-provenance" ? "\0virtual:gallery-provenance" : null;
  },
  load(id) {
    if (id !== "\0virtual:gallery-provenance") return null;
    return `export default ${JSON.stringify(provenance(root))};`;
  },
};

export default defineMain({
  framework: { name: "storybook-solidjs-vite" },
  stories: ["../stories/**/*.stories.tsx"],
  // Only the self-hosted fonts are fetched by URL (`/fonts/*` in google-fonts-selfhost.css);
  // the stylesheets are bundled through preview.tsx.
  staticDirs: [{ from: join(root, "public", "fonts"), to: "/fonts" }],
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [restyle, provenanceModule],
      // design-system/ (one level up) so reference stories can import the canon sheets as ?raw.
      server: { fs: { allow: [gallery, resolve(gallery, ".."), root] } },
      resolve: {
        // Exactly one Solid instance at runtime: desktop's. vite-plugin-solid already dedupes;
        // the alias makes desktop's copy the one that wins. package.json pins the same version
        // so the compiler and the runtime are one release (desktop-root.mjs warns on skew).
        alias: [{ find: /^solid-js(\/.*)?$/, replacement: `${join(root, "node_modules", "solid-js")}$1` }],
      },
    });
  },
});
