import { TriggerTime } from './TriggerTime';

export interface PlotRule {
  time: TriggerTime;
  effect: string;
  winCondition: boolean;
  optional: boolean;
  timesPerLoop?: number;
}
