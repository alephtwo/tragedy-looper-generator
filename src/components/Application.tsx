import { Button, Typography } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import generateTragedy from '../generator/generateTragedy';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { Tragedy } from '../types/Tragedy.d';
import { Arguments } from './Arguments';

const initialArgs: GeneratorArgs = {
  subplots: 2,
  castSize: 9,
};

const initialTragedy: Tragedy = {
  mainPlot: null,
  subplots: [],
  castMembers: [],
};

function Application(): JSX.Element {
  const [args, setArgs] = useState<GeneratorArgs>(initialArgs);
  const [tragedy, setTragedy] = useState<Tragedy>(initialTragedy);
  console.log(tragedy);

  const generate = () => {
    const tragedy: Tragedy = generateTragedy(args);
    setTragedy(tragedy);
  };

  return (
    <>
      <div>
        <Typography variant="h1">Tragedy Looper Generator</Typography>
      </div>
      <div>
        <Arguments args={args} setArgs={setArgs} />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={generate}>
          Generate
        </Button>
      </div>
    </>
  );
}

export default Application;
