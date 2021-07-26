import { CastMember } from './CastMember';
import { Plot } from './data/Plot';
import { TragedySet } from './data/TragedySet';

export interface Script {
  tragedySet: TragedySet;
  loops: number;
  days: number;
  mainPlot: Plot;
  subplots: Array<Plot>;
  cast: Array<CastMember>;
}
