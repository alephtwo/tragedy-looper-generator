import { CastMember } from '../CastMember';
import { Character } from './Character';

export interface Role {
  readonly id: string;
  readonly name: string;
  readonly unkillable: boolean;
  readonly culprit: 'Never' | 'Optional' | 'Mandatory';
  readonly max?: number;
  readonly goodwillRefusal?: 'Optional' | 'Mandatory';
  // Some roles require certain criteria: "this role must be a man," etc.
  // Sometimes it is helpful to know what else is already chosen in the cast.
  readonly criteria?: (characters: Array<Character>, cast: Array<CastMember>) => boolean;
}
