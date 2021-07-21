import * as _ from 'lodash';
import { Character } from '../types/data/Character';
import { Role } from '../types/data/Role';

export const Characters: CharactersDatabase = {
  // Base
  boyStudent: new Character({
    id: '03bdc526-2b8c-48f4-8d10-2d0bec80cfe7',
    name: 'Boy Student',
    descriptors: ['Student', 'Boy'],
  }),
  girlStudent: new Character({
    id: 'f98baaa1-02cf-44ad-845c-0842687327ad',
    name: 'Girl Student',
    descriptors: ['Student', 'Girl'],
  }),
  richMansDaughter: new Character({
    id: '20fa968a-e6a2-4d03-8e28-ea198b937876',
    name: "Rich Man's Daughter",
    descriptors: ['Student', 'Girl'],
  }),
  shrineMaiden: new Character({
    id: '5f04d536-ea15-4f70-860e-cdd46e40aa06',
    name: 'Shrine Maiden',
    descriptors: ['Student', 'Girl'],
  }),
  policeOfficer: new Character({
    id: 'bd889efe-d461-4942-99d3-67c940877188',
    name: 'Police Officer',
    descriptors: ['Adult', 'Man'],
  }),
  officeWorker: new Character({
    id: '242612e4-9ae7-46e6-a7a5-091e99dc4971',
    name: 'Office Worker',
    descriptors: ['Adult', 'Man'],
  }),
  informer: new Character({
    id: 'ee78422a-9d7e-47f2-8e02-463da8506681',
    name: 'Informer',
    descriptors: ['Adult', 'Woman'],
  }),
  doctor: new Character({
    id: 'a531ecd0-4f76-46fb-aa2f-ee0900aaf92f',
    name: 'Doctor',
    descriptors: ['Adult', 'Man'],
  }),
  patient: new Character({
    id: 'ae084c90-57e0-4e98-a4be-dec60d001ff4',
    name: 'Patient',
    descriptors: ['Boy'],
  }),
  classRep: new Character({
    id: '195959c6-edbd-44ee-869a-3cb99ba7f26c',
    name: 'Class Rep',
    descriptors: ['Student', 'Girl'],
  }),
  mysteryBoy: new Character({
    id: '19c491fa-25a1-4f3d-9a1e-1f270acde3da',
    name: 'Mystery Boy',
    descriptors: ['Student', 'Boy'],
  }),
  alien: new Character({
    id: '694bf4d2-32fd-43bc-89a2-39cd5f8d324c',
    name: 'Alien',
    descriptors: ['Girl'],
  }),
  godlyBeing: new Character({
    id: 'f6b30162-4e8f-49f0-b51f-c8d27e111536',
    name: 'Godly Being',
    descriptors: ['Man', 'Woman'],
  }),
  popIdol: new Character({
    id: '8d6ee9a7-6753-4abe-8444-13098820f516',
    name: 'Pop Idol',
    descriptors: ['Student', 'Girl'],
  }),
  journalist: new Character({
    id: '2df000cd-291a-4fa3-96a6-ea4296963eb8',
    name: 'Journalist',
    descriptors: ['Student', 'Girl'],
  }),
  boss: new Character({
    id: '0d972867-d2ba-44ff-99c3-5f27104d8d0c',
    name: 'Boss',
    descriptors: ['Adult', 'Man'],
  }),
  nurse: new Character({
    id: '9523b936-7808-4aca-a483-fbe2211c5e27',
    name: 'Nurse',
    descriptors: ['Adult', 'Woman'],
  }),
  henchman: new Character({
    id: '88adda6a-3b1f-4a4f-98f8-fbf7c0b7869f',
    name: 'Henchman',
    descriptors: ['Adult', 'Man'],
  }),
  // Midnight Circle
  scientist: new Character({
    id: '493add42-b106-4923-90fc-10a04dcd2982',
    name: 'Scientist',
    descriptors: ['Adult', 'Man'],
  }),
  forensicSpecialist: new Character({
    id: 'e76226d7-891a-4e24-86af-968d33531ad6',
    name: 'Forensic Specialist',
    descriptors: ['Adult', 'Man'],
  }),
  ai: new Character({
    id: 'cba684aa-e460-4504-8933-cf76ce071982',
    name: 'A.I.',
    descriptors: ['Construct'],
  }),
  illusion: new Character({
    id: 'dabdcbaf-bcc1-4725-82dd-8ea0cceb081e',
    name: 'Illusion',
    descriptors: ['Fabrication', 'Woman'],
  }),
  // Cosmic Evil
  teacher: new Character({
    id: '6cb9abde-9d38-4c03-9add-4a561ac8b954',
    name: 'Teacher',
    descriptors: ['Adult', 'Woman'],
  }),
  transferStudent: new Character({
    id: '9013029e-0090-4626-bc57-a9af16237089',
    name: 'Transfer Student',
    descriptors: ['Student', 'Girl'],
  }),
  blackCat: new Character({
    id: '24f18137-6dce-4fad-9d05-fae4ac1b7c80',
    name: 'Black Cat',
    descriptors: ['Animal'],
  }),
  soldier: new Character({
    id: '8d6dbf47-5d90-4003-acd3-2f5905a081ad',
    name: 'Soldier',
    descriptors: ['Adult', 'Man'],
  }),
};

interface CharactersDatabase {
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
