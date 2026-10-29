import * as _ from "radash";

import { Slider } from "./ui/slider";

interface NumberPickerProps {
  id: string;
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
    <div
      className="flex w-full flex-col gap-2"
      style={{ "--range-thumb-size": thumbSize } as React.CSSProperties}
    >
      <Slider
        id={props.id}
        min={props.min}
        max={props.max}
        step={1}
        value={props.value}
        onValueChange={props.onChange}
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
