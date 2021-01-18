import * as React from 'react';
import { Tragedy } from '../types/Tragedy';
import { Grid, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';

interface TragedyViewProps {
  tragedy: Tragedy;
}

export function TragedyView({ tragedy: tragedy }: TragedyViewProps): JSX.Element {
  // Assume that no cast means it hasn't been generated yet.
  if (tragedy.cast.length === 0) {
    return <></>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <MastermindCard tragedy={tragedy} />
      </Grid>
      <Grid item xs={12} md={6}>
        <PlayerCard tragedy={tragedy} />
      </Grid>
    </Grid>
  );
}

function MastermindCard({ tragedy: tragedy }: TragedyViewProps): JSX.Element {
  const styles = useStyles();

  const subplots = [...tragedy.subplots]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((sp) => (
      <ListItem key={sp.id}>
        <ListItemText primary={sp.name} />
      </ListItem>
    ));

  const cast = [...tragedy.cast]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => (
      <ListItem key={c.id}>
        <ListItemText primary={c.name} />
      </ListItem>
    ));

  return (
    <Paper className={styles.paper}>
      <Typography variant="h2">Mastermind</Typography>
      <Typography>Tragedy Set: {tragedy.tragedySet}</Typography>
      <Typography>Main Plot: {tragedy.mainPlot.name}</Typography>
      <Typography>Subplots:</Typography>
      <List dense>{subplots}</List>
      <Typography>Cast:</Typography>
      <List dense>{cast}</List>
    </Paper>
  );
}

function PlayerCard({ tragedy: tragedy }: TragedyViewProps): JSX.Element {
  const styles = useStyles();

  return (
    <Paper className={styles.paper}>
      <Typography variant="h2">Players</Typography>
      <Typography>Tragedy Set: {tragedy.tragedySet}</Typography>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
