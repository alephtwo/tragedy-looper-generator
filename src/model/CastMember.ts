import { Character } from "../data/types/Character";
import { PlotRole } from "../data/types/PlotRole";
import { IncidentOccurrence } from "./IncidentOccurrence";

export class CastMember {
  readonly id: string;
  readonly character: Character;
  readonly role: PlotRole;
  readonly incidentTriggers: Array<IncidentOccurrence>;

  constructor(args: CastMemberArgs) {
    this.id = crypto.randomUUID();
    this.character = args.character;
    this.role = args.role;
    this.incidentTriggers = args.incidentTriggers;
  }

  is(character: Character): boolean {
    return this.character.id === character.id;
  }
}

interface CastMemberArgs {
  readonly character: Character;
  readonly role: PlotRole;
  readonly incidentTriggers: Array<IncidentOccurrence>;
}
