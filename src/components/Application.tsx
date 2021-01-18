import { Typography } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { TragedySets } from '../data/TragedySets';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { Arguments } from './Arguments';

const initialArgs: GeneratorArgs = {
  tragedySet: TragedySets.find((ts) => ts.order === 0) || TragedySets[0],
  subplots: 2,
  castSize: 9,
};

function Application(): JSX.Element {
  const [args, setArgs] = useState<GeneratorArgs>(initialArgs);

  return (
    <>
      <div>
        <Typography variant="h1">Tragedy Looper Generator</Typography>
      </div>
      <div>
        <Arguments args={args} setArgs={setArgs} />
      </div>
    </>
  );
}

export default Application;
