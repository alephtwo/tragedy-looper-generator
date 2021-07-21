import produce from 'immer';
import * as _ from 'lodash';
import { Characters } from '../data/Characters';
import { Roles } from '../data/Roles';
import { CastMember } from '../types/CastMember';
import { Character } from '../types/data/Character';
import { Incident } from '../types/data/Incident';
import { Plot } from '../types/data/Plot';
import { ConditionalRole, Role } from '../types/data/Role';
import { TragedySet } from '../types/data/TragedySet';
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

  // Find the required roles.
  // Notably, the Mystery Boy might appear in the initial cast. If he does,
  // then we have to account for his role slot already being filled.
  const requiredRoles = getRequiredRoles([mainPlot].concat(subplots));
  const initialCast = initializeCast(args, requiredRoles);

  // If there is any initial cast, we should account for their roles
  const roles = fillRemainingRoles(requiredRoles, args.castSize - initialCast.length);
  const cast = roles.reduce(buildCast, {
    cast: initialCast,
    pools: {
      // Assume that the mystery boy has already been assigned.
      characters: args.tragedySet.characters.filter((c) => c.id !== Characters.mysteryBoy.id),
      incidents: args.tragedySet.incidents,
    },
  });

  return {
    tragedySet: args.tragedySet,
    // TODO: Calculate this.
    loops: _.random(),
    mainPlot: mainPlot,
    subplots: subplots,
    cast: cast.cast,
  };
}

function getRequiredRoles(plots: Array<Plot>): Array<Role | ConditionalRole> {
  return (
    plots
      // Get the individual roles.
      .flatMap((p) => (p.roles instanceof Function ? p.roles() : p.roles))
      .reduce(enforceMaximumRoles, [])
  );
}

function pickMainPlot(tragedySet: TragedySet): Plot {
  return _.sample(tragedySet.mainPlots) || tragedySet.mainPlots[0];
}

function pickSubplots(tragedySet: TragedySet): Array<Plot> {
  return _.sampleSize(tragedySet.subplots, 2);
}

// Enforce maximums.
function fillRemainingRoles(roles: Array<Role | ConditionalRole>, castSize: number): Array<Role | ConditionalRole> {
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

function enforceMaximumRoles(
  roles: Array<Role | ConditionalRole>,
  crole: Role | ConditionalRole
): Array<Role | ConditionalRole> {
  const role: Role = roleIsConditional(crole) ? (crole as ConditionalRole).role : (crole as Role);
  const sameRoles = roles.filter((cr) => {
    const r = roleIsConditional(cr) ? (cr as ConditionalRole).role : (cr as Role);
    return r.id === role.id;
  });

  // If we have too many of the same role, we can't add it.
  if (sameRoles.length >= (role.max || Infinity)) {
    return roles;
  }

  return produce(roles, (next) => {
    next.push(crole);
  });
}

function initializeCast(args: GenerateArgs, requiredRoles: Array<Role | ConditionalRole>): Array<CastMember> {
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
  const requiredRoleIds = new Set(
    requiredRoles.map((r) => (roleIsConditional(r) ? (r as ConditionalRole).role.id : (r as Role).id))
  );
  const candidateRoles = tragedySet.mainPlots
    .concat(tragedySet.subplots)
    .flatMap((p) => (p.roles instanceof Function ? p.roles() : p.roles))
    .flatMap((r) => (roleIsConditional(r) ? (r as ConditionalRole).role : (r as Role)))
    .filter((r) => !requiredRoleIds.has(r.id));

  return [
    {
      character: Characters.mysteryBoy,
      // oh my what a hack
      role: _.sample(candidateRoles) as Role,
      incidentTriggers: [],
    },
  ];
}

interface BuildCastAccumulator {
  cast: Array<CastMember>;
  pools: {
    characters: Array<Character>;
    incidents: Array<Incident>;
  };
}
function buildCast(state: BuildCastAccumulator, crole: Role | ConditionalRole): BuildCastAccumulator {
  // Grab the real role.
  const role: Role = roleIsConditional(crole) ? (crole as ConditionalRole).role : (crole as Role);
  const character = matchCharacter(state.pools.characters, crole, state.cast);

  return produce(state, (next) => {
    // Add the cast member.
    next.cast.push({
      character: character,
      role: role,
      // We will assign incidents later.
      incidentTriggers: [],
    });
    // Remove the character from the pool.
    _.remove(next.pools.characters, (c) => c.id === character.id);
  });
}

function matchCharacter(pool: Array<Character>, role: Role | ConditionalRole, cast: Array<CastMember>): Character {
  // Find characters that can meet that role.
  let characters = pool;
  if (roleIsConditional(role)) {
    const condition = (role as ConditionalRole).condition;
    characters = characters.filter((c) => condition(c, cast));
  }
  // Pick a random one of the matching characters.
  // This cast might cause problems but I'm really hoping it won't.
  return _.sample(characters) as Character;
}

function roleIsConditional(role: Role | ConditionalRole): boolean {
  return !Object.keys(role).includes('id');
}
