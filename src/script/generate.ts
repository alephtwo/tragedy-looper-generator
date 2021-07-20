import * as _ from 'lodash';
import { Roles } from '../data/Roles';
import { CastMember } from '../types/CastMember';
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

  // Initialize our character, role, and incident pools.
  const cast = pickCast(args.tragedySet, args.castSize);

  return {
    tragedySet: args.tragedySet,
    // TODO: Calculate this.
    loops: _.random(),
    mainPlot: mainPlot,
    subplots: subplots,
    cast: cast,
  };
}

function pickMainPlot(tragedySet: TragedySet): Plot {
  return _.sample(tragedySet.mainPlots) || tragedySet.mainPlots[0];
}

function pickSubplots(tragedySet: TragedySet): Array<Plot> {
  return _.sampleSize(tragedySet.subplots, 2);
}

function pickCast(tragedySet: TragedySet, size: number): Array<CastMember> {
  const chosen = _.sampleSize(tragedySet.characters, size);
  return chosen.map((c) => ({
    character: c,
    // Assume everybody's a person to start with.
    role: Roles.person,
    // Nobody triggers any incidents yet.
    incidentTriggers: [],
  }));
}
