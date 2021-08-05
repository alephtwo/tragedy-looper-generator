import { Trigger } from '../types/data/Trigger';

export const Triggers: TriggersDatabase = {
  always: {
    id: 'b888d71a-f98a-4b15-861e-330201a95b2a',
    description: 'Always',
    order: 1,
  },
  loopStart: {
    id: '77a61259-46e8-4bf3-94d7-2dadc5a17eb6',
    description: 'Loop Start',
    order: 2,
  },
  cardResolve: {
    id: 'd29f5068-4b8a-4db4-86eb-c4214b357c13',
    description: 'Card Resolve',
    order: 3,
  },
  goodwillAbilityStep: {
    id: '9543f774-fc58-43e7-be18-68fe5136a405',
    description: 'Goodwill Ability Step',
    order: 4,
  },
  incidentStep: {
    id: 'be01dbb6-e2a9-43fe-98ef-7504cfb61571',
    description: 'Incident Step',
    order: 5,
  },
  dayEnd: {
    id: 'b1c0e43b-d2c3-49b4-af4a-421fdc7c6e2d',
    description: 'Day End',
    order: 6,
  },
  dayEndLastDay: {
    id: 'a0027065-b99d-4905-842c-ebf7a3d366d0',
    description: 'Day End (Last Day)',
    order: 7,
  },
  loopEnd: {
    id: '5de5b0fa-a677-49f7-b6b5-462e798fde44',
    description: 'Loop End',
    order: 8,
  },
  whenRoleIsRevealed: {
    id: 'af7df738-0ed9-4005-97a2-36a63e16a7a2',
    description: 'When this Role is to be Revealed',
    order: 9,
  },
  whenCharacterDies: {
    id: '83cbf220-bd2a-49f2-b220-4ca6d03b0508',
    description: 'When Character Dies',
    order: 10,
  },
  whenLoverDies: {
    id: 'dca09eaf-9d69-47e2-81b5-5af5f87798d4',
    description: 'When the Lover Dies',
    order: 11,
  },
  whenLovedOneDies: {
    id: 'da4a1684-6d06-4142-85de-3ef496637b5f',
    description: 'When the Loved One Dies',
    order: 12,
  },
};

interface TriggersDatabase {
  always: Trigger;
  loopStart: Trigger;
  cardResolve: Trigger;
  goodwillAbilityStep: Trigger;
  incidentStep: Trigger;
  dayEnd: Trigger;
  dayEndLastDay: Trigger;
  loopEnd: Trigger;
  whenRoleIsRevealed: Trigger;
  whenCharacterDies: Trigger;
  whenLoverDies: Trigger;
  whenLovedOneDies: Trigger;
}
