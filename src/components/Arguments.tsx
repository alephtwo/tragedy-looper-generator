import { Grid, makeStyles, MenuItem, Paper, Select, Slider, Typography } from '@material-ui/core';
import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { TragedySets } from '../data/TragedySets';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { TragedySetInfo } from '../types/TragedySetInfo';

interface ArgumentsProps {
  args: GeneratorArgs;
  setArgs: Dispatch<SetStateAction<GeneratorArgs>>;
}

export function Arguments({ args, setArgs }: ArgumentsProps): JSX.Element {
  const styles = useStyles();

  const announceSlider = (property: string) => (value: number) => {
    const next = extend(args, { [property]: value });
    setArgs(next);
  };

  const announceTragedySet = (id: string) => {
    const chosen = TragedySets.find((a) => a.id === id) || TragedySets[0];
    const next = extend(args, { tragedySet: chosen });
    setArgs(next);
  };

  return (
    <Paper className={styles.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TragedySetChooser announce={announceTragedySet} value={args.tragedySet} />
        </Grid>
        <Grid item md={6} xs={12}>
          <GeneratorSlider
            label="Subplots"
            value={args.subplots}
            min={1}
            max={2}
            announce={announceSlider('subplots')}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <GeneratorSlider
            label="Cast Size"
            value={args.castSize}
            min={6}
            max={11}
            announce={announceSlider('castSize')}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <GeneratorSlider label="Days" value={args.days} min={4} max={10} announce={announceSlider('days')} />
        </Grid>
        <Grid item md={6} xs={12}>
          <GeneratorSlider label="Loops" value={args.loops} min={1} max={6} announce={announceSlider('loops')} />
        </Grid>
      </Grid>
    </Paper>
  );
}

interface TragedySetChooserProps {
  value: TragedySetInfo;
  announce: (id: string) => void;
}

function TragedySetChooser(props: TragedySetChooserProps) {
  // Build a copy of the tragedy sets so as not to affect the original
  const sortedSets = [...TragedySets].sort((a, b) => a.order - b.order);
  const options = sortedSets.map((ts) => {
    return (
      <MenuItem key={`${ts.id}`} value={ts.id}>
        {ts.title}
      </MenuItem>
    );
  });

  return (
    <Select
      variant="outlined"
      fullWidth
      onChange={(e) => props.announce(e.target.value as string)}
      value={props.value.id}
    >
      {options}
    </Select>
  );
}

interface GeneratorSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  announce: (value: number) => void;
}

function GeneratorSlider(props: GeneratorSliderProps): JSX.Element {
  const marks = [];
  for (let i = props.min; i <= props.max; i++) {
    marks.push({ value: i, label: i.toString() });
  }

  return (
    <>
      <Typography gutterBottom>
        {props.label}: {props.value}
      </Typography>
      <Slider
        defaultValue={props.value}
        min={props.min}
        max={props.max}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(_, value) => props.announce(+value)}
      />
    </>
  );
}

function extend(src: GeneratorArgs, ext: Record<string, unknown>): GeneratorArgs {
  return Object.assign({}, src, ext);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
