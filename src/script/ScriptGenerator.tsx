import { Button, Grid } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { TragedySets } from '../data/TragedySets';
import { Script } from '../types/Script';
import { Arguments } from './Arguments';
import { generate } from './generate';

interface ScriptGeneratorProps {
  setScript: React.Dispatch<Script>;
}
export function ScriptGenerator(props: ScriptGeneratorProps): JSX.Element {
  const [args, setArgs] = useState({
    tragedySet: TragedySets.basicTragedy,
    castSize: 9,
    days: 7,
    incidents: 4,
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Arguments state={args} dispatch={setArgs} />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Button onClick={() => props.setScript(generate(args))} variant="outlined" color="primary">
          Generate
        </Button>
      </Grid>
    </Grid>
  );
}
