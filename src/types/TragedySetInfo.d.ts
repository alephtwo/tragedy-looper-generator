import { Plot } from './Plot';
import { Incident } from './Incident';

export interface TragedySetInfo {
  readonly id: string;
  readonly title: string;
  readonly order: number;
  readonly mainPlots: Array<Plot>;
  readonly subplots: Array<Plot>;
  readonly incidents: Array<Incident>;
}
