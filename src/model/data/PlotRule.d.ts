import { ParseKeys } from "i18next";
import { Trigger } from "./Trigger";

export interface PlotRule {
  id: string;
  effect_i18n_key: ParseKeys;
  trigger: Trigger;
  winCondition: boolean;
}
