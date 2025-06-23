import { Trigger } from "./Trigger";
import { Identifiable } from "../../@types/Identifiable";
import { MessageFunction } from "@inlang/paraglide-js";

export interface PlotRule extends Identifiable {
  id: string;
  effect: MessageFunction;
  trigger: Trigger;
  winCondition: boolean;
  winConditionForTraitor?: "A" | "B" | "C";
}
