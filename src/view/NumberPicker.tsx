import * as _ from "radash";

import { Label } from "./components/Label";
import { Range } from "./components/Range";

interface NumberPickerProps {
  id: string;
  label: string;
  startIcon?: React.JSX.Element;
  min: number;
  max: number;
  value: number;
  onChange: (n: number) => void;
}

export function NumberPicker(props: Readonly<NumberPickerProps>): React.JSX.Element {
  const marks = _.list(props.min, props.max);
  const thumbSize = "16px";

  return (
    <div className="w-full" style={{ "--range-thumb-size": thumbSize } as React.CSSProperties}>
      <Label htmlFor={props.id}>
        {props.startIcon}
        {props.label}
      </Label>
      <Range
        id={props.id}
        aria-label={props.label}
        min={props.min}
        max={props.max}
        step={1}
        value={props.value}
        onChange={props.onChange}
      />
      <div className="relative w-full text-xs" style={{ height: "1em" }}>
        {marks.map((n, i) => (
          <span
            key={n}
            className="absolute -translate-x-1/2"
            style={{
              // the math here is to position the mark correctly under the
              // slider thumb, which is a bit tricky because the thumb has a
              // size and we want the marks to be centered under it
              left: `calc(var(--range-thumb-size) / 2 + ${i / (marks.length - 1)} * (100% - var(--range-thumb-size)))`,
            }}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
