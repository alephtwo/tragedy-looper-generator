export interface Incident {
  readonly id: string;
  readonly name: string;
  readonly effect: string;
  readonly loopEstimate?: number;
  // What incident should this _present_ as?
  // This should only be set for Fake Incidents, and will be calculated by the application.
  fakedIncident?: Incident;
}
