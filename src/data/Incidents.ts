import * as _ from 'lodash';
import { Incident } from '../types/data/Incident';

export const Incidents: IncidentsDatabase = {
  murder: {
    id: '4b50bb64-da08-448b-81ad-ad7765cf0e7d',
    name: 'Murder',
    effect: "One (1) other character in culprit's location dies.",
  },
  increasingUnease: {
    id: 'b61caaa1-a961-4c10-af3e-122c1321a8ab',
    name: 'Increasing Unease',
    effect: 'Place 2 Paranoia on any character, and 1 Intrigue on another.\nPlace 2 Intrigue on the Shrine.',
  },
  suicide: {
    id: '71e53334-02be-44e2-b33e-2126739b6310',
    name: 'Suicide',
    effect: 'The culprit dies.',
  },
  hospitalIncident: {
    id: '2d4300de-801e-4436-9df6-20f8e3cebc4c',
    name: 'Hospital Incident',
    effect:
      'If at least 1 Intrigue on Hospital: Everyone in Hospital dies.\nIf at least 2 Intrigue on Hospital, Protagonists die.',
  },
  farawayMurder: {
    id: '6fa6c79b-10ad-4e1a-87b9-a016234ce5bc',
    name: 'Faraway Murder',
    effect: 'One character with at least 2 Intrigue dies.',
  },
  missingPerson: {
    id: 'cd323450-6486-47c8-997d-e3bfbb75469e',
    name: 'Missing Person',
    effect: 'Move culprit to any location. Put 1 Intrigue on that location.',
  },
  spreading: {
    id: '573fcf57-fc62-4a2e-96a0-49862082ff53',
    name: 'Spreading',
    effect: 'Move 2 Goodwill from any character to any other character.',
  },
  foulEvil: {
    id: '6cfbbac5-14c1-4082-a651-2786aac17b17',
    name: 'Foul Evil',
    effect: 'Place 2 Intrigue on the Shrine.',
  },
  butterflyEffect: {
    id: '02068221-5e2e-407e-ba77-e5dbe7f31704',
    name: 'Butterfly Effect',
    effect: "Put any counter on any character in culprit's location.",
  },
  conspiracies: {
    id: '6a0b35d7-2d04-4112-80b2-4c0fccf93580',
    name: 'Conspiracies',
    effect:
      '[Check Intrigue instead of Paranoia to trigger incident.] Resolve either a "Serial Murder" or "Missing Person" incident.',
  },
  uproar: {
    id: 'c6faf464-6f7d-4028-b563-037b2c1364bf',
    name: 'Uproar',
    effect:
      'If there is at least 1 Intrigue on the School: Everyone in the School dies.\nIf there is at least 1 Intrigue on the City, everyone in the City dies.',
  },
  fakeIncident: {
    id: 'ed52f5dc-0100-4394-869c-e5d08cced458',
    name: 'Fake Incident',
    effect: "If there are at least 2 Intrigue on the culprit's starting location, the Protagonists die.",
    fake: (incidents: Array<Incident>) => {
      const candidates = incidents.filter((i) => i.id !== Incidents.fakeIncident.id);
      return _.sample(candidates) as Incident;
    },
  },
  breakthrough: {
    id: '40558603-fb7c-4bb8-9abd-1900c66f391b',
    name: 'Breakthrough',
    effect: 'The Protagonist Leader chooses one location or character, and removes 2 Intrigue from there.',
  },
  fakedSuicide: {
    id: 'b23a6923-b3da-49ae-acab-95bd9529c345',
    name: 'Faked Suicide',
    effect:
      'Place an Extra card on the culprit. During the remainder of the loop, the Protagonists may not play any cards on character(s) with Extra cards.',
  },
  confession: {
    id: '6623e61f-8de9-4018-a14f-4b9ab7353f3a',
    name: 'Confession',
    effect: "Reveal the culprit and the culprit's role.",
  },
  portent: {
    id: '94060d4e-35c8-4623-94e9-a3c8521c73d8',
    name: 'Portent',
    effect:
      "[When determining whether this incident triggers or not, treat the culprit's Paranoia limit as 1 less than its printed limit.] Place 1 Paranoia on any character in the culprit's location.",
  },
  terrorism: {
    id: 'fc992060-f708-429a-9c20-6df09648e908',
    name: 'Terrorism',
    effect:
      'If at least 1 Intrigue on the City: Everyone in the City dies.\nIf at least 2 Intrigue on the City: The Protagonists die.',
  },
  bestialMurder: {
    id: '3394cc8e-3c63-4c51-8312-696323d7bd5a',
    name: 'Bestial Murder',
    effect: `[When determining whether this Incident triggers or not, treat the culprit's Paranoia limit as 1 more than its printed limit.] Resolve "Serial Murder" and "Increasing Unease" in that order. Then increase the Extra Gauge by 1 more step.`,
  },
  aSuspiciousLetter: {
    id: '96651be0-dd7c-40e2-805c-a1598500f17f',
    name: 'A Suspicious Letter',
    effect:
      "Move any character in the culprit's location to any location. If the character actually changed location, the character cannot be moved the next day.",
  },
  closedCircle: {
    id: '6979e69f-c9a7-4178-8a92-26a2948aabad',
    name: 'Closed Circle',
    effect:
      "Reveal the culprit's location. For 3 days, including the day the Incident occurred, any movement to or from that location is nullified.",
  },
  theSilverBullet: {
    id: '6d8cc913-c92f-40d8-9bc9-6a386f05621e',
    name: 'The Silver Bullet',
    effect:
      'The loop ends after this Incident step (resuliting in a Protagonist victory unless any loss condition is fulfilled). This incident does not increase the Extra Gauge.',
  },
  sacrilegiousMurder: {
    id: '89e4b54c-d76a-47e7-8894-c15b6771a5f5',
    name: 'Sacrilegious Murder',
    effect:
      "Either kill another character in the same location as the culprit, or place an Intrigue on the culprit's location.",
  },
  theExecutioner: {
    id: 'bcfee304-9320-4cd2-aadc-92fe1f4576de',
    name: 'The Executioner',
    effect: 'The leader chooses on character. That character is killed.',
  },
  darkRumor: {
    id: 'a04bd2be-c382-4675-8a3d-3cc567abb2f6',
    name: 'Dark Rumor',
    effect: 'Attach a Curse on the culprit.',
  },
  barricade: {
    id: '99efead4-810f-467d-bbee-b38610b04e0c',
    name: 'Barricade',
    effect: "For each other character in the culprit's location, pick any other location and move the character there.",
  },
  evilContamination: {
    id: 'b0893845-d541-46bd-baff-0d7b22f48eb8',
    name: 'Evil Contamination',
    effect: 'Place 2 Intrigue on the Shrine.',
  },
  nightOfMadness: {
    id: '02c5d388-0cb4-458e-ad67-03c132917056',
    name: 'Night of Madness',
    effect:
      '[Mob incident: 0 (will always occur)] If there are 6 or more zombies when this Incident occurs, the Protagonists will die after the day has ended.',
  },
  awakenedCurse: {
    id: 'bbeb6df0-cdd9-4919-aa29-9defd3e1d603',
    name: 'Awakened Curse',
    effect: "[Mob incident: 1] Place a Curse on the culprit's location.",
  },
  evangeliumOfTheDead: {
    id: '3d2e0649-dd64-483f-8535-c7b2bc4fe954',
    name: 'Evangelium of the Dead',
    effect:
      "[Mob incident: 2] Kill all characters in the culprit's location. Then, if that location has 5 or more corpses, the Protagonists are killed.",
  },
  fountainOfFilth: {
    id: '444b1aa1-b4e4-4530-8d8d-858b088ef928',
    name: 'Fountain of Filth',
    effect: '[Mob incident: 2] Place 2 Paranoia on any one character, and an Intrigue on any location.',
  },
  insaneMurder: {
    id: '6dc9d495-6dcb-4aed-8e30-8c3aa0470984',
    name: 'Insane Murder',
    effect: 'Kill any one character in the same location as the culprit.',
  },
  massSuicide: {
    id: '64759797-4d00-46d2-b43e-1f3bff993a7e',
    name: 'Mass Suicide',
    effect: "If the culprit has at least 1 Intrigue, all characters in the culprit's location are killed.",
  },
  fireOfDemise: {
    id: '882c2aa2-3c56-4d9f-8810-3763c3eb6111',
    name: 'Fire of Demise',
    effect: 'The first time this incident happens this game session, all characters and the Protagonists are killed.',
  },
  houndDogScent: {
    id: '87d18693-1678-46ea-90bd-2b2fa807853b',
    name: 'Hound Dog Scent',
    effect:
      'When determining whether this incident occurs or not, count Intrigue instead of Paranoia.\nFor the rest of the loop, if another Incident occurs, the Protagonists are killed after the Incident step.',
  },
  discovery: {
    id: 'dfdb1988-7d95-4553-94c4-1da003166cba',
    name: 'Discovery',
    effect: 'Increase the Extra Gauge 1 step.',
  },
  serialMurder: {
    id: 'deab4fbd-de29-4b26-9292-ca7f5e8c060b',
    name: 'Serial Murder',
    effect: "One other character in the culprit's location dies.",
  },
};

interface IncidentsDatabase {
  murder: Incident;
  increasingUnease: Incident;
  suicide: Incident;
  hospitalIncident: Incident;
  farawayMurder: Incident;
  missingPerson: Incident;
  spreading: Incident;
  foulEvil: Incident;
  butterflyEffect: Incident;
  conspiracies: Incident;
  uproar: Incident;
  fakeIncident: Incident;
  breakthrough: Incident;
  fakedSuicide: Incident;
  confession: Incident;
  portent: Incident;
  terrorism: Incident;
  bestialMurder: Incident;
  aSuspiciousLetter: Incident;
  closedCircle: Incident;
  theSilverBullet: Incident;
  sacrilegiousMurder: Incident;
  theExecutioner: Incident;
  darkRumor: Incident;
  barricade: Incident;
  evilContamination: Incident;
  nightOfMadness: Incident;
  awakenedCurse: Incident;
  evangeliumOfTheDead: Incident;
  fountainOfFilth: Incident;
  insaneMurder: Incident;
  massSuicide: Incident;
  fireOfDemise: Incident;
  houndDogScent: Incident;
  discovery: Incident;
  serialMurder: Incident;
}
