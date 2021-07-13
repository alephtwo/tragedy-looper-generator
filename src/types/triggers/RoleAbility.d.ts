import { TriggerTime } from './TriggerTime';

export interface RoleAbility {
  time: TriggerTime;
  effect: string;
  optional: boolean;
  winCondition: boolean;
}
