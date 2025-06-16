import { Plot } from "./types/Plot";
import { ConditionalRole, DualRole, Role } from "./types/Role";
import * as _ from "radash";
import * as Roles from "./Roles";
import * as Triggers from "./Triggers";
import * as Incidents from "./Incidents";
import { Script } from "../model/Script";
import * as MainPlots from "./MainPlots";
import { requireDescriptor } from "../util/requirements";

// Base Game /////////////////////////////////////////////////////////////////
export const circleOfFriends: Plot = {
  id: "ddfabe2e-4717-43d8-87e5-6542682e7387",
  name_i18n_key: "plots.circleOfFriends.name",
  roles: () => [Roles.friend, Roles.friend, Roles.conspiracyTheorist],
  requiredIncidents: [],
  estimateLoops: () => 1.0,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const aLoveAffair: Plot = {
  id: "02d443d7-d43a-45ad-91cc-1ec93646767b",
  name_i18n_key: "plots.aLoveAffairBasic.name",
  roles: () => [Roles.lover, Roles.lovedOne],
  requiredIncidents: [],
  estimateLoops: () => 1.0,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const theHiddenFreak: Plot = {
  id: "78038f0a-b3be-4899-ae76-01ccd7a706f7",
  name_i18n_key: "plots.theHiddenFreakBasic.name",
  roles: () => [Roles.friend, Roles.serialKiller],
  requiredIncidents: [],
  estimateLoops: () => 0.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const anUnsettlingRumor: Plot = {
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
  enabled: true,
};

export const paranoiaVirus: Plot = {
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
  enabled: true,
};

export const threadsOfFate: Plot = {
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
  enabled: true,
};

export const unknownFactorX: Plot = {
  id: "b96a9ba3-6858-440c-b74d-552fb7ef82d3",
  name_i18n_key: "plots.unknownFactorX.name",
  roles: () => [Roles.factor],
  requiredIncidents: [],
  estimateLoops: () => 0.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const shadowOfTheRipper: Plot = {
  id: "fa8b66bf-ba7d-41c9-84de-9e7641bfbdfa",
  name_i18n_key: "plots.shadowOfTheRipper.name",
  roles: () => [Roles.conspiracyTheorist, Roles.serialKiller],
  requiredIncidents: [],
  // The game does not provide a value for this
  estimateLoops: () => 0,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const aHideousScript: Plot = {
  id: "69755afc-80b4-4b55-a17f-3fcb2cb39e25",
  name_i18n_key: "plots.aHideousScript.name",
  roles: (): Array<Role> => {
    // Script writer may choose 0, 1, or 2 Curmudgeons.
    const amount = _.random(0, 2);
    const curmudgeons = new Array(amount).fill(Roles.curmudgeon);
    return [Roles.conspiracyTheorist, Roles.friend].concat(curmudgeons);
  },
  requiredIncidents: [],
  // The game does not provide a value for this
  estimateLoops: () => 0,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

// Midnight Zone /////////////////////////////////////////////////////////////
export const loveHateSpiral: Plot = {
  id: "f35974c7-5c63-4af3-9189-ece67511b16a",
  name_i18n_key: "plots.loveHateSpiral.name",
  roles: () => [Roles.friend, Roles.obstinate],
  requiredIncidents: [],
  estimateLoops: () => 0.5,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const witchesTeaTime: Plot = {
  id: "3afb64de-e67a-472f-af69-e232aad90d23",
  name_i18n_key: "plots.witchesTeaTime.name",
  roles: () => [Roles.conspiracyTheorist, Roles.friend, Roles.witch, Roles.witch],
  requiredIncidents: [],
  estimateLoops: () => 0.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const diceOfTheGods: Plot = {
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
  enabled: true,
};

export const unsafeTrigger: Plot = {
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
  enabled: true,
};

export const showtimeOfDeath: Plot = {
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
  enabled: true,
};

export const unansweredHeart: Plot = {
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
  enabled: true,
};

export const worshippersOfTheApocalypse: Plot = {
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
  enabled: true,
};

// Mystery Circle ////////////////////////////////////////////////////////////
export const theHiddenFreak2: Plot = {
  id: "9fe52e73-5565-48c4-846d-86fe51d8cb18",
  name_i18n_key: "plots.theHiddenFreakMysteryCircle.name",
  roles: () => [Roles.friend, Roles.serialKiller],
  requiredIncidents: [],
  estimateLoops: () => 0.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const isolatedInstitutionPsycho: Plot = {
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
  enabled: true,
};

export const smellOfGunpowder: Plot = {
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
  enabled: true,
};

export const iAmAMasterDetective: Plot = {
  id: "cb9e521f-113f-4599-8482-4f640a18310f",
  name_i18n_key: "plots.iAmAMasterDetective.name",
  roles: () => [Roles.conspiracyTheorist, Roles.friend, Roles.privateInvestigator],
  requiredIncidents: [],
  estimateLoops: () => 1.2,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const danceOfFools: Plot = {
  id: "51482a2a-13d6-4b0c-b2d5-379a98ed0e54",
  name_i18n_key: "plots.danceOfFools.name",
  roles: () => [Roles.fool, Roles.friend],
  requiredIncidents: [],
  estimateLoops: () => 0.4,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const anAbsoluteWill: Plot = {
  id: "de83f0f3-63fe-45bc-87ef-5ac086fd548c",
  name_i18n_key: "plots.anAbsoluteWill.name",
  roles: () => [Roles.obstinate],
  requiredIncidents: [],
  estimateLoops: () => 0.6,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const trickyTwins: Plot = {
  id: "aa04f330-7a55-44a7-a534-f36fd2267995",
  name_i18n_key: "plots.trickyTwins.name",
  roles: () => [Roles.paranoiac, Roles.twin],
  requiredIncidents: [],
  estimateLoops: () => 0.5,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

// Prime Evil ////////////////////////////////////////////////////////////////
export const thoseWithHabits: Plot = {
  id: "b776e852-06b9-48fe-8ff4-8386757944a3",
  name_i18n_key: "plots.thoseWithHabits.name",
  roles: () => [Roles.ghost, Roles.serialKiller, Roles.lovedOne],
  requiredIncidents: [],
  estimateLoops: () => 1.0,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const aLoveAffair2: Plot = {
  id: "6c191eba-6505-4230-a5c9-5dd0f7e2a6ab",
  name_i18n_key: "plots.aLoveAffairPrimeEvil.name",
  roles: () => [Roles.lover, Roles.lovedOne],
  requiredIncidents: [],
  estimateLoops: () => 1.0,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const witchsCurse: Plot = {
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
  enabled: true,
};

export const theKeyGirl: Plot = {
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
  enabled: true,
};

export const monsterIntrigue: Plot = {
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
  enabled: true,
};

export const panicAndObsession: Plot = {
  id: "2f294d6f-0b0f-495d-b9e4-0e383973a37d",
  name_i18n_key: "plots.panicAndObsession.name",
  roles: () => [Roles.serialKiller, Roles.coward, Roles.witch],
  requiredIncidents: [],
  estimateLoops: () => 0.3,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const peopleWhoDontListen: Plot = {
  id: "aa2b8699-b738-4140-bf08-5dd42dd6064e",
  name_i18n_key: "plots.peopleWhoDon'tListen.name",
  roles: () => [Roles.showOff, Roles.conspiracyTheorist, Roles.coward],
  requiredIncidents: [],
  estimateLoops: () => 0.4,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

// Cosmic Evil ///////////////////////////////////////////////////////////////
export const anUnsettlingRumor2: Plot = {
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
  enabled: true,
};

export const theResistance: Plot = {
  id: "3758b139-f56d-4ad6-b686-711f2e03d587",
  name_i18n_key: "plots.theResistance.name",
  roles: () => [Roles.conspiracyTheorist, Roles.wizard, Roles.serialKiller],
  requiredIncidents: [],
  estimateLoops: () => 0.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const peopleWhoSaw: Plot = {
  id: "adc8b9f9-40f2-4efb-8803-b27f5febfc98",
  name_i18n_key: "plots.peopleWhoSaw.name",
  roles: () => [Roles.conspiracyTheorist, Roles.witness],
  requiredIncidents: [],
  estimateLoops: () => 0.5,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const theProfoundRace: Plot = {
  id: "b5db08e9-c946-4b53-b482-69c0137c97f9",
  name_i18n_key: "plots.theProfoundRace.name",
  roles: () => [Roles.serialKiller, Roles.timeTraveller],
  requiredIncidents: [],
  estimateLoops: () => 0.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const whispersFromTheDeep: Plot = {
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
  enabled: true,
};

export const theFacelessGod: Plot = {
  id: "b5b7fb70-9f22-488f-ad9e-9fbf10bd6866",
  name_i18n_key: "plots.theFacelessGod.name",
  roles: () => [Roles.faceless, Roles.wizard],
  requiredIncidents: [],
  estimateLoops: () => 0.9,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const aTwistedTruth: Plot = {
  id: "54c3dd3a-b6c0-491b-a42d-49d8eff8412f",
  name_i18n_key: "plots.aTwistedTruth.name",
  roles: () => [Roles.paranoiac],
  requiredIncidents: [],
  estimateLoops: () => 1.2,
  plotRules: [],
  mastermindAbilities: [],
  // TODO
  // A Twisted Truth requires a bit too much care for now and it's not fully
  // implemented. It should not be selectable by the randomizer.
  enabled: false,
};

// Last Liar /////////////////////////////////////////////////////////////////
export const theRealMonster: Plot = {
  id: "be0dc636-3d0f-40e1-b26f-dd706c71a92c",
  name_i18n_key: "plots.theRealMonster.name",
  roles: () => [Roles.serialKiller, Roles.secretkeeper, Roles.wildcard],
  requiredIncidents: [],
  estimateLoops: () => 1,
  plotRules: [
    {
      id: "fe2e4266-6524-4765-a67b-a98cecffccd6",
      effect_i18n_key: "plots.theRealMonster.plotRule",
      trigger: Triggers.always,
      // TODO: It's a win condition, but for Traitor A.
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const keeperOfMythology: Plot = {
  id: "992bff34-a151-4476-a58f-08b94c1486e4",
  name_i18n_key: "plots.keeperOfMythology.name",
  roles: () => [Roles.influencer, Roles.secretkeeper, Roles.wildcard],
  requiredIncidents: [],
  estimateLoops: () => 1,
  plotRules: [
    {
      id: "f4da1fb2-7ba1-40e9-81f2-e691b01c7abc",
      effect_i18n_key: "plots.keeperOfMythology.plotRule",
      trigger: Triggers.always,
      // TODO: It's a win condition, but for Traitor B.
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const iAmTheTrueDetective: Plot = {
  id: "809f5572-425c-4e74-b632-0ed81149fe02",
  name_i18n_key: "plots.iAmTheTrueDetective.name",
  roles: () => [Roles.watcher, Roles.secretkeeper, Roles.wildcard],
  requiredIncidents: [],
  estimateLoops: () => 1,
  plotRules: [
    {
      id: "9000549c-ef5f-44ea-bafd-23472ccfadaf",
      effect_i18n_key: "plots.iAmTheTrueDetective.plotRule",
      trigger: Triggers.always,
      // TODO: It's a win condition, but for Traitor C.
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const crossingWorldLines: Plot = {
  id: "83416ae6-75eb-4404-899f-55c2c16f97e8",
  name_i18n_key: "plots.crossingWorldLines.name",
  roles: () => [Roles.conspiracyTheorist],
  requiredIncidents: [],
  estimateLoops: () => 0.5,
  plotRules: [
    {
      id: "6e0dc5ac-61cc-4ce9-8a94-dafccd76a61e",
      effect_i18n_key: "plots.crossingWorldLines.plotRule1",
      trigger: Triggers.loopStart,
      winCondition: false,
    },
    {
      id: "1c76495c-243a-46dc-bb88-f1e29703fd6d",
      effect_i18n_key: "plots.crossingWorldLines.plotRule2",
      trigger: Triggers.loopStart,
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const socialMediaParanoia: Plot = {
  id: "ca529826-2cf9-4ba0-be5d-382fb5faf15b",
  name_i18n_key: "plots.socialMediaParanoia.name",
  roles: () => [Roles.serialKiller, Roles.influencer, Roles.conspiracyTheorist],
  requiredIncidents: [],
  estimateLoops: () => 0.6,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const theMythomaniacsSecret: Plot = {
  // TODO: This plot requires a little bit more work, but it should be OK.
  // The plot rule in particular is a little difficult to automatically apply.
  id: "3ddd6d7f-1823-4c83-928f-c05051f56fa6",
  name_i18n_key: "plots.theMythomaniacsSecret.name",
  roles: () => [Roles.conspiracyTheorist],
  requiredIncidents: [],
  estimateLoops: (script) => {
    const secretkeepers = script.cast.map((c) => c.role).filter((r) => r.id === Roles.secretkeeper.id).length;
    return secretkeepers === 0 ? 0.8 : 0;
  },
  plotRules: [
    {
      id: "f145a23e-d336-4efe-a61e-eb899883f505",
      effect_i18n_key: "plots.theMythomaniacsSecret.plotRule",
      trigger: Triggers.always,
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

// Another Horizon ///////////////////////////////////////////////////////////
export const jekyllAndHyde: Plot = {
  id: "6a639405-12c9-430e-93cf-11d83309ae93",
  name_i18n_key: "plots.jekyllAndHyde.name",
  roles: () => [
    new DualRole({
      id: "2abed603-0d23-40ae-a9a7-0360c7f0e3eb",
      lightWorld: Roles.keyPerson,
      darkWorld: Roles.brain,
    }),
    Roles.marionette,
  ],
  requiredIncidents: [],
  estimateLoops: () => 0.7,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const thePlaguebringer: Plot = {
  id: "f2c176c0-1961-4435-a5e4-b81134aa603d",
  name_i18n_key: "plots.thePlaguebringer.name",
  roles: () => [
    new DualRole({
      id: "15ed05cf-8b29-4dc5-8b4c-2f0d395f7368",
      lightWorld: Roles.piedPiper,
      darkWorld: Roles.gossip,
    }),
  ],
  requiredIncidents: [],
  estimateLoops: () => 0.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const puppeteersStrings: Plot = {
  id: "1b74bb3d-426b-46ba-b603-5dc42c67da0b",
  name_i18n_key: "plots.puppeteersStrings.name",
  roles: () => [
    Roles.fragment,
    Roles.gossip,
    new DualRole({
      id: "7855563d-1191-4291-b2f6-5a81c156f15b",
      lightWorld: Roles.person,
      darkWorld: Roles.serialKiller,
    }),
  ],
  requiredIncidents: [],
  estimateLoops: () => 0.5,
  plotRules: [
    {
      id: "dac42441-c158-4956-b394-d9dfc64309f5",
      effect_i18n_key: "plots.puppeteersStrings.plotRule",
      trigger: Triggers.always,
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const throughTheLookingGlass: Plot = {
  id: "704d781a-e004-4fed-8461-3c9fc9107c71",
  name_i18n_key: "plots.throughTheLookingGlass.name",
  roles: () => [
    new DualRole({
      id: "626783cf-eb78-4fe0-8f1b-fa04679b9552",
      lightWorld: Roles.conspiracyTheorist,
      darkWorld: Roles.serialKiller,
    }),
    new ConditionalRole({
      role: Roles.alice,
      condition: requireDescriptor("Girl"),
    }),
  ],
  requiredIncidents: [],
  estimateLoops: () => 0.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const unspeakableHorrors: Plot = {
  id: "e184f89f-6dae-4283-8a29-0047e7fbb27e",
  name_i18n_key: "plots.unspeakableHorrors.name",
  roles: () => [
    new DualRole({
      id: "b9d2835f-6990-4d56-abff-36e8c803e289",
      lightWorld: Roles.conspiracyTheorist,
      darkWorld: Roles.obstinate,
    }),
  ],
  requiredIncidents: [],
  estimateLoops: () => 0.8,
  plotRules: [
    {
      id: "16bf9f56-5ad4-4f3a-94a7-557ba3f041fc",
      effect_i18n_key: "plots.unspeakableHorrors.plotRule",
      trigger: Triggers.dayEnd,
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const hysteriaVirus: Plot = {
  id: "e2fedac5-38f3-48ed-b504-34cb757ca716",
  name_i18n_key: "plots.hysteriaVirus.name",
  roles: () => [Roles.fragment, Roles.conspiracyTheorist, Roles.gossip],
  requiredIncidents: [],
  estimateLoops: () => 0.6,
  plotRules: [
    {
      id: "7d47c1e2-e2fa-40b2-b407-e61345f6b4e2",
      effect_i18n_key: "plots.hysteriaVirus.plotRule",
      trigger: Triggers.always,
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};
