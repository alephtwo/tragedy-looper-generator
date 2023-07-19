import { Character, Descriptor } from '../../model/data/Character';

export const requireDescriptor =
  (descriptor: Descriptor) =>
  (character: Character): boolean => {
    return character.descriptors.has(descriptor);
  };
