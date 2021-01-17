import * as BaseGame from '../expansions/BaseGame';

export interface Tragedy {
  mainPlot: null | MainPlot;
  subplots: Subplot[];
  castMembers: CastMember[];
}

type MainPlot = BaseGame.MainPlot;
type Subplot = BaseGame.Subplot;
type CastMember = BaseGame.CastMember;
