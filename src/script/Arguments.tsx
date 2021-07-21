import * as React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { GenerateArgs } from './generate';

interface ArgumentsProps {
  state: GenerateArgs;
  dispatch: React.Dispatch<GenerateArgs>;
}
export function Arguments(props: ArgumentsProps): JSX.Element {
  const styles = useStyles();
  return (
    <Paper className={styles.paper}>
      <Grid container>
        <Grid item xs={12} lg={6}></Grid>
      </Grid>
    </Paper>
  );
}

function TragedySetPicker(): JSX.Element {
  return <></>;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));
