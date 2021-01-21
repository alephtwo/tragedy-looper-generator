import { Role } from './Role';

export interface Character {
  readonly id: string;
  readonly name: string;
  readonly type: CharacterType;
  readonly gender: CharacterGender;
  readonly descriptors: Array<CharacterDescriptor>;
  readonly entersOnLoop?: (loops: number) => number;
}

interface CastMember {
  readonly character: Character;
  readonly role: Role;
}

type CharacterType = 'Adult' | 'Student' | 'Animal' | 'Construct' | null;

type CharacterGender = 'Male' | 'Female' | 'All' | null;

type CharacterDescriptor = 'Girl' | 'Woman' | 'Boy' | 'Man';
