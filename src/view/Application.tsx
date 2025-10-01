import * as React from "react";
import { useReducer, useEffect } from "react";
import { ScriptGenerator } from "./ScriptGenerator";
import { reducer } from "../logic/State";
import * as ScriptCard from "./ScriptCard";
import { Cheatsheet } from "./Cheatsheet";
import { LocalePicker } from "./LocalePicker";
import { Container, Grid, Stack, Typography, colors } from "@mui/material";
import { m } from "../paraglide/messages";
import * as TragedySets from "../data/TragedySets";
import { getLocale, setLocale } from "../paraglide/runtime";

export function Application(): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, {
    tragedySet: TragedySets.firstSteps,
    castSize: 9,
    days: 7,
    incidents: 4,
    script: null,
    locale: getLocale(),
  });
  const { script } = state;

  useEffect(() => {
    document.title = m["scaffolding.title"]();
  });

  function ScriptInfo(): React.JSX.Element {
    if (script === null) {
      return <></>;
    }
    return (
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ScriptCard.Mastermind script={script} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ScriptCard.Players script={script} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Cheatsheet script={script} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Container sx={{ marginY: 1 }}>
      <Stack gap={1}>
        <Stack direction="row" justifyContent="space-between">
          <PageTitle />
          <LocalePicker
            value={state.locale}
            onChange={(locale) => {
              Promise.resolve(setLocale(locale, { reload: false })).catch(console.error);
              document.documentElement.setAttribute("lang", locale);
              document.title = m["scaffolding.title"]();
              dispatch({ action: "set-locale", value: locale });
            }}
          />
        </Stack>
        <ScriptGenerator state={state} dispatch={dispatch} />
        <ScriptInfo />
      </Stack>
    </Container>
  );
}

function PageTitle(): React.JSX.Element {
  const title = m["scaffolding.title"]();

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
