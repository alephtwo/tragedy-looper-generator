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

  const mastermindAbilities = extractMastermindAbilities(props.script);
  const roleAbilities = extractRoleAbilities(props.script);
  const allIncidents = props.script.cast.flatMap((c) => {
    return c.incidentTriggers.map((it) => ({
      castMember: c,
      incidentTrigger: it,
    }));
  });

  return (
    <Paper sx={styles.paper}>
      <Typography variant="h1" align="center">
        Cheatsheet
      </Typography>
      <Divider sx={styles.extraBottomMargin} />
      <Typography variant="h2">Win Conditions</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>Mechanic</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Trigger</TableCell>
            <TableCell>Effect</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.script
            .plots()
            .flatMap((p) => p.plotRules)
            .filter((pr) => pr.winCondition === true)
            .map((pr) => (
              <TableRow>
                <TableCell>Plot Rule</TableCell>
                <TableCell />
                <TableCell>{pr.trigger.description}</TableCell>
                <TableCell>{pr.effect}</TableCell>
              </TableRow>
            ))}
          {sortRoleAbilities(roleAbilities)
            .filter((ra) => ra.ability.winCondition === true)
            .map((ra) => (
              <TableRow>
                <TableCell>Role Ability</TableCell>
                <TableCell>{ra.triggerer}</TableCell>
                <TableCell>{ra.ability.trigger.description}</TableCell>
                <TableCell>{ra.ability.effect}</TableCell>
              </TableRow>
            ))}
          {allIncidents
            .filter((i) => i.incidentTrigger.incident.winCondition === true)
            .map((i) => (
              <TableRow>
                <TableCell>Incident</TableCell>
                <TableCell>{i.incidentTrigger.incident.name}</TableCell>
                <TableCell />
                <TableCell>{i.incidentTrigger.incident.effect}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
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
        <TableBody>
          {mastermindAbilities.map((mat, i) => (
            <TableRow key={`cheatsheet-ma-${i}`}>
              <TableCell>{mat.ability.optional ? 'Optional' : 'Mandatory'}</TableCell>
              <TableCell>{mat.triggerer}</TableCell>
              <TableCell>{mat.ability.effect}</TableCell>
              <TableCell>{mat.ability.timesPerDay}</TableCell>
              <TableCell>{mat.ability.timesPerLoop}</TableCell>
            </TableRow>
          ))}
        </TableBody>
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
        <TableBody>
          {sortRoleAbilities(roleAbilities).map((a, i) => (
            <TableRow key={`cheatsheet-ra-${i}`}>
              <TableCell>{a.ability.trigger.description}</TableCell>
              <TableCell>{a.ability.optional ? 'Optional' : 'Mandatory'}</TableCell>
              <TableCell>{a.triggerer}</TableCell>
              <TableCell>{a.ability.effect}</TableCell>
              <TableCell>{a.ability.timesPerLoop}</TableCell>
            </TableRow>
          ))}
        </TableBody>
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
        <TableBody>
          {_.sortBy(allIncidents, (i) => i.incidentTrigger.day).map(({ castMember, incidentTrigger }) => (
            <TableRow key={`cheatsheet-i-${incidentTrigger.id}`}>
              <TableCell>{incidentTrigger.day}</TableCell>
              <TableCell>{incidentTrigger.incident.name}</TableCell>
              <TableCell>{castMember.describe()}</TableCell>
              <TableCell>{incidentTrigger.incident.effect}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function extractMastermindAbilities(script: Script): Array<MastermindAbilityTrigger> {
  const fromPlots = script.plots().flatMap((p) => {
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

export function sortRoleAbilities(roleAbilities: Array<RoleAbilityTrigger>): Array<RoleAbilityTrigger> {
  return _.sortBy(roleAbilities, (a) => a.ability.trigger.order);
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
