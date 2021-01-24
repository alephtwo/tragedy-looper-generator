import { TragedySetInfo } from './TragedySetInfo';

export interface GeneratorArgs {
  readonly tragedySet: TragedySetInfo;
  readonly subplots: 1 | 2;
  readonly castSize: 6 | 7 | 8 | 9 | 10 | 11;
  readonly days: 4 | 5 | 6 | 7 | 8;
  readonly incidents: number;
  readonly useMidnightCircleCharacters: boolean;
  readonly useCosmicEvilCharacters: boolean;
}
