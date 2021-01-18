import { Role } from './Role';

export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  gender: CharacterGender;
}

interface CastMember {
  character: Character;
  role: Role;
}

type CharacterType = 'Adult' | 'Student' | 'Animal' | 'Construct' | null;

type CharacterGender = 'Male' | 'Female' | 'All' | null;
