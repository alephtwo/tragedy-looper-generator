import * as React from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import * as uuid from 'uuid';
import { CheatsheetState } from '../../types/CheatsheetState';
import { MastermindAbilityDescription } from '../../types/MastermindAbilityDescription';
import { TriggerDescription } from '../../types/triggers/TriggerDescription';
import { CastMember, Character } from '../../types/Character';
import { Role } from '../../types/Role';
import { CheatsheetCastRow } from '../../types/CheatsheetCastRow';
import _ = require('lodash');
import { TriggerTime } from '../../types/triggers/TriggerTime';

interface CheatsheetViewProps {
  state: CheatsheetState;
}
export function CheatsheetView(props: CheatsheetViewProps): JSX.Element {
  const styles = useStyles();
  const mastermindAbilities = getMastermindAbilities(props.state).map((ma) => (
    <TableRow key={`cs-ma-${uuid.v4()}`}>
      <TableCell>{ma.ability.optional ? 'Optional' : 'Mandatory'}</TableCell>
      <TableCell>{ma.source}</TableCell>
      <TableCell>{ma.ability.effect}</TableCell>
      <TableCell>{ma.ability.timesPerLoop}</TableCell>
      <TableCell>{ma.ability.timesPerDay}</TableCell>
    </TableRow>
  ));

  const triggers = _.sortBy(getTriggers(props.state), (t) => triggerOrder[t.time]).map((t) => (
    <TableRow key={`cs-t-${uuid.v4()}`}>
      <TableCell>{t.time}</TableCell>
      <TableCell>{t.optional ? 'Optional' : 'Mandatory'}</TableCell>
      <TableCell>{t.source}</TableCell>
      <TableCell>{t.effect}</TableCell>
      <TableCell>{t.timesPerLoop}</TableCell>
    </TableRow>
  ));

  return (
    <Paper className={styles.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Mastermind Abilities</Typography>
          <Table size="small" className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell>Optional?</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Effect</TableCell>
                <TableCell>Times Per Loop</TableCell>
                <TableCell>Times Per Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{mastermindAbilities}</TableBody>
          </Table>
          <Typography variant="h6">Triggers</Typography>
          <Table size="small" className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell className={styles.narrowColumn}>Time</TableCell>
                <TableCell className={styles.narrowColumn}>Optional?</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Effect</TableCell>
                <TableCell className={styles.narrowColumn}>Times Per Loop</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{triggers}</TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
}

function getMastermindAbilities(state: CheatsheetState): Array<MastermindAbilityDescription> {
  const fromSubplots = state.subplots.flatMap((sp) =>
    sp.mastermindAbilities.map((ma) => ({
      ability: ma,
      source: `${sp.name} (Subplot)`,
    }))
  );

  const fromCast = findValidCast(state.cast).flatMap((c) =>
    c.role.mastermindAbilities.map((ma) => ({
      ability: ma,
      source: `${c.character.name} (${c.role.name})`,
    }))
  );

  return [...fromSubplots, ...fromCast];
}

function getTriggers(state: CheatsheetState): Array<TriggerDescription> {
  const fromMainPlot: Array<TriggerDescription> = state.mainPlot.rules.map((r) => ({
    time: r.time,
    optional: r.optional,
    winCondition: r.winCondition,
    source: `${state.mainPlot.name} (Main Plot)`,
    effect: r.effect,
    timesPerLoop: r.timesPerLoop,
  }));

  const fromSubplots: Array<TriggerDescription> = state.subplots.flatMap((sp) =>
    sp.rules.map((r) => ({
      time: r.time,
      optional: r.optional,
      winCondition: r.winCondition,
      source: `${sp.name} (Subplot)`,
      effect: r.effect,
      timesPerLoop: r.timesPerLoop,
    }))
  );

  const fromCast: Array<TriggerDescription> = findValidCast(state.cast).flatMap((c) =>
    c.role.abilities.map((a) => ({
      time: a.time,
      optional: a.optional,
      winCondition: a.winCondition,
      source: `${c.character.name} (${c.role.name})`,
      effect: a.effect,
    }))
  );

  return [...fromMainPlot, ...fromSubplots, ...fromCast];
}

// Find just the "maybe" cast members that are actually fully filled out and return them as real cast members.
function findValidCast(cast: Array<CheatsheetCastRow>): Array<CastMember> {
  return cast
    .filter((c) => c.character !== undefined && c.role !== undefined)
    .map((c) => ({
      character: c.character as Character,
      role: c.role as Role,
    }));
}

const triggerOrder: Record<TriggerTime, number> = {
  Always: 1,
  'Loop Start': 2,
  'Day Start': 3,
  'Card Resolve': 4,
  'Mastermind Action Step': 5,
  'Goodwill Ability Step': 6,
  'Incident Step': 7,
  'Day End': 8,
  'Day End (Last Day)': 9,
  'Loop End': 10,
  'On Character Death': 11,
  'When the Loved One Dies': 12,
  'When the Lover Dies': 13,
  'When this Role is to be Revealed': 14,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  narrowColumn: {
    // I dunno
    maxWidth: '10em',
  },
}));
