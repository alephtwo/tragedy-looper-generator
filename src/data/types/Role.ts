import { MessageFunction } from "@inlang/paraglide-js";

import { MastermindAbility } from "./MastermindAbility";
import { RoleAbility } from "./RoleAbility";
import { TragedySet } from "./TragedySet";

export interface Role {
  readonly id: string;
  readonly name: MessageFunction;
  readonly connectedToBoard: boolean;
  readonly connectedToLossCondition: boolean;
  readonly culprit?: "Never" | "Mandatory";
  readonly abilities?: Array<RoleAbility>;
  readonly mastermindAbilities?: Array<MastermindAbility>;
  readonly unkillable?: true;
  readonly goodwillRefusal?: "Optional" | "Mandatory" | "Puppeted";
  readonly max?: (tragedySet: TragedySet) => number;
}
