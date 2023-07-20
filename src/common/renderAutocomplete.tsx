import * as React from "react";
import { AutocompleteRenderInputParams } from "@mui/material";
import { TextField } from "@mui/material";

export function renderAutocomplete(params: AutocompleteRenderInputParams): JSX.Element {
  return <TextField {...params} size="small" variant="outlined" />;
}
