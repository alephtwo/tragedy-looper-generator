import { Script } from "../../model/Script";
import { Incident } from "./Incident";
import { MastermindAbility } from "./MastermindAbility";
import { PlotRule } from "./PlotRule";
import { DualRole, Role } from "./Role";
import { Identifiable } from "../../@types/Identifiable";
import { UUID } from "crypto";
import { MessageFunction } from "@inlang/paraglide-js";

export interface Plot extends Identifiable {
  readonly id: UUID;
  readonly name: MessageFunction;
  readonly roles: () => Array<Role | DualRole>;
  readonly requiredIncidents: Array<Incident>;
  readonly estimateLoops: (script: Script) => number;
  readonly plotRules: Array<PlotRule>;
  readonly mastermindAbilities: Array<MastermindAbility>;
  // Only plots that are fully implemented properly should be choosable.
  readonly enabled: boolean;
}
