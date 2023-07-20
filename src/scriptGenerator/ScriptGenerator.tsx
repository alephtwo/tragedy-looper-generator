import { Button, Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { TragedySets } from "../data/TragedySets";
import { TragedySet } from "../model/data/TragedySet";
import { Script } from "../model/Script";
import { generate, GenerateArgs } from "./generate";
import { produce } from "immer";
import { TragedySetPicker } from "../common/TragedySetPicker";
import { MarkedSlider } from "../common/MarkedSlider";
import { useTranslation } from "react-i18next";

interface ScriptGeneratorProps {
  setScript: React.Dispatch<Script>;
}
export function ScriptGenerator(props: ScriptGeneratorProps): JSX.Element {
  const [args, setArgs] = useState({
    tragedySet: TragedySets.basicTragedy,
    castSize: 9,
    days: 7,
    incidents: 4,
  });
  const { t, i18n } = useTranslation();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Arguments state={args} dispatch={setArgs} />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Button onClick={() => props.setScript(generate(args, i18n))} variant="outlined" color="primary">
          {t("scaffolding.generateScript")}
        </Button>
      </Grid>
    </Grid>
  );
}

interface ArgumentsProps {
  state: GenerateArgs;
  dispatch: React.Dispatch<GenerateArgs>;
}
function Arguments(props: ArgumentsProps): JSX.Element {
  const onChanges = createOnChanges(props);
  const { t } = useTranslation();

  return (
    <Paper sx={styles.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Typography gutterBottom>{t("terms.tragedySet")}</Typography>
          <TragedySetPicker value={props.state.tragedySet} onChange={onChanges.tragedySet} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography gutterBottom>{t("terms.castSize")}</Typography>
          <MarkedSlider min={6} max={11} value={props.state.castSize} onChange={onChanges.castSize} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography gutterBottom>{t("terms.day", { count: 2 })}</Typography>
          <MarkedSlider min={4} max={8} value={props.state.days} onChange={onChanges.days} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography gutterBottom>{t("terms.incident", { count: 2 })}</Typography>
          <MarkedSlider
            min={0}
            // NB: The inclusion of cast size here isn't strictly accurate.
            // Serial Murder incidents can be perpetrated by the same cast member,
            // which allows you to have a much smaller cast with more incidents.
            // I don't want to fix that right now, so I'm just punting.
            // It doesn't really make sense to fix it anyway in my opinion.
            // If you're working on a script that goes against this, you should probably
            // just be writing it yourself anyway.
            max={Math.min(props.state.days, props.state.castSize, 7)}
            value={props.state.incidents}
            onChange={onChanges.incidents}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

function createOnChanges(props: ArgumentsProps) {
  return {
    tragedySet: (ts: TragedySet | null): void => {
      props.dispatch(
        produce(props.state, (draft) => {
          draft.tragedySet = ts || TragedySets.firstSteps;
        }),
      );
    },
    castSize: (value: number): void => {
      props.dispatch(
        produce(props.state, (draft) => {
          draft.castSize = value;
          // Need to drop incidents if we don't have enough cast or days.
          draft.incidents = Math.min(draft.incidents, value);
        }),
      );
    },
    days: (value: number): void => {
      props.dispatch(
        produce(props.state, (draft) => {
          draft.days = value;
          // Need to drop incidents if we don't have enough cast or days.
          draft.incidents = Math.min(draft.incidents, value);
        }),
      );
    },
    incidents: (value: number): void => {
      props.dispatch(
        produce(props.state, (draft) => {
          draft.incidents = value;
        }),
      );
    },
  };
}

const styles = {
  paper: {
    padding: 2,
  },
};
