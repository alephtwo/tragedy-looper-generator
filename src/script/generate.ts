import produce from 'immer';
import * as _ from 'lodash';
import { Roles } from '../data/Roles';
import { CastMember } from '../types/CastMember';
import { Character } from '../types/data/Character';
import { Incident } from '../types/data/Incident';
import { Plot } from '../types/data/Plot';
import { ConditionalRole, Role } from '../types/data/Role';
import { TragedySet } from '../types/data/TragedySet';
import { Script } from '../types/Script';

interface GenerateArgs {
  tragedySet: TragedySet;
  castSize: number;
}
export function generate(args: GenerateArgs): Script {
  const mainPlot = pickMainPlot(args.tragedySet);
  const subplots = pickSubplots(args.tragedySet);
  const roles = getRoles([mainPlot].concat(subplots), args.castSize);

  const cast = roles.reduce(buildCast, {
    cast: [],
    pools: {
      characters: args.tragedySet.characters,
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

function pickMainPlot(tragedySet: TragedySet): Plot {
  return _.sample(tragedySet.mainPlots) || tragedySet.mainPlots[0];
}

function pickSubplots(tragedySet: TragedySet): Array<Plot> {
  return _.sampleSize(tragedySet.subplots, 2);
}

// Enforce maximums.
function getRoles(plots: Array<Plot>, castSize: number): Array<Role | ConditionalRole> {
  const required = plots
    // Get the individual roles.
    .flatMap((p) => (p.roles instanceof Function ? p.roles() : p.roles))
    .reduce(enforceMaximumRoles, []);

  // If the castSize is less than the number of required plots... sorry, users.
  const needed = Math.max(castSize, required.length);
  if (needed != castSize) {
    console.warn(`Cast size has been overridden to ${needed} in order to have enough for each required role.`);
  }
  // We want to return an array of length equal to castSize.
  // Fill the rest with "Person" roles.
  const filler = _.times(needed - required.length, _.constant(Roles.person));
  return required.concat(filler);
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
      incidentTriggers: []
    });
    // Remove the character from the pool.
    _.remove(next.pools.characters, (c) => c.id === character.id);
  });
}

function matchCharacter(pool: Array<Character>, role: Role | ConditionalRole, cast: Array<CastMember>): Character {
    // Find characters that can meet that role.
  // TODO: Handle the Mystery Boy. Somehow!
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
