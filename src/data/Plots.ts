import * as _ from 'lodash';
import { Plot } from '../types/data/Plot';
import { ConditionalRole, Role } from '../types/data/Role';
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
    roles: () => [Roles.keyPerson, Roles.killer, Roles.brain],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  theSealedItem: {
    id: 'ec4950ad-ff5f-4709-b9e5-bcc2a75f7bd7',
    name: 'The Sealed Item (Basic)',
    roles: () => [Roles.brain, Roles.cultist],
    requiredIncidents: [],
    estimateLoops: () => 1.5,
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If there are at least 2 Intrigue counters on the Shrine, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  signWithMe: {
    id: '60d51048-dd95-49c1-9063-12bad472d9b5',
    name: 'Sign with me!',
    roles: () => [
      new ConditionalRole({
        role: Roles.keyPerson,
        condition: requireDescriptor('Girl'),
      }),
    ],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const girls = script.cast.filter((c) => c.character.descriptors.has('Girl')).length;
      // + 0.4 per girl in the game
      return 1.0 + 0.4 * girls;
    },
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If there are at least 2 Intrigue counters on the Key Person, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  changeOfFuture: {
    id: '4abf382c-4dae-4692-9825-b6918b28f69d',
    name: 'Change of Future',
    roles: () => [Roles.cultist, Roles.timeTraveller],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const butterflyIncidents = script
        .getIncidents()
        .filter((i) => i.incident.id === Incidents.butterflyEffect.id).length;

      // +0.5 per Butterfly Effect Incident
      return 1.3 + 0.5 * butterflyIncidents;
    },
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If the "Butterfly Effect" incident has occurred this loop, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  giantTimeBomb: {
    id: 'b2c799fa-bf11-4ad5-b03d-7a0218544dd0',
    name: 'Giant Time Bomb',
    roles: () => [Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [
      {
        trigger: 'Loop End',
        effect: "If there are at least 2 Intrigue counters on the Witch's starting location, the Protagonists lose.",
      },
    ],
    mastermindAbilities: [],
  },
  lightOfTheAvenger: {
    id: '33d87741-b161-47ce-8392-68dd6bd21fa0',
    name: 'Light of the Avenger',
    roles: () => [Roles.brain],
    requiredIncidents: [],
    // The game does not specify a loop estimate for this plot
    estimateLoops: () => 0,
    plotRules: [
      {
        trigger: 'Loop End',
        effect: "If there are at least 2 Intrigue counters on the Brain's starting location, the Protagonists lose.",
      },
    ],
    mastermindAbilities: [],
  },
  aPlaceToProtect: {
    id: '107953b0-402b-45bc-b5b4-777bdfef9490',
    name: 'A Place to Protect',
    roles: () => [Roles.keyPerson, Roles.cultist],
    requiredIncidents: [],
    // The game does not specify a loop estimate for this plot
    estimateLoops: () => 0,
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If there are at least 2 Intrigue counters on the School, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  // Midnight Zone
  theSealedItem2: {
    id: '2624db3b-eab3-4d65-84e4-0a42c6862122',
    name: 'The Sealed Item (Midnight Zone)',
    roles: () => [Roles.brain, Roles.cultist],
    requiredIncidents: [],
    // The game does not specify a loop estimate for this plot
    estimateLoops: () => 0,
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If there are at least 2 Intrigue counters on the Shrine, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  secretRecord: {
    id: '61494789-8d76-4b60-8850-1370bf4e323c',
    name: 'Secret Record',
    roles: () => [Roles.keyPerson, Roles.brain, Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const winningRoles = script.cast.filter((c) => Roles.friend.id === c.role.id).length;

      // +0.5 for each role that, when revealed, kills the protagonists.
      return 1.0 + winningRoles * 0.5;
    },
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If the Brain, Factor, or Magician were revealed during this loop, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  maleConfrontation: {
    id: 'b65ad9f2-7756-40a3-b0e1-3d91928ae99b',
    name: 'Male Confrontation',
    roles: () => [
      new ConditionalRole({
        role: Roles.ninja,
        condition: requireDescriptor('Man'),
      }),
    ],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const men = script.cast.filter((c) => c.character.descriptors.has('Man')).length;

      // +0.4 for each man in the script
      return 0.4 + men * 0.4;
    },
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If the Ninja (or its corpse) has at least 2 Intrigue, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  theDevilsHand: {
    id: '03207e39-1c4f-43a9-91fe-9a33a9137d4d',
    name: "The Devil's Hand",
    roles: () => [Roles.keyPerson, Roles.cultist, Roles.ninja],
    requiredIncidents: [],
    estimateLoops: () => 1.4,
    plotRules: [],
    mastermindAbilities: [],
  },
  fatedConnections: {
    id: 'cb193092-3d9a-4f7b-8b00-9e855585dfb6',
    name: 'Fated Connections',
    roles: () => [Roles.conspiracyTheorist, Roles.friend, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
    plotRules: [
      {
        trigger: 'Loop Start',
        effect:
          'Choosen one character that died during the previous loop. Place any Extra Card on that character. Character(s) with an Extra card have their role changed into a Key Person.',
      },
    ],
    mastermindAbilities: [],
  },
  // Mystery Circle
  murderPlan2: {
    id: 'd3e4073a-421f-45ba-bcae-d10a3bdc5cbf',
    name: 'Murder Plan (Mystery Circle)',
    roles: () => [Roles.keyPerson, Roles.brain, Roles.killer],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  aQuiltOfIncidents: {
    id: 'd53e2adc-ec83-4cfd-bd28-71d7e33b87c9',
    name: 'A Quilt of Incidents',
    roles: () => [Roles.fool, Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const incidents = script.getIncidents().length;

      // +0.2 for every incident
      return 0.6 + incidents * 0.2;
    },
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If the Extra Gauge is 3 or more, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  tightropePlan: {
    id: '1bba4a6c-59bb-4680-8786-92da9c9821f5',
    name: 'Tightrope Plan',
    roles: () => [Roles.brain, Roles.killer],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const incidents = script.getIncidents().length;

      // -0.2 for every incident
      return 2.8 + -0.2 * incidents;
    },
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If the Extra Gauge is 1 or lower, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  theBlackSchool: {
    id: '12aeb24d-2238-4439-a414-37d25f499b1d',
    name: 'The Black School',
    roles: () => [Roles.brain],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
    plotRules: [
      {
        trigger: 'Loop End',
        effect:
          'If there are at least X Intrigue on the School, the Protagonists lose. X is 1 less than the current loop number.',
      },
    ],
    mastermindAbilities: [],
  },
  aDropOfStrychnine: {
    id: 'b9877c5a-5406-4934-b437-c01a37ff007e',
    name: 'A Drop of Strychnine',
    roles: () => [Roles.keyPerson, Roles.poisoner, Roles.fool],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
    plotRules: [
      {
        trigger: 'Incident Step',
        effect: 'When determining whether "Serial Murder" or "Suicide" triggers, count Intrigue also as Paranoia.',
      },
    ],
    mastermindAbilities: [],
  },
  // Prime Evil
  aNobleBloodline: {
    id: '16732658-6f01-4c88-af4b-d404ffdd7682',
    name: 'A Noble Bloodline',
    roles: () => [
      new ConditionalRole({
        role: Roles.keyPerson,
        condition: requireOppositeSex(Roles.vampire),
      }),
      new ConditionalRole({
        role: Roles.vampire,
        condition: requireOppositeSex(Roles.keyPerson),
      }),
    ],
    requiredIncidents: [],
    estimateLoops: () => 2.6,
    plotRules: [],
    mastermindAbilities: [],
  },
  moonlightBeast: {
    id: '9f989bc8-fd71-495c-bb88-94938c1be142',
    name: 'Moonlight Beast',
    roles: () => [Roles.werewolf],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  nightMistNightmare: {
    id: 'e82a5e06-4b04-488e-9eb8-9f046f7235a0',
    name: 'Night Mist Nightmare',
    roles: () => [Roles.nightmare],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
    plotRules: [],
    mastermindAbilities: [],
  },
  theOnesFromTheGrave: {
    id: '9c790fb8-4748-433b-924c-b1dd22d75ee2',
    name: 'The Ones from the Grave',
    roles: () => [],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [
      {
        trigger: 'Always',
        effect: 'All corpses that had the role Person, Coward, or Show-Off change into having the role of Zombie.',
      },
    ],
    mastermindAbilities: [],
  },
  theCursedLand: {
    id: 'e2878437-6e36-4099-ab94-4b7f97ca2fc6',
    name: 'The Cursed Land',
    roles: () => [Roles.ghost, Roles.showOff],
    requiredIncidents: [],
    estimateLoops: () => 1.4,
    plotRules: [
      {
        trigger: 'Loop Start',
        effect: "You may place a Curse on the Ghost's starting location.",
      },
      {
        trigger: 'Day End',
        effect: 'Unless all Location Curses can be attached to characters, you may kill the protagonists.',
      },
    ],
    mastermindAbilities: [],
  },
  // Cosmic Mythology
  choirToTheOutsideGod: {
    id: '620f0793-22c5-4fa9-a096-f6aee8cd7de9',
    name: 'Choir to the Outside God',
    roles: () => [Roles.keyPerson, Roles.sacrifice, Roles.immortal],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If there are at least 5 characters with Intrigue on them, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  theSacredWordsOfDagon: {
    id: 'e6333431-f648-4cdd-bd53-638070e06cb0',
    name: 'The Sacred Words of Dagon',
    roles: () => [Roles.keyPerson, Roles.cultist, Roles.deepOne],
    requiredIncidents: [],
    estimateLoops: () => 2.0,
    plotRules: [
      {
        trigger: 'Loop End',
        effect:
          'If there are as many or more Intrigue on the Shrine than the Extra Gauge shows, the Protagonists lose (if the Extra Gauge is at zero, the Protagonists always lose.)',
      },
    ],
    mastermindAbilities: [],
  },
  theKingInYellow: {
    id: '6f3ebebd-5d82-4bf0-8a80-2ee7dfac0643',
    name: 'The King in Yellow',
    roles: () => [Roles.sacrifice, Roles.cultist],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If the Extra Gauge has increased at all this loop, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  giantTimeBombAgain: {
    id: 'ab783db0-205d-432d-8411-e7ad0e2030b8',
    name: 'Giant Time Bomb Again',
    roles: () => [Roles.witch, Roles.deepOne],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
    plotRules: [
      {
        trigger: 'Loop End',
        effect: "If there are 2 or more Intrigue on the Witch's sstarting location, the Protagonists lose.",
      },
    ],
    mastermindAbilities: [],
  },
  bloodyRites: {
    id: '50cb0340-6f44-4e75-b129-23553cdbb4c0',
    name: 'Bloody Rites',
    roles: () => [Roles.witch, Roles.immortal],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [
      {
        trigger: 'Loop End',
        effect:
          'If there are as many or more corpses as the Extra Gauge shows, the Protagonists lose. If the Extra Gauge is on zero, the Protagonists automatically lose.',
      },
    ],
    mastermindAbilities: [],
  },
};

export const Subplots: SubplotsDatabase = {
  // Base Game
  circleOfFriends: {
    id: 'ddfabe2e-4717-43d8-87e5-6542682e7387',
    name: 'Circle of Friends',
    roles: () => [Roles.friend, Roles.friend, Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [],
    mastermindAbilities: [],
  },
  aLoveAffair: {
    id: '02d443d7-d43a-45ad-91cc-1ec93646767b',
    name: 'A Love Affair (Basic)',
    roles: () => [Roles.lover, Roles.lovedOne],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [],
    mastermindAbilities: [],
  },
  theHiddenFreak: {
    id: '78038f0a-b3be-4899-ae76-01ccd7a706f7',
    name: 'The Hidden Freak (Basic)',
    roles: () => [Roles.friend, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  anUnsettlingRumor: {
    id: 'cc6ab933-71a4-42ff-a92a-7c05c1f86ea4',
    name: 'An Unsettling Rumor (Basic)',
    roles: () => [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [
      {
        effect: 'You may place 1 Intrigue in any location.',
        timesPerLoop: 1,
        optional: true,
      },
    ],
  },
  paranoiaVirus: {
    id: '33317eb1-c0de-4460-b64e-f5ee6a650899',
    name: 'Paranoia Virus',
    roles: () => [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0,
    plotRules: [
      {
        trigger: 'Always',
        effect: 'All Persons with at least 3 Paranoia turn into Serial Killers.',
      },
    ],
    mastermindAbilities: [],
  },
  threadsOfFate: {
    id: '20079bae-734d-4195-a4af-be56e8c6c8ac',
    name: 'Threads of Fate',
    roles: () => [],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [
      {
        trigger: 'Loop Start',
        effect: 'Place 2 Paranoia on all characters who or whose corpse had Goodwill last loop.',
      },
    ],
    mastermindAbilities: [],
  },
  unknownFactorX: {
    id: 'b96a9ba3-6858-440c-b74d-552fb7ef82d3',
    name: 'Unknown Factor X',
    roles: () => [Roles.factor],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  shadowOfTheRipper: {
    id: 'fa8b66bf-ba7d-41c9-84de-9e7641bfbdfa',
    name: 'Shadow of the Ripper',
    roles: () => [Roles.conspiracyTheorist, Roles.serialKiller],
    requiredIncidents: [],
    // The game does not provide a value for this
    estimateLoops: () => 0,
    plotRules: [],
    mastermindAbilities: [],
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
    plotRules: [],
    mastermindAbilities: [],
  },
  // Midnight Zone
  loveHateSpiral: {
    id: 'f35974c7-5c63-4af3-9189-ece67511b16a',
    name: 'Love-Hate Spiral',
    roles: () => [Roles.friend, Roles.obstinate],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [],
  },
  witchesTeaTime: {
    id: '3afb64de-e67a-472f-af69-e232aad90d23',
    name: 'Witches Tea Time',
    roles: () => [Roles.conspiracyTheorist, Roles.friend, Roles.witch, Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  diceOfTheGods: {
    id: '066d20aa-2830-4c9d-8354-0413a0e1b2e3',
    name: 'Dice of the Gods',
    roles: () => [Roles.serialKiller, Roles.obstinate],
    requiredIncidents: [],
    estimateLoops: () => 0.7,
    plotRules: [
      {
        trigger: 'Loop Start',
        effect: 'Choose one character that died during the previous loop and place any Extra card on that character.',
      },
    ],
    mastermindAbilities: [],
  },
  unsafeTrigger: {
    id: '133e4874-1815-4880-a880-400f190a039e',
    name: 'Unsafe Trigger',
    roles: () => [Roles.factor],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [],
    mastermindAbilities: [
      {
        effect: "Place 1 Intrigue on the (living) Factor's location.",
        timesPerLoop: 1,
        optional: true,
      },
    ],
  },
  showtimeOfDeath: {
    id: '813e7a16-0417-416a-a144-45a63c5d5441',
    name: 'Showtime of Death',
    roles: () => [Roles.magician, Roles.immortal],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const characters = script.cast.length;
      const above7 = Math.max(0, characters - 7);
      return 2.2 + -0.5 * above7;
    },
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If there are 6 or less characters alive, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  unansweredHeart: {
    id: '2d65bd0c-4469-44bd-8a0d-1c8d650cabb9',
    name: 'Unanswered Heart',
    roles: () => [Roles.conspiracyTheorist, Roles.magician],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => (script.mainPlot.id === MainPlots.theSealedItem2.id ? 1.7 : 0.7),
    plotRules: [
      {
        trigger: 'Always',
        effect: '"Forbid Goodwill" also has the effect of "Forbid Movement."',
      },
    ],
    mastermindAbilities: [],
  },
  worshippersOfTheApocalypse: {
    id: 'e77efda5-4b07-4ff4-8b64-096bd6562f14',
    name: 'Worshippers of the Apocalypse',
    roles: () => [Roles.prophet],
    requiredIncidents: [Incidents.suicide],
    estimateLoops: () => 0.8,
    plotRules: [
      {
        trigger: 'Incident Step',
        effect:
          'When determining whether an Incident triggers, and the culprit is a Person, if the Prophet is alive, the culprit is regarded as having one 1 less than its printed Paranoia limit.',
      },
    ],
    mastermindAbilities: [],
  },
  // Mystery Circle
  theHiddenFreak2: {
    id: '9fe52e73-5565-48c4-846d-86fe51d8cb18',
    name: 'The Hidden Freak (Mystery Circle)',
    roles: () => [Roles.friend, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  isolatedInstitutionPsycho: {
    id: 'ea84db6e-2d0e-4b3c-a964-90f108572c2b',
    name: 'Isolated Institution Psycho',
    roles: () => [Roles.conspiracyTheorist, Roles.therapist, Roles.paranoiac],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [
      {
        trigger: 'Loop Start',
        effect: 'If the Extra Gauge was 2 or less at the end of the previous loop, increase it by 1.',
      },
    ],
    mastermindAbilities: [],
  },
  smellOfGunpowder: {
    id: 'a74b8d79-077d-40f8-bfc2-d977642fa546',
    name: 'Smell of Gunpowder',
    roles: () => [Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => 0.2 + 0.2 * script.days,
    plotRules: [
      {
        trigger: 'Loop End',
        effect: 'If there are a total of 12 or more Paranoia on the remaining characters, the Protagonists lose.',
      },
    ],
    mastermindAbilities: [],
  },
  iAmAMasterDetective: {
    id: 'cb9e521f-113f-4599-8482-4f640a18310f',
    name: 'I Am a Master Detective',
    roles: () => [Roles.conspiracyTheorist, Roles.friend, Roles.privateInvestigator],
    requiredIncidents: [],
    estimateLoops: () => 1.2,
    plotRules: [],
    mastermindAbilities: [],
  },
  danceOfFools: {
    id: '51482a2a-13d6-4b0c-b2d5-379a98ed0e54',
    name: 'Dance of Fools',
    roles: () => [Roles.fool, Roles.friend],
    requiredIncidents: [],
    estimateLoops: () => 0.4,
    plotRules: [],
    mastermindAbilities: [],
  },
  anAbsoluteWill: {
    id: 'de83f0f3-63fe-45bc-87ef-5ac086fd548c',
    name: 'An Absolute Will',
    roles: () => [Roles.obstinate],
    requiredIncidents: [],
    estimateLoops: () => 0.6,
    plotRules: [],
    mastermindAbilities: [],
  },
  trickyTwins: {
    id: 'aa04f330-7a55-44a7-a534-f36fd2267995',
    name: 'Tricky Twins',
    roles: () => [Roles.paranoiac, Roles.twin],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [],
  },
  // Prime Evil
  thoseWithHabits: {
    id: 'b776e852-06b9-48fe-8ff4-8386757944a3',
    name: 'Those with Habits',
    roles: () => [Roles.ghost, Roles.serialKiller, Roles.lovedOne],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [],
    mastermindAbilities: [],
  },
  aLoveAffair2: {
    id: '6c191eba-6505-4230-a5c9-5dd0f7e2a6ab',
    name: 'A Love Affair (Prime Evil)',
    roles: () => [Roles.lover, Roles.lovedOne],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [],
    mastermindAbilities: [],
  },
  witchsCurse: {
    id: '9d41e7bd-c30f-4607-adad-79264884aa8e',
    name: "Witch's Curse",
    roles: () => [Roles.conspiracyTheorist, Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 0.6,
    plotRules: [
      {
        trigger: 'Loop Start',
        effect: "You may place a Curse on the Witch's starting location.",
      },
    ],
    mastermindAbilities: [],
  },
  theKeyGirl: {
    id: '8d27e3b9-0351-4039-bef2-ddf7e09acb2a',
    name: 'The Key Girl',
    roles: () => [
      new ConditionalRole({
        role: Roles.keyPerson,
        condition: requireDescriptor('Girl'),
      }),
    ],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  monsterIntrigue: {
    id: '73438252-52c1-43c2-aa07-df071ca959a8',
    name: 'Monster Intrigue',
    roles: () => [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [
      {
        effect: 'You may place an Intrigue on one location where a character with Goowill Refusal is.',
        timesPerDay: 1,
        timesPerLoop: 2,
        optional: true,
      },
    ],
  },
  panicAndObsession: {
    id: '2f294d6f-0b0f-495d-b9e4-0e383973a37d',
    name: 'Panic and Obsession',
    roles: () => [Roles.serialKiller, Roles.coward, Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 0.3,
    plotRules: [],
    mastermindAbilities: [],
  },
  peopleWhoDontListen: {
    id: 'aa2b8699-b738-4140-bf08-5dd42dd6064e',
    name: "People Who Don't Listen",
    roles: () => [Roles.showOff, Roles.conspiracyTheorist, Roles.coward],
    requiredIncidents: [],
    estimateLoops: () => 0.4,
    plotRules: [],
    mastermindAbilities: [],
  },
  // Cosmic Evil
  anUnsettlingRumor2: {
    id: '69cb5ae0-9b3a-4637-9671-d13f461f7230',
    name: 'An Unsettling Rumor (Cosmic Evil)',
    roles: () => [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [
      {
        effect: 'The Mastermind may add an Intrigue to a location of their choice.',
        timesPerLoop: 1,
        optional: true,
      },
    ],
  },
  theResistance: {
    id: '3758b139-f56d-4ad6-b686-711f2e03d587',
    name: 'The Resistance',
    roles: () => [Roles.conspiracyTheorist, Roles.wizard, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  peopleWhoSaw: {
    id: 'adc8b9f9-40f2-4efb-8803-b27f5febfc98',
    name: 'People Who Saw',
    roles: () => [Roles.conspiracyTheorist, Roles.witness],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [],
  },
  theProfoundRace: {
    id: 'b5db08e9-c946-4b53-b482-69c0137c97f9',
    name: 'The Profound Race',
    roles: () => [Roles.serialKiller, Roles.timeTraveller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  whispersFromTheDeep: {
    id: 'cdd00e27-63e5-40a2-b9c2-b9ae20f4cd38',
    name: 'Whispers from the Deep',
    roles: () => [Roles.deepOne, Roles.paranoiac],
    requiredIncidents: [],
    estimateLoops: () => 1.2,
    plotRules: [
      {
        trigger: 'Always',
        effect: 'The Paranoiac gains all the abilities of the Key Person.',
      },
    ],
    mastermindAbilities: [],
  },
  theFacelessGod: {
    id: 'b5b7fb70-9f22-488f-ad9e-9fbf10bd6866',
    name: 'The Faceless God',
    roles: () => [Roles.faceless, Roles.wizard],
    requiredIncidents: [],
    estimateLoops: () => 0.9,
    plotRules: [],
    mastermindAbilities: [],
  },
  aTwistedTruth: {
    id: '54c3dd3a-b6c0-491b-a42d-49d8eff8412f',
    name: 'A Twisted Truth',
    roles: () => [Roles.paranoiac],
    requiredIncidents: [],
    estimateLoops: () => 1.2,
    plotRules: [],
    mastermindAbilities: [],
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
