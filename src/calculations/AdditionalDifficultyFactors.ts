import { Script } from '../types/Script';
import { Role } from '../types/Role';
import { Character } from '../types/Character';
import { Incident } from '../types/Incident';
import { Plot } from '../types/Plot';

export type DifficultyFactor = -1 | 0 | 1;

export const AdditionalDifficultyFactors: AdditionalDifficultyFactorsDatabase = {
  increaseIfGirlHasRole: (role: Role) => (script: Script): DifficultyFactor => {
    const met = script.cast.some((c) => c.character.descriptors.includes('Girl') && c.role.id === role.id);
    return met ? 1 : 0;
  },
  modifyIfCharacterHasRole: (character: Character, role: Role, modify: -1 | 1) => (
    script: Script
  ): DifficultyFactor => {
    const met = script.cast.some((c) => c.character.id === character.id && c.role.id === role.id);
    return met ? modify : 0;
  },
  increaseIfRoleIsCulprit: (role: Role) => (script: Script): DifficultyFactor => {
    const castMember = script.cast.find((c) => c.role.id === role.id);
    if (castMember === undefined) {
      // If the character doesn't exist, we can just stop.
      return 0;
    }

    const met = script.incidents.some((c) => c.character.id === castMember.character.id);
    return met ? 1 : 0;
  },
  increaseIfCharacterIsCulprit: (character: Character) => (script: Script): DifficultyFactor => {
    const met = script.incidents.some((c) => c.character.id === character.id);
    return met ? 1 : 0;
  },
  increaseIfIncidentPresent: (incident: Incident) => (script: Script): DifficultyFactor => {
    const met = script.incidents.some((c) => c.incident.id === incident.id);
    return met ? 1 : 0;
  },
  increaseIfIncidentPresentWithRole: (incident: Incident, role: Role) => (script: Script): DifficultyFactor => {
    const incidentPresent = script.incidents.some((i) => i.incident.id === incident.id);
    const rolePresent = script.cast.some((c) => c.role.id === role.id);

    return incidentPresent && rolePresent ? 1 : 0;
  },
  increaseIfIncidentWithMainPlot: (incident: Incident, plot: Plot) => (script: Script): DifficultyFactor => {
    const mainPlotMatches = script.mainPlot.id === plot.id;
    const incidentPresent = script.incidents.some((c) => c.incident.id === incident.id);

    return mainPlotMatches && incidentPresent ? 1 : 0;
  },
  decreaseUnlessCharacterHasRole: (character: Character, role: Role) => (script: Script): DifficultyFactor => {
    const characterHasRole = script.cast.some((c) => c.role.id === role.id && c.character.id === character.id);
    return characterHasRole ? 0 : -1;
  },
};

interface AdditionalDifficultyFactorsDatabase {
  increaseIfGirlHasRole: (role: Role) => (script: Script) => DifficultyFactor;
  modifyIfCharacterHasRole: (character: Character, role: Role, modify: -1 | 1) => (script: Script) => DifficultyFactor;
  increaseIfRoleIsCulprit: (role: Role) => (script: Script) => DifficultyFactor;
  increaseIfCharacterIsCulprit: (character: Character) => (script: Script) => DifficultyFactor;
  increaseIfIncidentPresent: (incident: Incident) => (script: Script) => DifficultyFactor;
  increaseIfIncidentPresentWithRole: (incident: Incident, role: Role) => (script: Script) => DifficultyFactor;
  increaseIfIncidentWithMainPlot: (incident: Incident, plot: Plot) => (script: Script) => DifficultyFactor;
  decreaseUnlessCharacterHasRole: (character: Character, role: Role) => (script: Script) => DifficultyFactor;
}
