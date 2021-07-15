import { Character } from './Character';
import { Role } from './Role';

export interface CheatsheetCastRow {
  id: string; // Still need to be able to identify these!
  character?: Character;
  role?: Role;
}
