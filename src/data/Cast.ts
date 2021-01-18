import { Character } from '../types/Character';

const FullCast: Record<string, Character> = {
  // Base Game
  boyStudent: {
    name: 'Boy Student',
    type: 'Student',
    gender: 'Male',
  },
  girlStudent: {
    name: 'Girl Student',
    type: 'Student',
    gender: 'Female',
  },
  richMansDaughter: {
    name: "Rich Man's Daughter",
    type: 'Student',
    gender: 'Female',
  },
  shrineMaiden: {
    name: 'Shrine Maiden',
    type: 'Student',
    gender: 'Female',
  },
  policeOfficer: {
    name: 'Police Officer',
    type: 'Adult',
    gender: 'Male',
  },
  officeWorker: {
    name: 'Office Worker',
    type: 'Adult',
    gender: 'Male',
  },
  informer: {
    name: 'Informer',
    type: 'Adult',
    gender: 'Female',
  },
  doctor: {
    name: 'Doctor',
    type: 'Adult',
    gender: 'Male',
  },
  patient: {
    name: 'Patient',
    type: null,
    gender: 'Male',
  },
  classRep: {
    name: 'Class Rep',
    type: 'Student',
    gender: 'Female',
  },
  mysteryBoy: {
    name: 'Mystery Boy',
    type: 'Student',
    gender: 'Male',
  },
  alien: {
    name: 'Alien',
    type: null,
    gender: 'Female',
  },
  godlyBeing: {
    name: 'Godly Being',
    type: null,
    gender: 'All',
  },
  popIdol: {
    name: 'Pop Idol',
    type: 'Student',
    gender: 'Female',
  },
  journalist: {
    name: 'Journalist',
    type: 'Adult',
    gender: 'Male',
  },
  boss: {
    name: 'Boss',
    type: 'Adult',
    gender: 'Male',
  },
  nurse: {
    name: 'Nurse',
    type: 'Adult',
    gender: 'Female',
  },
  henchman: {
    name: 'Henchman',
    type: 'Adult',
    gender: 'Male',
  },
  // Midnight Circle
  scientist: {
    name: 'Scientist',
    type: 'Adult',
    gender: 'Male',
  },
  forensicSpecialist: {
    name: 'Forensic Specialist',
    type: 'Adult',
    gender: 'Male',
  },
  ai: {
    name: 'A.I.',
    type: 'Construct',
    gender: null,
  },
  illusion: {
    name: 'Illusion',
    type: 'Construct',
    gender: 'Female',
  },
  // Cosmic Evil
  teacher: {
    name: 'Teacher',
    type: 'Adult',
    gender: 'Female',
  },
  transferStudent: {
    name: 'Transfer Student',
    type: 'Student',
    gender: 'Female',
  },
  blackCat: {
    name: 'Black Cat',
    type: 'Animal',
    gender: null,
  },
  soldier: {
    name: 'Soldier',
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
