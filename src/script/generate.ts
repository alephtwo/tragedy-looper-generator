import * as _ from 'lodash';
import { Roles } from '../data/Roles';
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
  console.debug(roles);

  return {
    tragedySet: args.tragedySet,
    // TODO: Calculate this.
    loops: _.random(),
    mainPlot: mainPlot,
    subplots: subplots,
    cast: [],
  };
}

function pickMainPlot(tragedySet: TragedySet): Plot {
  return _.sample(tragedySet.mainPlots) || tragedySet.mainPlots[0];
}

function pickSubplots(tragedySet: TragedySet): Array<Plot> {
  return _.sampleSize(tragedySet.subplots, 2);
}

function getRoles(plots: Array<Plot>, castSize: number): Array<Role | ConditionalRole> {
  const required = plots.flatMap((p) => (p.roles instanceof Function ? p.roles() : p.roles));
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
