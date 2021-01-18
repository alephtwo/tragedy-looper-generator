import { Character } from '../types/Character';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { Tragedy } from '../types/Tragedy';
import * as shuffle from 'shuffle-array';

export function generateTragedy(args: GeneratorArgs): Tragedy {
  const { tragedySet } = args;

  return {
    cast: chooseCast(tragedySet.availableCast, args.castSize),
  };
}

function chooseCast(pool: Array<Character>, size: number): Array<Character> {
  return shuffle.pick(pool, { picks: size }) as Array<Character>;
}
