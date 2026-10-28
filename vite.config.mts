import path from "node:path";

import { paraglideVitePlugin as paraglide } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, defaultExclude } from "vitest/config";

const paths = {
  src: path.join(import.meta.dirname, "src"),
};

export default defineConfig({
  base: "/tragedy-looper-generator",
  plugins: [
    react(),
    tailwindcss(),
    paraglide({
      project: path.join(import.meta.dirname, "project.inlang"),
      outdir: path.join(paths.src, "paraglide"),
      emitTsDeclarations: true,
    }),
  ],
  resolve: {
    alias: {
      // keep in line with tsconfig.json
      "@i18n/messages": path.resolve(paths.src, "paraglide", "messages"),
      "@": path.join(import.meta.dirname, "src"),
    },
  },
  test: {
    exclude: [...defaultExclude, ".stryker-tmp"],
  },
});
