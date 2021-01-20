import { Role } from './Role';
import { Character } from './Character';
import { Incident } from './Incident';

export interface Plot {
  readonly id: string;
  readonly name: string;
  readonly roles: Array<Role> | (() => Array<Role>);
  readonly roleCriteria?: {
    readonly role: Role;
    readonly filter: (character: Character) => boolean;
  };
  readonly incidents?: Array<Incident>;
}
