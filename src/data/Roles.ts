import { Role } from '../types/Role';

export const Roles: RoleDatabase = {
  person: {
    id: '45041819-44ec-4fbd-aa6e-2cf816097cdc',
    name: 'Person',
    abilities: [],
    mastermindAbilities: [],
  },
  keyPerson: {
    id: '95d137b0-8652-4576-ae64-a7dc34a5f3f4',
    name: 'Key Person',
    abilities: [
      {
        time: 'On Character Death',
        effect: 'Protagonists lose and the game ends immediately.',
        winCondition: true,
        optional: false,
      },
    ],
    mastermindAbilities: [],
  },
  killer: {
    id: '0fa54005-f68b-4fc1-9c44-3c8db0b4b367',
    name: 'Killer',
    abilities: [
      {
        time: 'Day End',
        effect: 'The Key Person has at least 2 Intrigue and is in the same location: Key Person dies.',
        winCondition: true,
        optional: true,
      },
      {
        time: 'Day End',
        effect: 'This character has at least 4 Intrigue: Protagonists die.',
        winCondition: true,
        optional: true,
      },
    ],
    mastermindAbilities: [],
  },
  brain: {
    id: '00e756b6-652f-4bc7-a85c-76c3d018074b',
    name: 'Brain',
    abilities: [],
    mastermindAbilities: [
      {
        effect: 'Place 1 Intrigue on this location or character in this location.',
        optional: true,
      },
    ],
  },
  cultist: {
    id: 'c5796a2b-012f-4e63-9421-3821ebd96faa',
    name: 'Cultist',
    abilities: [
      {
        time: 'Card Resolve',
        effect: 'Ignore Forbid Intrigue effects in this locatino or on characters in this location.',
        optional: true,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  conspiracyTheorist: {
    id: '87a2518e-9e79-4dae-ae5f-1e58bd785887',
    name: 'Conspiracy Theorist',
    max: 1,
    abilities: [],
    mastermindAbilities: [
      {
        effect: 'Place 1 Paranoia on a character in this location.',
        optional: true,
      },
    ],
  },
  serialKiller: {
    id: '85a0c633-fdf1-463c-9971-9b45bdc0cfcf',
    name: 'Serial Killer',
    abilities: [
      {
        time: 'Day End',
        effect: 'Exactly 1 other character in this location: That character dies.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  curmudgeon: {
    id: '9bf6604e-f0e8-4807-bebf-63b7a3b838b3',
    name: 'Curmudgeon',
    abilities: [],
    mastermindAbilities: [],
  },
  friend: {
    id: 'ef68b5d1-adf6-4935-a298-2434e240f859',
    name: 'Friend',
    max: 2,
    abilities: [
      {
        time: 'Loop End',
        effect: 'If this character is dead, reveal its role.',
        optional: false,
        winCondition: false,
      },
      {
        time: 'Loop Start',
        effect: "If this character's role has been revealed, this character gets 1 Goodwill.",
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  timeTraveller: {
    id: '7774f887-6c8f-483f-aa1c-fab32835f867',
    name: 'Time Traveller',
    abilities: [
      {
        time: 'Always',
        effect: 'This character cannot die.',
        optional: false,
        winCondition: false,
      },
      {
        time: 'Card Resolve',
        effect: 'Ignore Forbid Goodwill for this character.',
        optional: false,
        winCondition: false,
      },
      {
        time: 'Day End (Last Day)',
        effect: 'If 2 Goodwill or fewer on this character: Playerse lose, loop ends.',
        optional: true,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  lover: {
    id: '82094e99-b591-4470-974a-782f4e1e752e',
    name: 'Lover',
    abilities: [
      {
        time: 'When the Loved One Dies',
        effect: 'This character gets 6 Paranoia.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  lovedOne: {
    id: '2910bfd8-8a87-4541-98ab-c01980efba10',
    name: 'Loved One',
    abilities: [
      {
        time: 'When the Lover Dies',
        effect: 'This character gets 6 Paranoia.',
        optional: false,
        winCondition: false,
      },
      {
        time: 'Day End',
        effect: 'If this character has at least 3 Paranoia and at least 1 Intrigue, the Protagonists die.',
        optional: true,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  factor: {
    id: '9293559d-01db-47a5-84d1-e37430f714f5',
    name: 'Factor',
    abilities: [
      {
        time: 'Always',
        effect:
          "If at least 2 Intrigue on the School: This character gains the Conspiracy Theorist's ability (but not its role).",
        optional: false,
        winCondition: false,
      },
      {
        time: 'Always',
        effect: "If at least 2 Intrigue in the City: This character gains the Key Person's ability (but not its role).",
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  witch: {
    id: '011c23fd-15b1-435e-a08e-b91e4d18ba51',
    name: 'Witch',
    abilities: [],
    mastermindAbilities: [],
  },
  magician: {
    id: 'ce40a35a-ffce-4226-b519-2a66979a091d',
    name: 'Magician',
    abilities: [
      {
        time: 'On Character Death',
        effect: 'When this character dies, remove all Paranoia from its corpse.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [
      {
        effect:
          'Move one character with at least one Paranoia from this location to an adjacent location (not diagonal).',
        optional: true,
        timesPerLoop: 1,
      },
    ],
  },
  ninja: {
    id: '8dc41278-0a96-4ee4-ab01-f33267e3a955',
    name: 'Ninja',
    abilities: [
      {
        time: 'When this Role is to be Revealed',
        effect: 'Instead of saying the truth, state any other non-Person role that is in this script.',
        optional: true,
        winCondition: false,
      },
      {
        time: 'Day End',
        effect: 'If there is any character with at least 2 Intrigue in this location, you may kill that character.',
        optional: true,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  obstinate: {
    id: '58ff6ee3-dd0f-4c59-96ad-06b840e1b169',
    name: 'Obstinate',
    isCulprit: 'always',
    abilities: [
      {
        time: 'Incident Step',
        effect: 'This character always triggers its incidents, regardless of the amount of Paranoia on it.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  prophet: {
    id: '3e425296-3ffc-499e-b4ea-b7b799587335',
    name: 'Prophet',
    abilities: [
      {
        time: 'Mastermind Action Step',
        effect: 'The Mastermind cannot place cards on this character.',
        optional: false,
        winCondition: false,
      },
      {
        time: 'Incident Step',
        effect:
          'When determining whether an incident triggers, and the culprit is another character in this location, that Incident does not trigger, regardless of the number of Paranoia on the culprit.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  immortal: {
    id: '0b016916-baae-430a-962a-6eb70fc927e2',
    name: 'Immortal',
    abilities: [],
    mastermindAbilities: [],
  },
  poisoner: {
    id: '06e6e832-dfe2-4fa0-bb09-8d9ace844bef',
    name: 'Poisoner',
    abilities: [
      {
        time: 'Day End',
        effect: 'If the Extra Gauge is at 2 or more, any one character in this location dies.',
        optional: false,
        winCondition: false,
      },
      {
        time: 'Day End',
        effect: 'If the Extra Gauge is on 4 or more, the Protagonists die.',
        optional: false,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  fool: {
    id: '42860f15-bf07-4a96-81d9-5ba184655018',
    name: 'Fool',
    max: 1,
    isCulprit: 'always',
    abilities: [
      {
        time: 'Incident Step',
        effect: 'After this character has triggered an Incident, remove all Paranoia from its card.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  privateInvestigator: {
    id: '1f74472f-0029-402f-b0ba-7b9958f70af6',
    name: 'Private Investigator',
    isCulprit: 'never',
    abilities: [
      {
        time: 'Always',
        effect: 'This character cannot die.',
        optional: false,
        winCondition: false,
      },
      {
        time: 'Incident Step',
        effect:
          'If the Extra Gauge is 0, and the culprit is in this location, the Incident triggers regardless of the number of Paranoia on the culprit.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  paranoiac: {
    id: '216548f7-2a29-4e57-b76b-567661aa2d36',
    name: 'Paranoiac',
    abilities: [],
    mastermindAbilities: [
      {
        effect: 'You may place an Intrigue or Paranoia on this character.',
        optional: true,
      },
    ],
  },
  twin: {
    id: '2ded16d0-b220-470b-a1c1-7eb2ea3f44b2',
    name: 'Twin',
    isCulprit: 'always',
    abilities: [
      {
        time: 'Incident Step',
        effect:
          'When this character triggers an Incident, it is considered as being on the diagonally opposite location.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  therapist: {
    id: '8e2bfcf8-1669-4414-84ca-e4903a6afc89',
    name: 'Therapist',
    abilities: [],
    mastermindAbilities: [
      {
        effect: 'If the Extra Gauge is 1 or above, remove 1 Paranoia from any other character in this location.',
        optional: false,
      },
    ],
  },
  vampire: {
    id: 'da697bd7-9170-4587-a060-92e7229f1340',
    name: 'Vampire',
    abilities: [
      {
        time: 'On Character Death',
        effect: 'When this character dies, the Protagonists immediately lose and the loop ends.',
        optional: false,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  werewolf: {
    id: '6f7453ad-6dde-40b2-9355-00b2ff1f5626',
    name: 'Werewolf',
    abilities: [
      {
        time: 'Day End',
        effect: 'If Night of Madness occurred this day, you may kill the Protagonists.',
        optional: true,
        winCondition: true,
      },
      {
        time: 'Mastermind Action Step',
        effect: 'The Mastermind cannot place cards on this character.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  nightmare: {
    id: 'cf36a815-8c0c-4511-8897-590ca0791265',
    name: 'Nightmare',
    abilities: [
      {
        time: 'Day End',
        effect: 'You may kill one character who is in this location.',
        optional: true,
        winCondition: false,
      },
      {
        time: 'Day End',
        effect: 'If there are 3 or more Intrigue on all corpses in total, you may kill the Protagonists.',
        optional: true,
        winCondition: true,
      },
    ],
    mastermindAbilities: [],
  },
  ghost: {
    id: '51493ed0-0870-49a1-bd54-c63ba3406923',
    name: 'Ghost',
    max: 1,
    abilities: [],
    mastermindAbilities: [
      {
        effect:
          "If this card is a corpse, place 1 Paranoia on any character in this location, or any character in the Ghost's starting location.",
        optional: false,
      },
    ],
  },
  showOff: {
    id: '6b1049dd-3690-4181-b56e-6452d565cbcc',
    name: 'Show-Off',
    abilities: [
      {
        time: 'Always',
        effect:
          'If this character has more than 2 Paranoia, they lose the Unkillable aspect and gains Mandatory Goodwill Refusal.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  coward: {
    id: 'b18d3c56-a096-4897-a533-76967eddc3d7',
    name: 'Coward',
    abilities: [],
    mastermindAbilities: [
      {
        effect: 'If this character has 2 or more Paranoia, pick a neighboring location, and move the character there.',
        optional: false,
      },
    ],
  },
  sacrifice: {
    id: '6d11f30c-f04f-4136-8c16-368ba803f816',
    name: 'Sacrifice',
    abilities: [
      {
        time: 'Day End',
        effect:
          'If this character has at least 2 Intrigue and at least 2 Paranoia, you may kill all characters and the Protagonists.',
        optional: true,
        winCondition: true,
      },
      {
        time: 'Incident Step',
        effect:
          'When determining whether an incident, for which this character is the culprit, will occur or not, also treat Intrigue as Paranoia.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  deepOne: {
    id: '94807217-c0ba-4481-949d-82877399c129',
    name: 'Deep One',
    max: 1,
    abilities: [
      {
        time: 'On Character Death',
        effect: 'When this character dies, reveal its role and increase the extra Gauge 1 step.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [
      {
        effect: 'You may place 1 Intrigue on this location or on any character in this location.',
        optional: true,
      },
    ],
  },
  witness: {
    id: 'a342d418-7eb3-470a-b1b0-cb5509c2ce38',
    name: 'Witness',
    abilities: [
      {
        time: 'Day End',
        effect:
          'If this character has 4 or more Paranoia, this character dies, and the Extra Gauge increases with 1 step.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  faceless: {
    id: 'eba1ca5a-4a7d-4f1a-8177-8f5fa9059b6c',
    name: 'Faceless',
    abilities: [
      {
        time: 'Always',
        effect: 'If the Extra Gauge is 1 or less, this character gains the abilities of a Conspiracy Theorist.',
        optional: false,
        winCondition: false,
      },
      {
        time: 'Always',
        effect: 'If the Extra Gauge is 2 or more, this character gains the abilities of a Deep One.',
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
  },
  wizard: {
    id: '15807f5c-e3e1-4d8d-be73-9958acf2084b',
    name: 'Wizard',
    max: 1,
    abilities: [
      {
        time: 'Loop End',
        effect: 'If this character is dead, the Protagonists lose.',
        optional: false,
        winCondition: true,
      },
      {
        time: 'Goodwill Ability Step',
        effect:
          "When this character's Goodwill abilitiy is used, reveal its role after this resolution. Then, the leader may increase the Extra Gauge one step.",
        optional: false,
        winCondition: false,
      },
    ],
    mastermindAbilities: [],
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
