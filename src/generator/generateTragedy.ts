import { CastMember, MainPlot, Subplot, Tragedy } from '../types/Tragedy';
import * as BaseGame from '../expansions/BaseGame';
import * as shuffle from 'shuffle-array';
import { GeneratorArgs } from '../types/GeneratorArgs';

function generateTragedy(args: GeneratorArgs): Tragedy {
  return {
    mainPlot: pickMainPlot(),
    subplots: pickSubplots(args.subplots),
    castMembers: pickCast(args.castSize),
  };
}

function pickMainPlot(): MainPlot {
  // The cast here is safe because shuffle.pick returns one thing.
  return shuffle.pick(BaseGame.MainPlots) as MainPlot;
}

function pickSubplots(number: 1 | 2): Subplot[] {
  // The cast here is safe because the call always picks 2 things.
  return shuffle.pick(BaseGame.Subplots, { picks: number }) as Subplot[];
}

function pickCast(size: 6 | 7 | 8 | 9 | 10 | 11): CastMember[] {
  return shuffle.pick(BaseGame.CastMembers, { picks: size }) as CastMember[];
}

export default generateTragedy;
