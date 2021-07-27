import { Trigger } from './Trigger';

export interface RoleAbility {
  trigger: Trigger;
  effect: string;
  optional: boolean;
  timesPerLoop?: number;
}
