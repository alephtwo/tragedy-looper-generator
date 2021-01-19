import { Character, CastMember } from '../types/Character';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { Tragedy } from '../types/Tragedy';
import * as shuffle from 'shuffle-array';
import { Plot } from '../types/Plot';
import { wrap } from '../util/wrap';
import { Roles } from '../data/Roles';
import { Role } from '../types/Role';
import { Incident } from '../types/Incident';
import { IncidentOcurrence } from '../types/IncidentOcurrence';
import { rangeInclusive } from '../util/range';
import { resolve } from '../util/resolve';
import { duplicate } from '../util/duplicate';
import * as Cast from '../data/Cast';

export function generateTragedy(args: GeneratorArgs): Tragedy {
  const { tragedySet } = args;

  const mainPlot = chooseMainPlot(tragedySet.mainPlots);
  const subplots = chooseSubplots(tragedySet.subplots, args.subplots);

  const availableCast = getAvailableCast(args);
  const chosenCast = chooseCast(availableCast, args.castSize);

  const chosenIncidents = chooseIncidents(tragedySet.incidents, args.incidents);

  const cast = assignRoles(mainPlot, subplots, chosenCast);
  const incidents = assignIncidents(chosenIncidents, chosenCast, args.days);

  return {
    tragedySet: tragedySet.title,
    mainPlot: mainPlot,
    subplots: subplots,
    cast: cast,
    incidents: incidents,
  };
}

function getAvailableCast(args: GeneratorArgs): Array<Character> {
  const mapping = [
    { cast: Cast.BaseCast, use: true },
    { cast: Cast.MidnightCircleCast, use: args.useMidnightCircleCharacters },
    { cast: Cast.CosmicEvilCast, use: args.useCosmicEvilCharacters },
  ];

  return mapping.filter(({ use }) => use).flatMap(({ cast }) => cast);
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

function chooseIncidents(pool: Array<Incident>, incidents: number): Array<Incident> {
  return wrap(shuffle.pick(pool, { picks: incidents }));
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

function assignIncidents(incidents: Array<Incident>, cast: Array<Character>, maxDay: number): Array<IncidentOcurrence> {
  const culprits = wrap(shuffle.pick(cast, { picks: incidents.length }));
  const days = wrap(shuffle.pick(rangeInclusive(1, maxDay), { picks: incidents.length }));

  return incidents.map((incident, i) => ({
    character: culprits[i],
    incident: incident,
    day: days[i],
  }));
}

function getRequiredRoles(mainPlot: Plot, subplots: Array<Plot>): Array<Role> {
  // Stop complaining, this compiles dangit
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const subplotRoles = subplots.map((s: Plot) => resolve(s.roles)).flat();
  const required = resolve(mainPlot.roles).concat(subplotRoles);

  // Some of the roles might have maximum amounts. If they do, we need to make sure we remove duplicates.
  // We can do this with a reduce.
  return required.reduce(ensureRoleCaps, []);
}

/**
 * Create a number of "filler" roles based on the amount specified.
 * @param missing The number of roles to fill
 */
function getFillerRoles(missing: number) {
  return duplicate(Roles.person, missing);
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
