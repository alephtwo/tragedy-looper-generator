import { MastermindAbility } from './triggers/MastermindAbility';
import { RoleAbility } from './triggers/RoleAbility';

export interface Role {
  readonly id: string;
  readonly name: string;
  readonly abilities: Array<RoleAbility>;
  readonly mastermindAbilities: Array<MastermindAbility>;
  readonly max?: number;
  readonly isCulprit?: 'always' | 'never';
}
