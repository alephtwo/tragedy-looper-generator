import { TragedySetInfo } from './TragedySetInfo';

export interface GeneratorArgs {
  tragedySet: TragedySetInfo;
  subplots: 1 | 2;
  castSize: 6 | 7 | 8 | 9 | 10 | 11;
  days: 4 | 5 | 6 | 7 | 8 | 9 | 10;
  incidents: number;
}
