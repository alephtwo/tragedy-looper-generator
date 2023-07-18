import { ParseKeys } from 'i18next';
import { Character } from './Character';
import { Incident } from './Incident';
import { Plot } from './Plot';

export interface TragedySet {
  readonly id: string;
  readonly name_i18n_key: ParseKeys;
  readonly order: number;
  readonly characters: Array<Character>;
  readonly mainPlots: Array<Plot>;
  readonly subplots: Array<Plot>;
  readonly incidents: Array<Incident>;
}
