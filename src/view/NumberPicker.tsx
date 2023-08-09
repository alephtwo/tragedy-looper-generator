import * as React from "react";
import * as _ from "lodash";
import { FormControl, FormLabel, Slider, Stack } from "@mui/material";

interface NumberPickerProps {
  id: string;
  label: string;
  startIcon?: React.JSX.Element;
  min: number;
  max: number;
  value: number;
  onChange: (n: number) => void;
}

export function NumberPicker(props: NumberPickerProps): React.JSX.Element {
  const marks = _.range(props.min, props.max + 1).map((n) => ({
    value: n,
    label: n.toString(),
  }));

  return (
    <FormControl fullWidth>
      <FormLabel htmlFor={props.id}>
        <Stack direction="row" spacing={1} alignItems="center">
          {props.startIcon}
          {props.label}
        </Stack>
      </FormLabel>
      <Slider
        id={props.id}
        min={props.min}
        max={props.max}
        value={props.value}
        marks={marks}
        size="small"
        onChange={(_e, v) => props.onChange(v as number)}
      />
    </FormControl>
  );
}
