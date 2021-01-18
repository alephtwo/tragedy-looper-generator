import { Character } from '../types/Character';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { Tragedy } from '../types/Tragedy';
import * as shuffle from 'shuffle-array';
import { Plot } from '../types/Plot';
import { wrap } from '../util/wrap';

export function generateTragedy(args: GeneratorArgs): Tragedy {
  const { tragedySet } = args;

  const mainPlot = chooseMainPlot(tragedySet.mainPlots);
  const subplots = chooseSubplots(tragedySet.subplots, args.subplots);
  const cast = chooseCast(tragedySet.availableCast, args.castSize);

  return {
    tragedySet: tragedySet.title,
    mainPlot: mainPlot,
    subplots: subplots,
    cast: cast,
  };
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
