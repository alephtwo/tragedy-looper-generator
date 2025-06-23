import { UUID } from "crypto";
import type { MessageFunction } from "@inlang/paraglide-js";

export interface Incident {
  readonly id: UUID;
  readonly name: MessageFunction;
  readonly effect: MessageFunction;
  readonly loopEstimate: number;
  readonly winCondition: boolean;
}
