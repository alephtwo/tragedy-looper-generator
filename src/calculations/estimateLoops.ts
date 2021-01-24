import { Script } from '../types/Script';
import * as _ from 'lodash';
import { Roles } from '../data/Roles';
import { AllCharacters } from '../data/Characters';
import { Incidents } from '../data/Incidents';
import { MainPlots } from '../data/Plots';
import { AdditionalDifficultyFactors, DifficultyFactor } from './AdditionalDifficultyFactors';

export function estimateLoops(script: Script): number {
  const plots = [script.mainPlot].concat(script.subplots);

  const fromPlots = _.sum(plots.map((plot) => plot.estimateLoops(script)));
  const fromIncidents = _.sum(script.incidents.map((i) => i.incident.loopEstimate || 0));
  // For each Incident above/below 4, +/- 0.5.
  // This deviates from the base game but it is far more realistic.
  const fromNumberOfIncidents = (script.incidents.length - 4) * 0.5;
  const fromDays = getLoopsFromDays(script.days);

  const fromAdditionalFactors = _.sum(additionalFactors.map((af) => af(script) * 0.2));

  const estimate = Math.ceil(fromPlots + fromIncidents + fromNumberOfIncidents + fromDays + fromAdditionalFactors);

  // Assume we want at least two loops to be a good sport.
  // That said, there is a maximum number of 7 loops.
  return _.clamp(estimate, 2, 7);
}

function getLoopsFromDays(days: number) {
  return days <= 6 ? -0.6 : -0.2;
}

// Additional factors can either increase the difficulty or decrease it.
// If they do not apply to the scenario, then a 0 should be returned so
// the number of loops is not affected.
export const additionalFactors: Array<(script: Script) => DifficultyFactor> = [
  // Things that increase difficulty
  // Setting a girl as a Key Person
  AdditionalDifficultyFactors.increaseIfGirlHasRole(Roles.keyPerson),
  // Setting a girl as the Killer or the Loved One
  AdditionalDifficultyFactors.increaseIfGirlHasRole(Roles.killer),
  AdditionalDifficultyFactors.increaseIfGirlHasRole(Roles.lovedOne),
  // Setting Godly Being or the Patient as the Witch.
  AdditionalDifficultyFactors.modifyIfCharacterHasRole(AllCharacters.godlyBeing, Roles.witch, 1),
  AdditionalDifficultyFactors.modifyIfCharacterHasRole(AllCharacters.patient, Roles.witch, 1),
  // Setting the Police Officer or the Patient as the Time Traveler.
  AdditionalDifficultyFactors.modifyIfCharacterHasRole(AllCharacters.policeOfficer, Roles.timeTraveller, 1),
  AdditionalDifficultyFactors.modifyIfCharacterHasRole(AllCharacters.patient, Roles.timeTraveller, 1),
  // Setting the Patient as a Friend.
  AdditionalDifficultyFactors.modifyIfCharacterHasRole(AllCharacters.patient, Roles.friend, 1),
  // Having the culprit of an incident as the Conspiracy Theorist.
  AdditionalDifficultyFactors.increaseIfRoleIsCulprit(Roles.conspiracyTheorist),
  // Incidents triggered by the Rich Man's Daughter or the Henchman.
  AdditionalDifficultyFactors.increaseIfCharacterIsCulprit(AllCharacters.richMansDaughter),
  AdditionalDifficultyFactors.increaseIfCharacterIsCulprit(AllCharacters.henchman),
  // Incidents triggered by the Lover or Loved One.
  AdditionalDifficultyFactors.increaseIfRoleIsCulprit(Roles.lover),
  AdditionalDifficultyFactors.increaseIfRoleIsCulprit(Roles.lovedOne),
  // Hospital Incident, if you intend to trigger it. (Assume we do.)
  AdditionalDifficultyFactors.increaseIfIncidentPresent(Incidents.hospitalIncident),
  // Faraway Murder in scripts where you have a Key Person or a Friend.
  AdditionalDifficultyFactors.increaseIfIncidentPresentWithRole(Incidents.farawayMurder, Roles.keyPerson),
  AdditionalDifficultyFactors.increaseIfIncidentPresentWithRole(Incidents.farawayMurder, Roles.friend),
  // Foul Evil when you have the Sealed Item as the main plot.
  AdditionalDifficultyFactors.increaseIfIncidentWithMainPlot(Incidents.foulEvil, MainPlots.theSealedItem),
  // TODO: INCREASE: Setting the Boss as something that connects to the board (Conspiracy Theorist, Serial Killer)
  // TODO: INCREASE: Having Goodwill Refusal on the Shrine Maiden or Doctor
  // TODO: INCREASE: Having Mandatory Goodwill Refusal on the Nurse
  // TODO: INCREASE: Giving the Mystery Boy a role that exists in only 1 plot.
  // TODO: INCREASE: Spreading, when the Doctor has Goodwill Refusal.

  // Things that decrease difficulty
  // Setting the Office Worker as anything other than a person.
  AdditionalDifficultyFactors.decreaseUnlessCharacterHasRole(AllCharacters.officeWorker, Roles.person),
  // Setting the Shrine Maiden, Pop Idol, or Boss as the Time Traveler.
  AdditionalDifficultyFactors.modifyIfCharacterHasRole(AllCharacters.shrineMaiden, Roles.timeTraveller, -1),
  AdditionalDifficultyFactors.modifyIfCharacterHasRole(AllCharacters.popIdol, Roles.timeTraveller, -1),
  AdditionalDifficultyFactors.modifyIfCharacterHasRole(AllCharacters.boss, Roles.timeTraveller, -1),
  // TODO: DECREASE: Having the Godly Being as something directly connected to the loss conditions.
  // TODO: DECREASE: Having a character with a forbidden area as something that connects to the board.
];
