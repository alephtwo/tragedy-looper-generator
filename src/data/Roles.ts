import { Role } from "./types/Role";
import * as Triggers from "./Triggers";
import * as TragedySets from "./TragedySets";
import { m } from "../paraglide/messages";

export const person: Role = {
  id: "45041819-44ec-4fbd-aa6e-2cf816097cdc",
  name: m["roles.person.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
};

export const keyPerson: Role = {
  id: "95d137b0-8652-4576-ae64-a7dc34a5f3f4",
  name: m["roles.keyPerson.name"],
  connectedToBoard: false,
  connectedToLossCondition: true,
  abilities: [
    {
      id: "6617251d-d944-4e54-bb79-30038b7f2624",
      triggers: [Triggers.whenCharacterDies],
      effect: m["roles.keyPerson.roleAbility"],
      optional: false,
      winCondition: true,
    },
  ],
};

export const killer: Role = {
  id: "0fa54005-f68b-4fc1-9c44-3c8db0b4b367",
  name: m["roles.killer.name"],
  connectedToBoard: true,
  connectedToLossCondition: true,
  goodwillRefusal: "Optional",
  abilities: [
    {
      id: "c884ee1a-1266-4b56-a5d1-0f73b133d052",
      triggers: [Triggers.dayEnd],
      effect: m["roles.killer.roleAbility1"],
      optional: true,
      winCondition: true,
    },
    {
      id: "8cb53b2f-5b4d-4e9a-96cd-df5c9d570905",
      triggers: [Triggers.dayEnd],
      effect: m["roles.killer.roleAbility2"],
      optional: true,
      winCondition: true,
    },
  ],
};

export const brain: Role = {
  id: "00e756b6-652f-4bc7-a85c-76c3d018074b",
  name: m["roles.brain.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  goodwillRefusal: "Optional",

  mastermindAbilities: [
    {
      effect: m["roles.brain.roleAbility"],
      optional: true,
    },
  ],
};

export const cultist: Role = {
  id: "c5796a2b-012f-4e63-9421-3821ebd96faa",
  name: m["roles.cultist.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  goodwillRefusal: "Mandatory",
  abilities: [
    {
      id: "f5f6dc6e-c0c2-4b49-afbd-74c72e48d1ab",
      triggers: [Triggers.cardResolve],
      effect: m["roles.cultist.roleAbility"],
      optional: true,
      winCondition: false,
    },
  ],
};

export const conspiracyTheorist: Role = {
  id: "87a2518e-9e79-4dae-ae5f-1e58bd785887",
  name: m["roles.conspiracyTheorist.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  max: () => 1,

  mastermindAbilities: [
    {
      effect: m["roles.conspiracyTheorist.mastermindAbility"],
      optional: true,
    },
  ],
};

export const serialKiller: Role = {
  id: "85a0c633-fdf1-463c-9971-9b45bdc0cfcf",
  name: m["roles.serialKiller.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  max: (tragedySet) => (tragedySet.id === TragedySets.lastLiar.id ? 1 : Infinity),
  abilities: [
    {
      id: "3ef9a3d5-bfc8-41b4-a4ba-31627ec7d6c4",
      triggers: [Triggers.dayEnd],
      effect: m["roles.serialKiller.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const curmudgeon: Role = {
  id: "9bf6604e-f0e8-4807-bebf-63b7a3b838b3",
  name: m["roles.curmudgeon.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  goodwillRefusal: "Optional",
};

export const friend: Role = {
  id: "ef68b5d1-adf6-4935-a298-2434e240f859",
  name: m["roles.friend.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  max: () => 2,
  abilities: [
    {
      id: "393d9873-15f2-4219-8b68-121144ccbb84",
      triggers: [Triggers.loopEnd],
      effect: m["roles.friend.roleAbility1"],
      optional: true,
      winCondition: false,
    },
    {
      id: "13cc8724-220d-4e2e-ab3e-a8afd1c86a47",
      triggers: [Triggers.loopStart],
      effect: m["roles.friend.roleAbility2"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const timeTraveller: Role = {
  id: "7774f887-6c8f-483f-aa1c-fab32835f867",
  name: m["roles.timeTraveller.name"],
  connectedToBoard: false,
  connectedToLossCondition: true,
  unkillable: true,
  abilities: [
    {
      id: "20933daa-2da5-42ee-92c9-c03907caa890",
      triggers: [Triggers.cardResolve],
      effect: m["roles.timeTraveller.roleAbility1"],
      optional: false,
      winCondition: false,
    },
    {
      id: "65341f38-e6a3-4d16-9d89-ed7acd1ca532",
      triggers: [Triggers.dayEndLastDay],
      effect: m["roles.timeTraveller.roleAbility2"],
      optional: true,
      winCondition: true,
    },
  ],
};

export const lover: Role = {
  id: "82094e99-b591-4470-974a-782f4e1e752e",
  name: m["roles.lover.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "7579c482-2be6-434b-8eba-95a2140c8bfe",
      triggers: [Triggers.whenLovedOneDies],
      effect: m["roles.lover.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const lovedOne: Role = {
  id: "2910bfd8-8a87-4541-98ab-c01980efba10",
  name: m["roles.lovedOne.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "c45c4b81-494d-4d9f-b423-e44815f7b42e",
      triggers: [Triggers.whenLoverDies],
      effect: m["roles.lovedOne.roleAbility1"],
      optional: false,
      winCondition: false,
    },
    {
      id: "655bb6b2-2c15-410b-b651-b55b49ad16ee",
      triggers: [Triggers.dayEnd],
      effect: m["roles.lovedOne.roleAbility2"],
      optional: true,
      winCondition: true,
    },
  ],
};

export const factor: Role = {
  id: "9293559d-01db-47a5-84d1-e37430f714f5",
  name: m["roles.factor.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  goodwillRefusal: "Optional",
  abilities: [
    {
      id: "19735dca-4017-4d86-84cd-42a0b765359a",
      triggers: [Triggers.always],
      effect: m["roles.factor.roleAbility1"],
      optional: false,
      winCondition: false,
    },
    {
      id: "7a1016c4-0c2e-48cc-9716-64685b9405e5",
      triggers: [Triggers.always],
      effect: m["roles.factor.roleAbility2"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const witch: Role = {
  id: "011c23fd-15b1-435e-a08e-b91e4d18ba51",
  name: m["roles.witch.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  goodwillRefusal: "Mandatory",
};

export const magician: Role = {
  id: "ce40a35a-ffce-4226-b519-2a66979a091d",
  name: m["roles.magician.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "5534c012-6674-4a54-8a50-855c2a648ffb",
      triggers: [Triggers.whenCharacterDies],
      effect: m["roles.magician.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
  mastermindAbilities: [
    {
      effect: m["roles.magician.mastermindAbility"],
      timesPerLoop: "1 (for all Magicians combined)",
      optional: true,
    },
  ],
};

export const ninja: Role = {
  id: "8dc41278-0a96-4ee4-ab01-f33267e3a955",
  name: m["roles.ninja.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  goodwillRefusal: "Optional",
  abilities: [
    {
      id: "a03dac67-8b73-4011-853d-750ddb106c1c",
      triggers: [Triggers.whenRoleIsRevealed],
      effect: m["roles.ninja.roleAbility1"],
      optional: false,
      winCondition: false,
    },
    {
      id: "4371a360-ca49-4c5e-afa4-7ff6238b0f38",
      triggers: [Triggers.dayEnd],
      effect: m["roles.ninja.roleAbility2"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const obstinate: Role = {
  id: "58ff6ee3-dd0f-4c59-96ad-06b840e1b169",
  name: m["roles.obstinate.name"],
  culprit: "Mandatory",
  connectedToBoard: false,
  connectedToLossCondition: false,
  goodwillRefusal: "Mandatory",
  abilities: [
    {
      id: "2731e7ca-fb2d-49fd-8caa-d42e535bc6f4",
      triggers: [Triggers.incidentStep],
      effect: m["roles.obstinate.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const prophet: Role = {
  id: "3e425296-3ffc-499e-b4ea-b7b799587335",
  name: m["roles.prophet.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "385b903a-6623-46b1-b379-0ea929ac6675",
      triggers: [Triggers.always],
      effect: m["roles.prophet.roleAbility1"],
      optional: false,
      winCondition: false,
    },
    {
      id: "d38c6f44-722f-45f3-8188-80290d76c34c",
      triggers: [Triggers.incidentStep],
      effect: m["roles.prophet.roleAbility2"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const immortal: Role = {
  id: "0b016916-baae-430a-962a-6eb70fc927e2",
  name: m["roles.immortal.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  unkillable: true,
};

export const poisoner: Role = {
  id: "06e6e832-dfe2-4fa0-bb09-8d9ace844bef",
  name: m["roles.poisoner.name"],
  connectedToBoard: true,
  connectedToLossCondition: true,
  goodwillRefusal: "Optional",
  abilities: [
    {
      id: "87b10333-4e23-48ec-95e8-0464f392dacc",
      triggers: [Triggers.dayEnd],
      effect: m["roles.poisoner.roleAbility1"],
      optional: false,
      timesPerLoop: 1,
      winCondition: false,
    },
    {
      id: "8635d58d-9a4b-4c19-aa89-ae557e2d8f32",
      triggers: [Triggers.dayEnd],
      effect: m["roles.poisoner.roleAbility2"],
      optional: false,
      winCondition: true,
    },
  ],
};

export const fool: Role = {
  id: "42860f15-bf07-4a96-81d9-5ba184655018",
  name: m["roles.fool.name"],
  culprit: "Mandatory",
  connectedToBoard: true,
  connectedToLossCondition: false,
  max: () => 1,
  abilities: [
    {
      id: "b12d8dd8-73ed-4eab-8468-2ac7f994285d",
      triggers: [Triggers.incidentStep],
      effect: m["roles.fool.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const privateInvestigator: Role = {
  id: "1f74472f-0029-402f-b0ba-7b9958f70af6",
  name: m["roles.privateInvestigator.name"],
  culprit: "Never",
  connectedToBoard: true,
  connectedToLossCondition: false,
  unkillable: true,
  abilities: [
    {
      id: "1317ca86-2d4f-4a8b-b6d0-5aff07fa9f45",
      triggers: [Triggers.incidentStep],
      effect: m["roles.privateInvestigator.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const paranoiac: Role = {
  id: "216548f7-2a29-4e57-b76b-567661aa2d36",
  name: m["roles.paranoiac.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  goodwillRefusal: "Mandatory",

  mastermindAbilities: [
    {
      effect: m["roles.paranoiac.mastermindAbility"],
      optional: true,
    },
  ],
};

export const twin: Role = {
  id: "2ded16d0-b220-470b-a1c1-7eb2ea3f44b2",
  name: m["roles.twin.name"],
  culprit: "Mandatory",
  connectedToBoard: true,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "d48359b5-8fd1-4abb-bf70-b9cfd83d0d7d",
      triggers: [Triggers.incidentStep],
      effect: m["roles.twin.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const therapist: Role = {
  id: "8e2bfcf8-1669-4414-84ca-e4903a6afc89",
  name: m["roles.therapist.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,

  mastermindAbilities: [
    {
      effect: m["roles.therapist.mastermindAbility"],
      optional: false,
    },
  ],
};

export const vampire: Role = {
  id: "da697bd7-9170-4587-a060-92e7229f1340",
  name: m["roles.vampire.name"],
  connectedToBoard: true,
  connectedToLossCondition: true,
  goodwillRefusal: "Optional",
  unkillable: true,
  abilities: [
    {
      id: "5d61679b-a5b0-4aef-9c4f-59bb8df3bfb7",
      triggers: [Triggers.dayEnd],
      effect: m["roles.vampire.roleAbility1"],
      optional: true,
      winCondition: true,
    },
    {
      id: "9cbbb2b9-f26b-436f-ae17-ef466b1c9c6d",
      triggers: [Triggers.dayEnd],
      effect: m["roles.vampire.roleAbility2"],
      optional: true,
      winCondition: true,
    },
  ],
};

export const werewolf: Role = {
  id: "6f7453ad-6dde-40b2-9355-00b2ff1f5626",
  name: m["roles.werewolf.name"],
  connectedToBoard: false,
  connectedToLossCondition: true,
  goodwillRefusal: "Optional",
  abilities: [
    {
      id: "d59177e9-2160-4874-93ab-0dc19b7271df",
      triggers: [Triggers.dayEnd],
      effect: m["roles.werewolf.roleAbility1"],
      optional: true,
      winCondition: true,
    },
    {
      id: "b18302c8-ba24-4329-8b71-e3c33544ab1b",
      triggers: [Triggers.always],
      effect: m["roles.werewolf.roleAbility2"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const nightmare: Role = {
  id: "cf36a815-8c0c-4511-8897-590ca0791265",
  name: m["roles.nightmare.name"],
  connectedToBoard: true,
  connectedToLossCondition: true,
  goodwillRefusal: "Optional",
  unkillable: true,
  abilities: [
    {
      id: "06610871-f004-495e-bcd9-299fa7f58503",
      triggers: [Triggers.dayEnd],
      effect: m["roles.nightmare.roleAbility1"],
      optional: true,
      winCondition: false,
    },
    {
      id: "6d54ddb7-bb2b-4c30-89df-b1e32834fae0",
      triggers: [Triggers.dayEnd],
      effect: m["roles.nightmare.roleAbility2"],
      optional: true,
      winCondition: true,
    },
  ],
};

export const ghost: Role = {
  id: "51493ed0-0870-49a1-bd54-c63ba3406923",
  name: m["roles.ghost.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  max: () => 1,

  mastermindAbilities: [
    {
      effect: m["roles.ghost.mastermindAbility"],
      optional: false,
    },
  ],
};

export const showOff: Role = {
  id: "6b1049dd-3690-4181-b56e-6452d565cbcc",
  name: m["roles.showOff.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  unkillable: true,
  abilities: [
    {
      id: "7ad4fe78-d2fc-445d-9e3f-580c17832590",
      triggers: [Triggers.always],
      effect: m["roles.showOff.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const coward: Role = {
  id: "b18d3c56-a096-4897-a533-76967eddc3d7",
  name: m["roles.coward.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,

  mastermindAbilities: [
    {
      effect: m["roles.coward.roleAbility"],
      optional: false,
    },
  ],
};

export const sacrifice: Role = {
  id: "6d11f30c-f04f-4136-8c16-368ba803f816",
  name: m["roles.sacrifice.name"],
  culprit: "Mandatory",
  connectedToBoard: false,
  connectedToLossCondition: true,
  unkillable: true,
  abilities: [
    {
      id: "fc913ff0-68ea-4b0d-9e75-8e9e8baccebf",
      triggers: [Triggers.dayEnd],
      effect: m["roles.sacrifice.roleAbility1"],
      optional: true,
      winCondition: true,
    },
    {
      id: "d6ef72d9-c803-4604-95f1-2e0d8adeb53a",
      triggers: [Triggers.incidentStep],
      effect: m["roles.sacrifice.roleAbility2"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const deepOne: Role = {
  id: "94807217-c0ba-4481-949d-82877399c129",
  name: m["roles.deepOne.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  goodwillRefusal: "Optional",
  abilities: [
    {
      id: "f5dbd13a-ba2c-4dd0-b510-3da683a88665",
      triggers: [Triggers.whenCharacterDies],
      effect: m["roles.deepOne.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
  mastermindAbilities: [
    {
      effect: m["roles.deepOne.mastermindAbility"],
      optional: true,
    },
  ],
};

export const witness: Role = {
  id: "a342d418-7eb3-470a-b1b0-cb5509c2ce38",
  name: m["roles.witness.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "b7526fe6-caca-4f8b-b070-35882189e986",
      triggers: [Triggers.dayEnd],
      effect: m["roles.witness.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const faceless: Role = {
  id: "eba1ca5a-4a7d-4f1a-8177-8f5fa9059b6c",
  name: m["roles.faceless.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  goodwillRefusal: "Optional",
  unkillable: true,
  abilities: [
    {
      id: "4d27482e-0e7f-48ee-9af5-24c70b1de7e8",
      triggers: [Triggers.always],
      effect: m["roles.faceless.roleAbility1"],
      optional: false,
      winCondition: false,
    },
    {
      id: "de282aca-0406-4736-84d1-417675c47bad",
      triggers: [Triggers.always],
      effect: m["roles.faceless.roleAbility2"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const wizard: Role = {
  id: "15807f5c-e3e1-4d8d-be73-9958acf2084b",
  name: m["roles.wizard.name"],
  connectedToBoard: false,
  connectedToLossCondition: true,
  max: () => 1,
  abilities: [
    {
      id: "271ee1dd-1157-437d-81ad-60cbd83847dc",
      triggers: [Triggers.loopEnd],
      effect: m["roles.wizard.roleAbility1"],
      optional: false,
      winCondition: true,
    },
    {
      id: "d6977ca2-8c73-430d-93a2-5b4678962364",
      triggers: [Triggers.goodwillAbilityStep],
      effect: m["roles.wizard.roleAbility2"],
      optional: false,
      winCondition: true,
    },
  ],
};

export const fragment: Role = {
  id: "1243a58a-1e49-417d-9314-476f371923a4",
  name: m["roles.fragment.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "d8492325-19c8-4dcb-837a-94ede8e863a9",
      triggers: [Triggers.loopStart],
      effect: m["roles.fragment.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
  mastermindAbilities: [
    {
      effect: m["roles.fragment.mastermindAbility"],
      optional: false,
    },
  ],
};

export const watcher: Role = {
  id: "5e23141a-dd3f-4aba-b6cd-be7f2f4f165c",
  name: m["roles.watcher.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  max: () => 1,
  unkillable: true,
  abilities: [
    {
      id: "7c704432-0125-4ffa-8d67-517aa3300e65",
      triggers: [Triggers.always],
      effect: m["roles.watcher.roleAbility"],
      optional: false,
      winCondition: false,
    },
  ],
};

export const influencer: Role = {
  id: "c8597fed-d1dc-44cf-aca0-bcad42257765",
  name: m["roles.influencer.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "adb71eb8-522d-4f19-b425-243270f3357a",
      effect: m["roles.influencer.roleAbility"],
      triggers: [Triggers.whenCharacterDies],
      optional: false,
      winCondition: false,
    },
    {
      id: "42626b5c-77bf-4daa-96f2-754d6743cd85",
      effect: m["roles.influencer.roleAbility2"],
      triggers: [Triggers.goodwillAbilityStep],
      optional: false,
      winCondition: false,
      timesPerLoop: 1,
    },
  ],
};

export const secretkeeper: Role = {
  id: "15d2cc82-da18-43cb-adc8-8fbd772fa5ea",
  name: m["roles.secretkeeper.name"],
  connectedToBoard: false,
  connectedToLossCondition: true,
  abilities: [
    {
      id: "32dfc7da-3cb4-473b-9fae-d62efd59d574",
      effect: m["roles.secretkeeper.roleAbility"],
      triggers: [Triggers.whenCharacterDies],
      optional: false,
      winCondition: false,
    },
    {
      id: "690ee8d9-85e9-4974-a552-56f0f1272d8b",
      effect: m["roles.secretkeeper.roleAbility2"],
      triggers: [Triggers.whenRoleIsRevealed],
      optional: false,
      winCondition: true,
    },
  ],
};

export const wildcard: Role = {
  id: "563ed0e1-8c20-481d-92fe-145c3b7742eb",
  name: m["roles.wildcard.name"],
  culprit: "Mandatory",
  connectedToBoard: false,
  connectedToLossCondition: false,
  max: () => 1,
  goodwillRefusal: "Mandatory",
  unkillable: true,
  abilities: [
    {
      id: "05f12724-1dfb-4404-80c6-95b750743cd8",
      effect: m["roles.wildcard.roleAbility"],
      triggers: [Triggers.always],
      optional: false,
      winCondition: false,
    },
  ],
};

export const marionette: Role = {
  id: "31f10e09-8a63-49df-95d6-4718bf08ed7c",
  name: m["roles.marionette.name"],
  goodwillRefusal: "Puppeted",
  connectedToBoard: false,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "a51b0578-b2ad-4e48-bf6f-b53e9a13f31e",
      effect: m["roles.marionette.roleAbility"],
      optional: false,
      triggers: [Triggers.goodwillAbilityStep],
      winCondition: false,
    },
  ],
};

export const lullaby: Role = {
  id: "eec493fa-a9f7-4edc-a380-a95a439e0379",
  name: m["roles.lullaby.name"],
  goodwillRefusal: "Puppeted",
  connectedToBoard: true,
  connectedToLossCondition: true,
  abilities: [
    {
      id: "48c805b1-fc15-47cb-809a-be0eb03de937",
      effect: m["roles.lullaby.roleAbility1"],
      optional: false,
      triggers: [Triggers.goodwillAbilityStep],
      winCondition: true,
    },
    {
      id: "e3d1dde6-b5cc-4dc8-bc75-34f8f2c51906",
      effect: m["roles.lullaby.roleAbility2"],
      optional: true,
      triggers: [Triggers.dayEnd],
      winCondition: true,
    },
  ],
  mastermindAbilities: [
    {
      effect: m["roles.lullaby.mastermindAbility"],
      optional: true,
      timesPerLoop: 1,
    },
  ],
};

export const storyteller: Role = {
  id: "85759df9-d635-4f39-a3b7-7d035d8d06c6",
  name: m["roles.storyteller.name"],
  unkillable: true,
  connectedToBoard: true,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "e2221e00-a0a3-40db-8cf1-7bba346200cf",
      effect: m["roles.storyteller.roleAbility"],
      optional: false,
      triggers: [Triggers.loopStart],
      winCondition: false,
    },
  ],
  mastermindAbilities: [
    {
      effect: m["roles.storyteller.mastermindAbility"],
      optional: true,
    },
  ],
};

export const shifter: Role = {
  id: "22cb8046-a815-4f72-a4c3-e25a0ed152e4",
  name: m["roles.shifter.name"],
  connectedToBoard: false,
  connectedToLossCondition: false,
  abilities: [
    {
      id: "99b0803a-3798-4fc8-bff8-e587fa4a73e3",
      effect: m["roles.shifter.roleAbility1"],
      optional: false,
      triggers: [Triggers.always],
      winCondition: false,
    },
    {
      id: "bd72e5c0-6634-4081-83f7-82628f001c18",
      effect: m["roles.shifter.roleAbility2"],
      optional: true,
      triggers: [Triggers.dayEndLastDay],
      winCondition: true,
    },
  ],
};

export const alice: Role = {
  id: "7a58d2b8-a631-4136-9b28-23ccb200e0a4",
  name: m["roles.alice.name"],
  connectedToBoard: true,
  connectedToLossCondition: true,
  abilities: [
    {
      id: "6bc46029-f968-4f4e-bad8-eb4fb6237f89",
      effect: m["roles.alice.roleAbility1"],
      optional: false,
      triggers: [Triggers.loopEnd],
      winCondition: true,
    },
    {
      id: "03226d5e-845e-41b5-b0b0-d9ff81ce45ef",
      effect: m["roles.alice.roleAbility2"],
      optional: false,
      triggers: [Triggers.goodwillAbilityStep],
      winCondition: false,
      timesPerLoop: 1,
    },
  ],
};

export const piedPiper: Role = {
  id: "44b106f3-c828-4d5d-92a1-b878a66e0c89",
  name: m["roles.piedPiper.name"],
  goodwillRefusal: "Optional",
  connectedToBoard: true,
  connectedToLossCondition: true,
  abilities: [
    {
      id: "1f1ccd95-bbfd-466c-817c-fbba5a920a36",
      effect: m["roles.piedPiper.roleAbility"],
      optional: false,
      triggers: [Triggers.dayEnd],
      winCondition: true,
      timesPerLoop: 1,
    },
  ],
  mastermindAbilities: [
    {
      effect: m["roles.piedPiper.mastermindAbility"],
      optional: true,
    },
  ],
};

export const gossip: Role = {
  id: "15932faa-4d73-46f0-b81e-bd3d5f032a7d",
  name: m["roles.gossip.name"],
  connectedToBoard: true,
  connectedToLossCondition: false,
  max: () => 1,
  abilities: [
    {
      id: "76be18b3-e598-4c72-9559-7eade752f333",
      effect: m["roles.gossip.roleAbility"],
      optional: false,
      triggers: [Triggers.whenCharacterDies],
      winCondition: false,
    },
  ],
  mastermindAbilities: [
    {
      effect: m["roles.gossip.mastermindAbility"],
      optional: true,
    },
  ],
};
