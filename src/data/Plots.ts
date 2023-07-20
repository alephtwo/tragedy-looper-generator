import * as _ from "lodash";
import { Plot } from "../model/data/Plot";
import { ConditionalRole, Role } from "../model/data/Role";
import { Script } from "../model/Script";
import { requireDescriptor } from "./criteria/requireDescriptor";
import { requireOppositeSex } from "./criteria/requireOppositeSex";
import { Incidents } from "./Incidents";
import { Roles } from "./Roles";
import { Triggers } from "./Triggers";

export const MainPlots: MainPlotsDatabase = {
  // Base Game
  murderPlan: {
    id: "4de8232d-3704-4976-9785-e4d826da0cde",
    name_i18n_key: "plots.murderPlanBasic.name",
    roles: () => [Roles.keyPerson, Roles.killer, Roles.brain],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  theSealedItem: {
    id: "ec4950ad-ff5f-4709-b9e5-bcc2a75f7bd7",
    name_i18n_key: "plots.theSealedItemBasic.name",
    roles: () => [Roles.brain, Roles.cultist],
    requiredIncidents: [],
    estimateLoops: () => 1.5,
    plotRules: [
      {
        id: "75fb33d8-64f2-419e-abe5-7e0fbc028b1d",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.theSealedItemBasic.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  signWithMe: {
    id: "60d51048-dd95-49c1-9063-12bad472d9b5",
    name_i18n_key: "plots.signWithMe.name",
    roles: () => [
      new ConditionalRole({
        role: Roles.keyPerson,
        condition: requireDescriptor("Girl"),
      }),
    ],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const girls = script.cast.filter((c) => c.character.descriptors.has("Girl")).length;
      // + 0.4 per girl in the game
      return 1.0 + 0.4 * girls;
    },
    plotRules: [
      {
        id: "f3b4734f-e3ba-4f1e-babe-90324002a7b0",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.signWithMe.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  changeOfFuture: {
    id: "4abf382c-4dae-4692-9825-b6918b28f69d",
    name_i18n_key: "plots.changeOfFuture.name",
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
        id: "abf6a9c5-d67e-460f-8a56-0e93ef77e87d",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.changeOfFuture.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  giantTimeBomb: {
    id: "b2c799fa-bf11-4ad5-b03d-7a0218544dd0",
    name_i18n_key: "plots.giantTimeBomb.name",
    roles: () => [Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [
      {
        id: "bb155eea-be47-4d78-8749-64c13d004c22",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.giantTimeBomb.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  lightOfTheAvenger: {
    id: "33d87741-b161-47ce-8392-68dd6bd21fa0",
    name_i18n_key: "plots.lightOfTheAvenger.name",
    roles: () => [Roles.brain],
    requiredIncidents: [],
    // The game does not specify a loop estimate for this plot
    estimateLoops: () => 0,
    plotRules: [
      {
        id: "30cff159-6cf6-404b-a33d-b30f1dc0c319",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.lightOfTheAvenger.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  aPlaceToProtect: {
    id: "107953b0-402b-45bc-b5b4-777bdfef9490",
    name_i18n_key: "plots.aPlaceToProtect.name",
    roles: () => [Roles.keyPerson, Roles.cultist],
    requiredIncidents: [],
    // The game does not specify a loop estimate for this plot
    estimateLoops: () => 0,
    plotRules: [
      {
        id: "001498bb-effe-4d46-bf45-1f328ebb1f3c",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.aPlaceToProtect.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  // Midnight Zone
  theSealedItem2: {
    id: "2624db3b-eab3-4d65-84e4-0a42c6862122",
    name_i18n_key: "plots.theSealedItemMidnightZone.name",
    roles: () => [Roles.brain, Roles.cultist],
    requiredIncidents: [],
    // The game does not specify a loop estimate for this plot
    estimateLoops: () => 0,
    plotRules: [
      {
        id: "9438ec7a-85d2-4c82-9eb5-3c7ebb6ad726",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.theSealedItemMidnightZone.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  secretRecord: {
    id: "61494789-8d76-4b60-8850-1370bf4e323c",
    name_i18n_key: "plots.secretRecord.name",
    roles: () => [Roles.keyPerson, Roles.brain, Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const winningRoles = script.cast.filter((c) => Roles.friend.id === c.role.id).length;

      // +0.5 for each role that, when revealed, kills the protagonists.
      return 1.0 + winningRoles * 0.5;
    },
    plotRules: [
      {
        id: "6917f1e6-a122-4a13-a9e9-029a97c890a0",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.secretRecord.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  maleConfrontation: {
    id: "b65ad9f2-7756-40a3-b0e1-3d91928ae99b",
    name_i18n_key: "plots.maleConfrontation.name",
    roles: () => [
      new ConditionalRole({
        role: Roles.ninja,
        condition: requireDescriptor("Man"),
      }),
    ],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const men = script.cast.filter((c) => c.character.descriptors.has("Man")).length;

      // +0.4 for each man in the script
      return 0.4 + men * 0.4;
    },
    plotRules: [
      {
        id: "71c5c632-4a30-4430-b750-0bfe7440defb",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.maleConfrontation.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  theDevilsHand: {
    id: "03207e39-1c4f-43a9-91fe-9a33a9137d4d",
    name_i18n_key: "plots.theDevilsHand.name",
    roles: () => [Roles.keyPerson, Roles.cultist, Roles.ninja],
    requiredIncidents: [],
    estimateLoops: () => 1.4,
    plotRules: [],
    mastermindAbilities: [],
  },
  fatedConnections: {
    id: "cb193092-3d9a-4f7b-8b00-9e855585dfb6",
    name_i18n_key: "plots.fatedConnections.name",
    roles: () => [Roles.conspiracyTheorist, Roles.friend, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
    plotRules: [
      {
        id: "f16d6c90-a5ac-4e38-a6b5-3982e6d24e07",
        trigger: Triggers.loopStart,
        effect_i18n_key: "plots.fatedConnections.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  // Mystery Circle
  murderPlan2: {
    id: "d3e4073a-421f-45ba-bcae-d10a3bdc5cbf",
    name_i18n_key: "plots.murderPlanMysteryCircle.name",
    roles: () => [Roles.keyPerson, Roles.brain, Roles.killer],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  aQuiltOfIncidents: {
    id: "d53e2adc-ec83-4cfd-bd28-71d7e33b87c9",
    name_i18n_key: "plots.aQuiltOfIncidents.name",
    roles: () => [Roles.fool, Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const incidents = script.getIncidents().length;

      // +0.2 for every incident
      return 0.6 + incidents * 0.2;
    },
    plotRules: [
      {
        id: "99810ed1-7d8c-4a86-99b6-9ce576623f3a",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.aQuiltOfIncidents.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  tightropePlan: {
    id: "1bba4a6c-59bb-4680-8786-92da9c9821f5",
    name_i18n_key: "plots.tightropePlan.name",
    roles: () => [Roles.brain, Roles.killer],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const incidents = script.getIncidents().length;

      // -0.2 for every incident
      return 2.8 + -0.2 * incidents;
    },
    plotRules: [
      {
        id: "5b88814d-52f7-47b1-9cba-e4a5b103a33d",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.tightropePlan.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  theBlackSchool: {
    id: "12aeb24d-2238-4439-a414-37d25f499b1d",
    name_i18n_key: "plots.theBlackSchool.name",
    roles: () => [Roles.brain],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
    plotRules: [
      {
        id: "3b53f8b7-729f-40e0-8b93-97db0d9a37ad",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.theBlackSchool.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  aDropOfStrychnine: {
    id: "b9877c5a-5406-4934-b437-c01a37ff007e",
    name_i18n_key: "plots.aDropOfStrychnine.name",
    roles: () => [Roles.keyPerson, Roles.poisoner, Roles.fool],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
    plotRules: [
      {
        id: "c2436eaf-4b4b-4cbf-ab2a-4714cc5657bb",
        trigger: Triggers.incidentStep,
        effect_i18n_key: "plots.aDropOfStrychnine.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  // Prime Evil
  aNobleBloodline: {
    id: "16732658-6f01-4c88-af4b-d404ffdd7682",
    name_i18n_key: "plots.aNobleBloodline.name",
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
    id: "9f989bc8-fd71-495c-bb88-94938c1be142",
    name_i18n_key: "plots.moonlightBeast.name",
    roles: () => [Roles.werewolf],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  nightMistNightmare: {
    id: "e82a5e06-4b04-488e-9eb8-9f046f7235a0",
    name_i18n_key: "plots.nightMistNightmare.name",
    roles: () => [Roles.nightmare],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
    plotRules: [],
    mastermindAbilities: [],
  },
  theOnesFromTheGrave: {
    id: "9c790fb8-4748-433b-924c-b1dd22d75ee2",
    name_i18n_key: "plots.theOnesFromTheGrave.name",
    roles: () => [],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [
      {
        id: "68f939e1-4fd3-4638-bcfd-5bce0aa3cbc0",
        trigger: Triggers.always,
        effect_i18n_key: "plots.theOnesFromTheGrave.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  theCursedLand: {
    id: "e2878437-6e36-4099-ab94-4b7f97ca2fc6",
    name_i18n_key: "plots.theCursedLand.name",
    roles: () => [Roles.ghost, Roles.showOff],
    requiredIncidents: [],
    estimateLoops: () => 1.4,
    plotRules: [
      {
        id: "a7167f92-fd71-4b99-a023-91d13a04fa1e",
        trigger: Triggers.loopStart,
        effect_i18n_key: "plots.theCursedLand.plotRule1",
        winCondition: false,
      },
      {
        id: "cce0687f-da30-44a5-b474-876d9c1c060b",
        trigger: Triggers.dayEnd,
        effect_i18n_key: "plots.theCursedLand.plotRule2",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  // Cosmic Mythology
  choirToTheOutsideGod: {
    id: "620f0793-22c5-4fa9-a096-f6aee8cd7de9",
    name_i18n_key: "plots.choirToTheOutsideGod.name",
    roles: () => [Roles.keyPerson, Roles.sacrifice, Roles.immortal],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [
      {
        id: "1c438d51-68bf-41c8-9c91-7fb61c199674",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.choirToTheOutsideGod.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  theSacredWordsOfDagon: {
    id: "e6333431-f648-4cdd-bd53-638070e06cb0",
    name_i18n_key: "plots.theSacredWordsOfDagon.name",
    roles: () => [Roles.keyPerson, Roles.cultist, Roles.deepOne],
    requiredIncidents: [],
    estimateLoops: () => 2.0,
    plotRules: [
      {
        id: "c1282b10-6378-4201-a157-ffc55e71e29e",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.theSacredWordsOfDagon.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  theKingInYellow: {
    id: "6f3ebebd-5d82-4bf0-8a80-2ee7dfac0643",
    name_i18n_key: "plots.theKingInYellow.name",
    roles: () => [Roles.sacrifice, Roles.cultist],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [
      {
        id: "325c8f7e-f010-40cb-8a66-b62a0e02c949",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.theKingInYellow.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  giantTimeBombAgain: {
    id: "ab783db0-205d-432d-8411-e7ad0e2030b8",
    name_i18n_key: "plots.giantTimeBombAgain.name",
    roles: () => [Roles.witch, Roles.deepOne],
    requiredIncidents: [],
    estimateLoops: () => 1.6,
    plotRules: [
      {
        id: "83071e5f-2525-40e0-b4da-36cabc189e54",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.giantTimeBombAgain.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  bloodyRites: {
    id: "50cb0340-6f44-4e75-b129-23553cdbb4c0",
    name_i18n_key: "plots.bloodyRites.name",
    roles: () => [Roles.witch, Roles.immortal],
    requiredIncidents: [],
    estimateLoops: () => 1.8,
    plotRules: [
      {
        id: "6d936626-8482-46d5-ba2d-0d39a642d08d",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.bloodyRites.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
};

export const Subplots: SubplotsDatabase = {
  // Base Game
  circleOfFriends: {
    id: "ddfabe2e-4717-43d8-87e5-6542682e7387",
    name_i18n_key: "plots.circleOfFriends.name",
    roles: () => [Roles.friend, Roles.friend, Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [],
    mastermindAbilities: [],
  },
  aLoveAffair: {
    id: "02d443d7-d43a-45ad-91cc-1ec93646767b",
    name_i18n_key: "plots.aLoveAffairBasic.name",
    roles: () => [Roles.lover, Roles.lovedOne],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [],
    mastermindAbilities: [],
  },
  theHiddenFreak: {
    id: "78038f0a-b3be-4899-ae76-01ccd7a706f7",
    name_i18n_key: "plots.theHiddenFreakBasic.name",
    roles: () => [Roles.friend, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  anUnsettlingRumor: {
    id: "cc6ab933-71a4-42ff-a92a-7c05c1f86ea4",
    name_i18n_key: "plots.anUnsettlingRumorBasic.name",
    roles: () => [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [
      {
        effect_i18n_key: "plots.anUnsettlingRumorBasic.mastermindAbility",
        timesPerLoop: 1,
        optional: true,
      },
    ],
  },
  paranoiaVirus: {
    id: "33317eb1-c0de-4460-b64e-f5ee6a650899",
    name_i18n_key: "plots.paranoiaVirus.name",
    roles: () => [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0,
    plotRules: [
      {
        id: "4006e514-0d29-4444-b709-9ca76dbf88e9",
        trigger: Triggers.always,
        effect_i18n_key: "plots.paranoiaVirus.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  threadsOfFate: {
    id: "20079bae-734d-4195-a4af-be56e8c6c8ac",
    name_i18n_key: "plots.threadsOfFate.name",
    roles: () => [],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [
      {
        id: "00351e24-af09-40e0-8c43-9a6a83f7d41f",
        trigger: Triggers.loopStart,
        effect_i18n_key: "plots.threadsOfFate.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  unknownFactorX: {
    id: "b96a9ba3-6858-440c-b74d-552fb7ef82d3",
    name_i18n_key: "plots.unknownFactorX.name",
    roles: () => [Roles.factor],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  shadowOfTheRipper: {
    id: "fa8b66bf-ba7d-41c9-84de-9e7641bfbdfa",
    name_i18n_key: "plots.shadowOfTheRipper.name",
    roles: () => [Roles.conspiracyTheorist, Roles.serialKiller],
    requiredIncidents: [],
    // The game does not provide a value for this
    estimateLoops: () => 0,
    plotRules: [],
    mastermindAbilities: [],
  },
  aHideousScript: {
    id: "69755afc-80b4-4b55-a17f-3fcb2cb39e25",
    name_i18n_key: "plots.aHideousScript.name",
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
    id: "f35974c7-5c63-4af3-9189-ece67511b16a",
    name_i18n_key: "plots.loveHateSpiral.name",
    roles: () => [Roles.friend, Roles.obstinate],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [],
  },
  witchesTeaTime: {
    id: "3afb64de-e67a-472f-af69-e232aad90d23",
    name_i18n_key: "plots.witchesTeaTime.name",
    roles: () => [Roles.conspiracyTheorist, Roles.friend, Roles.witch, Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  diceOfTheGods: {
    id: "066d20aa-2830-4c9d-8354-0413a0e1b2e3",
    name_i18n_key: "plots.diceOfTheGods.name",
    roles: () => [Roles.serialKiller, Roles.obstinate],
    requiredIncidents: [],
    estimateLoops: () => 0.7,
    plotRules: [
      {
        id: "856fe994-7511-4f36-9b3d-b4f252232e95",
        trigger: Triggers.loopStart,
        effect_i18n_key: "plots.diceOfTheGods.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  unsafeTrigger: {
    id: "133e4874-1815-4880-a880-400f190a039e",
    name_i18n_key: "plots.unsafeTrigger.name",
    roles: () => [Roles.factor],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [],
    mastermindAbilities: [
      {
        effect_i18n_key: "plots.unsafeTrigger.mastermindAbility",
        timesPerLoop: 1,
        optional: true,
      },
    ],
  },
  showtimeOfDeath: {
    id: "813e7a16-0417-416a-a144-45a63c5d5441",
    name_i18n_key: "plots.showtimeOfDeath.name",
    roles: () => [Roles.magician, Roles.immortal],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => {
      const characters = script.cast.length;
      const above7 = Math.max(0, characters - 7);
      return 2.2 + -0.5 * above7;
    },
    plotRules: [
      {
        id: "75862e1e-f4a8-41e4-acc9-a3d3f3833d6d",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.showtimeOfDeath.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  unansweredHeart: {
    id: "2d65bd0c-4469-44bd-8a0d-1c8d650cabb9",
    name_i18n_key: "plots.unansweredHeart.name",
    roles: () => [Roles.conspiracyTheorist, Roles.magician],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => (script.mainPlot.id === MainPlots.theSealedItem2.id ? 1.7 : 0.7),
    plotRules: [
      {
        id: "681c1308-7ba5-4c2e-ba70-97dd64e7edef",
        trigger: Triggers.always,
        effect_i18n_key: "plots.unansweredHeart.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  worshippersOfTheApocalypse: {
    id: "e77efda5-4b07-4ff4-8b64-096bd6562f14",
    name_i18n_key: "plots.worshippersOfTheApocalypse.name",
    roles: () => [Roles.prophet],
    requiredIncidents: [Incidents.suicide],
    estimateLoops: () => 0.8,
    plotRules: [
      {
        id: "be5c76dd-2ce0-43fd-9cbe-552054fb56eb",
        trigger: Triggers.incidentStep,
        effect_i18n_key: "plots.theSacredWordsOfDagon.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  // Mystery Circle
  theHiddenFreak2: {
    id: "9fe52e73-5565-48c4-846d-86fe51d8cb18",
    name_i18n_key: "plots.theHiddenFreakMysteryCircle.name",
    roles: () => [Roles.friend, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  isolatedInstitutionPsycho: {
    id: "ea84db6e-2d0e-4b3c-a964-90f108572c2b",
    name_i18n_key: "plots.isolatedInstitutionPsycho.name",
    roles: () => [Roles.conspiracyTheorist, Roles.therapist, Roles.paranoiac],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [
      {
        id: "ab30862d-ecf3-49a6-96c8-0ea270db90d5",
        trigger: Triggers.loopStart,
        effect_i18n_key: "plots.isolatedInstitutionPsycho.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  smellOfGunpowder: {
    id: "a74b8d79-077d-40f8-bfc2-d977642fa546",
    name_i18n_key: "plots.smellOfGunpowder.name",
    roles: () => [Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: (script: Script): number => 0.2 + 0.2 * script.days,
    plotRules: [
      {
        id: "b7528433-56ed-42e0-8f28-d09288abc0d6",
        trigger: Triggers.loopEnd,
        effect_i18n_key: "plots.smellOfGunpowder.plotRule",
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  iAmAMasterDetective: {
    id: "cb9e521f-113f-4599-8482-4f640a18310f",
    name_i18n_key: "plots.iAmAMasterDetective.name",
    roles: () => [Roles.conspiracyTheorist, Roles.friend, Roles.privateInvestigator],
    requiredIncidents: [],
    estimateLoops: () => 1.2,
    plotRules: [],
    mastermindAbilities: [],
  },
  danceOfFools: {
    id: "51482a2a-13d6-4b0c-b2d5-379a98ed0e54",
    name_i18n_key: "plots.danceOfFools.name",
    roles: () => [Roles.fool, Roles.friend],
    requiredIncidents: [],
    estimateLoops: () => 0.4,
    plotRules: [],
    mastermindAbilities: [],
  },
  anAbsoluteWill: {
    id: "de83f0f3-63fe-45bc-87ef-5ac086fd548c",
    name_i18n_key: "plots.anAbsoluteWill.name",
    roles: () => [Roles.obstinate],
    requiredIncidents: [],
    estimateLoops: () => 0.6,
    plotRules: [],
    mastermindAbilities: [],
  },
  trickyTwins: {
    id: "aa04f330-7a55-44a7-a534-f36fd2267995",
    name_i18n_key: "plots.trickyTwins.name",
    roles: () => [Roles.paranoiac, Roles.twin],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [],
  },
  // Prime Evil
  thoseWithHabits: {
    id: "b776e852-06b9-48fe-8ff4-8386757944a3",
    name_i18n_key: "plots.thoseWithHabits.name",
    roles: () => [Roles.ghost, Roles.serialKiller, Roles.lovedOne],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [],
    mastermindAbilities: [],
  },
  aLoveAffair2: {
    id: "6c191eba-6505-4230-a5c9-5dd0f7e2a6ab",
    name_i18n_key: "plots.aLoveAffairPrimeEvil.name",
    roles: () => [Roles.lover, Roles.lovedOne],
    requiredIncidents: [],
    estimateLoops: () => 1.0,
    plotRules: [],
    mastermindAbilities: [],
  },
  witchsCurse: {
    id: "9d41e7bd-c30f-4607-adad-79264884aa8e",
    name_i18n_key: "plots.witchsCurse.name",
    roles: () => [Roles.conspiracyTheorist, Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 0.6,
    plotRules: [
      {
        id: "223de339-63f0-4735-8422-c2e2157748f5",
        trigger: Triggers.loopStart,
        effect_i18n_key: "plots.witchsCurse.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  theKeyGirl: {
    id: "8d27e3b9-0351-4039-bef2-ddf7e09acb2a",
    name_i18n_key: "plots.theKeyGirl.name",
    roles: () => [
      new ConditionalRole({
        role: Roles.keyPerson,
        condition: requireDescriptor("Girl"),
      }),
    ],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  monsterIntrigue: {
    id: "73438252-52c1-43c2-aa07-df071ca959a8",
    name_i18n_key: "plots.monsterIntrigue.name",
    roles: () => [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [
      {
        effect_i18n_key: "plots.monsterIntrigue.mastermindAbility",
        timesPerDay: 1,
        timesPerLoop: 2,
        optional: true,
      },
    ],
  },
  panicAndObsession: {
    id: "2f294d6f-0b0f-495d-b9e4-0e383973a37d",
    name_i18n_key: "plots.panicAndObsession.name",
    roles: () => [Roles.serialKiller, Roles.coward, Roles.witch],
    requiredIncidents: [],
    estimateLoops: () => 0.3,
    plotRules: [],
    mastermindAbilities: [],
  },
  peopleWhoDontListen: {
    id: "aa2b8699-b738-4140-bf08-5dd42dd6064e",
    name_i18n_key: "plots.peopleWhoDon'tListen.name",
    roles: () => [Roles.showOff, Roles.conspiracyTheorist, Roles.coward],
    requiredIncidents: [],
    estimateLoops: () => 0.4,
    plotRules: [],
    mastermindAbilities: [],
  },
  // Cosmic Evil
  anUnsettlingRumor2: {
    id: "69cb5ae0-9b3a-4637-9671-d13f461f7230",
    name_i18n_key: "plots.anUnsettlingRumorCosmicEvil.name",
    roles: () => [Roles.conspiracyTheorist],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [
      {
        effect_i18n_key: "plots.anUnsettlingRumorCosmicEvil.mastermindAbility",
        timesPerLoop: 1,
        optional: true,
      },
    ],
  },
  theResistance: {
    id: "3758b139-f56d-4ad6-b686-711f2e03d587",
    name_i18n_key: "plots.theResistance.name",
    roles: () => [Roles.conspiracyTheorist, Roles.wizard, Roles.serialKiller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  peopleWhoSaw: {
    id: "adc8b9f9-40f2-4efb-8803-b27f5febfc98",
    name_i18n_key: "plots.peopleWhoSaw.name",
    roles: () => [Roles.conspiracyTheorist, Roles.witness],
    requiredIncidents: [],
    estimateLoops: () => 0.5,
    plotRules: [],
    mastermindAbilities: [],
  },
  theProfoundRace: {
    id: "b5db08e9-c946-4b53-b482-69c0137c97f9",
    name_i18n_key: "plots.theProfoundRace.name",
    roles: () => [Roles.serialKiller, Roles.timeTraveller],
    requiredIncidents: [],
    estimateLoops: () => 0.8,
    plotRules: [],
    mastermindAbilities: [],
  },
  whispersFromTheDeep: {
    id: "cdd00e27-63e5-40a2-b9c2-b9ae20f4cd38",
    name_i18n_key: "plots.whispersFromTheDeep.name",
    roles: () => [Roles.deepOne, Roles.paranoiac],
    requiredIncidents: [],
    estimateLoops: () => 1.2,
    plotRules: [
      {
        id: "90df15bb-d68c-469c-b261-f7a7dc81acff",
        trigger: Triggers.always,
        effect_i18n_key: "plots.whispersFromTheDeep.plotRule",
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  theFacelessGod: {
    id: "b5b7fb70-9f22-488f-ad9e-9fbf10bd6866",
    name_i18n_key: "plots.theFacelessGod.name",
    roles: () => [Roles.faceless, Roles.wizard],
    requiredIncidents: [],
    estimateLoops: () => 0.9,
    plotRules: [],
    mastermindAbilities: [],
  },
  aTwistedTruth: {
    id: "54c3dd3a-b6c0-491b-a42d-49d8eff8412f",
    name_i18n_key: "plots.aTwistedTruth.name",
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
