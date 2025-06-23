import * as React from "react";
import { Locale, locales } from "../paraglide/runtime";

interface LocalePickerProps {
  value: Locale;
  onChange: (s: Locale) => void;
}

export function LocalePicker(props: LocalePickerProps) {
  return (
    <div className="flex gap-1" role="group">
      {locales.map((lang) => (
        <button
          key={`lng-${lang}`}
          className={`btn btn-sm gap-1.5 btn-primary ${lang === props.value ? "" : "btn-soft"}`}
          onClick={() => props.onChange(lang)}
          aria-pressed={lang === props.value}
        >
          <span className="inline-flex h-3.5 w-5 items-center overflow-hidden rounded-sm">{flags[lang]}</span>
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

const flags: Record<Locale, React.JSX.Element> = {
  en: (
    // <https://en.wikipedia.org/wiki/File:Flag_of_the_United_Kingdom.svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" width="1000" height="600">
      <clipPath id="t">
        <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
      </clipPath>
      <path d="M0,0v30h50v-30z" fill="#012169" />
      <path d="M0,0 50,30M50,0 0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 50,30M50,0 0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z" fill="#C8102E" stroke="#FFF" strokeWidth="2" />
    </svg>
  ),
  fr: (
    // <https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg>
    // hand-edited viewBox to be legible
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600">
      <rect width="900" height="600" fill="#CE1126" />
      <rect width="600" height="600" fill="#FFFFFF" />
      <rect width="300" height="600" fill="#002654" />
    </svg>
  ),
};
