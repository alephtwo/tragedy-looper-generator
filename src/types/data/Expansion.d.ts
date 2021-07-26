import { TragedySet } from './TragedySet';

export interface Expansion {
  readonly id: string;
  readonly name: string;
  readonly tragedySets: Array<TragedySet>;
}
