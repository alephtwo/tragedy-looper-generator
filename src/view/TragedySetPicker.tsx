import * as React from "react";
import * as _ from "lodash";
import { TragedySets } from "../data/TragedySets";
import { useTranslation } from "react-i18next";
import { TragedySet } from "../data/types/TragedySet";
import { findById } from "../util/findById";
import { FormControl, FormLabel, MenuItem, Select, Stack } from "@mui/material";
import * as Icons from "./Icons";

interface TragedySetPickerProps {
  id?: string;
  selected: TragedySet;
  onChange: (ts: TragedySet) => void;
}
export function TragedySetPicker(props: TragedySetPickerProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <FormControl fullWidth>
      <FormLabel htmlFor={props.id}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Icons.TragedySet fontSize="small" />
          {t("terms.tragedySet")}
        </Stack>
      </FormLabel>
      <Select
        sx={{ marginTop: 1 }}
        size="small"
        id={props.id}
        value={props.selected.id}
        onChange={(e) => props.onChange(findTragedySet(e.target.value))}
      >
        {_.sortBy(Object.values(TragedySets), (a) => a.order).map((ts) => (
          <MenuItem key={`ts-${ts.id}`} value={ts.id}>
            {t(ts.name_i18n_key)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function findTragedySet(id: string): TragedySet {
  const next = findById(TragedySets, id);
  if (next === undefined) {
    return TragedySets.basicTragedy;
  }
  return next;
}
