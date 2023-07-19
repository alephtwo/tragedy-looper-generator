import { Incident } from '../model/data/Incident';

export const Incidents: IncidentsDatabase = {
  murder: {
    id: '4b50bb64-da08-448b-81ad-ad7765cf0e7d',
    name_i18n_key: 'incidents.murder.name',
    effect_i18n_key: 'incidents.murder.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  increasingUnease: {
    id: 'b61caaa1-a961-4c10-af3e-122c1321a8ab',
    name_i18n_key: 'incidents.increasingUnease.name',
    effect_i18n_key: 'incidents.increasingUnease.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  suicide: {
    id: '71e53334-02be-44e2-b33e-2126739b6310',
    name_i18n_key: 'incidents.suicide.name',
    effect_i18n_key: 'incidents.suicide.effect',
    loopEstimate: 0.2,
    winCondition: false,
  },
  hospitalIncident: {
    id: '2d4300de-801e-4436-9df6-20f8e3cebc4c',
    name_i18n_key: 'incidents.hospitalIncident.name',
    effect_i18n_key: 'incidents.hospitalIncident.effect',
    loopEstimate: 0.4,
    winCondition: true,
  },
  farawayMurder: {
    id: '6fa6c79b-10ad-4e1a-87b9-a016234ce5bc',
    name_i18n_key: 'incidents.farawayMurder.name',
    effect_i18n_key: 'incidents.farawayMurder.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  missingPerson: {
    id: 'cd323450-6486-47c8-997d-e3bfbb75469e',
    name_i18n_key: 'incidents.missingPerson.name',
    effect_i18n_key: 'incidents.missingPerson.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  spreading: {
    id: '573fcf57-fc62-4a2e-96a0-49862082ff53',
    name_i18n_key: 'incidents.spreading.name',
    effect_i18n_key: 'incidents.spreading.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  foulEvil: {
    id: '6cfbbac5-14c1-4082-a651-2786aac17b17',
    name_i18n_key: 'incidents.foulEvil.name',
    effect_i18n_key: 'incidents.foulEvil.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  butterflyEffect: {
    id: '02068221-5e2e-407e-ba77-e5dbe7f31704',
    name_i18n_key: 'incidents.butterflyEffect.name',
    effect_i18n_key: 'incidents.butterflyEffect.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  conspiracies: {
    id: '6a0b35d7-2d04-4112-80b2-4c0fccf93580',
    name_i18n_key: 'incidents.conspiracies.name',
    effect_i18n_key: 'incidents.conspiracies.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  uproar: {
    id: 'c6faf464-6f7d-4028-b563-037b2c1364bf',
    name_i18n_key: 'incidents.uproar.name',
    effect_i18n_key: 'incidents.uproar.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  fakeIncident: {
    id: 'ed52f5dc-0100-4394-869c-e5d08cced458',
    name_i18n_key: 'incidents.fakeIncident.name',
    effect_i18n_key: 'incidents.fakeIncident.effect',
    loopEstimate: 0.5,
    winCondition: true,
  },
  breakthrough: {
    id: '40558603-fb7c-4bb8-9abd-1900c66f391b',
    name_i18n_key: 'incidents.breakthrough.name',
    effect_i18n_key: 'incidents.breakthrough.effect',
    loopEstimate: -0.2,
    winCondition: false,
  },
  fakedSuicide: {
    id: 'b23a6923-b3da-49ae-acab-95bd9529c345',
    name_i18n_key: 'incidents.fakedSuicide.name',
    effect_i18n_key: 'incidents.fakedSuicide.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  confession: {
    id: '6623e61f-8de9-4018-a14f-4b9ab7353f3a',
    name_i18n_key: 'incidents.confession.name',
    effect_i18n_key: 'incidents.confession.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  portent: {
    id: '94060d4e-35c8-4623-94e9-a3c8521c73d8',
    name_i18n_key: 'incidents.portent.name',
    effect_i18n_key: 'incidents.portent.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  terrorism: {
    id: 'fc992060-f708-429a-9c20-6df09648e908',
    name_i18n_key: 'incidents.terrorism.name',
    effect_i18n_key: 'incidents.terrorism.effect',
    loopEstimate: 4,
    winCondition: true,
  },
  bestialMurder: {
    id: '3394cc8e-3c63-4c51-8312-696323d7bd5a',
    name_i18n_key: 'incidents.bestialMurder.name',
    effect_i18n_key: `incidents.bestialMurder.effect`,
    loopEstimate: 0,
    winCondition: false,
  },
  aSuspiciousLetter: {
    id: '96651be0-dd7c-40e2-805c-a1598500f17f',
    name_i18n_key: 'incidents.aSuspiciousLetter.name',
    effect_i18n_key: 'incidents.aSuspiciousLetter.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  closedCircle: {
    id: '6979e69f-c9a7-4178-8a92-26a2948aabad',
    name_i18n_key: 'incidents.closedCircle.name',
    effect_i18n_key: 'incidents.closedCircle.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  theSilverBullet: {
    id: '6d8cc913-c92f-40d8-9bc9-6a386f05621e',
    name_i18n_key: 'incidents.theSilverBullet.name',
    effect_i18n_key: 'incidents.theSilverBullet.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  sacrilegiousMurder: {
    id: '89e4b54c-d76a-47e7-8894-c15b6771a5f5',
    name_i18n_key: 'incidents.sacrilegiousMurder.name',
    effect_i18n_key: 'incidents.sacrilegiousMurder.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  theExecutioner: {
    id: 'bcfee304-9320-4cd2-aadc-92fe1f4576de',
    name_i18n_key: 'incidents.theExecutioner.name',
    effect_i18n_key: 'incidents.theExecutioner.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  darkRumor: {
    id: 'a04bd2be-c382-4675-8a3d-3cc567abb2f6',
    name_i18n_key: 'incidents.darkRumor.name',
    effect_i18n_key: 'incidents.darkRumor.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  barricade: {
    id: '99efead4-810f-467d-bbee-b38610b04e0c',
    name_i18n_key: 'incidents.barricade.name',
    effect_i18n_key: 'incidents.barricade.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  evilContamination: {
    id: 'b0893845-d541-46bd-baff-0d7b22f48eb8',
    name_i18n_key: 'incidents.evilContamination.name',
    effect_i18n_key: 'incidents.evilContamination.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  nightOfMadness: {
    id: '02c5d388-0cb4-458e-ad67-03c132917056',
    name_i18n_key: 'incidents.nightOfMadness.name',
    effect_i18n_key: 'incidents.nightOfMadness.effect',
    loopEstimate: 0.2,
    winCondition: true,
  },
  awakenedCurse: {
    id: 'bbeb6df0-cdd9-4919-aa29-9defd3e1d603',
    name_i18n_key: 'incidents.awakenedCurse.name',
    effect_i18n_key: 'incidents.awakenedCurse.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  evangeliumOfTheDead: {
    id: '3d2e0649-dd64-483f-8535-c7b2bc4fe954',
    name_i18n_key: 'incidents.evangeliumOfTheDead.name',
    effect_i18n_key: 'incidents.evangeliumOfTheDead.effect',
    loopEstimate: 0.6,
    winCondition: true,
  },
  fountainOfFilth: {
    id: '444b1aa1-b4e4-4530-8d8d-858b088ef928',
    name_i18n_key: 'incidents.fountainOfFilth.name',
    effect_i18n_key: 'incidents.fountainOfFilth.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  insaneMurder: {
    id: '6dc9d495-6dcb-4aed-8e30-8c3aa0470984',
    name_i18n_key: 'incidents.insaneMurder.name',
    effect_i18n_key: 'incidents.insaneMurder.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  massSuicide: {
    id: '64759797-4d00-46d2-b43e-1f3bff993a7e',
    name_i18n_key: 'incidents.massSuicide.name',
    effect_i18n_key: 'incidents.massSuicide.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  fireOfDemise: {
    id: '882c2aa2-3c56-4d9f-8810-3763c3eb6111',
    name_i18n_key: 'incidents.fireOfDemise.name',
    effect_i18n_key: 'incidents.fireOfDemise.effect',
    loopEstimate: 0.4,
    winCondition: true,
  },
  houndDogScent: {
    id: '87d18693-1678-46ea-90bd-2b2fa807853b',
    name_i18n_key: 'incidents.houndDogScent.name',
    effect_i18n_key: 'incidents.houndDogScent.effect',
    loopEstimate: 0,
    winCondition: true,
  },
  discovery: {
    id: 'dfdb1988-7d95-4553-94c4-1da003166cba',
    name_i18n_key: 'incidents.discovery.name',
    effect_i18n_key: 'incidents.discovery.effect',
    loopEstimate: 0,
    winCondition: false,
  },
  serialMurder: {
    id: 'deab4fbd-de29-4b26-9292-ca7f5e8c060b',
    name_i18n_key: 'incidents.serialMurder.name',
    effect_i18n_key: 'incidents.serialMurder.effect',
    loopEstimate: 0,
    winCondition: false,
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
