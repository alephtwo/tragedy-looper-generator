import * as React from "react";
import * as _ from "lodash";
import { Divider, Paper, Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { Script } from "../model/Script";
import { CastMember } from "../model/CastMember";
import { Incident } from "../data/types/Incident";
import { Character } from "../data/types/Character";
import { Role } from "../data/types/Role";
import { useTranslation } from "react-i18next";

interface ReferenceCardProps {
  script: Script;
  mastermind: boolean;
}
export function ReferenceCard(props: ReferenceCardProps): JSX.Element {
  const { mastermind, script } = props;
  const { t } = useTranslation();

  return (
    <Paper sx={{ padding: 2, height: "100%" }}>
      <Typography variant="h1" align="center">
        {mastermind ? t("terms.mastermind") : t("terms.player", { count: 2 })}
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
  const { t } = useTranslation();
  const { script } = props;
  return (
    <>
      <TableRow>
        <TableCell variant="head">{t("terms.tragedySet")}</TableCell>
        <TableCell>{t(script.tragedySet.name_i18n_key)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell variant="head">{t("terms.castSize")}</TableCell>
        <TableCell>{script.days}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell variant="head">{t("terms.loops")}</TableCell>
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
  const { t } = useTranslation();

  const subplots = _.sortBy(script.subplots, (s) => t(s.name_i18n_key)).map((s, i) => (
    <TableRow key={`subplot-${s.id}`}>
      <TableCell variant="head">{i === 0 ? t("terms.subplot", { count: script.subplots.length }) : ""}</TableCell>
      <TableCell>{t(s.name_i18n_key)}</TableCell>
    </TableRow>
  ));

  return (
    <>
      <TableRow>
        <TableCell variant="head">{t("terms.mainPlot")}</TableCell>
        <TableCell>{t(props.script.mainPlot.name_i18n_key)}</TableCell>
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
  const { t } = useTranslation();

  // Only the mastermind can see this.
  if (!props.mastermind) {
    return <></>;
  }

  const buildName = (c: CastMember) => {
    const name = t(c.character.name_i18n_key);
    if (c.character.loopToEnter <= 1) {
      return name;
    }
    return `${name} ${t("terms.entersOnLoop", { loop: c.character.loopToEnter })}`;
  };

  const cast = _.sortBy(props.cast, (p) => t(p.character.name_i18n_key)).map((c) => {
    const name = buildName(c);

    return (
      <TableRow key={`cast-${c.id}`}>
        <TableCell>{name}</TableCell>
        <TableCell>{t(c.role.name_i18n_key)}</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <Typography variant="h2">Cast</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>{t("terms.character", { count: 1 })}</TableCell>
            <TableCell>{t("terms.role", { count: 1 })}</TableCell>
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
  const { t } = useTranslation();
  const wrapFakeIncident = (meta: IncidentMetadata) => {
    // If there's no fake incident, we're done. Just say what it's called.
    if (meta.fakeIncident === undefined) {
      return t(meta.incident.name_i18n_key);
    }
    // By now, we know this incident has been faked.
    if (props.mastermind) {
      // Masterminds know what the fake incident actually is.
      return `${t(meta.incident.name_i18n_key)} (${t(meta.fakeIncident.name_i18n_key)})`;
    }
    // Players only see the fake incident.
    return t(meta.fakeIncident.name_i18n_key);
  };

  const incidents = _.sortBy(describeIncidents(props.cast), (i) => i.day).map((i) => (
    <TableRow key={`${props.mastermind ? "m" : "c"}-${i.id}`}>
      <TableCell>{i.day}</TableCell>
      <TableCell>{wrapFakeIncident(i)}</TableCell>
      {props.mastermind ? <TableCell>{t(i.character.name_i18n_key)}</TableCell> : <></>}
    </TableRow>
  ));

  return (
    <>
      <Typography variant="h2">{t("terms.incident", { count: incidents.length })}</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>{t("terms.day", { count: 1 })}</TableCell>
            <TableCell>{t("terms.name")}</TableCell>
            {props.mastermind ? <TableCell>{t("terms.culprit")}</TableCell> : <></>}
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
    }),
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
