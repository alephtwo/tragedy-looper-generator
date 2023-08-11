import * as React from "react";
import { useEffect, useState, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { ScriptGenerator } from "./ScriptGenerator";
import { reducer, initialState } from "../logic/State";
import * as ScriptCard from "./ScriptCard";
import { Cheatsheet } from "./Cheatsheet";
import { LanguagePicker } from "./LanguagePicker";
import { SupportedLanguage } from "../@types/SupportedLanguages";
import { Container, Grid, Stack, Typography, colors } from "@mui/material";

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
    document.documentElement.setAttribute("lang", lang);
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
    <Container sx={{ marginY: 1 }} component="main">
      <Stack gap={1}>
        <Stack direction="row" justifyContent="space-between">
          <PageTitle />
          <LanguagePicker value={lang} onChange={setLang} />
        </Stack>
        <ScriptGenerator state={state} dispatch={dispatch} />
        <ScriptInfo />
      </Stack>
    </Container>
  );
}

function PageTitle(): React.JSX.Element {
  const { t } = useTranslation();
  const title = t("scaffolding.title");

  // Get fancy...
  const tokens = title.split(" ");

  return (
    <Typography variant="h1" sx={{ ...styles.shadow, ...styles.grey }}>
      {tokens.map((token, i) => {
        // All but the last token are default font color.
        if (i !== tokens.length - 1) {
          return <span key={`title-${i}`}>{token} </span>;
        }
        return <QuarterRedText key={`title-${i}`} token={token} />;
      })}
    </Typography>
  );
}

interface QuarterRedTextProps {
  token: string;
}
function QuarterRedText(props: QuarterRedTextProps) {
  const { token } = props;
  // The first quarter of characters in the last token are red.
  const quarter = Math.ceil(token.length / 4);
  const begin = token.slice(0, quarter);
  const end = token.slice(quarter);
  return (
    <>
      <span style={styles.red}>{begin}</span>
      <span>{end}</span>
    </>
  );
}

const styles = {
  shadow: {
    textShadow: new Array(6).fill("#000 0 0 2px").join(", "),
  },
  grey: {
    color: colors.grey[200],
  },
  red: {
    color: colors.red[900],
  },
};
