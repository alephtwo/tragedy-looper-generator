import { ParseKeys } from "i18next";
import { Identifiable } from "../../@types/Identifiable";
import { UUID } from "crypto";

export interface Incident extends Identifiable {
  readonly id: UUID;
  readonly name_i18n_key: ParseKeys;
  readonly effect_i18n_key: ParseKeys;
  readonly loopEstimate: number;
  readonly winCondition: boolean;
}
