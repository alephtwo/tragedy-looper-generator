import { Character } from './data/Character';
import { Role } from './data/Role';
import { IncidentOccurrence } from './IncidentOccurrence';
import * as uuid from 'uuid';

export class CastMember {
  readonly id: string;
  readonly character: Character;
  readonly role: Role;
  readonly incidentTriggers: Array<IncidentOccurrence>;

  constructor(args: CastMemberArgs) {
    this.id = uuid.v4();
    this.character = args.character;
    this.role = args.role;
    this.incidentTriggers = args.incidentTriggers;
  }

  describe(): string {
    return `${this.character.name} (${this.role.name})`;
  }
}

interface CastMemberArgs {
  readonly character: Character;
  readonly role: Role;
  readonly incidentTriggers: Array<IncidentOccurrence>;
}
