import { UUID } from "crypto";
import { TragedySet } from "./TragedySet";
import type { MessageFunction } from "@inlang/paraglide-js";

export interface Expansion {
  readonly id: UUID;
  readonly name: MessageFunction;
  readonly tragedySets: Array<TragedySet>;
}
