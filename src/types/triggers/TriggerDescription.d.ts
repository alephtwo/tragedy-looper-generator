import { TriggerTime } from './TriggerTime';

export interface TriggerDescription {
  time: TriggerTime;
  optional: boolean;
  winCondition: boolean;
  effect: string;
  source: string;
  timesPerLoop?: number;
}
