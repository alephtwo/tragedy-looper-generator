import { CastMember } from './Character';
import { Plot } from './Plot';
import { IncidentOcurrence } from './IncidentOcurrence';

export interface Tragedy {
  readonly tragedySet: string;
  readonly mainPlot: Plot;
  readonly subplots: Array<Plot>;
  readonly cast: Array<CastMember>;
  readonly incidents: Array<IncidentOcurrence>;
}
