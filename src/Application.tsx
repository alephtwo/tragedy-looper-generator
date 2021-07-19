import { Container, Grid, makeStyles } from '@material-ui/core';
import _ = require('lodash');
import * as React from 'react';
import { TragedySets } from './data/TragedySets';
import { generate } from './script/generate';
import { ReferenceCard } from './script/ReferenceCard';

export function Application(): JSX.Element {
  const styles = useStyles();
  const script = generate({
    // TODO: Accept these as input from user
    tragedySet: _.sample(TragedySets) || TragedySets.firstSteps,
    castSize: 7,
  });

  return (
    <Container className={styles.application}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <ReferenceCard script={script} mastermind={true} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReferenceCard script={script} mastermind={false} />
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  application: {
    margin: theme.spacing(1),
  },
}));
