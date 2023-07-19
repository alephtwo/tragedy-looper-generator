import { ParseKeys } from 'i18next';
import { CastMember } from '../CastMember';
import { Character } from './Character';
import { MastermindAbility } from './MastermindAbility';
import { RoleAbility } from './RoleAbility';

// no loc required, these types are just informational for generation - no ui
type Culprit = 'Never' | 'Optional' | 'Mandatory';
type GoodwillRefusal = 'Optional' | 'Mandatory';

export class Role {
  readonly id: string;
  readonly name_i18n_key: ParseKeys;
  readonly unkillable: boolean;
  readonly culprit: Culprit;
  readonly connectedToBoard: boolean;
  readonly connectedToLossCondition: boolean;
  readonly max?: number;
  readonly goodwillRefusal?: GoodwillRefusal;
  readonly abilities: Array<RoleAbility>;
  readonly mastermindAbilities: Array<MastermindAbility>;
  readonly condition?: RoleCondition;

  constructor(role: RoleArgs, condition?: RoleCondition) {
    this.id = role.id;
    this.name_i18n_key = role.name_i18n_key;
    this.unkillable = role.unkillable;
    this.culprit = role.culprit;
    this.connectedToBoard = role.connectedToBoard;
    this.connectedToLossCondition = role.connectedToLossCondition;
    this.max = role.max;
    this.goodwillRefusal = role.goodwillRefusal;
    this.abilities = role.abilities;
    this.mastermindAbilities = role.mastermindAbilities;
    this.condition = condition;
  }
}

export class ConditionalRole extends Role {
  constructor(args: ConditionalRoleArgs) {
    super(args.role, args.condition);
  }
}

// Create it with just a base role.
interface RoleArgs {
  readonly id: string;
  readonly name_i18n_key: ParseKeys;
  readonly unkillable: boolean;
  readonly culprit: Culprit;
  readonly connectedToBoard: boolean;
  readonly connectedToLossCondition: boolean;
  readonly max?: number;
  readonly goodwillRefusal?: GoodwillRefusal;
  readonly abilities: Array<RoleAbility>;
  readonly mastermindAbilities: Array<MastermindAbility>;
}

// Create it with a role _and_ a condition for assigning that role.
interface ConditionalRoleArgs {
  role: RoleArgs;
  condition: RoleCondition;
}

// Take in a character and determine if it matches for this role.
// Sometimes it is helpful to know what other roles have already been assigned.
type RoleCondition = (character: Character, cast: Array<CastMember>) => boolean;
