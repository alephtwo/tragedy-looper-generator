import { Trigger } from "./types/Trigger";

export const always: Trigger = {
  id: "b888d71a-f98a-4b15-861e-330201a95b2a",
  description_i18n_key: "triggers.always",
  order: 1,
};

export const loopStart: Trigger = {
  id: "77a61259-46e8-4bf3-94d7-2dadc5a17eb6",
  description_i18n_key: "triggers.loopStart",
  order: 2,
};

export const cardResolve: Trigger = {
  id: "d29f5068-4b8a-4db4-86eb-c4214b357c13",
  description_i18n_key: "triggers.cardResolve",
  order: 3,
};

export const goodwillAbilityStep: Trigger = {
  id: "9543f774-fc58-43e7-be18-68fe5136a405",
  description_i18n_key: "triggers.goodwillAbilityStep",
  order: 4,
};

export const incidentStep: Trigger = {
  id: "be01dbb6-e2a9-43fe-98ef-7504cfb61571",
  description_i18n_key: "triggers.incidentStep",
  order: 5,
};

export const dayEnd: Trigger = {
  id: "b1c0e43b-d2c3-49b4-af4a-421fdc7c6e2d",
  description_i18n_key: "triggers.dayEnd",
  order: 6,
};

export const dayEndLastDay: Trigger = {
  id: "a0027065-b99d-4905-842c-ebf7a3d366d0",
  description_i18n_key: "triggers.dayEndLastDay",
  order: 7,
};

export const loopEnd: Trigger = {
  id: "5de5b0fa-a677-49f7-b6b5-462e798fde44",
  description_i18n_key: "triggers.loopEnd",
  order: 8,
};

export const whenRoleIsRevealed: Trigger = {
  id: "af7df738-0ed9-4005-97a2-36a63e16a7a2",
  description_i18n_key: "triggers.whenThisRoleIsToBeRevealed",
  order: 9,
};

export const whenCharacterDies: Trigger = {
  id: "83cbf220-bd2a-49f2-b220-4ca6d03b0508",
  description_i18n_key: "triggers.whenCharacterDies",
  order: 10,
};

export const whenLoverDies: Trigger = {
  id: "dca09eaf-9d69-47e2-81b5-5af5f87798d4",
  description_i18n_key: "triggers.whenTheLoverDies",
  order: 11,
};

export const whenLovedOneDies: Trigger = {
  id: "da4a1684-6d06-4142-85de-3ef496637b5f",
  description_i18n_key: "triggers.whenTheLovedOneDies",
  order: 12,
};

export const beforeFinalGuess: Trigger = {
  id: "260de34a-d1ba-4be4-a60b-ff557f4eb720",
  description_i18n_key: "triggers.beforeFinalGuess",
  order: 13,
};
