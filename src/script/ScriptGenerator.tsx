import { Button, Grid } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { TragedySets } from '../data/TragedySets';
import { Script } from '../types/Script';
import { Arguments } from './Arguments';
import { generate } from './generate';
import { ReferenceCard } from './ReferenceCard';

export function ScriptGenerator(): JSX.Element {
  const [script, setScript] = useState(null as unknown as Script);
  const [args, setArgs] = useState({
    tragedySet: TragedySets.basicTragedy,
    castSize: 9,
    days: 7,
    incidents: 4,
  });

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Arguments state={args} dispatch={setArgs} />
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Button onClick={() => setScript(generate(args))} variant="outlined" color="primary">
            Generate
          </Button>
        </Grid>
        <ReferenceCards script={script} />
      </Grid>
    </>
  );
}

interface ReferenceCardsProps {
  script: Script | null;
}
function ReferenceCards(props: ReferenceCardsProps): JSX.Element {
  if (props.script === null) {
    return <></>;
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <ReferenceCard script={props.script} mastermind={true} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ReferenceCard script={props.script} mastermind={false} />
      </Grid>
    </>
  );
}
