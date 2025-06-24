import { IncidentOccurrence } from "../../model/IncidentOccurrence";
import { Character } from "./Character";
import { PlotRole } from "./PlotRole";

export class CastMember {
  readonly id: string;
  readonly character: Character;
  readonly role: PlotRole;
  incidentOccurrences: Array<IncidentOccurrence>;

  constructor(args: CastMemberArgs) {
    this.id = crypto.randomUUID();
    this.character = args.character;
    this.role = args.role;
    this.incidentOccurrences = [];
  }

  isCharacter(character: Character): boolean {
    return this.character.id === character.id;
  }
}

interface CastMemberArgs {
  readonly character: Character;
  readonly role: PlotRole;
}
