import { Identifiable } from "../../@types/Identifiable";
import { UUID } from "crypto";
import type { MessageFunction } from "@inlang/paraglide-js";

export interface Incident extends Identifiable {
  readonly id: UUID;
  readonly name: MessageFunction;
  readonly effect: MessageFunction;
  readonly loopEstimate: number;
  readonly winCondition: boolean;
}
