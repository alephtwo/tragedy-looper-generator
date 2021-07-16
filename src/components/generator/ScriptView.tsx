import * as React from 'react';
import { Script } from '../../types/Script';
import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import { Character } from '../../types/Character';

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
    .map((sp, i) => (
      <TableRow key={`m-sp-${sp.id}`}>
        <TableCell key={sp.id} variant="head">
          {i === 0 ? 'Subplots' : null}
        </TableCell>
        <TableCell>{sp.name}</TableCell>
      </TableRow>
    ));

  const cast = [...script.cast]
    .sort((a, b) => a.character.name.localeCompare(b.character.name))
    .map((c) => {
      const loopDesignator = getLoopDesignator(c.character, loops);
      const role = `${c.role.name} ${loopDesignator}`.trim();
      return (
        <TableRow key={`cast-${c.character.id}`}>
          <TableCell>{c.character.name}</TableCell>
          <TableCell>{role}</TableCell>
        </TableRow>
      );
    });

  const incidents = [...script.incidents]
    .sort((a, b) => a.day - b.day)
    .map((i) => {
      const faked = i.incident.fakedIncident ? ` (fake ${i.incident.fakedIncident.name})` : '';

      return (
        <TableRow key={`m-${i.incident.id}-${i.character.id}`}>
          <TableCell>{i.day}</TableCell>
          <TableCell>{`${i.incident.name}${faked}`}</TableCell>
          <TableCell>{i.character.name}</TableCell>
        </TableRow>
      );
    });

  return (
    <Paper className={`${styles.paper} ${styles.veryTall}`}>
      <Typography variant="h5">Mastermind</Typography>
      <Table size="small" className={styles.table}>
        <TableBody>
          <TableRow>
            <TableCell variant="head">Tragedy Set</TableCell>
            <TableCell>{script.tragedySet}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Loops</TableCell>
            <TableCell>{loops}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Main Plot</TableCell>
            <TableCell>{script.mainPlot.name}</TableCell>
          </TableRow>
          {subplots}
        </TableBody>
      </Table>
      <Typography variant="h6">Cast</Typography>
      <Table size="small" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Character</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{cast}</TableBody>
      </Table>
      <Typography variant="h6">Incidents</Typography>
      <Table size="small" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Incident</TableCell>
            <TableCell>Culprit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{incidents}</TableBody>
      </Table>
    </Paper>
  );
}

function PlayerCard({ script: script, loops: loops }: ScriptViewProps): JSX.Element {
  const styles = useStyles();

  const incidents = [...script.incidents]
    .sort((a, b) => a.day - b.day)
    .map((i) => {
      const name = i.incident.fakedIncident ? i.incident.fakedIncident.name : i.incident.name;
      return (
        <TableRow key={`p-${i.incident.id}-${i.character.id}`}>
          <TableCell>{i.day}</TableCell>
          <TableCell>{name}</TableCell>
        </TableRow>
      );
    });

  return (
    <Paper className={`${styles.paper} ${styles.veryTall}`}>
      <Typography variant="h5">Players</Typography>
      <Table size="small" className={styles.table}>
        <TableBody>
          <TableRow>
            <TableCell variant="head">Tragedy Set</TableCell>
            <TableCell>{script.tragedySet}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Loops</TableCell>
            <TableCell>{loops}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Typography variant="h6">Incidents</Typography>
      <Table size="small" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Incident</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{incidents}</TableBody>
      </Table>
    </Paper>
  );
}

function getLoopDesignator(character: Character, loops: number): string {
  if (character.entersOnLoop) {
    const loop = character.entersOnLoop(loops);
    return `(Enters on Loop ${loop})`;
  }
  return '';
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    marginBottom: theme.spacing(2),
  },
  veryTall: {
    height: '100%',
  },
}));
