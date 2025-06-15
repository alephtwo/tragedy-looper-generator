import { ParseKeys } from "i18next";
import { CastMember } from "../../model/CastMember";
import { Character } from "./Character";
import { MastermindAbility } from "./MastermindAbility";
import { RoleAbility } from "./RoleAbility";
import { Identifiable } from "../../@types/Identifiable";
import { UUID } from "crypto";
import { TragedySet } from "./TragedySet";

// no loc required, these types are just informational for generation - no ui
type Culprit = "Never" | "Optional" | "Mandatory";
type GoodwillRefusal = "Optional" | "Mandatory" | "Puppeted";

interface CommonRole extends Identifiable {
  readonly id: UUID;
  readonly culprits: Set<Culprit>;
  readonly abilities: Array<RoleAbility>;
  readonly mastermindAbilities: Array<MastermindAbility>;
  readonly connectedToBoard: boolean;
  readonly connectedToLossCondition: boolean;
  readonly goodwillRefusals: Set<GoodwillRefusal>;
}

export class Role implements CommonRole {
  readonly id: UUID;
  readonly name_i18n_key: ParseKeys;
  readonly unkillable: boolean;
  readonly culprits: Set<Culprit>;
  readonly connectedToBoard: boolean;
  readonly connectedToLossCondition: boolean;
  readonly max: (tragedySet: TragedySet) => number;
  readonly goodwillRefusals: Set<GoodwillRefusal>;
  readonly abilities: Array<RoleAbility>;
  readonly mastermindAbilities: Array<MastermindAbility>;
  readonly condition?: RoleCondition;
  readonly initialArgs: RoleArgs; // Store initial args, we might need 'em

  constructor(role: RoleArgs, condition?: RoleCondition) {
    this.id = role.id;
    this.name_i18n_key = role.name_i18n_key;
    this.unkillable = role.unkillable;
    this.culprits = new Set([role.culprit]);
    this.connectedToBoard = role.connectedToBoard;
    this.connectedToLossCondition = role.connectedToLossCondition;
    this.max = role.max === undefined ? () => Infinity : role.max;
    this.goodwillRefusals = role.goodwillRefusal === undefined ? new Set() : new Set([role.goodwillRefusal]);
    this.abilities = role.abilities;
    this.mastermindAbilities = role.mastermindAbilities;
    this.condition = condition;
    this.initialArgs = role;
  }
}

export class ConditionalRole extends Role {
  constructor(args: ConditionalRoleArgs) {
    super(args.role.initialArgs, args.condition);
  }
}

export class DualRole implements CommonRole {
  readonly id: UUID;
  readonly lightWorld: Role;
  readonly darkWorld: Role;
  readonly culprits: Set<Culprit>;
  readonly condition: undefined; // Dual Roles cannot be conditional
  readonly abilities: Array<RoleAbility>;
  readonly mastermindAbilities: Array<MastermindAbility>;
  readonly connectedToBoard: boolean;
  readonly connectedToLossCondition: boolean;
  readonly goodwillRefusals: Set<GoodwillRefusal>;

  constructor(opts: { id: UUID; lightWorld: Role; darkWorld: Role }) {
    const bothRoles = [opts.lightWorld, opts.darkWorld];

    this.id = opts.id;
    this.lightWorld = opts.lightWorld;
    this.darkWorld = opts.darkWorld;
    this.culprits = new Set(...bothRoles.map((r) => r.culprits));
    this.abilities = bothRoles.flatMap((c) => c.abilities);
    this.mastermindAbilities = bothRoles.flatMap((c) => c.mastermindAbilities);
    this.connectedToBoard = opts.lightWorld.connectedToBoard || opts.darkWorld.connectedToBoard;
    this.connectedToLossCondition = opts.lightWorld.connectedToLossCondition || opts.darkWorld.connectedToLossCondition;
    this.goodwillRefusals = new Set(...bothRoles.map((r) => r.goodwillRefusals));
  }
}

// Create it with just a base role.
interface RoleArgs {
  readonly id: UUID;
  readonly name_i18n_key: ParseKeys;
  readonly unkillable: boolean;
  readonly culprit: Culprit;
  readonly connectedToBoard: boolean;
  readonly connectedToLossCondition: boolean;
  readonly max?: (tragedySet: TragedySet) => number;
  readonly goodwillRefusal?: GoodwillRefusal;
  readonly abilities: Array<RoleAbility>;
  readonly mastermindAbilities: Array<MastermindAbility>;
}

// Create it with a role _and_ a condition for assigning that role.
interface ConditionalRoleArgs {
  role: Role;
  condition: RoleCondition;
}

// Take in a character and determine if it matches for this role.
// Sometimes it is helpful to know what other roles have already been assigned.
type RoleCondition = (character: Character, cast: Array<CastMember>) => boolean;
