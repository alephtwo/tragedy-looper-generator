import { Character } from "../data/types/Character";
import { DualRole, Role } from "../data/types/Role";
import { IncidentOccurrence } from "./IncidentOccurrence";

export class CastMember {
  readonly id: string;
  readonly character: Character;
  readonly role: Role | DualRole;
  readonly incidentTriggers: Array<IncidentOccurrence>;

  constructor(args: CastMemberArgs) {
    this.id = crypto.randomUUID();
    this.character = args.character;
    this.role = args.role;
    this.incidentTriggers = args.incidentTriggers;
  }
}

interface CastMemberArgs {
  readonly character: Character;
  readonly role: Role | DualRole;
  readonly incidentTriggers: Array<IncidentOccurrence>;
}
