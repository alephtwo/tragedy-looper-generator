import { ParseKeys } from 'i18next';

export interface Incident {
  readonly id: string;
  readonly name_i18n_key: ParseKeys;
  readonly effect_i18n_key: ParseKeys;
  readonly loopEstimate: number;
  readonly winCondition: boolean;
}
