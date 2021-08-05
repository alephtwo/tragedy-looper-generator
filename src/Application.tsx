import * as React from 'react';
import { useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { ScriptGenerator } from './script/ScriptGenerator';
import { Script } from './types/Script';
import { ReferenceCards } from './referenceCard/ReferenceCards';
import { Cheatsheet } from './cheatsheet/Cheatsheet';
import { TragedySets } from './data/TragedySets';

const initialScript: Script = new Script({
  tragedySet: TragedySets.basicTragedy,
  mainPlot: TragedySets.basicTragedy.mainPlots[0],
  subplots: [],
  days: 7,
  cast: [],
});

export function Application(): JSX.Element {
  const styles = useStyles();
  const [script, setScript] = useState(initialScript);

  return (
    <Container className={styles.application}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ScriptGenerator setScript={setScript} />
        </Grid>
        <Grid item xs={12}>
          <ReferenceCards script={script} />
        </Grid>
        <Grid item xs={12}>
          <Cheatsheet script={script} />
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  application: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
