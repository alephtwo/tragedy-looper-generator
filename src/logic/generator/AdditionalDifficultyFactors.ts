import { Character } from "../../data/types/Character";
import { Incident } from "../../data/types/Incident";
import { Plot } from "../../data/types/Plot";
import { Role } from "../../data/types/Role";
import { Script } from "../../model/Script";
import * as _ from "radash";

export type DifficultyFactor = -1 | 0 | 1;

export const increaseIfGirlHasRole =
  (role: Role) =>
  (script: Script): DifficultyFactor => {
    const met = script.cast.some((c) => c.character.descriptors.has("Girl") && c.role.id === role.id);
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
    const matches = script.cast.some((c) => c.character.id === character.id && c.role.goodwillRefusals.size > 0);
    return matches ? 1 : 0;
  };

export const increaseIfCharacterHasMandatoryGoodwillRefusal =
  (character: Character) =>
  (script: Script): DifficultyFactor => {
    const matches = script.cast.some(
      (c) => c.character.id === character.id && c.role.goodwillRefusals.has("Mandatory"),
    );
    return matches ? 1 : 0;
  };

export const increaseIfCharacterHasAnyGoodwillRefusalWithIncient =
  (character: Character, incident: Incident) =>
  (script: Script): DifficultyFactor => {
    const characterHasGoodwillRefusal = script.cast.some(
      (c) => c.character.id === character.id && c.role.goodwillRefusals.size !== 0,
    );
    const incidentPresent = determineIfIncidentIsPresent(script, incident);

    return characterHasGoodwillRefusal && incidentPresent ? 1 : 0;
  };

export const increaseIfCharacterIsRelatedToBoard =
  (character: Character) =>
  (script: Script): DifficultyFactor => {
    const met = script.cast.some((c) => c.character.id === character.id && c.role.connectedToBoard);
    return met ? 1 : 0;
  };

export const increaseIfCharacterHasRoleThatIsOnlyInOnePlot =
  (character: Character) =>
  (script: Script): DifficultyFactor => {
    // Get all the plots.
    const plots = script.tragedySet.mainPlots.concat(script.tragedySet.subplots);
    // Turn roles into ids, essentially.
    const roleIdSets = plots.map((p) => new Set(p.roles().map((r) => r.id)));
    // Get a unique set of all the role ids we have in this tragedy set.
    const allRoleIds = _.unique(roleIdSets.flatMap((s) => Array.from(s.values())));
    // Filter this list to just ones that are in a single plot
    const rolesOnlyInOnePlot = new Set(
      allRoleIds.filter((i) => _.sum(roleIdSets.map((s) => (s.has(i) ? 1 : 0))) === 1),
    );

    const met = script.cast.some((c) => c.character.id === character.id && rolesOnlyInOnePlot.has(c.role.id));
    return met ? 1 : 0;
  };

export const decreaseIfCharacterIsConnectedToLossConditions =
  (character: Character) =>
  (script: Script): DifficultyFactor => {
    const met = script.cast.some((c) => c.character.id === character.id && c.role.connectedToLossCondition);
    return met ? -1 : 0;
  };

export function decreaseForEveryCharacterThatHasForbiddenAreasAndConnectsToBoard(
  script: Script,
): Array<() => DifficultyFactor> {
  return (
    script.cast
      // If a character has less than 4 locations they are forbidden from entering at least one.
      .filter((c) => c.character.locations.size !== 4 && c.role.connectedToBoard)
      // For these, we want each to just decrease the difficulty
      .map(() => () => -1)
  );
}

function determineIfIncidentIsPresent(script: Script, incident: Incident) {
  return script.getIncidents().some((it) => it.incident.id === incident.id);
}
