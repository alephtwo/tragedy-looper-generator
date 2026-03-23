import * as React from "react";
import * as _ from "radash";

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
  const marks = _.list(props.min, props.max);

  return (
    <div
      className="w-full"
      style={
        {
          "--range-thumb-size": "calc(var(--size-selector, .25rem) * 4)",
        } as React.CSSProperties
      }
    >
      <label htmlFor={props.id} className="label">
        <span className="flex items-center gap-2">
          {props.startIcon}
          {props.label}
        </span>
      </label>
      <input
        type="range"
        id={props.id}
        aria-label={props.label}
        min={props.min}
        max={props.max}
        value={props.value}
        step={1}
        className="range range-primary range-xs w-full"
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
      <div className="relative w-full text-xs" style={{ height: "1em" }}>
        {marks.map((n, i) => (
          <span
            key={n}
            className="absolute -tanslate-x-1/2"
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
