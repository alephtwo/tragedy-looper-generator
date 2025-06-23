import { Trigger } from "./Trigger";
import { Identifiable } from "../../@types/Identifiable";
import { MessageFunction } from "@inlang/paraglide-js";

export interface RoleAbility extends Identifiable {
  id: string;
  triggers: Array<Trigger>;
  effect: MessageFunction;
  optional: boolean;
  winCondition: boolean;
  timesPerLoop?: number;
}
