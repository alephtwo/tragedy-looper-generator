import { Button, Container, Grid } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { generateScript } from '../calculations/generateScript';
import { MainPlots } from '../data/Plots';
import { TragedySets } from '../data/TragedySets';
import { GeneratorArgs } from '../types/GeneratorArgs';
import { Script } from '../types/Script';
import { Arguments } from './Arguments';
import { ScriptView } from './ScriptView';

const initialArgs: GeneratorArgs = {
  tragedySet: TragedySets.find((ts) => ts.order === 0) || TragedySets[0],
  subplots: 2,
  castSize: 9,
  days: 7,
  incidents: 1,
  useMidnightCircleCharacters: true,
  useCosmicEvilCharacters: true,
};

const initialScript: Script = {
  tragedySet: '',
  mainPlot: MainPlots.murderPlan,
  subplots: [],
  cast: [],
  incidents: [],
};

function Application(): JSX.Element {
  const [args, setArgs] = useState<GeneratorArgs>(initialArgs);
  const [script, setScript] = useState<Script>(initialScript);

  const generate = () => {
    const generated = generateScript(args);
    setScript(generated);
  };

  return (
    <Container>
      <Arguments args={args} setArgs={setArgs} />
      <Grid container justify="center" alignItems="center">
        <Grid item md={4} xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={generate}>
            Generate
          </Button>
        </Grid>
      </Grid>
      <ScriptView tragedy={script} />
    </Container>
  );
}

export default Application;
