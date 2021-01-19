import { Role } from './Role';

export interface Plot {
  id: string;
  name: string;
  roles: Array<Role> | (() => Array<Role>);
}
