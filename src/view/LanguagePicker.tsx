import * as React from "react";
import { MenuItem, Select } from "@mui/material";
import SupportedLanguages, { SupportedLanguage } from "../@types/SupportedLanguages";
import * as _ from "lodash";

interface LanguagePickerProps {
  value: SupportedLanguage;
  onChange: (s: SupportedLanguage) => void;
}

export function LanguagePicker(props: LanguagePickerProps) {
  return (
    <Select value={props.value} onChange={(e) => props.onChange(e.target.value as SupportedLanguage)} size="small">
      {_.map(SupportedLanguages, (desc, lang) => (
        <MenuItem value={lang}>{desc}</MenuItem>
      ))}
    </Select>
  );
}
