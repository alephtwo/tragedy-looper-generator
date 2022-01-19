import * as React from 'react';
import * as _ from 'lodash';
import { Divider, Paper, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
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

  return (
    <Paper sx={{ padding: 2, height: '100%' }}>
      <Typography variant="h1" align="center">
        {mastermind ? 'Mastermind' : 'Players'}
      </Typography>
      <Divider sx={styles.extraBottomMargin} />
      <Table size="small" sx={styles.extraBottomMargin}>
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
        <TableCell variant="head">Days</TableCell>
        <TableCell>{script.days}</TableCell>
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

  const cast = _.sortBy(props.cast, (p) => p.character.name).map((c) => {
    const name =
      c.character.loopToEnter > 1
        ? `${c.character.name} (enters on Loop ${c.character.loopToEnter})`
        : c.character.name;

    return (
      <TableRow key={`cast-${c.id}`}>
        <TableCell>{name}</TableCell>
        <TableCell>{c.role.name}</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <Typography variant="h2">Cast</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
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
  const wrapFakeIncident = (meta: IncidentMetadata) => {
    // If there's no fake incident, we're done. Just say what it's called.
    if (meta.fakeIncident === undefined) {
      return meta.incident.name;
    }
    // By now, we know this incident has been faked.
    if (props.mastermind) {
      // Masterminds know what the fake incident actually is.
      return `${meta.incident.name} (${meta.fakeIncident.name})`;
    }
    // Players only see the fake incident.
    return meta.fakeIncident.name;
  };

  const incidents = _.sortBy(describeIncidents(props.cast), (i) => i.day).map((i) => (
    <TableRow key={`${props.mastermind ? 'm' : 'c'}-${i.id}`}>
      <TableCell>{i.day}</TableCell>
      <TableCell>{wrapFakeIncident(i)}</TableCell>
      {props.mastermind ? <TableCell>{i.character.name}</TableCell> : <></>}
    </TableRow>
  ));

  return (
    <>
      <Typography variant="h2">Incidents</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
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
  id: string;
  day: number;
  incident: Incident;
  fakeIncident?: Incident;
  character: Character;
  role: Role;
}
function describeIncidents(cast: Array<CastMember>): Array<IncidentMetadata> {
  return cast.flatMap((c) =>
    c.incidentTriggers.map((t) => {
      return {
        id: t.id,
        day: t.day,
        incident: t.incident,
        fakeIncident: t.getFake(),
        character: c.character,
        role: c.role,
      };
    })
  );
}

const styles = {
  paper: {
    padding: 2,
  },
  extraBottomMargin: {
    marginBottom: 2,
  },
};
