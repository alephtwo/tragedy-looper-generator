import { CheatsheetState } from '../types/CheatsheetState';
import produce from 'immer';
import { TragedySets } from '../data/TragedySets';
import { Plot } from '../types/Plot';
import * as uuid from 'uuid';
import { CheatsheetCastRow } from '../types/CheatsheetCastRow';
import { TragedySetInfo } from '../types/TragedySetInfo';
import { Role } from '../types/Role';
import { Character } from '../types/Character';

export type CheatsheetMessage =
  | { type: 'update-tragedy-set'; tragedySet: TragedySetInfo | null }
  | { type: 'update-main-plot'; plot: Plot | null }
  | { type: 'update-subplots'; subplots: Array<Plot> }
  | { type: 'add-cast-member' }
  | { type: 'remove-cast-member'; id: string }
  | { type: 'update-cast-character'; id: string; character?: Character }
  | { type: 'update-cast-role'; id: string; role?: Role };

export function reducer(state: CheatsheetState, action: CheatsheetMessage): CheatsheetState {
  switch (action.type) {
    case 'update-tragedy-set':
      return updateTragedySet(state, action.tragedySet);
    case 'update-main-plot':
      return updateMainPlot(state, action.plot);
    case 'update-subplots':
      return updateSubplots(state, action.subplots);
    case 'add-cast-member':
      return addCastMember(state);
    case 'remove-cast-member':
      return removeCastMember(state, action.id);
    case 'update-cast-character':
      return updateCastCharacter(state, action.id, action.character);
    case 'update-cast-role':
      return updateCastRole(state, action.id, action.role);
    default:
      return state;
  }
}

function updateTragedySet(state: CheatsheetState, tragedySet: TragedySetInfo | null): CheatsheetState {
  return produce(state, (next) => {
    const chosen = tragedySet || TragedySets[0];
    next.tragedySet = chosen;
    next.mainPlot = chosen.mainPlots[0];
    next.subplots = [];
  });
}

function updateMainPlot(state: CheatsheetState, plot: Plot | null): CheatsheetState {
  return produce(state, (next) => {
    next.mainPlot = plot || state.tragedySet.mainPlots[0];
  });
}

function updateSubplots(state: CheatsheetState, subplots: Array<Plot>): CheatsheetState {
  return produce(state, (next) => {
    // Only allow two selections at max, and pick the last two in the list if there are more
    next.subplots = subplots.slice(-2);
  });
}

function addCastMember(state: CheatsheetState): CheatsheetState {
  return produce(state, (next) => {
    next.cast = state.cast.concat({
      id: uuid.v4(),
    });
  });
}

function removeCastMember(state: CheatsheetState, id: string): CheatsheetState {
  return produce(state, (next) => {
    next.cast = state.cast.filter((c) => c.id !== id);
  });
}

function updateCastCharacter(state: CheatsheetState, id: string, character?: Character): CheatsheetState {
  return produce(state, (next) => {
    // this might break but who cares
    const row = next.cast.find((c) => c.id === id) as CheatsheetCastRow;
    row.character = character;
  });
}

function updateCastRole(state: CheatsheetState, id: string, role?: Role): CheatsheetState {
  return produce(state, (next) => {
    // this also might break but who cares
    const row = next.cast.find((c) => c.id === id) as CheatsheetCastRow;
    row.role = role;
  });
}
