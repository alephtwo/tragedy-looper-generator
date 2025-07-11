import { Expansion } from "./types/Expansion";
import * as TragedySets from "./TragedySets";
import { m } from "../paraglide/messages";

export const base: Expansion = {
  id: "cae500f1-1a81-425a-a7f9-fb6ecf8d0cf0",
  name: m["expansions.base"],
  tragedySets: [TragedySets.firstSteps, TragedySets.basicTragedy],
};

export const midnightCircle: Expansion = {
  id: "d7bcc813-ff48-4819-a574-7f0f73f7bf19",
  name: m["expansions.midnightCircle"],
  tragedySets: [TragedySets.midnightZone, TragedySets.mysteryCircle],
};

export const cosmicEvil: Expansion = {
  id: "32090b65-589d-49e5-8c17-6b3948481e6c",
  name: m["expansions.cosmicEvil"],
  tragedySets: [TragedySets.cosmicMythology, TragedySets.primeEvil],
};
