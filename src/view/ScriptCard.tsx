import * as React from "react";
import * as _ from "radash";
import { useTranslation } from "react-i18next";
import { Script } from "../model/Script";
import { Incident } from "../data/types/Incident";
import { Character } from "../data/types/Character";
import { DualRole, Role } from "../data/types/Role";
import { CastMember } from "../model/CastMember";
import { Box, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import * as Icons from "./Icons";
import { RoleName } from "./RoleName";

interface ScriptCardProps {
  script: Script;
}

export function Mastermind({ script }: ScriptCardProps): React.JSX.Element {
  const { t } = useTranslation();
  const occurrences = describeIncidents(script.cast);

  return (
    <Paper variant="transparent" sx={styles.paper} elevation={1}>
      <Box sx={styles.section}>
        <Typography variant="h2" sx={styles.headerWithIcon}>
          <Icons.Mastermind />
          {t("terms.mastermind")}
        </Typography>
        <Divider variant="fullWidth" />
        <GeneralInfo script={script} mastermind={true} />
        <Incidents occurrences={occurrences} mastermind={true} />
        <Box sx={styles.section}>
          <Typography variant="h3" sx={styles.headerWithIcon}>
            <Icons.Cast />
            {t("terms.cast")}
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell variant="head">{t("terms.character", { count: 1 })}</TableCell>
                <TableCell variant="head">{t("terms.role", { count: 1 })}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.alphabetical(script.cast, (c) => t(c.character.name_i18n_key)).map((c) => (
                <TableRow key={`cast-${c.id}`}>
                  <TableCell>
                    <CastMemberName castMember={c} />
                  </TableCell>
                  <TableCell>
                    <RoleName role={c.role} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Paper>
  );
}

export function Players({ script }: ScriptCardProps): React.JSX.Element {
  const { t } = useTranslation();
  const occurrences = describeIncidents(script.cast);

  return (
    <Paper variant="transparent" sx={styles.paper} elevation={1}>
      <Box sx={styles.section}>
        <Typography variant="h2" sx={styles.headerWithIcon}>
          <Icons.Players />
          {t("terms.player", { count: 2 })}
        </Typography>
        <Divider variant="fullWidth" />
        <GeneralInfo script={script} mastermind={false} />
        <Incidents occurrences={occurrences} mastermind={false} />
      </Box>
    </Paper>
  );
}

interface GeneralInfoProps {
  mastermind: boolean;
  script: Script;
}
function GeneralInfo({ mastermind, script }: GeneralInfoProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Table size="small" sx={styles.extraBottomMargin}>
      <TableBody>
        <TableRow>
          <TableCell variant="head">{t("terms.tragedySet")}</TableCell>
          <TableCell>{t(script.tragedySet.name_i18n_key)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">{t("terms.castSize")}</TableCell>
          <TableCell>{script.cast.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">{t("terms.loops")}</TableCell>
          <TableCell>{script.loops}</TableCell>
        </TableRow>
        <MastermindOnly
          mastermind={mastermind}
          render={() => (
            <>
              <TableRow>
                <TableCell variant="head">{t("terms.mainPlot")}</TableCell>
                <TableCell>{t(script.mainPlot.name_i18n_key)}</TableCell>
              </TableRow>
              {script.subplots.map((subplot, i) => (
                <TableRow key={`subplot-${i}-${subplot.id}`}>
                  <TableCell variant="head">
                    {i === 0 ? t("terms.subplot", { count: script.subplots.length }) : ""}
                  </TableCell>
                  <TableCell>{t(subplot.name_i18n_key)}</TableCell>
                </TableRow>
              ))}
            </>
          )}
        />
      </TableBody>
    </Table>
  );
}

interface IncidentsProps {
  mastermind: boolean;
  occurrences: Array<IncidentMetadata>;
}
function Incidents({ mastermind, occurrences }: IncidentsProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Box sx={styles.section}>
      <Typography variant="h3" sx={styles.headerWithIcon}>
        <Icons.Incidents />
        {t("terms.incident", { count: occurrences.length })}
      </Typography>
      <Table size="small" sx={mastermind ? styles.extraBottomMargin : {}}>
        <TableHead>
          <TableRow>
            <TableCell variant="head">{t("terms.day", { count: 1 })}</TableCell>
            <TableCell variant="head">{t("terms.name")}</TableCell>
            <MastermindOnly
              mastermind={mastermind}
              render={() => <TableCell variant="head">{t("terms.culprit")}</TableCell>}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {_.sort(occurrences, (o) => o.day).map((occurrence) => (
            <TableRow key={`occ-${occurrence.id}`}>
              <TableCell>{occurrence.day}</TableCell>
              <TableCell>
                <IncidentName mastermind={mastermind} occurrence={occurrence} />
              </TableCell>
              <MastermindOnly
                mastermind={mastermind}
                render={() => <TableCell>{t(occurrence.character.name_i18n_key)}</TableCell>}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

interface MastermindOnlyProps {
  mastermind: boolean;
  // use a render function so that it is lazy
  render: () => React.JSX.Element;
}
function MastermindOnly(props: MastermindOnlyProps): React.JSX.Element {
  if (props.mastermind) {
    return props.render();
  }
  return <></>;
}

interface CastMemberNameProps {
  castMember: CastMember;
}
function CastMemberName({ castMember }: CastMemberNameProps): React.JSX.Element {
  const { t } = useTranslation();
  const { character } = castMember;
  if (castMember.character.loopToEnter <= 1) {
    return <>{t(character.name_i18n_key)}</>;
  }
  return (
    <>
      {t(character.name_i18n_key)} {t("terms.entersOnLoop", { loop: character.loopToEnter })}
    </>
  );
}

interface IncidentMetadata {
  id: string;
  day: number;
  incident: Incident;
  fakeIncident?: Incident;
  character: Character;
  role: Role | DualRole;
}
// This exists to make some sense of the incidents and make them easily
// displayable. My apologies. It is not the prettiest thing ever.
function describeIncidents(cast: Array<CastMember>): Array<IncidentMetadata> {
  return cast.flatMap((c) =>
    c.incidentTriggers.map((t) => {
      if (t.getFake()) {
        console.debug(t);
      }
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

interface IncidentNameProps {
  occurrence: IncidentMetadata;
  mastermind: boolean;
}
function IncidentName({ occurrence, mastermind }: IncidentNameProps): React.JSX.Element {
  const { t } = useTranslation();

  // If there's no fake incident, we're done. Just say what it's called.
  if (occurrence.fakeIncident === undefined) {
    return <>{t(occurrence.incident.name_i18n_key)}</>;
  }
  // By now, we know this incident has been faked.
  if (mastermind) {
    // Masterminds know what the fake incident actually is.
    return (
      <>
        {t(occurrence.incident.name_i18n_key)} ({t(occurrence.fakeIncident.name_i18n_key)})
      </>
    );
  }
  // Players only see the fake incident.
  return <>{t(occurrence.fakeIncident.name_i18n_key)}</>;
}

const styles = {
  paper: {
    padding: 2,
    height: "100%",
  },
  headerWithIcon: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  extraBottomMargin: {
    marginBottom: 2,
  },
};
