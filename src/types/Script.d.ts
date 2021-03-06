import { CastMember } from './Character';
import { Plot } from './Plot';
import { IncidentOccurrence } from './IncidentOccurrence';

export interface Script {
  readonly tragedySet: string;
  readonly mainPlot: Plot;
  readonly subplots: Array<Plot>;
  readonly cast: Array<CastMember>;
  readonly incidents: Array<IncidentOccurrence>;
  readonly days: number;
}
