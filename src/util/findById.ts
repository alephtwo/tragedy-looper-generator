import * as _ from "radash";

export function findById<T extends { id: string }>(data: Record<string, T>, id: string): T | undefined {
  return Object.values(data).find((t) => t.id === id);
}
