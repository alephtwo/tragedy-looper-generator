import { CastMember } from '../types/CastMember';
import { Character } from '../types/data/Character';
import { Incident } from '../types/data/Incident';
import { Plot } from '../types/data/Plot';
import { Role } from '../types/data/Role';
import { Script } from '../types/Script';

export type DifficultyFactor = -1 | 0 | 1;

export const AdditionalDifficultyFactors: AdditionalDifficultyFactorsDatabase = {
  increaseIfGirlHasRole:
    (role: Role) =>
    (script: Script): DifficultyFactor => {
      const met = script.cast.some((c) => c.character.descriptors.has('Girl') && c.role.id === role.id);
      return met ? 1 : 0;
    },
  modifyIfCharacterHasRole:
    (character: Character, role: Role, modify: -1 | 1) =>
    (script: Script): DifficultyFactor => {
      const met = script.cast.some((c) => c.character.id === character.id && c.role.id === role.id);
      return met ? modify : 0;
    },
  increaseIfRoleIsCulprit:
    (role: Role) =>
    (script: Script): DifficultyFactor => {
      const met = script.cast.some((c) => c.role.id === role.id && c.incidentTriggers.length > 0);
      return met ? 1 : 0;
    },
  increaseIfCharacterIsCulprit:
    (character: Character) =>
    (script: Script): DifficultyFactor => {
      const met = script.cast.some((c) => c.character.id === character.id && c.incidentTriggers.length > 0);
      return met ? 1 : 0;
    },
  increaseIfIncidentPresent:
    (incident: Incident) =>
    (script: Script): DifficultyFactor => {
      return determineIfIncidentIsPresent(script.cast, incident) ? 1 : 0;
    },
  increaseIfIncidentPresentWithRole:
    (incident: Incident, role: Role) =>
    (script: Script): DifficultyFactor => {
      const incidentPresent = determineIfIncidentIsPresent(script.cast, incident);
      const rolePresent = script.cast.some((c) => c.role.id === role.id);

      return incidentPresent && rolePresent ? 1 : 0;
    },
  increaseIfIncidentWithMainPlot:
    (incident: Incident, plot: Plot) =>
    (script: Script): DifficultyFactor => {
      const mainPlotMatches = script.mainPlot.id === plot.id;
      const incidentPresent = determineIfIncidentIsPresent(script.cast, incident);

      return mainPlotMatches && incidentPresent ? 1 : 0;
    },
  decreaseUnlessCharacterHasRole:
    (character: Character, role: Role) =>
    (script: Script): DifficultyFactor => {
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

function determineIfIncidentIsPresent(cast: Array<CastMember>, incident: Incident) {
  return cast.flatMap((c) => c.incidentTriggers).some((it) => it.incident.id === incident.id);
}
