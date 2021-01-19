import { Plot } from './Plot';
import { Incident } from './Incident';

export interface TragedySetInfo {
  id: string;
  title: string;
  order: number;
  mainPlots: Array<Plot>;
  subplots: Array<Plot>;
  incidents: Array<Incident>;
}
