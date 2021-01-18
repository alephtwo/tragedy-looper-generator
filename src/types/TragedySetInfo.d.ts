import { Character } from './Character';

export interface TragedySetInfo {
  id: string;
  title: string;
  order: number;
  availableCast: Array<Character>;
}
