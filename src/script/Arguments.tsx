import { Grid, makeStyles, Paper, Slider } from '@material-ui/core';
import * as React from 'react';

export function Arguments(): JSX.Element {
  const styles = useStyles();
  return (
    <Paper className={styles.paper}>
      <Grid container>
        <Grid item xs={12} lg={6}></Grid>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));
