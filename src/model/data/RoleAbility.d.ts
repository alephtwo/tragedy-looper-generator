import { ParseKeys } from 'i18next';
import { Trigger } from './Trigger';

export interface RoleAbility {
  id: string;
  trigger: Trigger;
  effect_i18n_key: ParseKeys;
  optional: boolean;
  winCondition: boolean;
  timesPerLoop?: number;
}
