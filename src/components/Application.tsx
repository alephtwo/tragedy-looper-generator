import { Button, Divider, Typography } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { generateTragedy } from '../calculations/generateTragedy';
import { MainPlots } from '../data/Plots';
import { TragedySets } from '../data/TragedySets';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { Tragedy } from '../types/Tragedy';
import { Arguments } from './Arguments';
import { TragedyView } from './TragedyView';

const initialArgs: GeneratorArgs = {
  tragedySet: TragedySets.find((ts) => ts.order === 0) || TragedySets[0],
  subplots: 2,
  castSize: 9,
};

const initialTragedy: Tragedy = {
  mainPlot: MainPlots.murderPlan,
  subplots: [],
  cast: [],
};

function Application(): JSX.Element {
  const [args, setArgs] = useState<GeneratorArgs>(initialArgs);
  const [tragedy, setTragedy] = useState<Tragedy>(initialTragedy);

  const generate = () => {
    const generated = generateTragedy(args);
    setTragedy(generated);
  };

  return (
    <>
      <div>
        <Typography variant="h1">Tragedy Looper Generator</Typography>
      </div>
      <Divider />
      <div>
        <Arguments args={args} setArgs={setArgs} />
      </div>
      <div>
        <Button variant="contained" onClick={generate}>
          Generate
        </Button>
      </div>
      <Divider />
      <TragedyView tragedy={tragedy} />
    </>
  );
}

export default Application;
