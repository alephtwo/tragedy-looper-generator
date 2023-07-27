import * as React from "react";
import * as _ from "lodash";
import { TragedySets } from "../data/TragedySets";
import { useTranslation } from "react-i18next";
import { TragedySet } from "../data/types/TragedySet";
import { findById } from "../util/findById";

interface TragedySetPickerProps {
  id?: string;
  selected: TragedySet;
  onChange: (ts: TragedySet) => void;
}
export function TragedySetPicker(props: TragedySetPickerProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <select
      id={props.id}
      className="form-select rounded shadow w-full"
      value={props.selected.id}
      onChange={(e) => {
        const chosen = findById(TragedySets, e.target.value);
        if (chosen === undefined) {
          console.error(`could not find tragedy set with id ${e.target.value}`);
          return;
        }
        props.onChange(chosen);
      }}
    >
      {_.values(TragedySets)
        .sort((a, b) => a.order - b.order)
        .map((ts) => (
          <option value={ts.id}>{t(ts.name_i18n_key)}</option>
        ))}
    </select>
  );
}
