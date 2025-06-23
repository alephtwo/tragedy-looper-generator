import { UUID } from "crypto";
import { Identifiable } from "../../@types/Identifiable";
import { TragedySet } from "./TragedySet";
import type { MessageFunction } from "@inlang/paraglide-js";

export interface Expansion extends Identifiable {
  readonly id: UUID;
  readonly name: MessageFunction;
  readonly tragedySets: Array<TragedySet>;
}
