import { Slider, Typography } from '@material-ui/core';
import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { GeneratorArgs } from '../types/GeneratorArgs';

interface ArgumentsProps {
  args: GeneratorArgs;
  setArgs: Dispatch<SetStateAction<GeneratorArgs>>;
}

export function Arguments({ args, setArgs }: ArgumentsProps): JSX.Element {
  const announce = (property: string) => (value: number) => {
    const next = extend(args, { [property]: value });
    setArgs(next);
  };

  return (
    <>
      <div>
        <GeneratorSlider label="Subplots" value={args.subplots} min={1} max={2} announce={announce('subplots')} />
      </div>
      <div>
        <GeneratorSlider label="Cast Size" value={args.castSize} min={6} max={11} announce={announce('castSize')} />
      </div>
    </>
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
