import { Character } from "../data/types/Character";
import { Role } from "../data/types/Role";
import { IncidentOccurrence } from "./IncidentOccurrence";
import * as uuid from "uuid";
import { i18n as i18next } from "i18next";

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
}

interface CastMemberArgs {
  readonly character: Character;
  readonly role: Role;
  readonly incidentTriggers: Array<IncidentOccurrence>;
}
