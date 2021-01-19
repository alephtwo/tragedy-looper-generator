import { Incident } from './Incident';
import { Character } from './Character';

export interface IncidentOcurrence {
  character: Character;
  incident: Incident;
  day: number;
}
