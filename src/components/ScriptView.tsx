import * as React from 'react';
import { Script } from '../types/Script';
import { Grid, List, ListItem, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import { AllCharacters } from '../data/Characters';
import { Character } from '../types/Character';

interface ScriptViewProps {
  script: Script;
  loops: number;
}

export function ScriptView({ script: script, loops: loops }: ScriptViewProps): JSX.Element {
  // Assume that no cast means it hasn't been generated yet.
  if (script.cast.length === 0) {
    return <></>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <MastermindCard script={script} loops={loops} />
      </Grid>
      <Grid item xs={12} md={6}>
        <PlayerCard script={script} loops={loops} />
      </Grid>
    </Grid>
  );
}

function MastermindCard({ script: script, loops: loops }: ScriptViewProps): JSX.Element {
  const styles = useStyles();

  const subplots = [...script.subplots]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((sp) => (
      <ListItem key={sp.id}>
        <ListItemText primary={sp.name} />
      </ListItem>
    ));

  const cast = [...script.cast]
    .sort((a, b) => a.character.name.localeCompare(b.character.name))
    .map((c) => {
      const loopDesignator = getLoopDesignator(c.character);
      const msg = `${c.character.name} (${c.role.name}) ${loopDesignator}`.trim();
      return (
        <ListItem key={c.character.id}>
          <ListItemText primary={msg} />
        </ListItem>
      );
    });

  const incidents = [...script.incidents]
    .sort((a, b) => a.day - b.day)
    .map((i) => {
      const msg = `${i.day} - ${i.incident.name} (${i.character.name})`;
      return (
        <ListItem key={`m-${i.incident.id}`}>
          <ListItemText primary={msg} />
        </ListItem>
      );
    });

  return (
    <Paper className={styles.paper}>
      <Typography variant="h2">Mastermind</Typography>
      <Typography>Tragedy Set: {script.tragedySet}</Typography>
      <Typography>Loops: {loops}</Typography>
      <Typography>Main Plot: {script.mainPlot.name}</Typography>
      <Typography>Subplots:</Typography>
      <List dense>{subplots}</List>
      <Typography>Cast:</Typography>
      <List dense>{cast}</List>
      <Typography>Incidents:</Typography>
      <List dense>{incidents}</List>
    </Paper>
  );
}

function PlayerCard({ script: script, loops: loops }: ScriptViewProps): JSX.Element {
  const styles = useStyles();

  const incidents = [...script.incidents]
    .sort((a, b) => a.day - b.day)
    .map((i) => (
      <ListItem key={`p-${i.incident.id}`}>
        <ListItemText primary={`${i.day} - ${i.incident.name}`} />
      </ListItem>
    ));

  return (
    <Paper className={styles.paper}>
      <Typography variant="h2">Players</Typography>
      <Typography>Tragedy Set: {script.tragedySet}</Typography>
      <Typography>Loops: {loops}</Typography>
      <Typography>Incidents:</Typography>
      <List dense>{incidents}</List>
    </Paper>
  );
}

function getLoopDesignator(character: Character): string {
  // TODO: Actually put a loop number here!
  if (character.id === AllCharacters.godlyBeing.id) {
    return '(Enters on Loop X)';
  }
  return '';
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
