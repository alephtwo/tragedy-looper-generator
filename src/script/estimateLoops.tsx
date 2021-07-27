import { Script } from '../types/Script';
import * as _ from 'lodash';
import { Characters } from '../data/Characters';
import { Roles } from '../data/Roles';
import { Incidents } from '../data/Incidents';
import { MainPlots } from '../data/Plots';
import {
  decreaseIfCharacterHasRole,
  decreaseUnlessCharacterHasRole,
  DifficultyFactor,
  increaseIfCharacterHasAnyGoodwillRefusal,
  increaseIfCharacterHasAnyGoodwillRefusalWithIncient,
  increaseIfCharacterHasMandatoryGoodwillRefusal,
  increaseIfCharacterHasRole,
  increaseIfCharacterIsCulprit,
  increaseIfGirlHasRole,
  increaseIfIncidentPresent,
  increaseIfIncidentPresentWithRole,
  increaseIfIncidentWithMainPlot,
  increaseIfRoleIsCulprit,
} from './AdditionalDifficultyFactors';

export function estimateLoops(script: Script): number {
  const plots = [script.mainPlot].concat(script.subplots);
  const incidents = script.getIncidents();

  const estimate = _.sum([
    // From plots...
    _.sum(plots.map((plot) => plot.estimateLoops(script))),
    // From incidents...
    _.sum(incidents.map((i) => i.incident.loopEstimate)),
    // For each Incident above/below 4, +/- 0.5.
    // This deviates from the base game but it is far more realistic.
    (incidents.length - 4) * 0.5,
    // If there are 6 days or less, it's easier. Otherwise, it's harder.
    script.days <= 6 ? -0.6 : -0.2,
    // From additional factors
    _.sum(additionalFactors.map((af) => af(script) * 0.2)),
  ]);

  // Assume we want at least two loops to be a good sport.
  // That said, there is a maximum number of 7 loops.
  return _.ceil(_.clamp(estimate, 2, 7));
}

// Additional factors can either increase the difficulty or decrease it.
// If they do not apply to the scenario, then a 0 should be returned so
// the number of loops is not affected.
const additionalFactors: Array<(script: Script) => DifficultyFactor> = [
  // Things that increase difficulty
  // Setting a girl as a Key Person
  increaseIfGirlHasRole(Roles.keyPerson),
  // Setting a girl as the Killer or the Loved One
  increaseIfGirlHasRole(Roles.killer),
  increaseIfGirlHasRole(Roles.lovedOne),
  // Setting Godly Being or the Patient as the Witch.
  increaseIfCharacterHasRole(Characters.godlyBeing, Roles.witch),
  increaseIfCharacterHasRole(Characters.patient, Roles.witch),
  // Setting the Police Officer or the Patient as the Time Traveler.
  increaseIfCharacterHasRole(Characters.policeOfficer, Roles.timeTraveller),
  increaseIfCharacterHasRole(Characters.patient, Roles.timeTraveller),
  // Setting the Patient as a Friend.
  increaseIfCharacterHasRole(Characters.patient, Roles.friend),
  // Having the culprit of an incident as the Conspiracy Theorist.
  increaseIfRoleIsCulprit(Roles.conspiracyTheorist),
  // Incidents triggered by the Rich Man's Daughter or the Henchman.
  increaseIfCharacterIsCulprit(Characters.richMansDaughter),
  increaseIfCharacterIsCulprit(Characters.henchman),
  // Incidents triggered by the Lover or Loved One.
  increaseIfRoleIsCulprit(Roles.lover),
  increaseIfRoleIsCulprit(Roles.lovedOne),
  // Hospital Incident, if you intend to trigger it. (Assume we do.)
  increaseIfIncidentPresent(Incidents.hospitalIncident),
  // Faraway Murder in scripts where you have a Key Person or a Friend.
  increaseIfIncidentPresentWithRole(Incidents.farawayMurder, Roles.keyPerson),
  increaseIfIncidentPresentWithRole(Incidents.farawayMurder, Roles.friend),
  // Foul Evil when you have the Sealed Item as the main plot.
  increaseIfIncidentWithMainPlot(Incidents.foulEvil, MainPlots.theSealedItem),
  // Having Goodwill Refusal on the Shrine Maiden or Doctor
  increaseIfCharacterHasAnyGoodwillRefusal(Characters.shrineMaiden),
  increaseIfCharacterHasAnyGoodwillRefusal(Characters.doctor),
  // Having Mandatory Goodwill Refusal on the Nurse
  increaseIfCharacterHasMandatoryGoodwillRefusal(Characters.nurse),
  // Spreading, when the Doctor has Goodwill Refusal.
  increaseIfCharacterHasAnyGoodwillRefusalWithIncient(Characters.doctor, Incidents.spreading),
  // TODO: INCREASE: Setting the Boss as something that connects to the board (Conspiracy Theorist, Serial Killer)
  // TODO: INCREASE: Giving the Mystery Boy a role that exists in only 1 plot.

  // Things that decrease difficulty
  // Setting the Office Worker as anything other than a person.
  decreaseUnlessCharacterHasRole(Characters.officeWorker, Roles.person),
  // Setting the Shrine Maiden, Pop Idol, or Boss as the Time Traveler.
  decreaseIfCharacterHasRole(Characters.shrineMaiden, Roles.timeTraveller),
  decreaseIfCharacterHasRole(Characters.popIdol, Roles.timeTraveller),
  decreaseIfCharacterHasRole(Characters.boss, Roles.timeTraveller),
  // TODO: DECREASE: Having the Godly Being as something directly connected to the loss conditions.
  // TODO: DECREASE: Having a character with a forbidden area as something that connects to the board.
];
