import * as React from 'react';
import { AutocompleteRenderInputParams } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

export function renderAutocomplete(params: AutocompleteRenderInputParams): JSX.Element {
  return <TextField {...params} size="small" variant="outlined" />;
}
