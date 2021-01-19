import { Character, CastMember } from '../types/Character';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { Tragedy } from '../types/Tragedy';
import * as shuffle from 'shuffle-array';
import { Plot } from '../types/Plot';
import { wrap } from '../util/wrap';
import { Roles } from '../data/Roles';
import { Role } from '../types/Role';

export function generateTragedy(args: GeneratorArgs): Tragedy {
  const { tragedySet } = args;

  const mainPlot = chooseMainPlot(tragedySet.mainPlots);
  const subplots = chooseSubplots(tragedySet.subplots, args.subplots);
  const chosenCast = chooseCast(tragedySet.availableCast, args.castSize);

  const cast = assignRoles(mainPlot, subplots, chosenCast);
  console.log(cast);

  return {
    tragedySet: tragedySet.title,
    mainPlot: mainPlot,
    subplots: subplots,
    cast: cast,
  };
}

function chooseMainPlot(pool: Array<Plot>): Plot {
  return shuffle.pick(pool, { picks: 1 }) as Plot;
}

function chooseSubplots(pool: Array<Plot>, size: number): Array<Plot> {
  return wrap(shuffle.pick(pool, { picks: size }));
}

function chooseCast(pool: Array<Character>, size: number): Array<Character> {
  return shuffle.pick(pool, { picks: size }) as Array<Character>;
}

function assignRoles(mainPlot: Plot, subplots: Array<Plot>, cast: Array<Character>): Array<CastMember> {
  const required = getRequiredRoles(mainPlot, subplots);
  const filler = getFillerRoles(cast.length - required.length);

  const roles = required.concat(filler);
  return cast.map((c, i) => ({
    character: c,
    role: roles[i],
  }));
}

function getRequiredRoles(mainPlot: Plot, subplots: Array<Plot>): Array<Role> {
  // Stop complaining, this compiles dangit
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const subplotRoles = subplots.map((s: Plot) => s.roles).flat();
  const required = mainPlot.roles.concat(subplotRoles);

  // Some of the roles might have maximum amounts. If they do, we need to make sure we remove duplicates.
  // We can do this with a reduce.
  return required.reduce(ensureRoleCaps, []);
}

/**
 * Create a number of "filler" roles based on the amount specified.
 * @param missing The number of roles to fill
 */
function getFillerRoles(missing: number) {
  return [...new Array<number>(missing)].map(() => Roles.person);
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
