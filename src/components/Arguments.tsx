import { Slider, Typography } from '@material-ui/core';
import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { GeneratorArgs } from '../types/GeneratorArgs';

interface ArgumentsProps {
  args: GeneratorArgs;
  setArgs: Dispatch<SetStateAction<GeneratorArgs>>;
}

export function Arguments({ args, setArgs }: ArgumentsProps): JSX.Element {
  return (
    <>
      <div>
        <Typography gutterBottom>Sublplots: {args.subplots}</Typography>
        <Slider
          defaultValue={args.subplots}
          min={1}
          max={2}
          marks
          valueLabelDisplay="auto"
          onChange={(_, value) => setArgs(extend(args, { subplots: +value }))}
        />
      </div>
      <div>
        <Typography gutterBottom>Cast Size: {args.castSize}</Typography>
        <Slider
          defaultValue={args.castSize}
          min={6}
          max={11}
          marks
          valueLabelDisplay="auto"
          onChange={(_, value) => setArgs(extend(args, { castSize: +value }))}
        />
      </div>
    </>
  );
}

function extend(src: GeneratorArgs, ext: Record<string, unknown>): GeneratorArgs {
  return Object.assign({}, src, ext);
}
