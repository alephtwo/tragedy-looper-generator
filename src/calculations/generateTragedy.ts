import { Character, CastMember } from '../types/Character';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { Tragedy } from '../types/Tragedy';
import * as shuffle from 'shuffle-array';
import { Plot } from '../types/Plot';
import { wrap } from '../util/wrap';
import { Roles } from '../data/Roles';

export function generateTragedy(args: GeneratorArgs): Tragedy {
  const { tragedySet } = args;

  const mainPlot = chooseMainPlot(tragedySet.mainPlots);
  const subplots = chooseSubplots(tragedySet.subplots, args.subplots);
  const chosenCast = chooseCast(tragedySet.availableCast, args.castSize);

  const cast = assignRoles(mainPlot, subplots, chosenCast);
  console.log(cast);

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

function assignRoles(mainPlot: Plot, subplots: Array<Plot>, cast: Array<Character>): Array<CastMember> {
  // Stop complaining, this compiles dangit
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const subplotRoles = subplots.map((s: Plot) => s.roles).flat();
  const requiredRoles = mainPlot.roles.concat(subplotRoles);
  const people = [...new Array<number>(cast.length - requiredRoles.length)].map(() => Roles.person);
  console.log(people);
  const allRoles = requiredRoles.concat(people);

  return cast.map((c, i) => ({
    character: c,
    role: allRoles[i],
  }));
}
