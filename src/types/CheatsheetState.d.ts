import { CheatsheetCastRow } from './CheatsheetCastRow';
import { Plot } from './Plot';
import { TragedySetInfo } from './TragedySetInfo';

export interface CheatsheetState {
  tragedySet: TragedySetInfo;
  mainPlot: Plot;
  subplots: Array<Plot>;
  cast: Array<CheatsheetCastRow>;
}
