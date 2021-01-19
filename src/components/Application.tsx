import { Button, Container, Grid, Typography } from '@material-ui/core';
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
  days: 7,
  loops: 3,
};

const initialTragedy: Tragedy = {
  tragedySet: '',
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
    <Container>
      <Typography align={'center'} variant="h1">
        Tragedy Looper Generator
      </Typography>
      <Arguments args={args} setArgs={setArgs} />
      <Grid container justify="center" alignItems="center">
        <Grid item md={4} xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={generate}>
            Generate
          </Button>
        </Grid>
      </Grid>
      <TragedyView tragedy={tragedy} />
    </Container>
  );
}

export default Application;
