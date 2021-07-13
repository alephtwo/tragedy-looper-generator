import * as React from 'react';
import { useReducer } from 'react';
import { CheatsheetState } from '../../types/CheatsheetState';
import { Arguments } from './Arguments';
import { CheatsheetView } from './CheatsheetView';
import { TragedySets } from '../../data/TragedySets';
import { reducer } from '../../reducers/cheatsheetReducer';

const initialState: CheatsheetState = {
  tragedySet: TragedySets[0],
  mainPlot: TragedySets[0].mainPlots[0],
  subplots: [],
  cast: [],
};

export function Cheatsheet(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Arguments state={state} dispatch={dispatch} />
      <CheatsheetView state={state} />
    </>
  );
}
