export function rangeInclusive(min: number, max: number): Array<number> {
  const pack = [];
  for (let i = min; i <= max; i++) {
    pack.push(i);
  }
  return pack;
}
