import { Incident } from './Incident';
import { Character } from './Character';

export interface IncidentOccurrence {
  readonly character: Character;
  readonly incident: Incident;
  readonly day: number;
}
