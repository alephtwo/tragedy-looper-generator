import { Character, Descriptor } from '../../types/data/Character';

export const requireDescriptor =
  (descriptor: Descriptor) =>
  (character: Character): boolean => {
    return character.descriptors.has(descriptor);
  };
