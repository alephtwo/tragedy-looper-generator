import { MenuItem, Select, Slider, Typography } from '@material-ui/core';
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
    <>
      <div>
        <TragedySetChooser announce={announceTragedySet} value={args.tragedySet} />
      </div>
      <div>
        <GeneratorSlider label="Subplots" value={args.subplots} min={1} max={2} announce={announceSlider('subplots')} />
      </div>
      <div>
        <GeneratorSlider
          label="Cast Size"
          value={args.castSize}
          min={6}
          max={11}
          announce={announceSlider('castSize')}
        />
      </div>
    </>
  );
}

interface TragedySetChooserProps {
  value: TragedySetInfo;
  announce: (id: string) => void;
}

function TragedySetChooser(props: TragedySetChooserProps) {
  const options = TragedySets.sort((a, b) => a.order - b.order).map((ts) => {
    return (
      <MenuItem key={`${ts.id}`} value={ts.id}>
        {ts.title}
      </MenuItem>
    );
  });

  return (
    <Select label="Tragedy Set" onChange={(e) => props.announce(e.target.value as string)} value={props.value.id}>
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
        marks
        onChange={(_, value) => props.announce(+value)}
      />
    </>
  );
}

function extend(src: GeneratorArgs, ext: Record<string, unknown>): GeneratorArgs {
  return Object.assign({}, src, ext);
}
