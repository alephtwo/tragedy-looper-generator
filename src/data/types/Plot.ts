import { MessageFunction } from "@inlang/paraglide-js";

import { Script } from "../../model/Script";
import { Incident } from "./Incident";
import { MastermindAbility } from "./MastermindAbility";
import { PlotRole } from "./PlotRole";
import { PlotRule } from "./PlotRule";

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
