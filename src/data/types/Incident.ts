import type { MessageFunction } from "@inlang/paraglide-js";

export interface Incident {
  readonly id: string;
  readonly name: MessageFunction;
  readonly effect: MessageFunction;
  readonly loopEstimate: number;
  readonly winCondition: boolean;
}
