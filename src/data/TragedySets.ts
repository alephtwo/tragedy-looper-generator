import { TragedySetInfo } from '../types/TragedySetInfo';
import { MainPlots, Subplots } from './Plots';
import { Incidents } from './Incidents';

export const TragedySets: Array<TragedySetInfo> = [
  {
    id: '7697db7b-c587-4978-8230-4e6886115a30',
    title: 'First Steps',
    order: 0,
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
  {
    id: 'bb074b59-e991-4a21-868d-d815acb85a05',
    title: 'Basic Tragedy',
    order: 1,
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
  {
    id: '6914b065-5b4e-4bca-b79b-323fbc990274',
    title: 'Midnight Zone',
    order: 2,
    mainPlots: [
      MainPlots.theSealedItem2,
      MainPlots.secretRecord,
      MainPlots.maleConfrontation,
      MainPlots.theDevilsHand,
      MainPlots.fatedConnections,
    ],
    subplots: [
      Subplots.loveHateSpiral,
      Subplots.witchesTeaTime,
      Subplots.diceOfTheGods,
      Subplots.unsafeTrigger,
      Subplots.showtimeOfDeath,
      Subplots.unansweredHeart,
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
  {
    id: '133a909a-c0ac-4155-9d5c-d4903bc3e42e',
    title: 'Mystery Circle',
    order: 3,
    mainPlots: [
      MainPlots.murderPlan2,
      MainPlots.aQuiltOfIncidents,
      MainPlots.tightropePlan,
      MainPlots.theBlackSchool,
      MainPlots.aDropOfStrychnine,
    ],
    subplots: [
      Subplots.theHiddenFreak2,
      Subplots.isolatedInstitutionPsycho,
      Subplots.smellOfGunpowder,
      Subplots.iAmAMasterDetective,
      Subplots.danceOfFools,
      Subplots.anAbsoluteWill,
      Subplots.trickyTwins,
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
  {
    id: 'b0790ed6-6e5d-4e29-b441-a412d0ffbcb5',
    title: 'Prime Evil',
    order: 4,
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
      Incidents.evangeliumOfTheDead,
      Incidents.fountainOfFilth,
    ],
  },
  {
    id: '8f5efcb6-1251-4e2c-b82a-763f69e8df75',
    title: 'Cosmic Mythology',
    order: 5,
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
      Incidents.increasingUnease,
      Incidents.missingPerson,
      Incidents.evilContamination,
      Incidents.hospitalIncident,
      Incidents.uproar,
      Incidents.fireOfDemise,
      Incidents.houndDogScent,
      Incidents.discovery,
      Incidents.theExecutioner,
    ],
  },
];
