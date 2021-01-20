import { Role } from './Role';
import { Character } from './Character';

export interface Plot {
  id: string;
  name: string;
  roles: Array<Role> | (() => Array<Role>);
  roleCriteria?: {
    role: Role;
    filter: (character: Character) => boolean;
  };
}
