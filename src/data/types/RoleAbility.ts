import { MessageFunction } from "@inlang/paraglide-js";

import { Trigger } from "./Trigger";

export interface RoleAbility {
  id: string;
  triggers: Array<Trigger>;
  effect: MessageFunction;
  optional: boolean;
  winCondition: boolean;
  timesPerLoop?: number;
}
