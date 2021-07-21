import * as React from 'react';
import * as _ from 'lodash';
import {
  Divider,
  makeStyles,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import { Script } from '../types/Script';
import { CastMember } from '../types/CastMember';
import { Incident } from '../types/data/Incident';
import { Character } from '../types/data/Character';
import { Role } from '../types/data/Role';

interface ReferenceCardProps {
  script: Script;
  mastermind: boolean;
}
export function ReferenceCard(props: ReferenceCardProps): JSX.Element {
  const { mastermind, script } = props;
  const styles = useStyles();

  return (
    <Paper className={`${styles.paper} ${styles.fullHeight}`}>
      <Typography variant="h1" align="center">
        {mastermind ? 'Mastermind' : 'Players'}
      </Typography>
      <Divider className={styles.extraBottomMargin} />
      <Table size="small" className={styles.extraBottomMargin}>
        <TableBody>
          <TragedySetInformation script={script} />
          <PlotInformation script={script} mastermind={mastermind} />
        </TableBody>
      </Table>
      <CastInformation cast={script.cast} mastermind={mastermind} />
      <IncidentsInformation cast={script.cast} mastermind={mastermind} />
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
  const subplots = _.sortBy(script.subplots, (s) => s.name).map((s, i) => (
    <TableRow key={`subplot-${s.id}`}>
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

interface CastMembersProps {
  cast: Array<CastMember>;
  mastermind: boolean;
}
function CastInformation(props: CastMembersProps): JSX.Element {
  // Only the mastermind can see this.
  if (!props.mastermind) {
    return <></>;
  }

  const styles = useStyles();
  const cast = _.sortBy(props.cast, (p) => p.character.name).map((c) => (
    <TableRow key={`cast-${c.character.id}`}>
      <TableCell>{c.character.name}</TableCell>
      <TableCell>{c.role.name}</TableCell>
    </TableRow>
  ));

  return (
    <>
      <Typography variant="h2">Cast</Typography>
      <Table size="small" className={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>Character</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{cast}</TableBody>
      </Table>
    </>
  );
}

interface IncidentsInformationProps {
  cast: Array<CastMember>;
  mastermind: boolean;
}
function IncidentsInformation(props: IncidentsInformationProps) {
  const styles = useStyles();
  const incidents = _.sortBy(describeIncidents(props.cast), (i) => i.day).map((i) => (
    <TableRow key={`${props.mastermind ? 'm' : 'c'}-${i.incident.id}`}>
      <TableCell>{i.day}</TableCell>
      <TableCell>{i.incident.name}</TableCell>
      {props.mastermind ? <TableCell>{i.character.name}</TableCell> : <></>}
    </TableRow>
  ));

  return (
    <>
      <Typography variant="h2">Incidents</Typography>
      <Table size="small" className={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Name</TableCell>
            {props.mastermind ? <TableCell>Culprit</TableCell> : <></>}
          </TableRow>
        </TableHead>
        <TableBody>{incidents}</TableBody>
      </Table>
    </>
  );
}

interface IncidentMetadata {
  day: number;
  incident: Incident;
  character: Character;
  role: Role;
}
function describeIncidents(cast: Array<CastMember>): Array<IncidentMetadata> {
  return cast.flatMap((c) =>
    // TODO: Handle fake incidents
    c.incidentTriggers.map((t) => ({
      day: t.day,
      incident: t.incident,
      character: c.character,
      role: c.role,
    }))
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  fullHeight: {
    height: '100%',
  },
  extraBottomMargin: {
    marginBottom: theme.spacing(2),
  },
}));
