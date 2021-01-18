import { Character } from './Character';
import { Plot } from './Plot';

export interface Tragedy {
  tragedySet: string;
  mainPlot: Plot;
  subplots: Array<Plot>;
  cast: Array<Character>;
}
