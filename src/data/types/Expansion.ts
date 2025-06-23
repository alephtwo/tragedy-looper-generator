import { TragedySet } from "./TragedySet";
import type { MessageFunction } from "@inlang/paraglide-js";

export interface Expansion {
  readonly id: string;
  readonly name: MessageFunction;
  readonly tragedySets: Array<TragedySet>;
}
