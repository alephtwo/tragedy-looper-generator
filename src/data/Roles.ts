import { Role } from '../model/data/Role';
import { Triggers } from './Triggers';

export const Roles: RolesDatabase = {
  person: new Role({
    id: '45041819-44ec-4fbd-aa6e-2cf816097cdc',
    name_i18n_key: 'roles.person.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    unkillable: false,
    abilities: [],
    mastermindAbilities: [],
  }),
  keyPerson: new Role({
    id: '95d137b0-8652-4576-ae64-a7dc34a5f3f4',
    name_i18n_key: 'roles.keyPerson.name',
    culprit: 'Optional',
    unkillable: false,
    connectedToBoard: false,
    connectedToLossCondition: true,
    abilities: [
      {
        id: '6617251d-d944-4e54-bb79-30038b7f2624',
        trigger: Triggers.whenCharacterDies,
        effect_i18n_key: 'roles.keyPerson.roleAbility',
        optional: false,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  }),
  killer: new Role({
    id: '0fa54005-f68b-4fc1-9c44-3c8db0b4b367',
    name_i18n_key: 'roles.killer.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: true,
    goodwillRefusal: 'Optional',
    unkillable: false,
    abilities: [
      {
        id: 'c884ee1a-1266-4b56-a5d1-0f73b133d052',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.killer.roleAbility1',
        optional: true,
        winCondition: true,
      },
      {
        id: '8cb53b2f-5b4d-4e9a-96cd-df5c9d570905',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.killer.roleAbility2',
        optional: true,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  }),
  brain: new Role({
    id: '00e756b6-652f-4bc7-a85c-76c3d018074b',
    name_i18n_key: 'roles.brain.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: false,
    goodwillRefusal: 'Optional',
    unkillable: false,
    abilities: [],
    mastermindAbilities: [
      {
        effect_i18n_key: 'roles.brain.roleAbility',
        optional: true,
      },
    ],
  }),
  cultist: new Role({
    id: 'c5796a2b-012f-4e63-9421-3821ebd96faa',
    name_i18n_key: 'roles.cultist.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: false,
    goodwillRefusal: 'Mandatory',
    unkillable: false,
    abilities: [
      {
        id: 'f5f6dc6e-c0c2-4b49-afbd-74c72e48d1ab',
        trigger: Triggers.cardResolve,
        effect_i18n_key: 'roles.cultist.roleAbility',
        optional: true,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  conspiracyTheorist: new Role({
    id: '87a2518e-9e79-4dae-ae5f-1e58bd785887',
    name_i18n_key: 'roles.conspiracyTheorist.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: false,
    max: 1,
    unkillable: false,
    abilities: [],
    mastermindAbilities: [
      {
        effect_i18n_key: 'roles.conspiracyTheorist.mastermindAbility',
        optional: true,
      },
    ],
  }),
  serialKiller: new Role({
    id: '85a0c633-fdf1-463c-9971-9b45bdc0cfcf',
    name_i18n_key: 'roles.serialKiller.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: false,
    unkillable: false,
    abilities: [
      {
        id: '3ef9a3d5-bfc8-41b4-a4ba-31627ec7d6c4',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.serialKiller.roleAbility',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  curmudgeon: new Role({
    id: '9bf6604e-f0e8-4807-bebf-63b7a3b838b3',
    name_i18n_key: 'roles.curmudgeon.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    goodwillRefusal: 'Optional',
    unkillable: false,
    abilities: [],
    mastermindAbilities: [],
  }),
  friend: new Role({
    id: 'ef68b5d1-adf6-4935-a298-2434e240f859',
    name_i18n_key: 'roles.friend.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    max: 2,
    unkillable: false,
    abilities: [
      {
        id: '393d9873-15f2-4219-8b68-121144ccbb84',
        trigger: Triggers.loopEnd,
        effect_i18n_key: 'roles.friend.roleAbility1',
        optional: true,
        winCondition: false,
      },
      {
        id: '13cc8724-220d-4e2e-ab3e-a8afd1c86a47',
        trigger: Triggers.loopStart,
        effect_i18n_key: 'roles.friend.roleAbility2',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  timeTraveller: new Role({
    id: '7774f887-6c8f-483f-aa1c-fab32835f867',
    name_i18n_key: 'roles.timeTraveller.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: true,
    unkillable: true,
    abilities: [
      {
        id: '20933daa-2da5-42ee-92c9-c03907caa890',
        trigger: Triggers.cardResolve,
        effect_i18n_key: 'roles.timeTraveller.roleAbility1',
        optional: false,
        winCondition: false,
      },
      {
        id: '65341f38-e6a3-4d16-9d89-ed7acd1ca532',
        trigger: Triggers.dayEndLastDay,
        effect_i18n_key: 'roles.timeTraveller.roleAbility2',
        optional: true,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  }),
  lover: new Role({
    id: '82094e99-b591-4470-974a-782f4e1e752e',
    name_i18n_key: 'roles.lover.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    unkillable: false,
    abilities: [
      {
        id: '7579c482-2be6-434b-8eba-95a2140c8bfe',
        trigger: Triggers.whenLovedOneDies,
        effect_i18n_key: 'roles.lover.roleAbility',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  lovedOne: new Role({
    id: '2910bfd8-8a87-4541-98ab-c01980efba10',
    name_i18n_key: 'roles.lovedOne.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    unkillable: false,
    abilities: [
      {
        id: 'c45c4b81-494d-4d9f-b423-e44815f7b42e',
        trigger: Triggers.whenLoverDies,
        effect_i18n_key: 'roles.lovedOne.roleAbility1',
        optional: false,
        winCondition: false,
      },
      {
        id: '655bb6b2-2c15-410b-b651-b55b49ad16ee',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.lovedOne.roleAbility2',
        optional: true,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  }),
  factor: new Role({
    id: '9293559d-01db-47a5-84d1-e37430f714f5',
    name_i18n_key: 'roles.factor.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    goodwillRefusal: 'Optional',
    unkillable: false,
    abilities: [
      {
        id: '19735dca-4017-4d86-84cd-42a0b765359a',
        trigger: Triggers.always,
        effect_i18n_key: 'roles.factor.roleAbility1',
        optional: false,
        winCondition: false,
      },
      {
        id: '7a1016c4-0c2e-48cc-9716-64685b9405e5',
        trigger: Triggers.always,
        effect_i18n_key: 'roles.factor.roleAbility2',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  witch: new Role({
    id: '011c23fd-15b1-435e-a08e-b91e4d18ba51',
    name_i18n_key: 'roles.witch.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    goodwillRefusal: 'Mandatory',
    unkillable: false,
    abilities: [],
    mastermindAbilities: [],
  }),
  magician: new Role({
    id: 'ce40a35a-ffce-4226-b519-2a66979a091d',
    name_i18n_key: 'roles.magician.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: false,
    unkillable: false,
    abilities: [
      {
        id: '5534c012-6674-4a54-8a50-855c2a648ffb',
        trigger: Triggers.whenCharacterDies,
        effect_i18n_key: 'roles.magician.roleAbility',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [
      {
        effect_i18n_key: 'roles.magician.mastermindAbility',
        timesPerLoop: '1 (for all Magicians combined)',
        optional: true,
      },
    ],
  }),
  ninja: new Role({
    id: '8dc41278-0a96-4ee4-ab01-f33267e3a955',
    name_i18n_key: 'roles.ninja.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: false,
    goodwillRefusal: 'Optional',
    unkillable: false,
    abilities: [
      {
        id: 'a03dac67-8b73-4011-853d-750ddb106c1c',
        trigger: Triggers.whenRoleIsRevealed,
        effect_i18n_key: 'roles.ninja.roleAbility1',
        optional: false,
        winCondition: false,
      },
      {
        id: '4371a360-ca49-4c5e-afa4-7ff6238b0f38',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.ninja.roleAbility2',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  obstinate: new Role({
    id: '58ff6ee3-dd0f-4c59-96ad-06b840e1b169',
    name_i18n_key: 'roles.obstinate.name',
    culprit: 'Mandatory',
    connectedToBoard: false,
    connectedToLossCondition: false,
    goodwillRefusal: 'Mandatory',
    unkillable: false,
    abilities: [
      {
        id: '2731e7ca-fb2d-49fd-8caa-d42e535bc6f4',
        trigger: Triggers.incidentStep,
        effect_i18n_key: 'roles.obstinate.roleAbility',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  prophet: new Role({
    id: '3e425296-3ffc-499e-b4ea-b7b799587335',
    name_i18n_key: 'roles.prophet.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: false,
    unkillable: false,
    abilities: [
      {
        id: '385b903a-6623-46b1-b379-0ea929ac6675',
        trigger: Triggers.always,
        effect_i18n_key: 'roles.prophet.roleAbility1',
        optional: false,
        winCondition: false,
      },
      {
        id: 'd38c6f44-722f-45f3-8188-80290d76c34c',
        trigger: Triggers.incidentStep,
        effect_i18n_key: 'roles.prophet.roleAbility2',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  immortal: new Role({
    id: '0b016916-baae-430a-962a-6eb70fc927e2',
    name_i18n_key: 'roles.immortal.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    unkillable: true,
    abilities: [],
    mastermindAbilities: [],
  }),
  poisoner: new Role({
    id: '06e6e832-dfe2-4fa0-bb09-8d9ace844bef',
    name_i18n_key: 'roles.poisoner.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: true,
    goodwillRefusal: 'Optional',
    unkillable: false,
    abilities: [
      {
        id: '87b10333-4e23-48ec-95e8-0464f392dacc',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.poisoner.roleAbility1',
        optional: false,
        timesPerLoop: 1,
        winCondition: false,
      },
      {
        id: '8635d58d-9a4b-4c19-aa89-ae557e2d8f32',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.poisoner.roleAbility2',
        optional: false,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  }),
  fool: new Role({
    id: '42860f15-bf07-4a96-81d9-5ba184655018',
    name_i18n_key: 'roles.fool.name',
    culprit: 'Mandatory',
    connectedToBoard: true,
    connectedToLossCondition: false,
    max: 1,
    unkillable: false,
    abilities: [
      {
        id: 'b12d8dd8-73ed-4eab-8468-2ac7f994285d',
        trigger: Triggers.incidentStep,
        effect_i18n_key: 'roles.fool.roleAbility',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  privateInvestigator: new Role({
    id: '1f74472f-0029-402f-b0ba-7b9958f70af6',
    name_i18n_key: 'roles.privateInvestigator.name',
    culprit: 'Never',
    connectedToBoard: true,
    connectedToLossCondition: false,
    unkillable: true,
    abilities: [
      {
        id: '1317ca86-2d4f-4a8b-b6d0-5aff07fa9f45',
        trigger: Triggers.incidentStep,
        effect_i18n_key: 'roles.privateInvestigator.roleAbility',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  paranoiac: new Role({
    id: '216548f7-2a29-4e57-b76b-567661aa2d36',
    name_i18n_key: 'roles.paranoiac.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    goodwillRefusal: 'Mandatory',
    unkillable: false,
    abilities: [],
    mastermindAbilities: [
      {
        effect_i18n_key: 'roles.paranoiac.mastermindAbility',
        optional: true,
      },
    ],
  }),
  twin: new Role({
    id: '2ded16d0-b220-470b-a1c1-7eb2ea3f44b2',
    name_i18n_key: 'roles.twin.name',
    culprit: 'Mandatory',
    connectedToBoard: true,
    connectedToLossCondition: false,
    unkillable: false,
    abilities: [
      {
        id: 'd48359b5-8fd1-4abb-bf70-b9cfd83d0d7d',
        trigger: Triggers.incidentStep,
        effect_i18n_key: 'roles.twin.roleAbility',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  therapist: new Role({
    id: '8e2bfcf8-1669-4414-84ca-e4903a6afc89',
    name_i18n_key: 'roles.therapist.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    unkillable: false,
    abilities: [],
    mastermindAbilities: [
      {
        effect_i18n_key: 'roles.therapist.mastermindAbility',
        optional: false,
      },
    ],
  }),
  vampire: new Role({
    id: 'da697bd7-9170-4587-a060-92e7229f1340',
    name_i18n_key: 'roles.vampire.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: true,
    goodwillRefusal: 'Optional',
    unkillable: true,
    abilities: [
      {
        id: '5d61679b-a5b0-4aef-9c4f-59bb8df3bfb7',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.vampire.roleAbility1',
        optional: true,
        winCondition: true,
      },
      {
        id: '9cbbb2b9-f26b-436f-ae17-ef466b1c9c6d',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.vampire.roleAbility2',
        optional: true,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  }),
  werewolf: new Role({
    id: '6f7453ad-6dde-40b2-9355-00b2ff1f5626',
    name_i18n_key: 'roles.werewolf.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: true,
    goodwillRefusal: 'Optional',
    unkillable: false,
    abilities: [
      {
        id: 'd59177e9-2160-4874-93ab-0dc19b7271df',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.werewolf.roleAbility1',
        optional: true,
        winCondition: true,
      },
      {
        id: 'b18302c8-ba24-4329-8b71-e3c33544ab1b',
        trigger: Triggers.always,
        effect_i18n_key: 'roles.werewolf.roleAbility2',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  nightmare: new Role({
    id: 'cf36a815-8c0c-4511-8897-590ca0791265',
    name_i18n_key: 'roles.nightmare.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: true,
    goodwillRefusal: 'Optional',
    unkillable: true,
    abilities: [
      {
        id: '06610871-f004-495e-bcd9-299fa7f58503',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.nightmare.roleAbility1',
        optional: true,
        winCondition: false,
      },
      {
        id: '6d54ddb7-bb2b-4c30-89df-b1e32834fae0',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.nightmare.roleAbility2',
        optional: true,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  }),
  ghost: new Role({
    id: '51493ed0-0870-49a1-bd54-c63ba3406923',
    name_i18n_key: 'roles.ghost.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: false,
    max: 1,
    unkillable: false,
    abilities: [],
    mastermindAbilities: [
      {
        effect_i18n_key: 'roles.ghost.mastermindAbility',
        optional: false,
      },
    ],
  }),
  showOff: new Role({
    id: '6b1049dd-3690-4181-b56e-6452d565cbcc',
    name_i18n_key: 'roles.showOff.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    unkillable: true,
    abilities: [
      {
        id: '7ad4fe78-d2fc-445d-9e3f-580c17832590',
        trigger: Triggers.always,
        effect_i18n_key: 'roles.showOff.roleAbility',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  coward: new Role({
    id: 'b18d3c56-a096-4897-a533-76967eddc3d7',
    name_i18n_key: 'roles.coward.name',
    culprit: 'Optional',
    connectedToBoard: true,
    connectedToLossCondition: false,
    unkillable: false,
    abilities: [],
    mastermindAbilities: [
      {
        effect_i18n_key: 'roles.coward.roleAbility',
        optional: false,
      },
    ],
  }),
  sacrifice: new Role({
    id: '6d11f30c-f04f-4136-8c16-368ba803f816',
    name_i18n_key: 'roles.sacrifice.name',
    culprit: 'Mandatory',
    connectedToBoard: false,
    connectedToLossCondition: true,
    unkillable: true,
    abilities: [
      {
        id: 'fc913ff0-68ea-4b0d-9e75-8e9e8baccebf',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.sacrifice.roleAbility1',
        optional: true,
        winCondition: true,
      },
      {
        id: 'd6ef72d9-c803-4604-95f1-2e0d8adeb53a',
        trigger: Triggers.incidentStep,
        effect_i18n_key: 'roles.sacrifice.roleAbility2',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  deepOne: new Role({
    id: '94807217-c0ba-4481-949d-82877399c129',
    name_i18n_key: 'roles.deepOne.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    goodwillRefusal: 'Optional',
    unkillable: false,
    abilities: [
      {
        id: 'f5dbd13a-ba2c-4dd0-b510-3da683a88665',
        trigger: Triggers.whenCharacterDies,
        effect_i18n_key: 'roles.deepOne.roleAbility',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [
      {
        effect_i18n_key: 'roles.deepOne.mastermindAbility',
        optional: true,
      },
    ],
  }),
  witness: new Role({
    id: 'a342d418-7eb3-470a-b1b0-cb5509c2ce38',
    name_i18n_key: 'roles.witness.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    unkillable: false,
    abilities: [
      {
        id: 'b7526fe6-caca-4f8b-b070-35882189e986',
        trigger: Triggers.dayEnd,
        effect_i18n_key: 'roles.witness.roleAbility',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  faceless: new Role({
    id: 'eba1ca5a-4a7d-4f1a-8177-8f5fa9059b6c',
    name_i18n_key: 'roles.faceless.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: false,
    goodwillRefusal: 'Optional',
    unkillable: true,
    abilities: [
      {
        id: '4d27482e-0e7f-48ee-9af5-24c70b1de7e8',
        trigger: Triggers.always,
        effect_i18n_key: 'roles.faceless.roleAbility1',
        optional: false,
        winCondition: false,
      },
      {
        id: 'de282aca-0406-4736-84d1-417675c47bad',
        trigger: Triggers.always,
        effect_i18n_key: 'roles.faceless.roleAbility2',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  }),
  wizard: new Role({
    id: '15807f5c-e3e1-4d8d-be73-9958acf2084b',
    name_i18n_key: 'roles.wizard.name',
    culprit: 'Optional',
    connectedToBoard: false,
    connectedToLossCondition: true,
    max: 1,
    unkillable: false,
    abilities: [
      {
        id: '271ee1dd-1157-437d-81ad-60cbd83847dc',
        trigger: Triggers.loopEnd,
        effect_i18n_key: 'roles.wizard.roleAbility1',
        optional: false,
        winCondition: true,
      },
      {
        id: 'd6977ca2-8c73-430d-93a2-5b4678962364',
        trigger: Triggers.goodwillAbilityStep,
        effect_i18n_key: 'roles.wizard.roleAbility2',
        optional: false,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  }),
};

interface RolesDatabase {
  person: Role;
  keyPerson: Role;
  killer: Role;
  brain: Role;
  cultist: Role;
  conspiracyTheorist: Role;
  serialKiller: Role;
  curmudgeon: Role;
  friend: Role;
  timeTraveller: Role;
  lover: Role;
  lovedOne: Role;
  factor: Role;
  witch: Role;
  magician: Role;
  ninja: Role;
  obstinate: Role;
  prophet: Role;
  immortal: Role;
  poisoner: Role;
  fool: Role;
  privateInvestigator: Role;
  paranoiac: Role;
  twin: Role;
  therapist: Role;
  vampire: Role;
  werewolf: Role;
  nightmare: Role;
  ghost: Role;
  showOff: Role;
  coward: Role;
  sacrifice: Role;
  deepOne: Role;
  witness: Role;
  faceless: Role;
  wizard: Role;
}
