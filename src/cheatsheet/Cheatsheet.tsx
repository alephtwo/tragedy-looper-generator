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
import * as _ from 'lodash';
import * as React from 'react';
import { MastermindAbility } from '../types/data/MastermindAbility';
import { RoleAbility } from '../types/data/RoleAbility';
import { Script } from '../types/Script';

interface CheatsheetProps {
  script: Script;
}
export function Cheatsheet(props: CheatsheetProps): JSX.Element {
  const styles = useStyles();

  if (!props.script.isValid()) {
    return <></>;
  }

  const mastermindAbilities = extractMastermindAbilities(props.script).map((mat, i) => (
    <TableRow key={`cheatsheet-ma-${i}`}>
      <TableCell>{mat.ability.optional ? 'Optional' : 'Mandatory'}</TableCell>
      <TableCell>{mat.triggerer}</TableCell>
      <TableCell>{mat.ability.effect}</TableCell>
      <TableCell>{mat.ability.timesPerDay}</TableCell>
      <TableCell>{mat.ability.timesPerLoop}</TableCell>
    </TableRow>
  ));

  const roleAbilities = _.sortBy(extractRoleAbilities(props.script), (a) => a.ability.trigger.order).map((a, i) => (
    <TableRow key={`cheatsheet-ra-${i}`}>
      <TableCell>{a.ability.trigger.description}</TableCell>
      <TableCell>{a.ability.optional ? 'Optional' : 'Mandatory'}</TableCell>
      <TableCell>{a.triggerer}</TableCell>
      <TableCell>{a.ability.effect}</TableCell>
      <TableCell>{a.ability.timesPerLoop}</TableCell>
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

function extractMastermindAbilities(script: Script): Array<MastermindAbilityTrigger> {
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

function extractRoleAbilities(script: Script): Array<RoleAbilityTrigger> {
  return script.cast.flatMap((c) => {
    return c.role.abilities.map((a) => ({
      ability: a,
      triggerer: `${c.character.name} (${c.role.name})`,
    }));
  });
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  extraBottomMargin: {
    marginBottom: theme.spacing(2),
  },
}));

interface MastermindAbilityTrigger {
  ability: MastermindAbility;
  triggerer: string;
}

interface RoleAbilityTrigger {
  ability: RoleAbility;
  triggerer: string;
}
