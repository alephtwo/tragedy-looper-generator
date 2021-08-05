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

  const mastermindAbilities = extractMastermindAbilities(props.script).map((mat) => (
    <TableRow>
      <TableCell>{mat.ability.optional ? 'Optional' : 'Mandatory'}</TableCell>
      <TableCell>{mat.triggerer}</TableCell>
      <TableCell>{mat.ability.effect}</TableCell>
      <TableCell>{mat.ability.timesPerDay}</TableCell>
      <TableCell>{mat.ability.timesPerLoop}</TableCell>
    </TableRow>
  ));

  // TODO: Sort this by order.
  const roleAbilities = props.script.cast.flatMap((c) => {
    return c.role.abilities.map((a) => (
      <TableRow>
        <TableCell>{a.trigger}</TableCell>
        <TableCell>{a.optional ? 'Optional' : 'Mandatory'}</TableCell>
        <TableCell>{`${c.character.name} (${c.role.name})`}</TableCell>
        <TableCell>{a.effect}</TableCell>
        <TableCell>{a.timesPerLoop}</TableCell>
      </TableRow>
    ));
  });

  return (
    <Paper className={styles.paper}>
      <Typography variant="h1">Cheatsheet</Typography>
      <Divider className={styles.extraBottomMargin} />
      <Typography variant="h2">Mastermind</Typography>
      <Table size="small" className={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>Mandatory</TableCell>
            <TableCell>Triggered By</TableCell>
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
            <TableCell>Triggered By</TableCell>
            <TableCell>Effect</TableCell>
            <TableCell>Per Loop</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{roleAbilities}</TableBody>
      </Table>
    </Paper>
  );
}

function extractMastermindAbilities(script: Script): Array<MastermindAbilityTriggerer> {
  const fromPlots = [script.mainPlot].concat(script.subplots).flatMap((p) => {
    return p.mastermindAbilities.map((ma) => ({
      ability: ma,
      triggerer: p.name,
    }));
  });
  const fromRoles = script.cast.flatMap((c) => {
    return c.role.mastermindAbilities.map((ma) => ({
      ability: ma,
      triggerer: `${c.character.name} (${c.role.name})`,
    }));
  });
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

interface MastermindAbilityTriggerer {
  ability: MastermindAbility;
  triggerer: string;
}
