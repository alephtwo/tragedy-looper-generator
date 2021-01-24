import {
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Slider,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { TragedySets } from '../data/TragedySets';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { TragedySetInfo } from '../types/TragedySetInfo';
import * as _ from 'lodash';

interface ArgumentsProps {
  readonly args: GeneratorArgs;
  readonly setArgs: Dispatch<SetStateAction<GeneratorArgs>>;
}

export function Arguments({ args, setArgs }: ArgumentsProps): JSX.Element {
  const styles = useStyles();

  const announceSlider = (property: string) => (value: number) => {
    const next = extend(args, { [property]: value });
    // Can only have as many incidents as there are days or cast members to cause them.
    // Therefore, we need to limit it.
    const clampedDays = extend(next, { incidents: Math.min(next.incidents, next.days, next.castSize) });
    setArgs(clampedDays);
  };

  const announceBoolean = (property: string) => (__: ChangeEvent<HTMLInputElement>, value: boolean): void => {
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
        <Grid item xs={6}>
          <TragedySetChooser announce={announceTragedySet} value={args.tragedySet} />
        </Grid>
        <Grid container item justify="space-around" xs={6}>
          <FormControlLabel
            label="Midnight Circle"
            control={
              <Checkbox
                checked={args.useMidnightCircleCharacters}
                onChange={announceBoolean('useMidnightCircleCharacters')}
                color="primary"
              />
            }
          />
          <FormControlLabel
            label="Cosmic Evil"
            control={
              <Checkbox
                checked={args.useCosmicEvilCharacters}
                onChange={announceBoolean('useCosmicEvilCharacters')}
                color="primary"
              />
            }
          />
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
          <GeneratorSlider label="Days" value={args.days} min={4} max={8} announce={announceSlider('days')} />
        </Grid>
        <Grid item md={6} xs={12}>
          <GeneratorSlider
            label="Incidents"
            value={args.incidents}
            min={0}
            max={Math.min(args.days, args.castSize)}
            announce={announceSlider('incidents')}
          />
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
  const marks = _.range(props.min, props.max + 1).map((i) => ({ value: i, label: i.toString() }));
  return (
    <>
      <Typography gutterBottom>
        {props.label}: {props.value}
      </Typography>
      <Slider
        value={props.value}
        min={props.min}
        max={props.max}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={(__, value) => props.announce(+value)}
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
