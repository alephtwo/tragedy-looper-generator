import * as _ from "radash";
import { Character } from "./types/Character";
import * as Locations from "../data/Locations";
import { m } from "../paraglide/messages";

// Base ////////////////////////////////////////////////////////////////////////
export const boyStudent = new Character({
  id: "03bdc526-2b8c-48f4-8d10-2d0bec80cfe7",
  name: m["characters.boyStudent"],
  descriptors: ["Student", "Boy"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.school,
});

export const girlStudent = new Character({
  id: "f98baaa1-02cf-44ad-845c-0842687327ad",
  name: m["characters.girlStudent"],
  descriptors: ["Student", "Girl"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.school,
});

export const richMansDaughter = new Character({
  id: "20fa968a-e6a2-4d03-8e28-ea198b937876",
  name: m["characters.richMansDaughter"],
  descriptors: ["Student", "Girl"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.school,
});

export const shrineMaiden = new Character({
  id: "5f04d536-ea15-4f70-860e-cdd46e40aa06",
  name: m["characters.shrineMaiden"],
  descriptors: ["Student", "Girl"],
  locations: [Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.shrine,
});

export const policeOfficer = new Character({
  id: "bd889efe-d461-4942-99d3-67c940877188",
  name: m["characters.policeOfficer"],
  descriptors: ["Adult", "Man"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.city,
});

export const officeWorker = new Character({
  id: "242612e4-9ae7-46e6-a7a5-091e99dc4971",
  name: m["characters.officeWorker"],
  descriptors: ["Adult", "Man"],
  locations: [Locations.city, Locations.hospital, Locations.shrine],
  startingLocation: Locations.city,
});

export const informer = new Character({
  id: "ee78422a-9d7e-47f2-8e02-463da8506681",
  name: m["characters.informer"],
  descriptors: ["Adult", "Woman"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.city,
});

export const doctor = new Character({
  id: "a531ecd0-4f76-46fb-aa2f-ee0900aaf92f",
  name: m["characters.doctor"],
  descriptors: ["Adult", "Man"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.hospital,
});

export const patient = new Character({
  id: "ae084c90-57e0-4e98-a4be-dec60d001ff4",
  name: m["characters.patient"],
  descriptors: ["Boy"],
  locations: [Locations.hospital],
  startingLocation: Locations.hospital,
});

export const classRep = new Character({
  id: "195959c6-edbd-44ee-869a-3cb99ba7f26c",
  name: m["characters.classRep"],
  descriptors: ["Student", "Girl"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.school,
});

export const mysteryBoy = new Character({
  id: "19c491fa-25a1-4f3d-9a1e-1f270acde3da",
  name: m["characters.mysteryBoy"],
  descriptors: ["Student", "Boy"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.school,
});

export const alien = new Character({
  id: "694bf4d2-32fd-43bc-89a2-39cd5f8d324c",
  name: m["characters.alien"],
  descriptors: ["Girl"],
  locations: [Locations.city, Locations.school, Locations.shrine],
  startingLocation: Locations.shrine,
});

export const godlyBeing = new Character({
  id: "f6b30162-4e8f-49f0-b51f-c8d27e111536",
  name: m["characters.godlyBeing"],
  descriptors: ["Man", "Woman"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.shrine,
  entersOnLoop: (loops: number) => _.random(2, loops),
});

export const popIdol = new Character({
  id: "8d6ee9a7-6753-4abe-8444-13098820f516",
  name: m["characters.popIdol"],
  descriptors: ["Student", "Girl"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.city,
});

export const journalist = new Character({
  id: "2df000cd-291a-4fa3-96a6-ea4296963eb8",
  name: m["characters.journalist"],
  descriptors: ["Student", "Girl"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.city,
});

export const boss = new Character({
  id: "0d972867-d2ba-44ff-99c3-5f27104d8d0c",
  name: m["characters.boss"],
  descriptors: ["Adult", "Man"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.city,
});

export const nurse = new Character({
  id: "9523b936-7808-4aca-a483-fbe2211c5e27",
  name: m["characters.nurse"],
  descriptors: ["Adult", "Woman"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.hospital,
});

export const henchman = new Character({
  id: "88adda6a-3b1f-4a4f-98f8-fbf7c0b7869f",
  name: m["characters.henchman"],
  descriptors: ["Adult", "Man"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.chooseEveryLoop,
});

// Midnight Circle /////////////////////////////////////////////////////////////
export const scientist = new Character({
  id: "493add42-b106-4923-90fc-10a04dcd2982",
  name: m["characters.scientist"],
  descriptors: ["Adult", "Man"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.hospital,
});

export const forensicSpecialist = new Character({
  id: "e76226d7-891a-4e24-86af-968d33531ad6",
  name: m["characters.forensicSpecialist"],
  descriptors: ["Adult", "Man"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.city,
});

export const ai = new Character({
  id: "cba684aa-e460-4504-8933-cf76ce071982",
  name: m["characters.ai"],
  descriptors: ["Construct"],
  locations: [Locations.city],
  startingLocation: Locations.city,
});

export const illusion = new Character({
  id: "dabdcbaf-bcc1-4725-82dd-8ea0cceb081e",
  name: m["characters.illusion"],
  descriptors: ["Fabrication", "Woman"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.shrine,
});

// Cosmic Evil /////////////////////////////////////////////////////////////////
export const teacher = new Character({
  id: "6cb9abde-9d38-4c03-9add-4a561ac8b954",
  name: m["characters.teacher"],
  descriptors: ["Adult", "Woman"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.school,
});

export const transferStudent = new Character({
  id: "9013029e-0090-4626-bc57-a9af16237089",
  name: m["characters.transferStudent"],
  descriptors: ["Student", "Girl"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.school,
});

export const blackCat = new Character({
  id: "24f18137-6dce-4fad-9d05-fae4ac1b7c80",
  name: m["characters.blackCat"],
  descriptors: ["Animal"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.shrine,
});

export const soldier = new Character({
  id: "8d6dbf47-5d90-4003-acd3-2f5905a081ad",
  name: m["characters.soldier"],
  descriptors: ["Adult", "Man"],
  locations: [Locations.city, Locations.hospital, Locations.school, Locations.shrine],
  startingLocation: Locations.hospital,
});
