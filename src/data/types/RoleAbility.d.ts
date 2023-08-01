import { ParseKeys } from "i18next";
import { Trigger } from "./Trigger";
import { Identifiable } from "../../@types/Identifiable";

export interface RoleAbility extends Identifiable {
  id: string;
  trigger: Trigger;
  effect_i18n_key: ParseKeys;
  optional: boolean;
  winCondition: boolean;
  timesPerLoop?: number;
}
