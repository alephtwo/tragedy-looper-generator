import { Trigger } from './Trigger';

export interface RoleAbility {
  id: string;
  trigger: Trigger;
  effect: string;
  optional: boolean;
  winCondition: boolean;
  timesPerLoop?: number;
}
