import { Character } from "../types/Character";

export const FullCast: Record<string, Character> = {
  // Base Game
  boyStudent: {},
  girlStudent: {},
  richMansDaughter: {},
  shrineMaiden: {},
  policeOfficer: {},
  officeWorker: {},
  informer: {},
  doctor: {},
  patient: {},
  classRep: {},
  mysteryBoy: {},
  alien: {},
  godlyBeing: {},
  popIdol: {},
  journalist: {},
  boss: {},
  nurse: {},
  henchman: {},
  // Midnight Circle
  scientist: {},
  forensicSpecialist: {},
  ai: {},
  illusion: {},
  // Cosmic Evil
  teacher: {},
  transferStudent: {},
  blackCat: {},
  soldier: {},
}

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
  FullCast.henchman
]