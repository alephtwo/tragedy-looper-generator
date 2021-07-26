import { Script } from '../Script';
import { Incident } from './Incident';
import { Role } from './Role';

export interface Plot {
  readonly id: string;
  readonly name: string;
  readonly roles: () => Array<Role>;
  readonly requiredIncidents: Array<Incident>;
  readonly estimateLoops: (script: Script) => number;
}
