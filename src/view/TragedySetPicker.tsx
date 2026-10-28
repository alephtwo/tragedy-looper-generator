import { m } from "@i18n/messages";
import * as _ from "radash";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as TragedySets from "../data/TragedySets";
import { TragedySet } from "../data/types/TragedySet";
import { findById } from "../util/findById";
import * as Icons from "./Icons";

interface TragedySetPickerProps {
  id?: string;
  selected: TragedySet;
  onChange: (ts: TragedySet) => void;
}
export function TragedySetPicker(props: Readonly<TragedySetPickerProps>): React.JSX.Element {
  const items = Object.values(TragedySets)
    .toSorted((a, b) => a.order - b.order)
    .map((ts) => ({ label: ts.name(), value: ts.id }));

  return (
    <Field>
      <FieldLabel>
        <Icons.TragedySet fontSize="small" />
        {m["terms.tragedySet"]()}
      </FieldLabel>
      <Select
        id={props.id}
        value={props.selected.id}
        items={items}
        required
        onValueChange={(id) => props.onChange(findTragedySet(id as string))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{m["terms.tragedySet"]()}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}

function findTragedySet(id: string): TragedySet {
  const next = findById(TragedySets, id);
  if (next === undefined) {
    return TragedySets.basicTragedy;
  }
  return next;
}
