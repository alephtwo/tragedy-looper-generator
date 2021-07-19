import * as _ from 'lodash';
import { Plot } from '../types/data/Plot';
import { Role } from '../types/data/Role';
import { TragedySet } from '../types/data/TragedySet';
import { Script } from '../types/Script';

interface GenerateArgs {
  tragedySet: TragedySet;
  castSize: number;
}
export function generate(args: GenerateArgs): Script {
  const mainPlot = pickMainPlot(args.tragedySet);
  const subplots = pickSubplots(args.tragedySet);

  // Initialize our character, role, and incident pools.
  const pools = createPools(args.tragedySet, mainPlot, subplots);
  console.debug(pools);

  return {
    tragedySet: args.tragedySet,
    // TODO: Calculate this.
    loops: _.random(),
    mainPlot: mainPlot,
    subplots: subplots,
    // TODO: Cast should be chosen
    cast: [],
  };
}

function pickMainPlot(tragedySet: TragedySet): Plot {
  return _.sample(tragedySet.mainPlots) || tragedySet.mainPlots[0];
}

function pickSubplots(tragedySet: TragedySet): Array<Plot> {
  return _.sampleSize(tragedySet.subplots, 2);
}

function createPools(tragedySet: TragedySet, mainPlot: Plot, subplots: Array<Plot>) {
  const roles: Array<Role> = [mainPlot]
    .concat(subplots)
    .flatMap((p) => (p.roles instanceof Function ? p.roles() : p.roles));

  return {
    characters: [...tragedySet.characters],
    incidents: [...tragedySet.incidents],
    roles: roles,
  };
}
