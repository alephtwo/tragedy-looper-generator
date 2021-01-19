/**
 * Duplicate a value some number of times.
 * @param data The data to duplicate
 * @param amount The number of times to duplicate it
 */
export function duplicate<T>(data: T, amount: number): Array<T> {
  return [...new Array<T>(amount)].map(() => data);
}
