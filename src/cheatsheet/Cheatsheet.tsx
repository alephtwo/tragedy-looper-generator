import {
  Divider,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { MastermindAbility } from '../types/data/MastermindAbility';
import { Script } from '../types/Script';

interface CheatsheetProps {
  script: Script;
}
export function Cheatsheet(props: CheatsheetProps): JSX.Element {
  const styles = useStyles();

  if (!props.script.isValid()) {
    return <></>;
  }

  const mastermindAbilities = extractMastermindAbilities(props.script).map((ma) => (
    <TableRow>
      <TableCell>{ma.optional ? 'Optional' : 'Mandatory'}</TableCell>
      <TableCell>{ma.effect}</TableCell>
      <TableCell>{ma.timesPerDay}</TableCell>
      <TableCell>{ma.timesPerLoop}</TableCell>
    </TableRow>
  ));

  const roleAbilities = props.script.cast
    .flatMap((c) => c.role.abilities)
    .map((a) => (
      <TableRow>
        <TableCell>{a.trigger}</TableCell>
        <TableCell>{a.optional ? 'Optional' : 'Mandatory'}</TableCell>
        <TableCell>{a.effect}</TableCell>
        <TableCell>{a.timesPerLoop}</TableCell>
      </TableRow>
    ));

  return (
    <Paper className={styles.paper}>
      <Typography variant="h1">Cheatsheet</Typography>
      <Divider className={styles.extraBottomMargin} />
      <Typography variant="h2">Mastermind</Typography>
      <Table size="small" className={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>Mandatory</TableCell>
            <TableCell>Effect</TableCell>
            <TableCell>Per Day</TableCell>
            <TableCell>Per Loop</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{mastermindAbilities}</TableBody>
      </Table>
      <Typography variant="h2">Role Abilities</Typography>
      <Table size="small" className={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>Trigger</TableCell>
            <TableCell>Mandatory</TableCell>
            <TableCell>Effect</TableCell>
            <TableCell>Per Loop</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{roleAbilities}</TableBody>
      </Table>
    </Paper>
  );
}

function extractMastermindAbilities(script: Script): Array<MastermindAbility> {
  const fromPlots = [script.mainPlot].concat(script.subplots).flatMap((p) => p.mastermindAbilities);
  const fromRoles = script.cast.flatMap((c) => c.role.mastermindAbilities);

  console.debug(fromPlots);
  console.debug(fromRoles);
  return fromPlots.concat(fromRoles);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  extraBottomMargin: {
    marginBottom: theme.spacing(2),
  },
}));
