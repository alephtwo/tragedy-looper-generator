import * as _ from "lodash";
import { Identifiable } from "../@types/Identifiable";

export function findById<T extends Identifiable>(data: Record<string, T>, id: string): T | undefined {
  return Object.values(data).find((t) => t.id === id);
}
