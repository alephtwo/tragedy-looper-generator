import { vi, test, expect, beforeEach, afterEach } from "vitest";
import { randomInt } from "./randomInt";

const originalRandom = Math.random;

beforeEach(() => {
  Math.random = vi.fn();
});

afterEach(() => {
  Math.random = originalRandom;
});

test("generates random integers", () => {
  const max = 20;
  const randomFloats = Array.from({ length: max }, (_, i) => i / max);

  randomFloats.forEach((random, i) => {
    vi.mocked(Math.random).mockReturnValue(random);
    expect(randomInt(max)).toEqual(i);
  });
});
