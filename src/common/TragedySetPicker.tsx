import * as _ from 'lodash';
import * as React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TragedySet } from '../types/data/TragedySet';
import { TragedySets } from '../data/TragedySets';
import { renderAutocomplete } from './renderAutocomplete';

interface TragedySetPickerProps {
  value: TragedySet;
  onChange: (ts: TragedySet | null) => void;
}
export function TragedySetPicker(props: TragedySetPickerProps): JSX.Element {
  return (
    <Autocomplete
      value={props.value}
      options={_.values(TragedySets)}
      getOptionLabel={(ts) => ts.name}
      onChange={(_, v) => props.onChange(v)}
      renderInput={renderAutocomplete}
    />
  );
}
