import produce from 'immer';
import * as _ from 'lodash';
import { Characters } from '../data/Characters';
import { Incidents } from '../data/Incidents';
import { Roles } from '../data/Roles';
import { CastMember } from '../types/CastMember';
import { Character } from '../types/data/Character';
import { Incident } from '../types/data/Incident';
import { Plot } from '../types/data/Plot';
import { Role } from '../types/data/Role';
import { TragedySet } from '../types/data/TragedySet';
import { IncidentOccurrence } from '../types/IncidentOccurrence';
import { Script } from '../types/Script';

export interface GenerateArgs {
  tragedySet: TragedySet;
  castSize: number;
  days: number;
  incidents: number;
}
export function generate(args: GenerateArgs): Script {
  const mainPlot = pickMainPlot(args.tragedySet);
  const subplots = pickSubplots(args.tragedySet);
  const plots = [mainPlot].concat(subplots);

  // Find the required roles.
  // Notably, the Mystery Boy might appear in the initial cast. If he does,
  // then we have to account for his role slot already being filled.
  const requiredRoles = getRequiredRoles(plots);
  const initialCast = initializeCast(args, requiredRoles);

  // If there is any initial cast, we should account for their roles
  const roles = fillRemainingRoles(requiredRoles, args.castSize - initialCast.length);
  const castWithoutIncidents = roles.reduce(buildCast, {
    cast: initialCast,
    // Assume that the mystery boy has already been assigned.
    characters: args.tragedySet.characters.filter((c) => c.id !== Characters.mysteryBoy.id),
  }).cast;

  const incidents = pickIncidents({
    incidents: args.tragedySet.incidents,
    amount: args.incidents,
    days: args.days,
    plots: plots,
  });

  const cast = assignIncidentsToCast(castWithoutIncidents, incidents);
  return new Script({
    tragedySet: args.tragedySet,
    days: args.days,
    mainPlot: mainPlot,
    subplots: subplots,
    cast: cast,
  });
}

function getRequiredRoles(plots: Array<Plot>): Array<Role> {
  return plots.flatMap((p) => p.roles()).reduce(enforceMaximumRoles, []);
}

function pickMainPlot(tragedySet: TragedySet): Plot {
  return _.sample(tragedySet.mainPlots) || tragedySet.mainPlots[0];
}

function pickSubplots(tragedySet: TragedySet): Array<Plot> {
  return _.sampleSize(tragedySet.subplots, 2);
}

// Enforce maximums.
function fillRemainingRoles(roles: Array<Role>, castSize: number): Array<Role> {
  // If the castSize is less than the number of required plots... sorry, users.
  const needed = Math.max(castSize, roles.length);
  if (needed != castSize) {
    console.warn(`Cast size has been overridden to ${needed} in order to have enough for each required role.`);
  }
  // We want to return an array of length equal to castSize.
  // Fill the rest with "Person" roles.
  const filler = _.times(needed - roles.length, _.constant(Roles.person));
  return roles.concat(filler);
}

function enforceMaximumRoles(roles: Array<Role>, role: Role): Array<Role> {
  const sameRoles = roles.filter((r) => r.id === role.id);

  // If we have too many of the same role, we can't add it.
  if (sameRoles.length >= (role.max || Infinity)) {
    return roles;
  }

  return produce(roles, (next) => {
    next.push(role);
  });
}

function initializeCast(args: GenerateArgs, requiredRoles: Array<Role>): Array<CastMember> {
  const tragedySet = args.tragedySet;

  // We're going to pick a fake cast and if we get the Mystery Boy,
  // we'll just pretend he was already picked.
  const fakeCast = _.sampleSize(tragedySet.characters, args.castSize);
  if (!fakeCast.some((c) => c.id === Characters.mysteryBoy.id)) {
    // No Mystery Boy, no need it initialize
    return [];
  }

  // Alright, we've got a mystery boy. Now we need to find a role for him.
  // Per the rules, he can't have a role dictated by the plot.
  const requiredRoleIds = new Set(requiredRoles.map((r) => r.id));
  const candidateRoles = tragedySet.mainPlots
    .concat(tragedySet.subplots)
    .flatMap((p) => p.roles())
    .filter((r) => !requiredRoleIds.has(r.id));

  return [
    new CastMember({
      character: Characters.mysteryBoy,
      // oh my what a hack
      role: _.sample(candidateRoles) as Role,
      incidentTriggers: [],
    }),
  ];
}

