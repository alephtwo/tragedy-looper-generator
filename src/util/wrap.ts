/**
 * Ensure that the input is wrapped in an array.
 * @param input The input which may or may not be an array.
 */
export function wrap<T>(input: T | Array<T>): Array<T> {
  if (input instanceof Array) {
    return input;
  }
  return [input];
}
