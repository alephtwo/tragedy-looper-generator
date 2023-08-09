import * as React from "react";
import { MenuItem, Select, Stack, SvgIcon } from "@mui/material";
import SupportedLanguages, { SupportedLanguage } from "../@types/SupportedLanguages";
import * as _ from "lodash";
import { GB as UKFlag } from "country-flag-icons/react/3x2";

interface LanguagePickerProps {
  value: SupportedLanguage;
  onChange: (s: SupportedLanguage) => void;
}

export function LanguagePicker(props: LanguagePickerProps) {
  return (
    <Select value={props.value} onChange={(e) => props.onChange(e.target.value as SupportedLanguage)} size="small">
      {SupportedLanguages.map((lang) => (
        <MenuItem key={`lng-${lang}`} value={lang}>
          <Stack direction="row" spacing={1}>
            <SvgIcon>{flags[lang]}</SvgIcon>
            {lang.toUpperCase()}
          </Stack>
        </MenuItem>
      ))}
    </Select>
  );
}

const flags: Record<SupportedLanguage, React.JSX.Element> = {
  en: <UKFlag />,
};
