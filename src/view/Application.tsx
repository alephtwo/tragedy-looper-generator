import * as React from "react";
import { useEffect, useState, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { ScriptGenerator } from "./ScriptGenerator";
import { reducer, initialState } from "../logic/State";
import * as ScriptCard from "./ScriptCard";
import { Cheatsheet } from "./Cheatsheet";
import { LanguagePicker } from "./LanguagePicker";
import { SupportedLanguage } from "../@types/SupportedLanguages";
import { Box, Container, Stack, colors } from "@mui/material";

export function Application(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const { script } = state;

  useEffect(() => {
    document.title = t("scaffolding.title");
  }, []);

  useEffect(() => {
    i18n.changeLanguage(lang).catch(console.error);
  }, [lang]);

  function ScriptInfo(): React.JSX.Element {
    if (script === null) {
      return <></>;
    }
    return (
      <Stack gap={1}>
        <Box sx={{ backgroundColor: colors.red[100] }}>
          <ScriptCard.Mastermind script={script} />
        </Box>
        <Box sx={{ backgroundColor: colors.green[100] }}>
          <ScriptCard.Players script={script} />
        </Box>
        <Box sx={{ backgroundColor: colors.blue[100] }}>
          <Cheatsheet script={script} />
        </Box>
      </Stack>
    );
  }

  return (
    <Container sx={{ marginY: 1 }}>
      <Stack gap={1}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <LanguagePicker value={lang} onChange={setLang} />
        </Box>
        <ScriptGenerator state={state} dispatch={dispatch} />
        <ScriptInfo />
      </Stack>
    </Container>
  );
}
