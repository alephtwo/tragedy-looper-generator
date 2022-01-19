import { Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import * as _ from 'lodash';
import * as React from 'react';
import { MastermindAbility } from '../types/data/MastermindAbility';
import { RoleAbility } from '../types/data/RoleAbility';
import { Script } from '../types/Script';

interface CheatsheetProps {
  script: Script;
}
export function Cheatsheet(props: CheatsheetProps): JSX.Element {
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

  const allIncidents = props.script.cast.flatMap((c) => {
    return c.incidentTriggers.map((it) => ({
      castMember: c,
      incidentTrigger: it,
    }));
  });
  const incidents = _.sortBy(allIncidents, (i) => i.incidentTrigger.day).map(({ castMember, incidentTrigger }) => (
    <TableRow key={`cheatsheet-i-${incidentTrigger.id}`}>
      <TableCell>{incidentTrigger.day}</TableCell>
      <TableCell>{incidentTrigger.incident.name}</TableCell>
      <TableCell>{castMember.describe()}</TableCell>
      <TableCell>{incidentTrigger.incident.effect}</TableCell>
    </TableRow>
  ));

  return (
    <Paper sx={styles.paper}>
      <Typography variant="h1" align="center">
        Cheatsheet
      </Typography>
      <Divider sx={styles.extraBottomMargin} />
      <Typography variant="h2">Mastermind Abilities</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
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
      <Table size="small" sx={styles.extraBottomMargin}>
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
      <Typography variant="h2">Incidents</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Incident</TableCell>
            <TableCell>Culprit</TableCell>
            <TableCell>Effect</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{incidents}</TableBody>
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
      triggerer: c.describe(),
    }));
  });
  return fromPlots.concat(fromRoles);
}

function extractRoleAbilities(script: Script): Array<RoleAbilityTrigger> {
  return script.cast.flatMap((c) => {
    return c.role.abilities.map((a) => ({
      ability: a,
      triggerer: c.describe(),
    }));
  });
}

const styles = {
  paper: {
    padding: 2,
  },
  extraBottomMargin: {
    marginBottom: 2,
  },
};

interface MastermindAbilityTrigger {
  ability: MastermindAbility;
  triggerer: string;
}

interface RoleAbilityTrigger {
  ability: RoleAbility;
  triggerer: string;
}
