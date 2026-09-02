import * as _ from "radash";

import * as TragedySets from "../data/TragedySets";
import { TragedySet } from "../data/types/TragedySet";
import { m } from "../paraglide/messages";
import { findById } from "../util/findById";
import { Select } from "./components/Select";
import * as Icons from "./Icons";

interface TragedySetPickerProps {
  id?: string;
  selected: TragedySet;
  onChange: (ts: TragedySet) => void;
}
export function TragedySetPicker(props: Readonly<TragedySetPickerProps>): React.JSX.Element {
  return (
    <Select
      id={props.id}
      label={
        <>
          <Icons.TragedySet fontSize="small" />
          {m["terms.tragedySet"]()}
        </>
      }
      value={props.selected.id}
      onChange={(id) => props.onChange(findTragedySet(id))}
    >
      {_.sort(Object.values(TragedySets), (a) => a.order).map((ts) => (
        <option key={`ts-${ts.id}`} value={ts.id}>
          {ts.name()}
        </option>
      ))}
    </Select>
  );
}

function findTragedySet(id: string): TragedySet {
  const next = findById(TragedySets, id);
  if (next === undefined) {
    return TragedySets.basicTragedy;
  }
  return next;
}
