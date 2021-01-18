import { TragedySetInfo } from '../types/TragedySetInfo';
import * as Cast from './Cast';
import { MainPlots, Subplots } from './Plots';

export const TragedySets: Array<TragedySetInfo> = [
  {
    id: '7697db7b-c587-4978-8230-4e6886115a30',
    title: 'First Steps',
    order: 0,
    availableCast: Cast.BaseCast,
    mainPlots: [MainPlots.murderPlan, MainPlots.lightOfTheAvenger, MainPlots.aPlaceToProtect],
    subplots: [Subplots.shadowOfTheRipper, Subplots.anUnsettlingRumor, Subplots.aHideousScript],
  },
  {
    id: 'bb074b59-e991-4a21-868d-d815acb85a05',
    title: 'Basic Tragedy',
    order: 1,
    availableCast: Cast.BaseCast,
    mainPlots: [
      MainPlots.murderPlan,
      MainPlots.theSealedItem,
      MainPlots.signWithMe,
      MainPlots.changeOfFuture,
      MainPlots.giantTimeBomb,
    ],
    subplots: [
      Subplots.circleOfFriends,
      Subplots.aLoveAffair,
      Subplots.theHiddenFreak,
      Subplots.anUnsettlingRumor,
      Subplots.paranoiaVirus,
      Subplots.threadsOfFate,
      Subplots.unknownFactorX,
    ],
  },
  {
    id: '6914b065-5b4e-4bca-b79b-323fbc990274',
    title: 'Midnight Zone',
    order: 2,
    availableCast: Cast.MidnightCircleCast,
    mainPlots: [],
    subplots: [],
  },
  {
    id: '133a909a-c0ac-4155-9d5c-d4903bc3e42e',
    title: 'Mystery Circle',
    order: 3,
    availableCast: Cast.MidnightCircleCast,
    mainPlots: [],
    subplots: [],
  },
  {
    id: 'b0790ed6-6e5d-4e29-b441-a412d0ffbcb5',
    title: 'Prime Evil',
    order: 4,
    availableCast: Cast.CosmicEvilCast,
    mainPlots: [],
    subplots: [],
  },
  {
    id: '8f5efcb6-1251-4e2c-b82a-763f69e8df75',
    title: 'Cosmic Mythology',
    order: 5,
    availableCast: Cast.CosmicEvilCast,
    mainPlots: [],
    subplots: [],
  },
];
