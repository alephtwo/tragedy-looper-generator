import * as React from 'react';
import { makeStyles, Paper, Table, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import { Script } from '../types/Script';

interface ReferenceCardProps {
  script: Script;
  mastermind: boolean;
}
export function ReferenceCard(props: ReferenceCardProps): JSX.Element {
  const { mastermind, script } = props;
  const styles = useStyles();

  return (
    <Paper className={styles.paper}>
      <Typography variant="h1">{mastermind ? 'Mastermind' : 'Players'}</Typography>
      <Table size="small">
        <TableBody>
          <TragedySetInformation script={script} />
          <PlotInformation script={script} mastermind={mastermind} />
        </TableBody>
      </Table>
    </Paper>
  );
}

interface TragedySetInformationProps {
  script: Script;
}
function TragedySetInformation(props: TragedySetInformationProps) {
  const { script } = props;
  return (
    <>
      <TableRow>
        <TableCell variant="head">Tragedy Set</TableCell>
        <TableCell>{script.tragedySet.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell variant="head">Loops</TableCell>
        <TableCell>{script.loops}</TableCell>
      </TableRow>
    </>
  );
}

interface PlotInformationProps {
  script: Script;
  mastermind: boolean;
}
function PlotInformation(props: PlotInformationProps): JSX.Element {
  // Only the mastermind can see this.
  if (!props.mastermind) {
    return <></>;
  }

  const { script } = props;
  const subplots = script.subplots.map((s, i) => (
    <TableRow>
      <TableCell variant="head">{i === 0 ? 'Subplots' : ''}</TableCell>
      <TableCell>{s.name}</TableCell>
    </TableRow>
  ));

  return (
    <>
      <TableRow>
        <TableCell variant="head">Main Plot</TableCell>
        <TableCell>{props.script.mainPlot.name}</TableCell>
      </TableRow>
      {subplots}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
}));
