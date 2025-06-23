import { Trigger } from "./Trigger";
import { MessageFunction } from "@inlang/paraglide-js";

export interface PlotRule {
  id: string;
  effect: MessageFunction;
  trigger: Trigger;
  winCondition: boolean;
  winConditionForTraitor?: "A" | "B" | "C";
}
