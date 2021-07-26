import * as _ from 'lodash';
import { Plot } from '../types/data/Plot';
import { Role } from '../types/data/Role';
import { Script } from '../types/Script';
import { requireDescriptor } from './criteria/requireDescriptor';
import { requireOppositeSex } from './criteria/requireOppositeSex';
import { Incidents } from './Incidents';
import { Roles } from './Roles';

export const MainPlots: MainPlotsDatabase = {
  // Base Game
  murderPlan: {
    id: '4de8232d-3704-4976-9785-e4d826da0cde',
    name: 'Murder Plan (Basic)',
    roles: [Roles.keyPerson, Roles.killer, Roles.brain],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
  },
  theSealedItem: {
    id: 'ec4950ad-ff5f-4709-b9e5-bcc2a75f7bd7',
    name: 'The Sealed Item (Basic)',
    roles: [Roles.brain, Roles.cultist],
    requiredIncidents: [],
    estimateLoops: () => 1.5,
  },
  signWithMe: {
    id: '60d51048-dd95-49c1-9063-12bad472d9b5',
    name: 'Sign with me!',
    roles: [
      {
        role: Roles.keyPerson,
        condition: requireDescriptor('Girl'),
      },
    ],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const girls = script.cast.filter((c) => c.character.descriptors.has('Girl')).length;
      // + 0.4 per girl in the game
      return 1.0 + 0.4 * girls;
    },
  },
  changeOfFuture: {
    id: '4abf382c-4dae-4692-9825-b6918b28f69d',
    name: 'Change of Future',
    roles: [Roles.cultist, Roles.timeTraveller],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const butterflyIncidents = script.cast
        .flatMap((c) => c.incidentTriggers)
        .filter((i) => i.incident.id === Incidents.butterflyEffect.id).length;

      // +0.5 per Butterfly Effect Incident
      return 1.3 + 0.5 * butterflyIncidents;
    },
  },
  giantTimeBomb: {
    id: 'b2c799fa-bf11-4ad5-b03d-7a0218544dd0',
    name: 'Giant Time Bomb',
    roles: [Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
  },
  lightOfTheAvenger: {
    id: '33d87741-b161-47ce-8392-68dd6bd21fa0',
    name: 'Light of the Avenger',
    roles: [Roles.brain],
    requiredIncidents: [],
    // The game does not specify a loop estimate for this plot
    estimateLoops: () => 0,
  },
  aPlaceToProtect: {
    id: '107953b0-402b-45bc-b5b4-777bdfef9490',
    name: 'A Place to Protect',
    roles: [Roles.keyPerson, Roles.cultist],
    requiredIncidents: [],
    // The game does not specify a loop estimate for this plot
    estimateLoops: () => 0,
  },
  // Midnight Zone
  theSealedItem2: {
    id: '2624db3b-eab3-4d65-84e4-0a42c6862122',
    name: 'The Sealed Item (Midnight Zone)',
    roles: [Roles.brain, Roles.cultist],
    requiredIncidents: [],
    // The game does not specify a loop estimate for this plot
    estimateLoops: () => 0,
  },
  secretRecord: {
    id: '61494789-8d76-4b60-8850-1370bf4e323c',
    name: 'Secret Record',
    roles: [Roles.keyPerson, Roles.brain, Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const winningRoles = script.cast.filter((c) => Roles.friend.id === c.role.id).length;

      // +0.5 for each role that, when revealed, kills the protagonists.
      return 1.0 + winningRoles * 0.5;
    },
  },
  maleConfrontation: {
    id: 'b65ad9f2-7756-40a3-b0e1-3d91928ae99b',
    name: 'Male Confrontation',
    roles: [
      {
        role: Roles.ninja,
        condition: requireDescriptor('Man'),
      },
    ],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const men = script.cast.filter((c) => c.character.descriptors.has('Man')).length;

      // +0.4 for each man in the script
      return 0.4 + men * 0.4;
    },
  },
  theDevilsHand: {
    id: '03207e39-1c4f-43a9-91fe-9a33a9137d4d',
    name: "The Devil's Hand",
    roles: [Roles.keyPerson, Roles.cultist, Roles.ninja],
    requiredIncidents: [],
    estimateLoops: () => 1.4,
  },
  fatedConnections: {
    id: 'cb193092-3d9a-4f7b-8b00-9e855585dfb6',
    name: 'Fated Connections',
    roles: [Roles.conspiracyTheorist, Roles.friend, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
  },
  // Mystery Circle
  murderPlan2: {
    id: 'd3e4073a-421f-45ba-bcae-d10a3bdc5cbf',
    name: 'Murder Plan (Mystery Circle)',
    roles: [Roles.keyPerson, Roles.brain, Roles.killer],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
  },
  aQuiltOfIncidents: {
    id: 'd53e2adc-ec83-4cfd-bd28-71d7e33b87c9',
    name: 'A Quilt of Incidents',
    roles: [Roles.fool, Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const incidents = script.cast.flatMap((c) => c.incidentTriggers).length;

      // +0.2 for every incident
      return 0.6 + incidents * 0.2;
    },
  },
  tightropePlan: {
    id: '1bba4a6c-59bb-4680-8786-92da9c9821f5',
    name: 'Tightrope Plan',
    roles: [Roles.brain, Roles.killer],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const incidents = script.cast.flatMap((c) => c.incidentTriggers).length;

      // -0.2 for every incident
      return 2.8 + -0.2 * incidents;
    },
  },
  theBlackSchool: {
    id: '12aeb24d-2238-4439-a414-37d25f499b1d',
    name: 'The Black School',
    roles: [Roles.brain],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
  },
  aDropOfStrychnine: {
    id: 'b9877c5a-5406-4934-b437-c01a37ff007e',
    name: 'A Drop of Strychnine',
    roles: [Roles.keyPerson, Roles.poisoner, Roles.fool],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
  },
  // Prime Evil
  aNobleBloodline: {
    id: '16732658-6f01-4c88-af4b-d404ffdd7682',
    name: 'A Noble Bloodline',
    roles: [
      {
        role: Roles.keyPerson,
        condition: requireOppositeSex(Roles.vampire),
      },
      {
        role: Roles.vampire,
        condition: requireOppositeSex(Roles.keyPerson),
      },
    ],
    requiredIncidents: [],
    estimateLoops: () => 2.6,
  },
  moonlightBeast: {
    id: '9f989bc8-fd71-495c-bb88-94938c1be142',
    name: 'Moonlight Beast',
    roles: [Roles.werewolf],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
  },
  nightMistNightmare: {
    id: 'e82a5e06-4b04-488e-9eb8-9f046f7235a0',
    name: 'Night Mist Nightmare',
    roles: [Roles.nightmare],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
  },
  theOnesFromTheGrave: {
    id: '9c790fb8-4748-433b-924c-b1dd22d75ee2',
    name: 'The Ones from the Grave',
    roles: [],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
  },
  theCursedLand: {
    id: 'e2878437-6e36-4099-ab94-4b7f97ca2fc6',
    name: 'The Cursed Land',
    roles: [Roles.ghost, Roles.showOff],
    requiredIncidents: [],
    estimateLoops: () => 1.4,
  },
  // Cosmic Mythology
  choirToTheOutsideGod: {
    id: '620f0793-22c5-4fa9-a096-f6aee8cd7de9',
    name: 'Choir to the Outside God',
    roles: [Roles.keyPerson, Roles.sacrifice, Roles.immortal],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
  },
  theSacredWordsOfDagon: {
    id: 'e6333431-f648-4cdd-bd53-638070e06cb0',
    name: 'The Sacred Words of Dagon',
    roles: [Roles.keyPerson, Roles.cultist, Roles.deepOne],
    requiredIncidents: [],
    estimateLoops: () => 2.0,
  },
  theKingInYellow: {
    id: '6f3ebebd-5d82-4bf0-8a80-2ee7dfac0643',
    name: 'The King in Yellow',
    roles: [Roles.sacrifice, Roles.cultist],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
  },
  giantTimeBombAgain: {
    id: 'ab783db0-205d-432d-8411-e7ad0e2030b8',
    name: 'Giant Time Bomb Again',
    roles: [Roles.witch, Roles.deepOne],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
  },
  bloodyRites: {
    id: '50cb0340-6f44-4e75-b129-23553cdbb4c0',
    name: 'Bloody Rites',
    roles: [Roles.witch, Roles.immortal],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
  },
};

