import { ParseKeys } from "i18next";
import { Identifiable } from "../../@types/Identifiable";

export interface Incident extends Identifiable {
  readonly id: string;
  readonly name_i18n_key: ParseKeys;
  readonly effect_i18n_key: ParseKeys;
  readonly loopEstimate: number;
  readonly winCondition: boolean;
}
