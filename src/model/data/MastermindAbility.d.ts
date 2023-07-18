import { ParseKeys } from 'i18next';

export interface MastermindAbility {
  effect_i18n_key: ParseKeys;
  timesPerDay?: number;
  timesPerLoop?: number | string;
  optional: boolean;
}
