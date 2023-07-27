import { ParseKeys } from "i18next";
import { Script } from "../../model/Script";
import { Incident } from "./Incident";
import { MastermindAbility } from "./MastermindAbility";
import { PlotRule } from "./PlotRule";
import { Role } from "./Role";
import { Identifiable } from "../../@types/Identifiable";

export interface Plot extends Identifiable {
  readonly id: string;
  readonly name_i18n_key: ParseKeys;
  readonly roles: () => Array<Role>;
  readonly requiredIncidents: Array<Incident>;
  readonly estimateLoops: (script: Script) => number;
  readonly plotRules: Array<PlotRule>;
  readonly mastermindAbilities: Array<MastermindAbility>;
}
