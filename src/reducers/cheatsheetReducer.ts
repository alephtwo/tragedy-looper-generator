import { CheatsheetState } from '../types/CheatsheetState';
import produce from 'immer';
import { TragedySets } from '../data/TragedySets';
import { Plot } from '../types/Plot';
import * as uuid from 'uuid';
import { CheatsheetCastRow } from '../types/CheatsheetCastRow';
import _ = require('lodash');
import { AllCharacters } from '../data/Characters';
import { Roles } from '../data/Roles';

export type CheatsheetMessage =
  | { type: 'update-tragedy-set'; id: string }
  | { type: 'update-main-plot'; id: string }
  | { type: 'update-subplots'; ids: Array<string> }
  | { type: 'add-cast-member' }
  | { type: 'remove-cast-member'; id: string }
  | { type: 'update-cast-character'; id: string; characterId: string }
  | { type: 'update-cast-role'; id: string; roleId: string };

export function reducer(state: CheatsheetState, action: CheatsheetMessage): CheatsheetState {
  switch (action.type) {
    case 'update-tragedy-set':
      return updateTragedySet(state, action.id);
    case 'update-main-plot':
      return updateMainPlot(state, action.id);
    case 'update-subplots':
      return updateSubplots(state, action.ids);
    case 'add-cast-member':
      return addCastMember(state);
    case 'remove-cast-member':
      return removeCastMember(state, action.id);
    case 'update-cast-character':
      return updateCastCharacter(state, action.id, action.characterId);
    case 'update-cast-role':
      return updateCastRole(state, action.id, action.roleId);
    default:
      return state;
  }
}

function updateTragedySet(state: CheatsheetState, id: string): CheatsheetState {
  return produce(state, (next) => {
    const chosen = TragedySets.find((ts) => ts.id === id);
    if (chosen === undefined) {
      console.error('Something went wrong: assuming default Tragedy Set');
    }

    const tragedySet = chosen || TragedySets[0];
    next.tragedySet = tragedySet;
    next.mainPlot = tragedySet.mainPlots[0];
    next.subplots = [];
  });
}

function updateMainPlot(state: CheatsheetState, id: string): CheatsheetState {
  const mainPlots = state.tragedySet.mainPlots;
  return produce(state, (next) => {
    const chosen = mainPlots.find((mp) => mp.id === id);
    if (chosen === undefined) {
      console.error('Something went wrong: assuming first Main Plot');
    }
    next.mainPlot = chosen || state.tragedySet.mainPlots[0];
  });
}

function updateSubplots(state: CheatsheetState, ids: Array<string>): CheatsheetState {
  return produce(state, (next) => {
    next.subplots = ids
      // Only allow two selections at max, and pick the last two in the list if there are more
      .slice(-2)
      .map((id) => state.tragedySet.subplots.find((sp) => sp.id === id))
      .filter((sp) => sp !== undefined) as Array<Plot>;
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

function updateCastCharacter(state: CheatsheetState, id: string, characterId: string): CheatsheetState {
  return produce(state, (next) => {
    const row = next.cast.find((c) => c.id === id) as CheatsheetCastRow; // this might break but who cares
    row.character = _.values(AllCharacters).find((c) => c.id === characterId);
  });
}

function updateCastRole(state: CheatsheetState, id: string, roleId: string): CheatsheetState {
  return produce(state, (next) => {
    const row = next.cast.find((c) => c.id === id) as CheatsheetCastRow; // this also might break but who cares
    row.role = _.values(Roles).find((r) => r.id === roleId);
  });
}
