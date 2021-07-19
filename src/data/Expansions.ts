import { Expansion } from '../types/data/Expansion';
import { TragedySets } from './TragedySets';

export const Expansions: ExpansionsDatabase = {
  base: {
    id: 'cae500f1-1a81-425a-a7f9-fb6ecf8d0cf0',
    name: 'Base',
    tragedySets: [TragedySets.firstSteps, TragedySets.basicTragedy],
  },
  midnightCircle: {
    id: 'd7bcc813-ff48-4819-a574-7f0f73f7bf19',
    name: 'Midnight Circle',
    tragedySets: [TragedySets.midnightZone, TragedySets.mysteryCircle],
  },
  cosmicEvil: {
    id: '32090b65-589d-49e5-8c17-6b3948481e6c',
    name: 'Cosmic Evil',
    tragedySets: [TragedySets.cosmicMythology, TragedySets.primeEvil],
  },
};

interface ExpansionsDatabase {
  base: Expansion;
  midnightCircle: Expansion;
  cosmicEvil: Expansion;
}
