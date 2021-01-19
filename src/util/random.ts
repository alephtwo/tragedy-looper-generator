/**
 * Get a random integer between two numbers (both inclusive).
 * @param minimum The minimum value.
 * @param maximum The maximum value.
 */
export function randomInclusive(minimum: number, maximum: number): number {
  const seed = Math.random();
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);

  return Math.floor(seed * (max - min + 1) + min);
}
