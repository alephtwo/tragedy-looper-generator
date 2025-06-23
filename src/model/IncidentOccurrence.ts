import { Incident } from "../data/types/Incident";

export class IncidentOccurrence {
  readonly id: string;
  readonly incident: Incident;
  readonly day: number;
  #fakedIncident: Incident | undefined;

  constructor(args: IncidentOccurrenceArgs) {
    this.id = crypto.randomUUID();
    this.incident = args.incident;
    this.day = args.day;
  }

  setFake(incident: Incident): void {
    this.#fakedIncident = incident;
  }

  getFake(): Incident | undefined {
    return this.#fakedIncident;
  }

  is(incident: Incident) {
    return this.incident.id === incident.id;
  }
}

interface IncidentOccurrenceArgs {
  readonly incident: Incident;
  readonly day: number;
}
