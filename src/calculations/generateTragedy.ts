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
import { resolve } from '../util/resolve';
import * as _ from 'lodash';
import * as Cast from '../data/Cast';

export function generateTragedy(args: GeneratorArgs): Tragedy {
  const { tragedySet } = args;

  const mainPlot = chooseMainPlot(tragedySet.mainPlots);
  const subplots = chooseSubplots(tragedySet.subplots, args.subplots);

  const availableCast = getAvailableCast(args);
  const chosenCast = chooseCast(availableCast, args.castSize);

  const cast = assignRoles({
    mainPlot: mainPlot,
    subplots: subplots,
    cast: chosenCast,
  });
  const incidents = assignIncidents({
    incidents: tragedySet.incidents,
    cast: cast,
    maxDay: args.days,
    requestedIncidents: args.incidents,
  });

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

interface AssignRolesArgs {
  // The main plot.
  mainPlot: Plot;
  // Every subplot.
  subplots: Array<Plot>;
  // The cast of characters.
  cast: Array<Character>;
}
function assignRoles(args: AssignRolesArgs): Array<CastMember> {
  const plots = [args.mainPlot].concat(args.subplots);
  const required = getRequiredRoles(plots);
  const filler = getFillerRoles(args.cast.length - required.length);
  const roles = required.concat(filler);

  // Make a copy of the cast; we might be mutating this and don't want to affect the param.
  const cast = [...args.cast];

  // If any roles have requirements, we need to handpick some of our characters for certain roles.
  const requiredCastMembers: Array<CastMember> = [];
  plots
    .filter((p) => p.roleCriteria)
    .forEach((plot) => {
      if (!plot.roleCriteria) {
        // If by some act of god we got here but there isn't actually any criteria, just stop.
        // Something bad has happened but it's fine.
        return;
      }

      // TODO: What if there isn't a suitable character? Need to handle this better.
      const character = shuffle.pick(cast.filter(plot.roleCriteria.filter), { picks: 1 }) as Character;

      // We've picked a character for this role, so let's add them to the list of required cast members...
      console.log(`${character.name} was selected for role ${plot.roleCriteria.role.name} due to criteria.`);
      requiredCastMembers.push({
        character: character,
        role: plot.roleCriteria.role,
      });
      // ... and remove them from the pool of available choices...
      _.remove<Character>(cast, (c: Character) => c.id === character.id);
      // ... and remove the role from the pool of available choices.
      _.remove<Role>(roles, (r: Role) => r.id === plot.roleCriteria?.role.id);
    });

  // Fill out the remaining roles and go from there.
  const remainingCastMembers = cast.map<CastMember>((c, i) => ({
    character: cast[i],
    role: roles[i],
  }));

  return requiredCastMembers.concat(remainingCastMembers);
}

interface AssignIncidentsArgs {
  // All possible incidents for the scenario.
  incidents: Array<Incident>;
  // All chosen cast members.
  cast: Array<CastMember>;
  // The last day of each loop.
  maxDay: number;
  // How many incidents did the user ask for?
  requestedIncidents: number;
}

function assignIncidents(args: AssignIncidentsArgs): Array<IncidentOcurrence> {
  // Some roles are required to be culprits.
  const [required, notRequired] = _.partition<CastMember>(args.cast, (c) => c.role.isCulprit === 'always');

  // Knox's 7th: it is forbidden for the detective to be the culprit.
  const allowed = notRequired.filter((c) => c.role.isCulprit !== 'never');

  // One small problem. Since we added/removed culprits, there may be more
  // or less incidents than the user expected.
  // Can't do much about this other than to clamp the number of incidents.
  // We need this many...
  const neededIncidents = Math.max(required.length, args.requestedIncidents);
  // And we need to ensure that we don't have more incidents than our cast size.
  const actualIncidents = Math.min(neededIncidents, allowed.length);

  // The least we can do is let the wise know when this has happened.
  if (actualIncidents != args.requestedIncidents) {
    console.log('Due to the roles chosen, the number of incidents has been changed.');
  }

  const remainingCulprits = wrap(shuffle.pick(allowed, { picks: actualIncidents - required.length }));
  const culprits = required.concat(remainingCulprits);

  const chosenIncidents = wrap(shuffle.pick(args.incidents, { picks: actualIncidents }));
  const days = wrap(shuffle.pick(_.range(1, args.maxDay + 1), { picks: actualIncidents }));

  return chosenIncidents.map((incident, i) => ({
    character: culprits[i].character,
    incident: incident,
    day: days[i],
  }));
}

function getRequiredRoles(plots: Array<Plot>): Array<Role> {
  const required = plots.flatMap((s: Plot) => resolve(s.roles));

  // Some of the roles might have maximum amounts. If they do, we need to make sure we remove duplicates.
  // We can do this with a reduce.
  return required.reduce(ensureRoleCaps, []);
}

/**
 * Create a number of "filler" roles based on the amount specified.
 * @param missing The number of roles to fill
 */
function getFillerRoles(missing: number) {
  return _.times(missing, _.constant(Roles.person));
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
