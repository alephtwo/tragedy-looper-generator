import { Character } from '../types/Character';
import * as _ from 'lodash';

export const AllCharacters: CastDatabase = {
  // Base Game
  boyStudent: {
    id: '03bdc526-2b8c-48f4-8d10-2d0bec80cfe7',
    name: 'Boy Student',
    type: 'Student',
    gender: 'Male',
    descriptors: ['Boy'],
  },
  girlStudent: {
    id: 'f98baaa1-02cf-44ad-845c-0842687327ad',
    name: 'Girl Student',
    type: 'Student',
    gender: 'Female',
    descriptors: ['Girl'],
  },
  richMansDaughter: {
    id: '20fa968a-e6a2-4d03-8e28-ea198b937876',
    name: "Rich Man's Daughter",
    type: 'Student',
    gender: 'Female',
    descriptors: ['Girl'],
  },
  shrineMaiden: {
    id: '5f04d536-ea15-4f70-860e-cdd46e40aa06',
    name: 'Shrine Maiden',
    type: 'Student',
    gender: 'Female',
    descriptors: ['Girl'],
  },
  policeOfficer: {
    id: 'bd889efe-d461-4942-99d3-67c940877188',
    name: 'Police Officer',
    type: 'Adult',
    gender: 'Male',
    descriptors: ['Man'],
  },
  officeWorker: {
    id: '242612e4-9ae7-46e6-a7a5-091e99dc4971',
    name: 'Office Worker',
    type: 'Adult',
    gender: 'Male',
    descriptors: ['Man'],
  },
  informer: {
    id: 'ee78422a-9d7e-47f2-8e02-463da8506681',
    name: 'Informer',
    type: 'Adult',
    gender: 'Female',
    descriptors: ['Woman'],
  },
  doctor: {
    id: 'a531ecd0-4f76-46fb-aa2f-ee0900aaf92f',
    name: 'Doctor',
    type: 'Adult',
    gender: 'Male',
    descriptors: ['Man'],
  },
  patient: {
    id: 'ae084c90-57e0-4e98-a4be-dec60d001ff4',
    name: 'Patient',
    type: null,
    gender: 'Male',
    descriptors: ['Boy'],
  },
  classRep: {
    id: '195959c6-edbd-44ee-869a-3cb99ba7f26c',
    name: 'Class Rep',
    type: 'Student',
    gender: 'Female',
    descriptors: ['Girl'],
  },
  mysteryBoy: {
    id: '19c491fa-25a1-4f3d-9a1e-1f270acde3da',
    name: 'Mystery Boy',
    type: 'Student',
    gender: 'Male',
    descriptors: ['Boy'],
  },
  alien: {
    id: '694bf4d2-32fd-43bc-89a2-39cd5f8d324c',
    name: 'Alien',
    type: null,
    gender: 'Female',
    descriptors: ['Girl'],
  },
  godlyBeing: {
    id: 'f6b30162-4e8f-49f0-b51f-c8d27e111536',
    name: 'Godly Being',
    type: null,
    gender: 'All',
    descriptors: ['Man', 'Woman'],
    entersOnLoop: (loops: number): number => _.random(1, loops),
  },
  popIdol: {
    id: '8d6ee9a7-6753-4abe-8444-13098820f516',
    name: 'Pop Idol',
    type: 'Student',
    gender: 'Female',
    descriptors: ['Girl'],
  },
  journalist: {
    id: '2df000cd-291a-4fa3-96a6-ea4296963eb8',
    name: 'Journalist',
    type: 'Adult',
    gender: 'Male',
    descriptors: ['Man'],
  },
  boss: {
    id: '0d972867-d2ba-44ff-99c3-5f27104d8d0c',
    name: 'Boss',
    type: 'Adult',
    gender: 'Male',
    descriptors: ['Man'],
  },
  nurse: {
    id: '9523b936-7808-4aca-a483-fbe2211c5e27',
    name: 'Nurse',
    type: 'Adult',
    gender: 'Female',
    descriptors: ['Woman'],
  },
  henchman: {
    id: '88adda6a-3b1f-4a4f-98f8-fbf7c0b7869f',
    name: 'Henchman',
    type: 'Adult',
    gender: 'Male',
    descriptors: ['Man'],
  },
  // Midnight Circle
  scientist: {
    id: '493add42-b106-4923-90fc-10a04dcd2982',
    name: 'Scientist',
    type: 'Adult',
    gender: 'Male',
    descriptors: ['Man'],
  },
  forensicSpecialist: {
    id: 'e76226d7-891a-4e24-86af-968d33531ad6',
    name: 'Forensic Specialist',
    type: 'Adult',
    gender: 'Male',
    descriptors: ['Man'],
  },
  ai: {
    id: 'cba684aa-e460-4504-8933-cf76ce071982',
    name: 'A.I.',
    type: 'Construct',
    gender: null,
    descriptors: [],
  },
  illusion: {
    id: 'dabdcbaf-bcc1-4725-82dd-8ea0cceb081e',
    name: 'Illusion',
    type: 'Construct',
    gender: 'Female',
    descriptors: ['Woman'],
  },
  // Cosmic Evil
  teacher: {
    id: '6cb9abde-9d38-4c03-9add-4a561ac8b954',
    name: 'Teacher',
    type: 'Adult',
    gender: 'Female',
    descriptors: ['Woman'],
  },
  transferStudent: {
    id: '9013029e-0090-4626-bc57-a9af16237089',
    name: 'Transfer Student',
    type: 'Student',
    gender: 'Female',
    descriptors: ['Girl'],
  },
  blackCat: {
    id: '24f18137-6dce-4fad-9d05-fae4ac1b7c80',
    name: 'Black Cat',
    type: 'Animal',
    gender: null,
    descriptors: [],
  },
  soldier: {
    id: '8d6dbf47-5d90-4003-acd3-2f5905a081ad',
    name: 'Soldier',
    type: 'Adult',
    gender: 'Male',
    descriptors: ['Man'],
  },
};

