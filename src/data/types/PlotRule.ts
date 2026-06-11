import { MessageFunction } from "@inlang/paraglide-js";

import { Trigger } from "./Trigger";

export interface PlotRule {
  id: string;
  effect: MessageFunction;
  trigger: Trigger;
  winCondition: boolean;
  winConditionForTraitor?: "A" | "B" | "C";
}
