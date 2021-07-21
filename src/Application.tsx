import { Button, Container, Grid, makeStyles } from '@material-ui/core';
import _ = require('lodash');
import * as React from 'react';
import { useState } from 'react';
import { TragedySets } from './data/TragedySets';
import { Arguments } from './script/Arguments';
import { generate } from './script/generate';
import { ReferenceCard } from './script/ReferenceCard';
import { TragedySet } from './types/data/TragedySet';
import { Script } from './types/Script';

export function Application(): JSX.Element {
  const styles = useStyles();

  const [script, setScript] = useState<Script>(null as unknown as Script);
  const generateScript = () => {
    setScript(
      generate({
        tragedySet: _.sample(TragedySets) as TragedySet,
        castSize: 9,
      })
    );
  };

  return (
    <Container className={styles.application}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Arguments />
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Button onClick={generateScript} variant="outlined" color="primary">
            Generate
          </Button>
        </Grid>
        <ReferenceCards script={script} />
      </Grid>
    </Container>
  );
}

interface ReferenceCardsProps {
  script: Script | null;
}
function ReferenceCards(props: ReferenceCardsProps): JSX.Element {
  if (props.script == null) {
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

const useStyles = makeStyles((theme) => ({
  application: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
