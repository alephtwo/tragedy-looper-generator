import { Roles } from '../data/Roles';
import { Plot } from '../types/Plot';
import { Role } from '../types/Role';
import * as _ from 'lodash';

export function getRoles(plots: Array<Plot>, castSize: number): Array<Role> {
  const requiredRoles = getRolesFromPlots(plots);
  return fillWithPeople(requiredRoles, castSize);
}

function getRolesFromPlots(plots: Array<Plot>): Array<Role> {
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

/**
 * If arg is a function, call it and return the value.
 * Otherwise, return the value.
 * @param arg
 */
export function resolve<T>(arg: T | (() => T)): T {
  return arg instanceof Function ? arg() : arg;
}
