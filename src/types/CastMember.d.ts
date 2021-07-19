import { Character } from './data/Character';
import { Role } from './data/Role';
import { IncidentOccurrence } from './IncidentOccurrence';

export interface CastMember {
  character: Character;
  role: Role;
  incidentTriggers: Array<IncidentOccurrence>;
}
