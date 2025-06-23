import { Trigger } from "./Trigger";
import { MessageFunction } from "@inlang/paraglide-js";

export interface RoleAbility {
  id: string;
  triggers: Array<Trigger>;
  effect: MessageFunction;
  optional: boolean;
  winCondition: boolean;
  timesPerLoop?: number;
}
