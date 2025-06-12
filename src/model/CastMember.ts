import { UUID } from "crypto";
import { Character } from "../data/types/Character";
import { Role } from "../data/types/Role";
import { IncidentOccurrence } from "./IncidentOccurrence";

export class CastMember {
  readonly id: UUID;
  readonly character: Character;
  readonly role: Role;
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
  readonly role: Role;
  readonly incidentTriggers: Array<IncidentOccurrence>;
}
