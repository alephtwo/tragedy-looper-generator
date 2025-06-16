import { ParseKeys } from "i18next";
import { Trigger } from "./Trigger";
import { Identifiable } from "../../@types/Identifiable";

export interface PlotRule extends Identifiable {
  id: string;
  effect_i18n_key: ParseKeys;
  trigger: Trigger;
  winCondition: boolean;
  winConditionForTraitor?: "A" | "B" | "C";
}
