import * as uuid from "uuid";
import { Incident } from "./data/Incident";

export class IncidentOccurrence {
  readonly id: string;
  readonly incident: Incident;
  readonly day: number;
  #fakedIncident: Incident | undefined;

  constructor(args: IncidentOccurrenceArgs) {
    this.id = uuid.v4();
    this.incident = args.incident;
    this.day = args.day;
  }

  setFake(incident: Incident): void {
    this.#fakedIncident = incident;
  }

  getFake(): Incident | undefined {
    return this.#fakedIncident;
  }
}

interface IncidentOccurrenceArgs {
  readonly incident: Incident;
  readonly day: number;
}
