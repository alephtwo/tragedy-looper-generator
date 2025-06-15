import { Expansion } from "./types/Expansion";
import { TragedySets } from "./TragedySets";

export const Expansions: Record<ExpansionKey, Expansion> = {
  base: {
    id: "cae500f1-1a81-425a-a7f9-fb6ecf8d0cf0",
    name_i18n_key: "expansions.base",
    tragedySets: [TragedySets.firstSteps, TragedySets.basicTragedy],
  },
  midnightCircle: {
    id: "d7bcc813-ff48-4819-a574-7f0f73f7bf19",
    name_i18n_key: "expansions.midnightCircle",
    tragedySets: [TragedySets.midnightZone, TragedySets.mysteryCircle],
  },
  cosmicEvil: {
    id: "32090b65-589d-49e5-8c17-6b3948481e6c",
    name_i18n_key: "expansions.cosmicEvil",
    tragedySets: [TragedySets.cosmicMythology, TragedySets.primeEvil],
  },
};

type ExpansionKey = "base" | "midnightCircle" | "cosmicEvil";
