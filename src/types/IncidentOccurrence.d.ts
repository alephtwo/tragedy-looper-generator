import { Incident } from './data/Incident';

export interface IncidentOccurrence {
  incident: Incident;
  day: number;
  fakedIncident?: Incident;
}
