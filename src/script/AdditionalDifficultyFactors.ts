import { CastMember } from '../types/CastMember';
import { Character } from '../types/data/Character';
import { Incident } from '../types/data/Incident';
import { Plot } from '../types/data/Plot';
import { Role } from '../types/data/Role';
import { Script } from '../types/Script';

export type DifficultyFactor = -1 | 0 | 1;

export const increaseIfGirlHasRole =
  (role: Role) =>
  (script: Script): DifficultyFactor => {
    const met = script.cast.some((c) => c.character.descriptors.has('Girl') && c.role.id === role.id);
    return met ? 1 : 0;
  };

const modifyIfCharacterHasRole =
  (modify: -1 | 1) =>
  (character: Character, role: Role) =>
  (script: Script): DifficultyFactor => {
    const met = script.cast.some((c) => c.character.id === character.id && c.role.id === role.id);
    return met ? modify : 0;
  };

export const increaseIfCharacterHasRole = modifyIfCharacterHasRole(1);
export const decreaseIfCharacterHasRole = modifyIfCharacterHasRole(-1);

export const increaseIfRoleIsCulprit =
  (role: Role) =>
  (script: Script): DifficultyFactor => {
    const met = script.cast.some((c) => c.role.id === role.id && c.incidentTriggers.length > 0);
    return met ? 1 : 0;
  };

export const increaseIfCharacterIsCulprit =
  (character: Character) =>
  (script: Script): DifficultyFactor => {
    const met = script.cast.some((c) => c.character.id === character.id && c.incidentTriggers.length > 0);
    return met ? 1 : 0;
  };

export const increaseIfIncidentPresent =
  (incident: Incident) =>
  (script: Script): DifficultyFactor => {
    return determineIfIncidentIsPresent(script, incident) ? 1 : 0;
  };

export const increaseIfIncidentPresentWithRole =
  (incident: Incident, role: Role) =>
  (script: Script): DifficultyFactor => {
    const incidentPresent = determineIfIncidentIsPresent(script, incident);
    const rolePresent = script.cast.some((c) => c.role.id === role.id);

    return incidentPresent && rolePresent ? 1 : 0;
  };

export const increaseIfIncidentWithMainPlot =
  (incident: Incident, plot: Plot) =>
  (script: Script): DifficultyFactor => {
    const mainPlotMatches = script.mainPlot.id === plot.id;
    const incidentPresent = determineIfIncidentIsPresent(script, incident);

    return mainPlotMatches && incidentPresent ? 1 : 0;
  };

export const decreaseUnlessCharacterHasRole =
  (character: Character, role: Role) =>
  (script: Script): DifficultyFactor => {
    const characterHasRole = script.cast.some((c) => c.role.id === role.id && c.character.id === character.id);
    return characterHasRole ? 0 : -1;
  };

export const increaseIfCharacterHasAnyGoodwillRefusal =
  (character: Character) =>
  (script: Script): DifficultyFactor => {
    const matches = script.cast.some((c) => c.character.id === character.id && c.role.goodwillRefusal !== undefined);
    return matches ? 1 : 0;
  };

export const increaseIfCharacterHasMandatoryGoodwillRefusal =
  (character: Character) =>
  (script: Script): DifficultyFactor => {
    const matches = script.cast.some((c) => c.character.id === character.id && c.role.goodwillRefusal === 'Mandatory');
    return matches ? 1 : 0;
  };

export const increaseIfCharacterHasAnyGoodwillRefusalWithIncient =
  (character: Character, incident: Incident) =>
  (script: Script): DifficultyFactor => {
    const characterHasGoodwillRefusal = script.cast.some(
      (c) => c.character.id === character.id && c.role.goodwillRefusal !== undefined
    );
    const incidentPresent = determineIfIncidentIsPresent(script, incident);

    return characterHasGoodwillRefusal && incidentPresent ? 1 : 0;
  };

function determineIfIncidentIsPresent(script: Script, incident: Incident) {
  return script.getIncidents().some((it) => it.incident.id === incident.id);
}
