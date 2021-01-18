import { Character } from '../types/Character';

const FullCast: Record<string, Character> = {
  // Base Game
  boyStudent: {
    type: 'Student',
    gender: 'Male',
  },
  girlStudent: {
    type: 'Student',
    gender: 'Female',
  },
  richMansDaughter: {
    type: 'Student',
    gender: 'Female',
  },
  shrineMaiden: {
    type: 'Student',
    gender: 'Female',
  },
  policeOfficer: {
    type: 'Adult',
    gender: 'Male',
  },
  officeWorker: {
    type: 'Adult',
    gender: 'Male',
  },
  informer: {
    type: 'Adult',
    gender: 'Female',
  },
  doctor: {
    type: 'Adult',
    gender: 'Male',
  },
  patient: {
    type: null,
    gender: 'Male',
  },
  classRep: {
    type: 'Student',
    gender: 'Female',
  },
  mysteryBoy: {
    type: 'Student',
    gender: 'Male',
  },
  alien: {
    type: null,
    gender: 'Female',
  },
  godlyBeing: {
    type: null,
    gender: 'All',
  },
  popIdol: {
    type: 'Student',
    gender: 'Female',
  },
  journalist: {
    type: 'Adult',
    gender: 'Male',
  },
  boss: {
    type: 'Adult',
    gender: 'Male',
  },
  nurse: {
    type: 'Adult',
    gender: 'Female',
  },
  henchman: {
    type: 'Adult',
    gender: 'Male',
  },
  // Midnight Circle
  scientist: {
    type: 'Adult',
    gender: 'Male',
  },
  forensicSpecialist: {
    type: 'Adult',
    gender: 'Male',
  },
  ai: {
    type: 'Construct',
    gender: null,
  },
  illusion: {
    type: 'Construct',
    gender: 'Female',
  },
  // Cosmic Evil
  teacher: {
    type: 'Adult',
    gender: 'Female',
  },
  transferStudent: {
    type: 'Student',
    gender: 'Female',
  },
  blackCat: {
    type: 'Animal',
    gender: null,
  },
  soldier: {
    type: 'Adult',
    gender: 'Male',
  },
};

export const BaseCast: Array<Character> = [
  FullCast.boyStudent,
  FullCast.girlStudent,
  FullCast.richMansDaughter,
  FullCast.shrineMaiden,
  FullCast.policeOfficer,
  FullCast.officeWorker,
  FullCast.informer,
  FullCast.doctor,
  FullCast.patient,
  FullCast.classRep,
  FullCast.mysteryBoy,
  FullCast.alien,
  FullCast.godlyBeing,
  FullCast.popIdol,
  FullCast.journalist,
  FullCast.boss,
  FullCast.nurse,
  FullCast.henchman,
];

export const MidnightCircleCast = BaseCast.concat([
  FullCast.scientist,
  FullCast.forensicSpecialist,
  FullCast.ai,
  FullCast.illusion,
]);

export const CosmicEvilCast = BaseCast.concat([
  FullCast.teacher,
  FullCast.transferStudent,
  FullCast.blackCat,
  FullCast.soldier,
]);
