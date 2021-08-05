import { Button, Grid, makeStyles, Paper, Slider, TextField, Typography } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import * as React from 'react';
import * as _ from 'lodash';
import { useState } from 'react';
import { TragedySets } from '../data/TragedySets';
import { TragedySet } from '../types/data/TragedySet';
import { Script } from '../types/Script';
import { generate, GenerateArgs } from './generate';
import { produce } from 'immer';

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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Arguments state={args} dispatch={setArgs} />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Button onClick={() => props.setScript(generate(args))} variant="outlined" color="primary">
          Generate
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
  const styles = useStyles();

  const onChanges = createOnChanges(props);

  return (
    <Paper className={styles.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Typography gutterBottom>Tragedy Set</Typography>
          <TragedySetPicker value={props.state.tragedySet} onChange={onChanges.tragedySet} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography gutterBottom>Cast Size</Typography>
          <MarkedSlider min={6} max={11} value={props.state.castSize} onChange={onChanges.castSize} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography gutterBottom>Days</Typography>
          <MarkedSlider min={4} max={8} value={props.state.days} onChange={onChanges.days} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography gutterBottom>Incidents</Typography>
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

interface TragedySetPickerProps {
  value: TragedySet;
  onChange: (ts: TragedySet | null) => void;
}
function TragedySetPicker(props: TragedySetPickerProps): JSX.Element {
  return (
    <Autocomplete
      value={props.value}
      options={_.values(TragedySets)}
      getOptionLabel={(ts) => ts.name}
      onChange={(_, v) => props.onChange(v)}
      renderInput={renderAutocomplete}
    />
  );
}

interface MarkedSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}
function MarkedSlider(props: MarkedSliderProps): JSX.Element {
  const marks = _.range(props.min, props.max + 1).map((i) => ({ value: i, label: i.toString() }));

  return (
    <Slider
      value={props.value}
      min={props.min}
      max={props.max}
      valueLabelDisplay="auto"
      marks={marks}
      // What is the likelihood that this cast will break. who knows!
      onChange={(_, v) => props.onChange(v as number)}
    />
  );
}

function createOnChanges(props: ArgumentsProps) {
  return {
    tragedySet: (ts: TragedySet | null): void => {
      props.dispatch(
        produce(props.state, (draft) => {
          draft.tragedySet = ts || TragedySets.firstSteps;
        })
      );
    },
    castSize: (value: number): void => {
      props.dispatch(
        produce(props.state, (draft) => {
          draft.castSize = value;
          // Need to drop incidents if we don't have enough cast or days.
          draft.incidents = Math.min(draft.incidents, value);
        })
      );
    },
    days: (value: number): void => {
      props.dispatch(
        produce(props.state, (draft) => {
          draft.days = value;
          // Need to drop incidents if we don't have enough cast or days.
          draft.incidents = Math.min(draft.incidents, value);
        })
      );
    },
    incidents: (value: number): void => {
      props.dispatch(
        produce(props.state, (draft) => {
          draft.incidents = value;
        })
      );
    },
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const renderAutocomplete = (params: AutocompleteRenderInputParams) => (
  <TextField {...params} size="small" variant="outlined" />
);
