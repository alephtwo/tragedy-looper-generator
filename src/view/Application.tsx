import * as React from "react";
import { useEffect, useState, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { ScriptGenerator } from "./ScriptGenerator";
import { reducer, initialState } from "../logic/State";
import * as ScriptCard from "./ScriptCard";
import { Cheatsheet } from "./Cheatsheet";
import { LanguagePicker } from "./LanguagePicker";
import { SupportedLanguage } from "../@types/SupportedLanguages";
import { Box, Container, Grid, Stack } from "@mui/material";

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
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <ScriptCard.Mastermind script={script} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ScriptCard.Players script={script} />
        </Grid>
        <Grid item xs={12}>
          <Cheatsheet script={script} />
        </Grid>
      </Grid>
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
