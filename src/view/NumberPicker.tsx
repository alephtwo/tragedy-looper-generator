import * as React from "react";
import * as _ from "lodash";

interface NumberPickerProps {
  id: string;
  min: number;
  max: number;
  selected: number;
  onChange: (n: number) => void;
}
export function NumberPicker(props: NumberPickerProps): React.JSX.Element {
  return (
    <div className="flex flex-col mb-2">
      <input
        className="shadow"
        type="range"
        id={props.id}
        min={props.min}
        max={props.max}
        value={props.selected}
        list={`${props.id}-values`}
        onChange={(e) => props.onChange(parseInt(e.target.value))}
      />
      <ul className="flex justify-between text-xs p-1 -mt-1">
        {_.range(props.min, props.max + 1).map((n) => (
          <li key={`${props.id}-${n}`} className="flex justify-center mw-2ch">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}
