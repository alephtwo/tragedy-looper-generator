export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  gender: CharacterGender;
}

type CharacterType = 'Adult' | 'Student' | 'Animal' | 'Construct' | null;

type CharacterGender = 'Male' | 'Female' | 'All' | null;
