import { CastMember, Character } from '../types/Character';
import { Plot } from '../types/Plot';
import { resolve } from '../util/resolve';
import { Role } from '../types/Role';
import * as _ from 'lodash';
import { Roles } from '../data/Roles';

export function assignRoles(characters: Array<Character>, plots: Array<Plot>): Array<CastMember> {
  const requiredRoles = getRoles(plots);
  const roles = fillWithPeople(requiredRoles, characters.length);

  // By now we have arrays of matched length: people and roles.
  // We have our pools; let's start.
  // Copy the arrays so as not to modify unintentionally. Our pools _will_ be modified.
  const rolePool = [...roles];
  const characterPool = [...characters];

  // Somewhere to store our results.
  const assignedRoles: Array<CastMember> = [];

  // Some roles have requirements. We need to account for those out of the gate.
  const rolesWithCriteria = plots
    .filter((p) => p.roleCriteria)
    // Trust me, this one is definitely non null.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((p) => p.roleCriteria!);

  rolesWithCriteria.forEach((criteria) => {
    // Find characters that match the criteria.
    const matchingCharacters = characterPool.filter(criteria.filter);
    // Pick a character that matches this criteria and give them that role.
    const character = _.sample(matchingCharacters) as Character;
    assignedRoles.push({
      role: criteria.role,
      character: character,
    });
    // Remove the character from the pool.
    _.remove(characterPool, (c: Character) => c.id === character.id);
    // Remove the role from the pool.
    // Note that this might happen multiple times, so we only want to remove ONE INSTANCE of that role from the pool.
    const indexToRemove = _.findIndex(rolePool, (r: Role) => r.id === criteria.role.id);
    rolePool.splice(indexToRemove, 1);
    console.log(`"${character.name}" was assigned to "${criteria.role.name}" by role or plot requirements.`);
  });

  // We've now assigned every mandatory role.
  // So now we can just zip whatever's left and mash them together.
  const remaining: Array<CastMember> = _.zipWith(rolePool, characterPool, (role: Role, character: Character) => ({
    role: role,
    character: character,
  }));

  return assignedRoles.concat(remaining);
}

function getRoles(plots: Array<Plot>): Array<Role> {
  // What roles do we have?
  const roles = plots.flatMap((p) => resolve(p.roles));

  // Some of the roles might have maximum amounts. If they do, we need to make sure we remove duplicates.
  // We can do this with a reduce.
  return roles.reduce(ensureRoleCaps, []);
}

function fillWithPeople(requiredRoles: Array<Role>, castSize: number): Array<Role> {
  const numberOfPeopleNeeded = castSize - requiredRoles.length;
  if (numberOfPeopleNeeded <= 0) {
    // If we got here, something has gone terribly wrong and this is likely undefined behavior.
    return requiredRoles;
  }

  const people = _.times(numberOfPeopleNeeded, () => Roles.person);
  return requiredRoles.concat(people);
}

/**
 * Prune the occurrences of roles back to their maximums, if set.
 * @param accumulator The accumulator for the reducer
 * @param role The role itself
 */
function ensureRoleCaps(accumulator: Role[], role: Role): Role[] {
  // If there isn't a max specified for this role, just keep on going.
  if (!role.max) {
    return accumulator.concat(role);
  }

  // If there is a max for this role, we need to make sure we aren't already hitting it.
  const existing = accumulator.filter((r) => r.id === role.id).length;
  if (existing < role.max) {
    // Add the role, we haven't yet capped out.
    return accumulator.concat(role);
  }

  // We must've maxed out. Don't add anything.
  return accumulator;
}