interface BuildCastAccumulator {
  cast: Array<CastMember>;
  characters: Array<Character>;
}
function buildCast(state: BuildCastAccumulator, role: Role): BuildCastAccumulator {
  // Grab the real role.
  const character = matchCharacter(state.characters, role, state.cast);

  return produce(state, (next) => {
    // Add the cast member.
    next.cast.push(
      new CastMember({
        character: character,
        role: role,
        // We will assign incidents later.
        incidentTriggers: [],
      })
    );
    // Remove the character from the pool.
    _.remove(next.characters, (c) => c.id === character.id);
  });
}

function matchCharacter(pool: Array<Character>, role: Role, cast: Array<CastMember>): Character {
  // Find characters that can meet that role.
  const characters = pool.filter((c) => role.condition === undefined || role.condition(c, cast));

  // Pick a random one of the matching characters.
  // This cast might cause problems but I'm really hoping it won't.
  return _.sample(characters) as Character;
}

interface PickIncidentsArgs {
  incidents: Array<Incident>;
  amount: number;
  days: number;
  plots: Array<Plot>;
}
function pickIncidents(args: PickIncidentsArgs): Array<IncidentOccurrence> {
  const required = args.plots.flatMap((p) => p.requiredIncidents);

  // Can't have more incidents than we do days.
  // TODO: Account for whether or not we have roles that require incidents.
  // We also might have some that are required, in which case we don't want to double count those.
  const amount = Math.min(args.amount, args.days) - required.length;
  // Pick however many we still need at random.
  const remainingIncidents = _.times(amount, () => _.sample(args.incidents) as Incident);

  const incidents = required.concat(remainingIncidents);
  const assignedIncidents = incidents.reduce(assignDayToIncident, {
    days: _.range(1, args.days + 1),
    occurrences: [],
  }).occurrences;

  // For each of our assigned incidents, we want to actually go through and assign it.
  return produce(assignedIncidents, (next) => {
    next
      .filter((i) => i.incident.id === Incidents.fakeIncident.id)
      .forEach((incident) => {
        const candidates = incidents.filter((i) => i.id !== Incidents.fakeIncident.id);
        incident.setFake(_.sample(candidates) as Incident);
      });
  });
}

interface AssignDayToIncidentState {
  days: Array<number>;
  occurrences: Array<IncidentOccurrence>;
}
function assignDayToIncident(state: AssignDayToIncidentState, incident: Incident): AssignDayToIncidentState {
  // cool cast bro
  const day = _.sample(state.days) as number;
  return produce(state, (next) => {
    _.pull(next.days, day);
    next.occurrences.push(new IncidentOccurrence({ incident: incident, day: day }));
  });
}

function assignIncidentsToCast(cast: Array<CastMember>, incidents: Array<IncidentOccurrence>): Array<CastMember> {
  return produce(cast, (next) => {
    // Who _could_ be a culprit here?
    let culpritPool = [...next.filter((c) => c.role.culprit !== 'Never')];
    incidents.forEach((incident) => {
      // If we are attempting to assign a serial murder and one has already been assigned, we will assign it to the same culprit.
      // TODO: Support that it _might_ be the same culprit, but doesn't have to be. Coin flip?
      // If you're working on a script that doesn't want the same role to be responsible for all of the serial murders,
      // you should probably just write a script manually and not generate one at random.
      if (incident.incident.id === Incidents.serialMurder.id) {
        const serialMurderer = next.find((c) =>
          c.incidentTriggers.some((i) => i.incident.id === Incidents.serialMurder.id)
        );
        if (serialMurderer !== undefined) {
          serialMurderer.incidentTriggers.push(incident);
          return;
        }
      }

      // We know we're not dealing with a serial murderer here.
      // If there is a culprit candidate who is mandatory but hasn't yet been assigned, let's do that.
      const required = culpritPool.filter((c) => c.role.culprit === 'Mandatory' && c.incidentTriggers.length === 0);

      // Pick a culprit.
      const culprit = (required.length > 0 ? _.first(required) : _.sample(culpritPool)) as CastMember;

      // Take that culprit and assign it the incident.
      culprit.incidentTriggers.push(incident);

      // Remove the culprit from the pool of possibilities.
      culpritPool = produce(culpritPool, (next) => {
        _.remove(next, (c) => c.character.id === culprit.character.id);
      });
    });
  });
}
