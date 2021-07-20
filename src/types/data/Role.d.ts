import { CastMember } from '../CastMember';
import { Character } from './Character';

export interface Role {
  readonly id: string;
  readonly name: string;
  readonly unkillable: boolean;
  readonly culprit: 'Never' | 'Optional' | 'Mandatory';
  readonly max?: number;
  readonly goodwillRefusal?: 'Optional' | 'Mandatory';
}

export interface ConditionalRole {
  role: Role;
  condition: RoleCondition;
}

// Take in a character and determine if it matches for this role.
// Sometimes it is helpful to know what other roles have already been assigned.
type RoleCondition = (character: Character, cast: Array<CastMember>) => boolean;
