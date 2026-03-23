import { defineConfig, defaultExclude } from "vitest/config";
import react from "@vitejs/plugin-react";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
