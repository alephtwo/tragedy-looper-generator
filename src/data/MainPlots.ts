import * as _ from "radash";
import { Plot } from "./types/Plot";
import { PlotRole } from "./types/PlotRole";
import { Script } from "../model/Script";
import * as Incidents from "./Incidents";
import * as Roles from "./Roles";
import * as Triggers from "./Triggers";
import { requireDescriptor, requireOppositeSex } from "../util/requirements";
import { m } from "../paraglide/messages";

// Base Game /////////////////////////////////////////////////////////////////
export const murderPlan: Plot = {
  id: "4de8232d-3704-4976-9785-e4d826da0cde",
  name: m["plots.murderPlanBasic.name"],
  roles: () => [new PlotRole(Roles.keyPerson), new PlotRole(Roles.killer), new PlotRole(Roles.brain)],
  requiredIncidents: [],
  estimateLoops: () => 1.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const theSealedItem: Plot = {
  id: "ec4950ad-ff5f-4709-b9e5-bcc2a75f7bd7",
  name: m["plots.theSealedItemBasic.name"],
  roles: () => [new PlotRole(Roles.brain), new PlotRole(Roles.cultist)],
  requiredIncidents: [],
  estimateLoops: () => 1.5,
  plotRules: [
    {
      id: "75fb33d8-64f2-419e-abe5-7e0fbc028b1d",
      trigger: Triggers.loopEnd,
      effect: m["plots.theSealedItemBasic.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const signWithMe: Plot = {
  id: "60d51048-dd95-49c1-9063-12bad472d9b5",
  name: m["plots.signWithMe.name"],
  roles: () => [
    new PlotRole(Roles.keyPerson, {
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
      effect: m["plots.signWithMe.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const changeOfFuture: Plot = {
  id: "4abf382c-4dae-4692-9825-b6918b28f69d",
  name: m["plots.changeOfFuture.name"],
  roles: () => [new PlotRole(Roles.cultist), new PlotRole(Roles.timeTraveller)],
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
      effect: m["plots.changeOfFuture.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const giantTimeBomb: Plot = {
  id: "b2c799fa-bf11-4ad5-b03d-7a0218544dd0",
  name: m["plots.giantTimeBomb.name"],
  roles: () => [new PlotRole(Roles.witch)],
  requiredIncidents: [],
  estimateLoops: () => 1.0,
  plotRules: [
    {
      id: "bb155eea-be47-4d78-8749-64c13d004c22",
      trigger: Triggers.loopEnd,
      effect: m["plots.giantTimeBomb.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const lightOfTheAvenger: Plot = {
  id: "33d87741-b161-47ce-8392-68dd6bd21fa0",
  name: m["plots.lightOfTheAvenger.name"],
  roles: () => [new PlotRole(Roles.brain)],
  requiredIncidents: [],
  // The game does not specify a loop estimate for this plot
  estimateLoops: () => 0,
  plotRules: [
    {
      id: "30cff159-6cf6-404b-a33d-b30f1dc0c319",
      trigger: Triggers.loopEnd,
      effect: m["plots.lightOfTheAvenger.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const aPlaceToProtect: Plot = {
  id: "107953b0-402b-45bc-b5b4-777bdfef9490",
  name: m["plots.aPlaceToProtect.name"],
  roles: () => [new PlotRole(Roles.keyPerson), new PlotRole(Roles.cultist)],
  requiredIncidents: [],
  // The game does not specify a loop estimate for this plot
  estimateLoops: () => 0,
  plotRules: [
    {
      id: "001498bb-effe-4d46-bf45-1f328ebb1f3c",
      trigger: Triggers.loopEnd,
      effect: m["plots.aPlaceToProtect.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

// Midnight Zone /////////////////////////////////////////////////////////////
export const theSealedItem2: Plot = {
  id: "2624db3b-eab3-4d65-84e4-0a42c6862122",
  name: m["plots.theSealedItemMidnightZone.name"],
  roles: () => [new PlotRole(Roles.brain), new PlotRole(Roles.cultist)],
  requiredIncidents: [],
  // The game does not specify a loop estimate for this plot
  estimateLoops: () => 0,
  plotRules: [
    {
      id: "9438ec7a-85d2-4c82-9eb5-3c7ebb6ad726",
      trigger: Triggers.loopEnd,
      effect: m["plots.theSealedItemMidnightZone.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const secretRecord: Plot = {
  id: "61494789-8d76-4b60-8850-1370bf4e323c",
  name: m["plots.secretRecord.name"],
  roles: () => [new PlotRole(Roles.keyPerson), new PlotRole(Roles.brain), new PlotRole(Roles.conspiracyTheorist)],
  requiredIncidents: [],
  estimateLoops: (script: Script): number => {
    const winningRoles = script.cast.filter((c) => c.role.is(Roles.friend)).length;

    // +0.5 for each role that, when revealed, kills the protagonists.
    return 1.0 + winningRoles * 0.5;
  },
  plotRules: [
    {
      id: "6917f1e6-a122-4a13-a9e9-029a97c890a0",
      trigger: Triggers.loopEnd,
      effect: m["plots.secretRecord.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const maleConfrontation: Plot = {
  id: "b65ad9f2-7756-40a3-b0e1-3d91928ae99b",
  name: m["plots.maleConfrontation.name"],
  roles: () => [
    new PlotRole(Roles.ninja, {
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
      effect: m["plots.maleConfrontation.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const theDevilsHand: Plot = {
  id: "03207e39-1c4f-43a9-91fe-9a33a9137d4d",
  name: m["plots.theDevilsHand.name"],
  roles: () => [new PlotRole(Roles.keyPerson), new PlotRole(Roles.cultist), new PlotRole(Roles.ninja)],
  requiredIncidents: [],
  estimateLoops: () => 1.4,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const fatedConnections: Plot = {
  id: "cb193092-3d9a-4f7b-8b00-9e855585dfb6",
  name: m["plots.fatedConnections.name"],
  roles: () => [new PlotRole(Roles.conspiracyTheorist), new PlotRole(Roles.friend), new PlotRole(Roles.serialKiller)],
  requiredIncidents: [],
  estimateLoops: () => 1.6,
  plotRules: [
    {
      id: "f16d6c90-a5ac-4e38-a6b5-3982e6d24e07",
      trigger: Triggers.loopStart,
      effect: m["plots.fatedConnections.plotRule"],
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

// Mystery Circle ////////////////////////////////////////////////////////////
export const murderPlan2: Plot = {
  id: "d3e4073a-421f-45ba-bcae-d10a3bdc5cbf",
  name: m["plots.murderPlanMysteryCircle.name"],
  roles: () => [new PlotRole(Roles.keyPerson), new PlotRole(Roles.brain), new PlotRole(Roles.killer)],
  requiredIncidents: [],
  estimateLoops: () => 1.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const aQuiltOfIncidents: Plot = {
  id: "d53e2adc-ec83-4cfd-bd28-71d7e33b87c9",
  name: m["plots.aQuiltOfIncidents.name"],
  roles: () => [new PlotRole(Roles.fool), new PlotRole(Roles.conspiracyTheorist)],
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
      effect: m["plots.aQuiltOfIncidents.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const tightropePlan: Plot = {
  id: "1bba4a6c-59bb-4680-8786-92da9c9821f5",
  name: m["plots.tightropePlan.name"],
  roles: () => [new PlotRole(Roles.brain), new PlotRole(Roles.killer)],
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
      effect: m["plots.tightropePlan.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const theBlackSchool: Plot = {
  id: "12aeb24d-2238-4439-a414-37d25f499b1d",
  name: m["plots.theBlackSchool.name"],
  roles: () => [new PlotRole(Roles.brain)],
  requiredIncidents: [],
  estimateLoops: () => 1.6,
  plotRules: [
    {
      id: "3b53f8b7-729f-40e0-8b93-97db0d9a37ad",
      trigger: Triggers.loopEnd,
      effect: m["plots.theBlackSchool.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const aDropOfStrychnine: Plot = {
  id: "b9877c5a-5406-4934-b437-c01a37ff007e",
  name: m["plots.aDropOfStrychnine.name"],
  roles: () => [new PlotRole(Roles.keyPerson), new PlotRole(Roles.poisoner), new PlotRole(Roles.fool)],
  requiredIncidents: [],
  estimateLoops: () => 1.6,
  plotRules: [
    {
      id: "c2436eaf-4b4b-4cbf-ab2a-4714cc5657bb",
      trigger: Triggers.incidentStep,
      effect: m["plots.aDropOfStrychnine.plotRule"],
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

// Prime Evil ////////////////////////////////////////////////////////////////
export const aNobleBloodline: Plot = {
  id: "16732658-6f01-4c88-af4b-d404ffdd7682",
  name: m["plots.aNobleBloodline.name"],
  roles: () => [
    new PlotRole(Roles.keyPerson, {
      condition: requireOppositeSex(Roles.vampire),
    }),
    new PlotRole(Roles.vampire, {
      condition: requireOppositeSex(Roles.keyPerson),
    }),
  ],
  requiredIncidents: [],
  estimateLoops: () => 2.6,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const moonlightBeast: Plot = {
  id: "9f989bc8-fd71-495c-bb88-94938c1be142",
  name: m["plots.moonlightBeast.name"],
  roles: () => [new PlotRole(Roles.werewolf)],
  requiredIncidents: [],
  estimateLoops: () => 1.8,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const nightMistNightmare: Plot = {
  id: "e82a5e06-4b04-488e-9eb8-9f046f7235a0",
  name: m["plots.nightMistNightmare.name"],
  roles: () => [new PlotRole(Roles.nightmare)],
  requiredIncidents: [],
  estimateLoops: () => 1.6,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const theOnesFromTheGrave: Plot = {
  id: "9c790fb8-4748-433b-924c-b1dd22d75ee2",
  name: m["plots.theOnesFromTheGrave.name"],
  roles: () => [],
  requiredIncidents: [],
  estimateLoops: () => 1.8,
  plotRules: [
    {
      id: "68f939e1-4fd3-4638-bcfd-5bce0aa3cbc0",
      trigger: Triggers.always,
      effect: m["plots.theOnesFromTheGrave.plotRule"],
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const theCursedLand: Plot = {
  id: "e2878437-6e36-4099-ab94-4b7f97ca2fc6",
  name: m["plots.theCursedLand.name"],
  roles: () => [new PlotRole(Roles.ghost), new PlotRole(Roles.showOff)],
  requiredIncidents: [],
  estimateLoops: () => 1.4,
  plotRules: [
    {
      id: "a7167f92-fd71-4b99-a023-91d13a04fa1e",
      trigger: Triggers.loopStart,
      effect: m["plots.theCursedLand.plotRule1"],
      winCondition: false,
    },
    {
      id: "cce0687f-da30-44a5-b474-876d9c1c060b",
      trigger: Triggers.dayEnd,
      effect: m["plots.theCursedLand.plotRule2"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

// Cosmic Mythology //////////////////////////////////////////////////////////
export const choirToTheOutsideGod: Plot = {
  id: "620f0793-22c5-4fa9-a096-f6aee8cd7de9",
  name: m["plots.choirToTheOutsideGod.name"],
  roles: () => [new PlotRole(Roles.keyPerson), new PlotRole(Roles.sacrifice), new PlotRole(Roles.immortal)],
  requiredIncidents: [],
  estimateLoops: () => 1.8,
  plotRules: [
    {
      id: "1c438d51-68bf-41c8-9c91-7fb61c199674",
      trigger: Triggers.loopEnd,
      effect: m["plots.choirToTheOutsideGod.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const theSacredWordsOfDagon: Plot = {
  id: "e6333431-f648-4cdd-bd53-638070e06cb0",
  name: m["plots.theSacredWordsOfDagon.name"],
  roles: () => [new PlotRole(Roles.keyPerson), new PlotRole(Roles.cultist), new PlotRole(Roles.deepOne)],
  requiredIncidents: [],
  estimateLoops: () => 2.0,
  plotRules: [
    {
      id: "c1282b10-6378-4201-a157-ffc55e71e29e",
      trigger: Triggers.loopEnd,
      effect: m["plots.theSacredWordsOfDagon.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const theKingInYellow: Plot = {
  id: "6f3ebebd-5d82-4bf0-8a80-2ee7dfac0643",
  name: m["plots.theKingInYellow.name"],
  roles: () => [new PlotRole(Roles.sacrifice), new PlotRole(Roles.cultist)],
  requiredIncidents: [],
  estimateLoops: () => 1.0,
  plotRules: [
    {
      id: "325c8f7e-f010-40cb-8a66-b62a0e02c949",
      trigger: Triggers.loopEnd,
      effect: m["plots.theKingInYellow.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const giantTimeBombAgain: Plot = {
  id: "ab783db0-205d-432d-8411-e7ad0e2030b8",
  name: m["plots.giantTimeBombAgain.name"],
  roles: () => [new PlotRole(Roles.witch), new PlotRole(Roles.deepOne)],
  requiredIncidents: [],
  estimateLoops: () => 1.6,
  plotRules: [
    {
      id: "83071e5f-2525-40e0-b4da-36cabc189e54",
      trigger: Triggers.loopEnd,
      effect: m["plots.giantTimeBombAgain.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const bloodyRites: Plot = {
  id: "50cb0340-6f44-4e75-b129-23553cdbb4c0",
  name: m["plots.bloodyRites.name"],
  roles: () => [new PlotRole(Roles.witch), new PlotRole(Roles.immortal)],
  requiredIncidents: [],
  estimateLoops: () => 1.8,
  plotRules: [
    {
      id: "6d936626-8482-46d5-ba2d-0d39a642d08d",
      trigger: Triggers.loopEnd,
      effect: m["plots.bloodyRites.plotRule"],
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

// Last Liar /////////////////////////////////////////////////////////////////
export const theFinalPlan: Plot = {
  id: "f8625285-7ac6-4a0b-9b8e-bc7ecadad906",
  name: m["plots.theFinalPlan.name"],
  roles: () => [new PlotRole(Roles.keyPerson), new PlotRole(Roles.brain), new PlotRole(Roles.killer)],
  requiredIncidents: [],
  estimateLoops: () => 1.8,
  plotRules: [
    {
      id: "8142fc37-b0cb-46df-a4ac-116e4a96a638",
      trigger: Triggers.always,
      effect: m["plots.theFinalPlan.plotRule"],
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const theSealedConclusion: Plot = {
  id: "892a2b3e-8fb3-49a3-b0bc-7647adfca265",
  name: m["plots.theSealedConclusion.name"],
  roles: () => [new PlotRole(Roles.factor), new PlotRole(Roles.fragment)],
  requiredIncidents: [],
  estimateLoops: () => 1.5,
  plotRules: [
    {
      id: "f11a10fe-5102-4d6d-96e8-2d52bb34b66c",
      trigger: Triggers.dayEnd,
      effect: m["plots.theSealedConclusion.plotRule1"],
      winCondition: true,
    },
    {
      id: "447c043c-18b2-4480-b218-f68c339a2a3e",
      trigger: Triggers.always,
      effect: m["plots.theSealedConclusion.plotRule2"],
      winCondition: false,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const worldOfRebellion: Plot = {
  id: "c07e70ac-0cb8-411b-bd1a-107563a6633b",
  name: m["plots.worldOfRebellion.name"],
  roles: () => [
    new PlotRole(Roles.keyPerson, {
      condition: requireDescriptor("Girl"),
    }),
    new PlotRole(Roles.fragment, {
      condition: requireDescriptor("Girl"),
    }),
  ],
  requiredIncidents: [],
  estimateLoops: () => 1.6,
  plotRules: [
    {
      id: "9771ad87-5ecb-4dd3-b84c-f4865fb67208",
      effect: m["plots.worldOfRebellion.plotRule"],
      trigger: Triggers.loopEnd,
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const theDemonsScript: Plot = {
  id: "a59914b7-0d73-400f-8796-b557225afe78",
  name: m["plots.theDemonsScript.name"],
  roles: () => [new PlotRole(Roles.watcher), new PlotRole(Roles.serialKiller)],
  requiredIncidents: [],
  estimateLoops: (script) => {
    const relatedIncidentIds = new Set([Incidents.theExecutioner.id, Incidents.lastWill.id]);
    const relatedIncidents = script.getIncidents().filter((incident) => relatedIncidentIds.has(incident.id));
    return 1.2 + 0.5 * relatedIncidents.length;
  },
  plotRules: [
    {
      id: "df71074c-eefe-438a-92b5-f20703c3ece6",
      effect: m["plots.theDemonsScript.plotRule1"],
      trigger: Triggers.loopEnd,
      winCondition: true,
    },
    {
      id: "07b1acf9-c218-4c08-9cdb-df72d61dc316",
      effect: m["plots.theDemonsScript.plotRule2"],
      trigger: Triggers.dayEndLastDay,
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const giantTimeBombYetAgain: Plot = {
  id: "081a1364-0c02-4cee-9cfd-5c47c7460dcb",
  name: m["plots.giantTimeBombYetAgain.name"],
  roles: () => [new PlotRole(Roles.brain), new PlotRole(Roles.witch)],
  requiredIncidents: [],
  estimateLoops: () => 1.5,
  plotRules: [
    {
      id: "b3d65875-ac17-4b4c-a90a-e85b36126964",
      effect: m["plots.giantTimeBomb.plotRule"],
      trigger: Triggers.loopEnd,
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

// Another Horizon ///////////////////////////////////////////////////////////
export const theForbiddenFuture: Plot = {
  id: "54a8c013-9638-40d2-9f40-a4b49b468225",
  name: m["plots.theForbiddenFuture.name"],
  roles: () => [
    new PlotRole(Roles.obstinate, {
      darkWorld: Roles.keyPerson,
    }),
    new PlotRole(Roles.marionette),
    new PlotRole(Roles.storyteller),
  ],
  requiredIncidents: [],
  estimateLoops: () => 1.5,
  plotRules: [
    {
      id: "cfbb8bf5-82cb-4641-bf87-bc7a979d25a6",
      effect: m["plots.theForbiddenFuture.plotRule"],
      trigger: Triggers.loopEnd,
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const fairyTaleMurderer: Plot = {
  id: "da4207d4-2e87-4722-8490-37d805609b99",
  name: m["plots.fairyTaleMurderer.name"],
  roles: () => [new PlotRole(Roles.keyPerson), new PlotRole(Roles.lullaby), new PlotRole(Roles.brain)],
  requiredIncidents: [],
  estimateLoops: () => 1.4,
  plotRules: [],
  mastermindAbilities: [],
  enabled: true,
};

export const motherGooseMystery: Plot = {
  id: "1ae7fd30-7a7a-45ac-9da3-cf4bac2c7cba",
  name: m["plots.motherGooseMystery.name"],
  roles: () => [new PlotRole(Roles.marionette), new PlotRole(Roles.storyteller)],
  requiredIncidents: [],
  estimateLoops: () => 1.8,
  plotRules: [
    {
      id: "5f8bf710-3c1f-4356-a667-371b53a98f7b",
      effect: m["plots.motherGooseMystery.plotRule"],
      trigger: Triggers.loopEnd,
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const dimensionalMerger: Plot = {
  id: "3cbf24bf-813d-4e9a-8d3e-5f4da67ac3b2",
  name: m["plots.dimensionalMerger.name"],
  roles: () => [new PlotRole(Roles.storyteller), new PlotRole(Roles.shifter), new PlotRole(Roles.fragment)],
  requiredIncidents: [],
  estimateLoops: (script) => {
    const relatedIncidentIds = new Set([Incidents.lastWill.id, Incidents.leftBehind.id]);
    const relatedIncidents = script.getIncidents().filter((incident) => relatedIncidentIds.has(incident.id));
    return 1.4 + 0.5 * relatedIncidents.length;
  },
  plotRules: [
    {
      id: "08fd94e3-b16b-439e-ad72-b383cfe50dcbd",
      effect: m["plots.dimensionalMerger.plotRule"],
      trigger: Triggers.loopEnd,
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};

export const intoNothingness: Plot = {
  id: "749dc121-f5b6-40d6-8d0d-0df534d125c6",
  name: m["plots.intoNothingness.name"],
  roles: () => [new PlotRole(Roles.obstinate), new PlotRole(Roles.marionette), new PlotRole(Roles.brain)],
  requiredIncidents: [],
  estimateLoops: () => 1.8,
  plotRules: [
    {
      id: "0106a3c1-3b33-4708-ae4c-054f6972cb49",
      effect: m["plots.intoNothingness.plotRule"],
      trigger: Triggers.loopEnd,
      winCondition: true,
    },
  ],
  mastermindAbilities: [],
  enabled: true,
};