export const BaseGame = [
  AllCharacters.boyStudent,
  AllCharacters.girlStudent,
  AllCharacters.richMansDaughter,
  AllCharacters.shrineMaiden,
  AllCharacters.policeOfficer,
  AllCharacters.officeWorker,
  AllCharacters.informer,
  AllCharacters.doctor,
  AllCharacters.patient,
  AllCharacters.classRep,
  AllCharacters.mysteryBoy,
  AllCharacters.alien,
  AllCharacters.godlyBeing,
  AllCharacters.popIdol,
  AllCharacters.journalist,
  AllCharacters.boss,
  AllCharacters.nurse,
  AllCharacters.henchman,
];

export const MidnightCircle = [
  AllCharacters.scientist,
  AllCharacters.forensicSpecialist,
  AllCharacters.ai,
  AllCharacters.illusion,
];

export const CosmicEvil = [
  AllCharacters.teacher,
  AllCharacters.transferStudent,
  AllCharacters.blackCat,
  AllCharacters.soldier,
];

interface CastDatabase {
  boyStudent: Character;
  girlStudent: Character;
  richMansDaughter: Character;
  shrineMaiden: Character;
  policeOfficer: Character;
  officeWorker: Character;
  informer: Character;
  doctor: Character;
  patient: Character;
  classRep: Character;
  mysteryBoy: Character;
  alien: Character;
  godlyBeing: Character;
  popIdol: Character;
  journalist: Character;
  boss: Character;
  nurse: Character;
  henchman: Character;
  scientist: Character;
  forensicSpecialist: Character;
  ai: Character;
  illusion: Character;
  teacher: Character;
  transferStudent: Character;
  blackCat: Character;
  soldier: Character;
}
