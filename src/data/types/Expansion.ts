import type { MessageFunction } from "@inlang/paraglide-js";

import { TragedySet } from "./TragedySet";

export interface Expansion {
  readonly id: string;
  readonly name: MessageFunction;
  readonly tragedySets: Array<TragedySet>;
}
