import { CastMember } from "../../model/CastMember";
import { Character } from "./Character";
import { Role } from "./Role";
import { TragedySet } from "./TragedySet";
import { m } from "../../paraglide/messages";
import { MastermindAbility } from "./MastermindAbility";
import { RoleAbility } from "./RoleAbility";

export class PlotRole {
  readonly #role: Role;
  readonly #condition?: RoleCondition;
  readonly #darkWorld?: Role;

  constructor(role: Role, opts: { condition?: RoleCondition; darkWorld?: Role } = {}) {
    this.#role = role;
    this.#condition = opts.condition;
    this.#darkWorld = opts.darkWorld;
  }

  public get id() {
    // TODO: Sure, why not, this seems fine. What could go wrong
    if (this.#darkWorld !== undefined) {
      return `${this.#role.id}-${this.#darkWorld.id}`;
    }
    return this.#role.id;
  }

  name(triggeringRole?: Role): string {
    const darkWorld = this.#darkWorld;
    // If the dark world isn't defined then we are good to go, just return the name.
    if (darkWorld === undefined) {
      return this.#role.name();
    }

    // If we've been asked for a specific role, then we have to be clear which one it is.
    if (triggeringRole !== undefined) {
      switch (triggeringRole.id) {
        case this.#role.id:
          return `${m["terms.lightWorldPrefix"]()}: ${this.#role.name()}`;
        case this.#darkWorld?.id:
          return `${m["terms.darkWorldPrefix"]()}: ${darkWorld.name()}`;
        default:
          throw new Error(
            `Asked for a triggering role (${triggeringRole.name()}) to generate name but role doesn't exist on PlotRole`,
          );
      }
    }

    return `${m["terms.lightWorldPrefix"]()}: ${this.#role.name()} / ${m["terms.darkWorldPrefix"]()}: ${darkWorld.name()}`;
  }

  abilities(): Array<{ grantedBy: Role; ability: RoleAbility }> {
    const roles = this.#darkWorld === undefined ? [this.#role] : [this.#role, this.#darkWorld];

    return roles.flatMap((role) =>
      (role.abilities ?? []).map((ability) => ({
        grantedBy: this.#role,
        ability,
      })),
    );
  }

  mastermindAbilities(): Array<{ grantedBy: Role; ability: MastermindAbility }> {
    const roles = this.#darkWorld === undefined ? [this.#role] : [this.#role, this.#darkWorld];

    return roles.flatMap((role) =>
      (role.mastermindAbilities ?? []).map((ability) => ({
        grantedBy: role,
        ability,
      })),
    );
  }

  is(role: Role) {
    return this.#role.id === role.id;
  }

  canBeAddedTo(roles: Array<PlotRole>, tragedySet: TragedySet): boolean {
    if (this.#darkWorld !== undefined) {
      // Dual Roles ignore maximums, so they can always be added.
      return true;
    }

    // If we have no max function, then we can always be added..
    if (this.#role.max === undefined) {
      return true;
    }

    // Ok, now we have some work to do.
    // Figure out what the max is for this tragedy set.
    const max = this.#role.max(tragedySet);
    // Figure out how many of this role already exist in the cast.
    const existing = roles.filter((r) => r.is(this.#role)).length;

    // If we're below capacity, then we can be added.
    // Otherwise, we can't.
    return existing < max;
  }

  canBePlayedBy(character: Character, cast: Array<CastMember>) {
    if (this.#condition !== undefined) {
      return this.#condition(character, cast);
    }
    return true;
  }

  mustBeCulprit(): boolean {
    return new Set([this.#role.culprit, this.#darkWorld?.culprit]).has("Mandatory");
  }

  canNeverBeCulprit(): boolean {
    return new Set([this.#role.culprit, this.#darkWorld?.culprit]).has("Never");
  }

  hasAnyGoodwillRefusal(): boolean {
    return this.#role.goodwillRefusal !== undefined || this.#darkWorld?.goodwillRefusal !== undefined;
  }

  hasMandatoryGoodwillRefusal(): boolean {
    return this.#role.goodwillRefusal === "Mandatory" || this.#darkWorld?.goodwillRefusal === "Mandatory";
  }

  isConnectedToBoard(): boolean {
    return this.#role.connectedToBoard || this.#darkWorld?.connectedToBoard === true;
  }

  isConnectedToLossCondition(): boolean {
    return this.#role.connectedToLossCondition || this.#darkWorld?.connectedToLossCondition === true;
  }

  isDualRole(): boolean {
    return this.#darkWorld !== undefined;
  }
}

// Take in a character and determine if it matches for this role.
// Sometimes it is helpful to know what other roles have already been assigned.
type RoleCondition = (character: Character, cast: Array<CastMember>) => boolean;
