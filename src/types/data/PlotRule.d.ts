import { Trigger } from './Trigger';

export interface PlotRule {
  id: string;
  effect: string;
  trigger: Trigger;
  winCondition: boolean;
}
