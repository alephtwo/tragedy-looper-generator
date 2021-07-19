import { Role } from './Role';

export interface Plot {
  readonly id: string;
  readonly name: string;
  readonly roles: Array<Role> | (() => Array<Role>);
}
