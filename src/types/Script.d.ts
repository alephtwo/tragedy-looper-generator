import { Plot } from './data/Plot';
import { TragedySet } from './data/TragedySet';

export interface Script {
  tragedySet: TragedySet;
  loops: number;
  mainPlot: Plot;
  subplots: Array<Plot>;
}
