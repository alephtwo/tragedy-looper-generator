import * as _ from 'lodash';
import * as React from 'react';
import { Autocomplete } from '@mui/material';
import { TragedySet } from '../model/data/TragedySet';
import { TragedySets } from '../data/TragedySets';
import { renderAutocomplete } from './renderAutocomplete';
import { useTranslation } from 'react-i18next';

interface TragedySetPickerProps {
  value: TragedySet;
  onChange: (ts: TragedySet | null) => void;
}
export function TragedySetPicker(props: TragedySetPickerProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <Autocomplete
      value={props.value}
      options={_.values(TragedySets)}
      getOptionLabel={(ts) => t(ts.name_i18n_key)}
      onChange={(_, v) => props.onChange(v)}
      renderInput={renderAutocomplete}
    />
  );
}
