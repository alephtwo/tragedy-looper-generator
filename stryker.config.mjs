// @ts-check
/**
 * @type {import("@stryker-mutator/api/core").PartialStrykerOptions}
 */
export default {
  testRunner: "vitest",
  packageManager: "pnpm",
  incremental: true,
  plugins: ["@stryker-mutator/vitest-runner"],
};
