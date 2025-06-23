import type { MessageFunction } from "@inlang/paraglide-js";

export interface MastermindAbility {
  effect: MessageFunction;
  timesPerDay?: number;
  timesPerLoop?: number | string;
  optional: boolean;
}
