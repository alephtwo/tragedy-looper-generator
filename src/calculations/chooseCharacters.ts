import { Character } from '../types/Character';
import * as Characters from '../data/Characters';
import { Plot } from '../types/Plot';
import * as _ from 'lodash';

interface ChooseCharactersArgs {
  // The number of characters.
  amount: number;
  // Should we use the midnight circle characters?
  useMidnightCircleCharacters: boolean;
  // Should we use the cosmic evil characters?
  useCosmicEvilCharacters: boolean;
  // Sometimes plots can require specific characters.
  plots: Array<Plot>;
}

/**
 * Choose which characters will partake in a given Script.
 * @param args
 */
export function chooseCharacters(args: ChooseCharactersArgs): Array<Character> {
  const pool = getPool(args.useMidnightCircleCharacters, args.useCosmicEvilCharacters);
  const chosenCharacters: Array<Character> = [];

  // A little helper function that will be used to "shift" characters from the pool to the list of chosen characters.
  const selectCharacter = (character: Character) => {
    // Add the character to the list of chosen characters.
    chosenCharacters.push(character);
    // These will need to be removed from the pool so that they cannot be selected again later on.
    _.remove(pool, (c: Character) => c.id === character.id);
    console.log(`Character "${character.name}" was added to the pool due to plot requirements.`);
  };

  // Begin by pulling characters that our plots demand.
  const mandatoryCharacters = getMandatoryCharacters(args.plots);
  mandatoryCharacters.forEach(selectCharacter);

  // Alright, so now we need to take "role filters" into account.
  // Some plots require that e.g. "A Girl" is the key person, so we need to ensure that at least one matching
  // character is in the results.
  const plotsWithRequirements = args.plots.filter((a) => a.roleCriteria);
  // For every plot that has a filter, we'll pick one character that matches it from the pool.
  plotsWithRequirements.forEach((plot) => {
    if (!plot.roleCriteria) {
      // If by some act of god we got here with no criteria set, then we might as well stop.
      // This shouldn't happen and will probably cause an error.
      return;
    }

    // Proceed by filtering the pool.
    const charactersThatSatisfyCriteria = pool.filter(plot.roleCriteria.filter);
    // Grab exactly one character from that list. Cast it directly because the API specifies it is not an array.
    const chosenCharacter = _.sample(charactersThatSatisfyCriteria) as Character;
    // Mark that character as selected.
    selectCharacter(chosenCharacter);
  });

  // So now we have a pool and some characters that are potentially already selected.
  // We just need to get the rest, excluding the ones we've already picked from the total count.
  const numberOfMissingCharacters = args.amount - chosenCharacters.length;

  // Randomly pick the rest and return them.
  const remaining = _.sampleSize<Character>(pool, numberOfMissingCharacters);
  return chosenCharacters.concat(remaining);
}

/**
 * Return the pool of characters that can be used.
 * @param useMidnightCircleCharacters Should we include midnight circle characters?
 * @param useCosmicEvilCharacters Should we include cosmic evil characters?
 */
function getPool(useMidnightCircleCharacters: boolean, useCosmicEvilCharacters: boolean): Array<Character> {
  const mapping = [
    { characters: Characters.BaseGame, include: true },
    { characters: Characters.MidnightCircle, include: useMidnightCircleCharacters },
    { characters: Characters.CosmicEvil, include: useCosmicEvilCharacters },
  ];

  return mapping.filter((m) => m.include).flatMap((m) => m.characters);
}

/**
 * Given plots, get the list of mandatory characters.
 * @param plots
 */
function getMandatoryCharacters(plots: Array<Plot>): Array<Character> {
  return plots.filter((p) => p.mandatoryCharacters).flatMap((p) => p.mandatoryCharacters || []);
}
