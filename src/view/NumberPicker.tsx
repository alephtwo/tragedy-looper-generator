import * as React from "react";
import * as _ from "lodash";
import { FormControl, FormLabel, Slider, Typography } from "@mui/material";

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
        <Typography sx={styles.headerWithIcon}>
          {props.startIcon}
          {props.label}
        </Typography>
      </FormLabel>
      <Slider
        id={props.id}
        aria-label={props.label}
        min={props.min}
        max={props.max}
        value={props.value}
        marks={marks}
        size="small"
        onChange={(_e, v) => props.onChange(v)}
      />
    </FormControl>
  );
}

const styles = {
  headerWithIcon: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
};
