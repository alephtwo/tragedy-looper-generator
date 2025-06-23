import * as React from "react";
import { TragedySetPicker } from "./TragedySetPicker";
import { NumberPicker } from "./NumberPicker";
import { Message, State } from "../logic/State";
import { Button, Grid, Paper } from "@mui/material";
import * as Icons from "./Icons";
import { m } from "../paraglide/messages";

interface ScriptGeneratorProps {
  state: State;
  dispatch: React.Dispatch<Message>;
}
export function ScriptGenerator(props: ScriptGeneratorProps): React.JSX.Element {
  const { dispatch } = props;
  const { tragedySet, castSize, days, incidents, script } = props.state;

  if (script !== null && script.cast.length > castSize) {
    console.warn(m["warnings.castSizeOverridden"]({ needed: script.cast.length }));
  }

  return (
    <Paper variant="transparent" sx={{ padding: 2 }} elevation={1}>
      <Grid container rowSpacing={2} columnSpacing={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TragedySetPicker
            id="tragedy-set"
            selected={tragedySet}
            onChange={(ts) => dispatch({ action: "set-tragedy-set", value: ts })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <NumberPicker
            id="cast-size"
            label={m["terms.castSize"]()}
            startIcon={<Icons.Cast fontSize="small" />}
            min={6}
            max={11}
            value={castSize}
            onChange={(n) => dispatch({ action: "set-cast-size", value: n })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <NumberPicker
            id="days"
            label={m["terms.day"]({ count: 2 })}
            startIcon={<Icons.Days fontSize="small" />}
            min={4}
            max={8}
            value={days}
            onChange={(n) => dispatch({ action: "set-days", value: n })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <NumberPicker
            id="incidents"
            label={m["terms.incident"]({ count: 2 })}
            startIcon={<Icons.Incidents fontSize="small" />}
            min={0}
            // NB: The inclusion of cast size here isn't strictly accurate.
            // Serial Murder incidents can be perpetrated by the same cast member,
            // which allows you to have a much smaller cast with more incidents.
            // I don't want to fix that right now, so I'm just punting.
            // It doesn't really make sense to fix it anyway in my opinion.
            // If you're working on a script that goes against this, you should probably
            // just be writing it yourself anyway.
            max={Math.min(days, castSize, 7)}
            value={incidents}
            onChange={(n) => dispatch({ action: "set-incidents", value: n })}
          />
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            startIcon={<Icons.Generate fontSize="small" />}
            variant="contained"
            onClick={() => dispatch({ action: "generate" })}
          >
            {m["scaffolding.generateScript"]()}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
