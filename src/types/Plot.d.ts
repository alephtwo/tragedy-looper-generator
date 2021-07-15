import { Role } from './Role';
import { Character } from './Character';
import { Incident } from './Incident';
import { LoopEstimator } from './DifficultyGenerator';
import { PlotRule } from './triggers/PlotRule';
import { MastermindAbility } from './triggers/MastermindAbility';

export interface Plot {
  readonly id: string;
  readonly name: string;
  readonly roles: Array<Role> | (() => Array<Role>);
  readonly roleCriteria?: {
    readonly role: Role;
    readonly filter: (character: Character) => boolean;
  };
  readonly incidents?: Array<Incident>;
  readonly mandatoryCharacters?: Array<Character>;
  readonly estimateLoops: LoopEstimator;
  readonly rules: Array<PlotRule>;
  readonly mastermindAbilities: Array<MastermindAbility>;
}
