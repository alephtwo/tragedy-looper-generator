import { ParseKeys } from "i18next";
import { Script } from "../../model/Script";
import { Incident } from "./Incident";
import { MastermindAbility } from "./MastermindAbility";
import { PlotRule } from "./PlotRule";
import { DualRole, Role } from "./Role";
import { Identifiable } from "../../@types/Identifiable";
import { UUID } from "crypto";

export interface Plot extends Identifiable {
  readonly id: UUID;
  readonly name_i18n_key: ParseKeys;
  readonly roles: () => Array<Role | DualRole>;
  readonly requiredIncidents: Array<Incident>;
  readonly estimateLoops: (script: Script) => number;
  readonly plotRules: Array<PlotRule>;
  readonly mastermindAbilities: Array<MastermindAbility>;
  // Only plots that are fully implemented properly should be choosable.
  readonly enabled: boolean;
}
