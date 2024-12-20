import * as React from "react";
import { Box, MenuItem, Select, SvgIcon } from "@mui/material";
import SupportedLanguages, { SupportedLanguage } from "../@types/SupportedLanguages";

interface LanguagePickerProps {
  value: SupportedLanguage;
  onChange: (s: SupportedLanguage) => void;
}

export function LanguagePicker(props: LanguagePickerProps) {
  return (
    <Select value={props.value} onChange={(e) => props.onChange(e.target.value as SupportedLanguage)} size="small">
      {SupportedLanguages.map((lang) => (
        <MenuItem key={`lng-${lang}`} value={lang}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <SvgIcon>{flags[lang]}</SvgIcon>
            {lang.toUpperCase()}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}

const flags: Record<SupportedLanguage, React.JSX.Element> = {
  en: (
    // <https://en.wikipedia.org/wiki/File:Flag_of_the_United_Kingdom.svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" width="1000" height="600">
      <clipPath id="t">
        <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
      </clipPath>
      <path d="M0,0v30h50v-30z" fill="#012169" />
      <path d="M0,0 50,30M50,0 0,30" stroke="#fff" stroke-width="6" />
      <path d="M0,0 50,30M50,0 0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4" />
      <path d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z" fill="#C8102E" stroke="#FFF" stroke-width="2" />
    </svg>
  ),
};
