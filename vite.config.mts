import { defineConfig, defaultExclude } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

export default defineConfig({
  plugins: [
    react(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
  ],
  base: "/tragedy-looper-generator",
  test: {
    exclude: defaultExclude.concat(["./.stryker-tmp"]),
  },
});
