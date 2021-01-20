import { Role } from '../types/Role';

export const Roles: RoleDatabase = {
  person: {
    id: '45041819-44ec-4fbd-aa6e-2cf816097cdc',
    name: 'Person',
  },
  keyPerson: {
    id: '95d137b0-8652-4576-ae64-a7dc34a5f3f4',
    name: 'Key Person',
  },
  killer: {
    id: '0fa54005-f68b-4fc1-9c44-3c8db0b4b367',
    name: 'Killer',
  },
  brain: {
    id: '00e756b6-652f-4bc7-a85c-76c3d018074b',
    name: 'Brain',
  },
  cultist: {
    id: 'c5796a2b-012f-4e63-9421-3821ebd96faa',
    name: 'Cultist',
  },
  conspiracyTheorist: {
    id: '87a2518e-9e79-4dae-ae5f-1e58bd785887',
    name: 'Conspiracy Theorist',
    max: 1,
  },
  serialKiller: {
    id: '85a0c633-fdf1-463c-9971-9b45bdc0cfcf',
    name: 'Serial Killer',
  },
  curmudgeon: {
    id: '9bf6604e-f0e8-4807-bebf-63b7a3b838b3',
    name: 'Curmudgeon',
  },
  friend: {
    id: 'ef68b5d1-adf6-4935-a298-2434e240f859',
    name: 'Friend',
    max: 2,
  },
  timeTraveller: {
    id: '7774f887-6c8f-483f-aa1c-fab32835f867',
    name: 'Time Traveller',
  },
  lover: {
    id: '82094e99-b591-4470-974a-782f4e1e752e',
    name: 'Lover',
  },
  lovedOne: {
    id: '2910bfd8-8a87-4541-98ab-c01980efba10',
    name: 'Loved One',
  },
  factor: {
    id: '9293559d-01db-47a5-84d1-e37430f714f5',
    name: 'Factor',
  },
  witch: {
    id: '011c23fd-15b1-435e-a08e-b91e4d18ba51',
    name: 'Witch',
  },
  magician: {
    id: 'ce40a35a-ffce-4226-b519-2a66979a091d',
    name: 'Magician',
  },
  ninja: {
    id: '8dc41278-0a96-4ee4-ab01-f33267e3a955',
    name: 'Ninja',
  },
  obstinate: {
    id: '58ff6ee3-dd0f-4c59-96ad-06b840e1b169',
    name: 'Obstinate',
    isCulprit: 'always',
  },
  prophet: {
    id: '3e425296-3ffc-499e-b4ea-b7b799587335',
    name: 'Prophet',
  },
  immortal: {
    id: '0b016916-baae-430a-962a-6eb70fc927e2',
    name: 'Immortal',
  },
  poisoner: {
    id: '06e6e832-dfe2-4fa0-bb09-8d9ace844bef',
    name: 'Poisoner',
  },
  fool: {
    id: '42860f15-bf07-4a96-81d9-5ba184655018',
    name: 'Fool',
    max: 1,
    isCulprit: 'always',
  },
  privateInvestigator: {
    id: '1f74472f-0029-402f-b0ba-7b9958f70af6',
    name: 'Private Investigator',
    isCulprit: 'never',
  },
  paranoiac: {
    id: '216548f7-2a29-4e57-b76b-567661aa2d36',
    name: 'Paranoiac',
  },
  twin: {
    id: '2ded16d0-b220-470b-a1c1-7eb2ea3f44b2',
    name: 'Twin',
    isCulprit: 'always',
  },
  therapist: {
    id: '8e2bfcf8-1669-4414-84ca-e4903a6afc89',
    name: 'Therapist',
  },
  vampire: {
    id: 'da697bd7-9170-4587-a060-92e7229f1340',
    name: 'Vampire',
  },
  werewolf: {
    id: '6f7453ad-6dde-40b2-9355-00b2ff1f5626',
    name: 'Werewolf',
  },
  nightmare: {
    id: 'cf36a815-8c0c-4511-8897-590ca0791265',
    name: 'Nightmare',
  },
  ghost: {
    id: '51493ed0-0870-49a1-bd54-c63ba3406923',
    name: 'Ghost',
    max: 1,
  },
  showOff: {
    id: '6b1049dd-3690-4181-b56e-6452d565cbcc',
    name: 'Show-Off',
  },
  coward: {
    id: 'b18d3c56-a096-4897-a533-76967eddc3d7',
    name: 'Coward',
  },
  sacrifice: {
    id: '6d11f30c-f04f-4136-8c16-368ba803f816',
    name: 'Sacrifice',
  },
  deepOne: {
    id: '94807217-c0ba-4481-949d-82877399c129',
    name: 'Deep One',
    max: 1,
  },
  witness: {
    id: 'a342d418-7eb3-470a-b1b0-cb5509c2ce38',
    name: 'Witness',
  },
  faceless: {
    id: 'eba1ca5a-4a7d-4f1a-8177-8f5fa9059b6c',
    name: 'Faceless',
  },
  wizard: {
    id: '15807f5c-e3e1-4d8d-be73-9958acf2084b',
    name: 'Wizard',
    max: 1,
  },
};

interface RoleDatabase {
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
