/**
 * If arg is a function, call it and return the value.
 * Otherwise, return the value.
 * @param arg
 */
export function resolve<T>(arg: T | (() => T)): T {
  return arg instanceof Function ? arg() : arg;
}
