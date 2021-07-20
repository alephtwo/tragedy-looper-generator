import * as _ from 'lodash';
import { Plot } from '../types/data/Plot';
import { TragedySet } from '../types/data/TragedySet';
import { Script } from '../types/Script';

interface GenerateArgs {
  tragedySet: TragedySet;
  castSize: number;
}
export function generate(args: GenerateArgs): Script {
  const mainPlot = pickMainPlot(args.tragedySet);
  const subplots = pickSubplots(args.tragedySet);
  const roles = [mainPlot].concat(subplots).flatMap((s) => (s.roles instanceof Function ? s.roles() : s.roles));

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
