import { Incidents } from "./Incidents";
import { TragedySet } from "./types/TragedySet";
import { MainPlots, Subplots } from "./Plots";
import { Characters } from "./Characters";

export const TragedySets: Record<TragedySetKey, TragedySet> = {
  firstSteps: {
    id: "a9c05e8e-b55c-4d98-8b40-714db57ca38f",
    name_i18n_key: "tragedySets.firstSteps",
    order: 1,
    characters: [
      Characters.boyStudent,
      Characters.girlStudent,
      Characters.richMansDaughter,
      Characters.classRep,
      Characters.mysteryBoy,
      Characters.shrineMaiden,
      Characters.alien,
      Characters.godlyBeing,
      Characters.policeOfficer,
      Characters.officeWorker,
      Characters.informer,
      Characters.popIdol,
      Characters.journalist,
      Characters.boss,
      Characters.doctor,
      Characters.patient,
      Characters.nurse,
      Characters.henchman,
    ],
    mainPlots: [MainPlots.murderPlan, MainPlots.lightOfTheAvenger, MainPlots.aPlaceToProtect],
    subplots: [Subplots.shadowOfTheRipper, Subplots.anUnsettlingRumor, Subplots.aHideousScript],
    incidents: [
      Incidents.murder,
      Incidents.increasingUnease,
      Incidents.suicide,
      Incidents.hospitalIncident,
      Incidents.farawayMurder,
      Incidents.missingPerson,
      Incidents.spreading,
    ],
  },
  basicTragedy: {
    id: "6fc0092a-8a5b-429f-8fb9-8e1e8e5678d0",
    name_i18n_key: "tragedySets.basicTragedy",
    order: 2,
    characters: [
      Characters.boyStudent,
      Characters.girlStudent,
      Characters.richMansDaughter,
      Characters.classRep,
      Characters.mysteryBoy,
      Characters.shrineMaiden,
      Characters.alien,
      Characters.godlyBeing,
      Characters.policeOfficer,
      Characters.officeWorker,
      Characters.informer,
      Characters.popIdol,
      Characters.journalist,
      Characters.boss,
      Characters.doctor,
      Characters.patient,
      Characters.nurse,
      Characters.henchman,
    ],
    mainPlots: [
      MainPlots.murderPlan,
      MainPlots.theSealedItem,
      MainPlots.signWithMe,
      MainPlots.changeOfFuture,
      MainPlots.giantTimeBomb,
    ],
    subplots: [
      Subplots.circleOfFriends,
      Subplots.aLoveAffair,
      Subplots.theHiddenFreak,
      Subplots.anUnsettlingRumor,
      Subplots.paranoiaVirus,
      Subplots.threadsOfFate,
      Subplots.unknownFactorX,
    ],
    incidents: [
      Incidents.murder,
      Incidents.increasingUnease,
      Incidents.foulEvil,
      Incidents.suicide,
      Incidents.hospitalIncident,
      Incidents.farawayMurder,
      Incidents.missingPerson,
      Incidents.spreading,
      Incidents.butterflyEffect,
    ],
  },
  midnightZone: {
    id: "519c5fd0-2c3c-4fcf-92f0-1b9095a9abd8",
    name_i18n_key: "tragedySets.midnightZone",
    order: 3,
    characters: [
      Characters.boyStudent,
      Characters.girlStudent,
      Characters.richMansDaughter,
      Characters.classRep,
      Characters.mysteryBoy,
      Characters.shrineMaiden,
      Characters.alien,
      Characters.godlyBeing,
      Characters.policeOfficer,
      Characters.officeWorker,
      Characters.informer,
      Characters.popIdol,
      Characters.journalist,
      Characters.boss,
      Characters.doctor,
      Characters.patient,
      Characters.nurse,
      Characters.henchman,
      Characters.scientist,
      Characters.forensicSpecialist,
      Characters.ai,
      Characters.illusion,
    ],
    mainPlots: [
      MainPlots.theSealedItem2,
      MainPlots.secretRecord,
      MainPlots.theDevilsHand,
      MainPlots.maleConfrontation,
      MainPlots.fatedConnections,
    ],
    subplots: [
      Subplots.loveHateSpiral,
      Subplots.showtimeOfDeath,
      Subplots.witchesTeaTime,
      Subplots.diceOfTheGods,
      Subplots.unansweredHeart,
      Subplots.unsafeTrigger,
      Subplots.worshippersOfTheApocalypse,
    ],
    incidents: [
      Incidents.serialMurder,
      Incidents.missingPerson,
      Incidents.suicide,
      Incidents.conspiracies,
      Incidents.increasingUnease,
      Incidents.hospitalIncident,
      Incidents.uproar,
      Incidents.fakeIncident,
      Incidents.breakthrough,
      Incidents.fakedSuicide,
      Incidents.confession,
    ],
  },
  mysteryCircle: {
    id: "91b319b1-9ecb-4dd4-8392-3bffdec3c712",
    name_i18n_key: "tragedySets.mysteryCircle",
    order: 4,
    characters: [
      Characters.boyStudent,
      Characters.girlStudent,
      Characters.richMansDaughter,
      Characters.classRep,
      Characters.mysteryBoy,
      Characters.shrineMaiden,
      Characters.alien,
      Characters.godlyBeing,
      Characters.policeOfficer,
      Characters.officeWorker,
      Characters.informer,
      Characters.popIdol,
      Characters.journalist,
      Characters.boss,
      Characters.doctor,
      Characters.patient,
      Characters.nurse,
      Characters.henchman,
      Characters.scientist,
      Characters.forensicSpecialist,
      Characters.ai,
      Characters.illusion,
    ],
    mainPlots: [
      MainPlots.murderPlan2,
      MainPlots.tightropePlan,
      MainPlots.aDropOfStrychnine,
      MainPlots.aQuiltOfIncidents,
      MainPlots.theBlackSchool,
    ],
    subplots: [
      Subplots.theHiddenFreak2,
      Subplots.danceOfFools,
      Subplots.isolatedInstitutionPsycho,
      Subplots.anAbsoluteWill,
      Subplots.trickyTwins,
      Subplots.smellOfGunpowder,
      Subplots.iAmAMasterDetective,
    ],
    incidents: [
      Incidents.serialMurder,
      Incidents.hospitalIncident,
      Incidents.portent,
      Incidents.increasingUnease,
      Incidents.terrorism,
      Incidents.bestialMurder,
      Incidents.suicide,
      Incidents.aSuspiciousLetter,
      Incidents.fakedSuicide,
      Incidents.closedCircle,
      Incidents.theSilverBullet,
    ],
  },
  primeEvil: {
    id: "54b3babd-74f4-4631-a92e-fad8e4989fd5",
    name_i18n_key: "tragedySets.primeEvil",
    order: 5,
    characters: [
      Characters.boyStudent,
      Characters.girlStudent,
      Characters.richMansDaughter,
      Characters.classRep,
      Characters.mysteryBoy,
      Characters.shrineMaiden,
      Characters.alien,
      Characters.godlyBeing,
      Characters.policeOfficer,
      Characters.officeWorker,
      Characters.informer,
      Characters.popIdol,
      Characters.journalist,
      Characters.boss,
      Characters.doctor,
      Characters.patient,
      Characters.nurse,
      Characters.henchman,
      Characters.teacher,
      Characters.transferStudent,
      Characters.soldier,
      Characters.blackCat,
    ],
    mainPlots: [
      MainPlots.aNobleBloodline,
      MainPlots.moonlightBeast,
      MainPlots.nightMistNightmare,
      MainPlots.theOnesFromTheGrave,
      MainPlots.theCursedLand,
    ],
    subplots: [
      Subplots.thoseWithHabits,
      Subplots.aLoveAffair2,
      Subplots.witchsCurse,
      Subplots.theKeyGirl,
      Subplots.monsterIntrigue,
      Subplots.panicAndObsession,
      Subplots.peopleWhoDontListen,
    ],
    incidents: [
      Incidents.sacrilegiousMurder,
      Incidents.increasingUnease,
      Incidents.missingPerson,
      Incidents.evilContamination,
      Incidents.theExecutioner,
      Incidents.darkRumor,
      Incidents.barricade,
      Incidents.nightOfMadness,
      Incidents.awakenedCurse,
      Incidents.fountainOfFilth,
      Incidents.evangeliumOfTheDead,
    ],
  },
  cosmicMythology: {
    id: "1335ccdc-8187-48ae-83e7-56cdf1aa5a05",
    name_i18n_key: "tragedySets.cosmicMythology",
    order: 6,
    characters: [
      Characters.boyStudent,
      Characters.girlStudent,
      Characters.richMansDaughter,
      Characters.classRep,
      Characters.mysteryBoy,
      Characters.shrineMaiden,
      Characters.alien,
      Characters.godlyBeing,
      Characters.policeOfficer,
      Characters.officeWorker,
      Characters.informer,
      Characters.popIdol,
      Characters.journalist,
      Characters.boss,
      Characters.doctor,
      Characters.patient,
      Characters.nurse,
      Characters.henchman,
      Characters.teacher,
      Characters.transferStudent,
      Characters.soldier,
      Characters.blackCat,
    ],
    mainPlots: [
      MainPlots.choirToTheOutsideGod,
      MainPlots.theSacredWordsOfDagon,
      MainPlots.theKingInYellow,
      MainPlots.giantTimeBombAgain,
      MainPlots.bloodyRites,
    ],
    subplots: [
      Subplots.anUnsettlingRumor2,
      Subplots.theResistance,
      Subplots.peopleWhoSaw,
      Subplots.theProfoundRace,
      Subplots.whispersFromTheDeep,
      Subplots.theFacelessGod,
      Subplots.aTwistedTruth,
    ],
    incidents: [
      Incidents.insaneMurder,
      Incidents.massSuicide,
      Incidents.missingPerson,
      Incidents.increasingUnease,
      Incidents.evilContamination,
      Incidents.hospitalIncident,
      Incidents.uproar,
      Incidents.fireOfDemise,
      Incidents.houndDogScent,
      Incidents.discovery,
      Incidents.theExecutioner,
    ],
  },
  lastLiar: {
    id: "48f805ce-d633-4c65-8b30-0386a773cee0",
    name_i18n_key: "tragedySets.lastLiar",
    order: 7,
    characters: [
      // Last Liar is based on Basic Tragedy, which uses the basic characters.
      Characters.boyStudent,
      Characters.girlStudent,
      Characters.richMansDaughter,
      Characters.classRep,
      Characters.mysteryBoy,
      Characters.shrineMaiden,
      Characters.alien,
      Characters.godlyBeing,
      Characters.policeOfficer,
      Characters.officeWorker,
      Characters.informer,
      Characters.popIdol,
      Characters.journalist,
      Characters.boss,
      Characters.doctor,
      Characters.patient,
      Characters.nurse,
      Characters.henchman,
    ],
    mainPlots: [
      MainPlots.theFinalPlan,
      MainPlots.theSealedConclusion,
      MainPlots.worldOfRebellion,
      MainPlots.theDemonsScript,
      MainPlots.giantTimeBombYetAgain,
    ],
    subplots: [
      Subplots.theRealMonster,
      Subplots.keeperOfMythology,
      Subplots.iAmTheTrueDetective,
      Subplots.crossingWorldLines,
      Subplots.unsafeTrigger,
      Subplots.socialMediaParanoia,
      Subplots.theMythomaniacsSecret,
    ],
    incidents: [
      Incidents.murder,
      Incidents.increasingUnease,
      Incidents.missingPerson,
      Incidents.hospitalIncident,
      Incidents.theExecutor,
      Incidents.distortion,
      Incidents.lastWill,
      Incidents.confession,
      Incidents.spreading,
      Incidents.theLightOfHope,
      Incidents.theMurkOfDespair,
    ],
  },
};

type TragedySetKey =
  | "firstSteps"
  | "basicTragedy"
  | "midnightZone"
  | "mysteryCircle"
  | "primeEvil"
  | "cosmicMythology"
  | "lastLiar";
