import { Role } from './Role';

export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  gender: CharacterGender;
  descriptor: CharacterDescriptor;
}

interface CastMember {
  character: Character;
  role: Role;
}

type CharacterType = 'Adult' | 'Student' | 'Animal' | 'Construct' | null;

type CharacterGender = 'Male' | 'Female' | 'All' | null;

type CharacterDescriptor = 'Girl' | 'Woman' | 'Boy' | 'Man' | 'All' | null;
