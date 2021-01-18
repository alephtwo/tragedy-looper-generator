import { Character } from './Character';
import { Plot } from './Plot';

export interface Tragedy {
  mainPlot: Plot;
  subplots: Array<Plot>;
  cast: Array<Character>;
}
