import { Trigger } from './Trigger';

export interface PlotRule {
  effect: string;
  trigger: Trigger;
  winCondition: boolean;
}
