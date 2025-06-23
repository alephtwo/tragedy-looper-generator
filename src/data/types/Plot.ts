import { Script } from "../../model/Script";
import { Incident } from "./Incident";
import { MastermindAbility } from "./MastermindAbility";
import { PlotRule } from "./PlotRule";
import { PlotRole } from "./PlotRole";
import { MessageFunction } from "@inlang/paraglide-js";

export interface Plot {
  readonly id: string;
  readonly name: MessageFunction;
  readonly roles: () => Array<PlotRole>;
  readonly requiredIncidents: Array<Incident>;
  readonly estimateLoops: (script: Script) => number;
  readonly plotRules: Array<PlotRule>;
  readonly mastermindAbilities: Array<MastermindAbility>;
  // Only plots that are fully implemented properly should be choosable.
  readonly enabled: boolean;
}
