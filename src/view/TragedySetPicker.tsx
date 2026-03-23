import * as React from "react";
import * as _ from "radash";
import * as TragedySets from "../data/TragedySets";
import { TragedySet } from "../data/types/TragedySet";
import { findById } from "../util/findById";
import * as Icons from "./Icons";
import { m } from "../paraglide/messages";

interface TragedySetPickerProps {
  id?: string;
  selected: TragedySet;
  onChange: (ts: TragedySet) => void;
}
export function TragedySetPicker(props: TragedySetPickerProps): React.JSX.Element {
  return (
    <div className="w-full">
      <label htmlFor={props.id} className="label">
        <span className="flex items-center gap-1">
          <Icons.TragedySet fontSize="small" />
          {m["terms.tragedySet"]()}
        </span>
      </label>
      <select
        id={props.id}
        className="select select-sm w-full"
        value={props.selected.id}
        onChange={(e) => props.onChange(findTragedySet(e.target.value))}
      >
        {_.sort(Object.values(TragedySets), (a) => a.order).map((ts) => (
          <option key={`ts-${ts.id}`} value={ts.id}>
            {ts.name()}
          </option>
        ))}
      </select>
    </div>
  );
}

function findTragedySet(id: string): TragedySet {
  const next = findById(TragedySets, id);
  if (next === undefined) {
    return TragedySets.basicTragedy;
  }
  return next;
}
