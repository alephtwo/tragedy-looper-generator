import * as _ from "lodash";
import * as React from "react";
import { Slider } from "@mui/material";

interface MarkedSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}
export function MarkedSlider(props: MarkedSliderProps): JSX.Element {
  const marks = _.range(props.min, props.max + 1).map((i) => ({ value: i, label: i.toString() }));

  return (
    <Slider
      value={props.value}
      min={props.min}
      max={props.max}
      valueLabelDisplay="auto"
      marks={marks}
      // What is the likelihood that this cast will break. who knows!
      onChange={(_, v) => props.onChange(v as number)}
    />
  );
}
