import { Character } from './data/Character';
import { Role } from './data/Role';
import { IncidentOccurrence } from './IncidentOccurrence';
import * as uuid from 'uuid';
import { i18n as i18next } from 'i18next';

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

  describe(i18n: i18next): string {
    return `${i18n.t(this.character.name_i18n_key)} (${i18n.t(this.role.name_i18n_key)})`;
  }
}

interface CastMemberArgs {
  readonly character: Character;
  readonly role: Role;
  readonly incidentTriggers: Array<IncidentOccurrence>;
}
