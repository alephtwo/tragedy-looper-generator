import { CastMember } from './Character';
import { Plot } from './Plot';
import { IncidentOcurrence } from './IncidentOcurrence';

export interface Tragedy {
  tragedySet: string;
  mainPlot: Plot;
  subplots: Array<Plot>;
  cast: Array<CastMember>;
  incidents: Array<IncidentOcurrence>;
}
