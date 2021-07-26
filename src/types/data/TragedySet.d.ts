import { Character } from './Character';
import { Incident } from './Incident';
import { Plot } from './Plot';

export interface TragedySet {
  readonly id: string;
  readonly name: string;
  readonly order: number;
  readonly characters: Array<Character>;
  readonly mainPlots: Array<Plot>;
  readonly subplots: Array<Plot>;
  readonly incidents: Array<Incident>;
}