export const Subplots: SubplotsDatabase = {
  // Base Game
  circleOfFriends: {
    id: 'ddfabe2e-4717-43d8-87e5-6542682e7387',
    name: 'Circle of Friends',
    roles: [Roles.friend, Roles.friend, Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
  },
  aLoveAffair: {
    id: '02d443d7-d43a-45ad-91cc-1ec93646767b',
    name: 'A Love Affair (Basic)',
    roles: [Roles.lover, Roles.lovedOne],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
  },
  theHiddenFreak: {
    id: '78038f0a-b3be-4899-ae76-01ccd7a706f7',
    name: 'The Hidden Freak (Basic)',
    roles: [Roles.friend, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
  },
  anUnsettlingRumor: {
    id: 'cc6ab933-71a4-42ff-a92a-7c05c1f86ea4',
    name: 'An Unsettling Rumor (Basic)',
    roles: [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
  },
  paranoiaVirus: {
    id: '33317eb1-c0de-4460-b64e-f5ee6a650899',
    name: 'Paranoia Virus',
    roles: [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0,
  },
  threadsOfFate: {
    id: '20079bae-734d-4195-a4af-be56e8c6c8ac',
    name: 'Threads of Fate',
    roles: [],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
  },
  unknownFactorX: {
    id: 'b96a9ba3-6858-440c-b74d-552fb7ef82d3',
    name: 'Unknown Factor X',
    roles: [Roles.factor],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
  },
  shadowOfTheRipper: {
    id: 'fa8b66bf-ba7d-41c9-84de-9e7641bfbdfa',
    name: 'Shadow of the Ripper',
    roles: [Roles.conspiracyTheorist, Roles.serialKiller],
    requiredIncidents: [],
    // The game does not provide a value for this
    estimateLoops: () => 0,
  },
  aHideousScript: {
    id: '69755afc-80b4-4b55-a17f-3fcb2cb39e25',
    name: 'A Hideous Script',
    roles: (): Array<Role> => {
      // Script writer may choose 0, 1, or 2 Curmudgeons.
      const amount = _.random(0, 2);
      const curmudgeons = _.times(amount, _.constant(Roles.curmudgeon));
      return [Roles.conspiracyTheorist, Roles.friend].concat(curmudgeons);
    },
    requiredIncidents: [],
    // The game does not provide a value for this
    estimateLoops: () => 0,
  },
  // Midnight Zone
  loveHateSpiral: {
    id: 'f35974c7-5c63-4af3-9189-ece67511b16a',
    name: 'Love-Hate Spiral',
    roles: [Roles.friend, Roles.obstinate],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
  },
  witchesTeaTime: {
    id: '3afb64de-e67a-472f-af69-e232aad90d23',
    name: 'Witches Tea Time',
    roles: [Roles.conspiracyTheorist, Roles.friend, Roles.witch, Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
  },
  diceOfTheGods: {
    id: '066d20aa-2830-4c9d-8354-0413a0e1b2e3',
    name: 'Dice of the Gods',
    roles: [Roles.serialKiller, Roles.obstinate],
    requiredIncidents: [],
    estimateLoops: () => 0.7,
  },
  unsafeTrigger: {
    id: '133e4874-1815-4880-a880-400f190a039e',
    name: 'Unsafe Trigger',
    roles: [Roles.factor],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
  },
  showtimeOfDeath: {
    id: '813e7a16-0417-416a-a144-45a63c5d5441',
    name: 'Showtime of Death',
    roles: [Roles.magician, Roles.immortal],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const characters = script.cast.length;
      const above7 = Math.max(0, characters - 7);
      return 2.2 + -0.5 * above7;
    },
  },
  unansweredHeart: {
    id: '2d65bd0c-4469-44bd-8a0d-1c8d650cabb9',
    name: 'Unanswered Heart',
    roles: [Roles.conspiracyTheorist, Roles.magician],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => (script.mainPlot.id === MainPlots.theSealedItem2.id ? 1.7 : 0.7),
  },
  worshippersOfTheApocalypse: {
    id: 'e77efda5-4b07-4ff4-8b64-096bd6562f14',
    name: 'Worshippers of the Apocalypse',
    roles: [Roles.prophet],
    requiredIncidents: [Incidents.suicide],
    estimateLoops: () => 0.8,
  },
  // Mystery Circle
  theHiddenFreak2: {
    id: '9fe52e73-5565-48c4-846d-86fe51d8cb18',
    name: 'The Hidden Freak (Mystery Circle)',
    roles: [Roles.friend, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
  },
  isolatedInstitutionPsycho: {
    id: 'ea84db6e-2d0e-4b3c-a964-90f108572c2b',
    name: 'Isolated Institution Psycho',
    roles: [Roles.conspiracyTheorist, Roles.therapist, Roles.paranoiac],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
  },
  smellOfGunpowder: {
    id: 'a74b8d79-077d-40f8-bfc2-d977642fa546',
    name: 'Smell of Gunpowder',
    roles: [Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => 0.2 + 0.2 * script.days,
  },
  iAmAMasterDetective: {
    id: 'cb9e521f-113f-4599-8482-4f640a18310f',
    name: 'I Am a Master Detective',
    roles: [Roles.conspiracyTheorist, Roles.friend, Roles.privateInvestigator],
    requiredIncidents: [],
    estimateLoops: () => 1.2,
  },
  danceOfFools: {
    id: '51482a2a-13d6-4b0c-b2d5-379a98ed0e54',
    name: 'Dance of Fools',
    roles: [Roles.fool, Roles.friend],
    requiredIncidents: [],
    estimateLoops: () => 0.4,
  },
  anAbsoluteWill: {
    id: 'de83f0f3-63fe-45bc-87ef-5ac086fd548c',
    name: 'An Absolute Will',
    roles: [Roles.obstinate],
    requiredIncidents: [],
    estimateLoops: () => 0.6,
  },
  trickyTwins: {
    id: 'aa04f330-7a55-44a7-a534-f36fd2267995',
    name: 'Tricky Twins',
    roles: [Roles.paranoiac, Roles.twin],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
  },
  // Prime Evil
  thoseWithHabits: {
    id: 'b776e852-06b9-48fe-8ff4-8386757944a3',
    name: 'Those with Habits',
    roles: [Roles.ghost, Roles.serialKiller, Roles.lovedOne],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
  },
  aLoveAffair2: {
    id: '6c191eba-6505-4230-a5c9-5dd0f7e2a6ab',
    name: 'A Love Affair (Prime Evil)',
    roles: [Roles.lover, Roles.lovedOne],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
  },
  witchsCurse: {
    id: '9d41e7bd-c30f-4607-adad-79264884aa8e',
    name: "Witch's Curse",
    roles: [Roles.conspiracyTheorist, Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 0.6,
  },
  theKeyGirl: {
    id: '8d27e3b9-0351-4039-bef2-ddf7e09acb2a',
    name: 'The Key Girl',
    roles: [
      {
        role: Roles.keyPerson,
        condition: requireDescriptor('Girl'),
      },
    ],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
  },
  monsterIntrigue: {
    id: '73438252-52c1-43c2-aa07-df071ca959a8',
    name: 'Monster Intrigue',
    roles: [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
  },
  panicAndObsession: {
    id: '2f294d6f-0b0f-495d-b9e4-0e383973a37d',
    name: 'Panic and Obsession',
    roles: [Roles.serialKiller, Roles.coward, Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 0.3,
  },
  peopleWhoDontListen: {
    id: 'aa2b8699-b738-4140-bf08-5dd42dd6064e',
    name: "People Who Don't Listen",
    roles: [Roles.showOff, Roles.conspiracyTheorist, Roles.coward],
    requiredIncidents: [],
    estimateLoops: () => 0.4,
  },
  // Cosmic Evil
  anUnsettlingRumor2: {
    id: '69cb5ae0-9b3a-4637-9671-d13f461f7230',
    name: 'An Unsettling Rumor (Cosmic Evil)',
    roles: [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
  },
  theResistance: {
    id: '3758b139-f56d-4ad6-b686-711f2e03d587',
    name: 'The Resistance',
    roles: [Roles.conspiracyTheorist, Roles.wizard, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
  },
  peopleWhoSaw: {
    id: 'adc8b9f9-40f2-4efb-8803-b27f5febfc98',
    name: 'People Who Saw',
    roles: [Roles.conspiracyTheorist, Roles.witness],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
  },
  theProfoundRace: {
    id: 'b5db08e9-c946-4b53-b482-69c0137c97f9',
    name: 'The Profound Race',
    roles: [Roles.serialKiller, Roles.timeTraveller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
  },
  whispersFromTheDeep: {
    id: 'cdd00e27-63e5-40a2-b9c2-b9ae20f4cd38',
    name: 'Whispers from the Deep',
    roles: [Roles.deepOne, Roles.paranoiac],
    requiredIncidents: [],
    estimateLoops: () => 1.2,
  },
  theFacelessGod: {
    id: 'b5b7fb70-9f22-488f-ad9e-9fbf10bd6866',
    name: 'The Faceless God',
    roles: [Roles.faceless, Roles.wizard],
    requiredIncidents: [],
    estimateLoops: () => 0.9,
  },
  aTwistedTruth: {
    id: '54c3dd3a-b6c0-491b-a42d-49d8eff8412f',
    name: 'A Twisted Truth',
    roles: [Roles.paranoiac],
    requiredIncidents: [],
    estimateLoops: () => 1.2,
  },
};

interface MainPlotsDatabase {
  murderPlan: Plot;
  theSealedItem: Plot;
  signWithMe: Plot;
  changeOfFuture: Plot;
  giantTimeBomb: Plot;
  lightOfTheAvenger: Plot;
  aPlaceToProtect: Plot;
  theSealedItem2: Plot;
  secretRecord: Plot;
  maleConfrontation: Plot;
  theDevilsHand: Plot;
  fatedConnections: Plot;
  murderPlan2: Plot;
  aQuiltOfIncidents: Plot;
  tightropePlan: Plot;
  theBlackSchool: Plot;
  aDropOfStrychnine: Plot;
  aNobleBloodline: Plot;
  moonlightBeast: Plot;
  nightMistNightmare: Plot;
  theOnesFromTheGrave: Plot;
  theCursedLand: Plot;
  choirToTheOutsideGod: Plot;
  theSacredWordsOfDagon: Plot;
  theKingInYellow: Plot;
  giantTimeBombAgain: Plot;
  bloodyRites: Plot;
}

interface SubplotsDatabase {
  circleOfFriends: Plot;
  aLoveAffair: Plot;
  theHiddenFreak: Plot;
  anUnsettlingRumor: Plot;
  paranoiaVirus: Plot;
  threadsOfFate: Plot;
  unknownFactorX: Plot;
  shadowOfTheRipper: Plot;
  aHideousScript: Plot;
  loveHateSpiral: Plot;
  witchesTeaTime: Plot;
  diceOfTheGods: Plot;
  unsafeTrigger: Plot;
  showtimeOfDeath: Plot;
  unansweredHeart: Plot;
  worshippersOfTheApocalypse: Plot;
  theHiddenFreak2: Plot;
  isolatedInstitutionPsycho: Plot;
  smellOfGunpowder: Plot;
  iAmAMasterDetective: Plot;
  danceOfFools: Plot;
  anAbsoluteWill: Plot;
  trickyTwins: Plot;
  thoseWithHabits: Plot;
  aLoveAffair2: Plot;
  witchsCurse: Plot;
  theKeyGirl: Plot;
  monsterIntrigue: Plot;
  panicAndObsession: Plot;
  peopleWhoDontListen: Plot;
  anUnsettlingRumor2: Plot;
  theResistance: Plot;
  peopleWhoSaw: Plot;
  theProfoundRace: Plot;
  whispersFromTheDeep: Plot;
  theFacelessGod: Plot;
  aTwistedTruth: Plot;
}
