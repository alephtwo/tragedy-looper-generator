import * as React from "react";
import * as _ from "lodash";
import { useTranslation } from "react-i18next";
import { Script } from "../model/Script";
import { Incident } from "../data/types/Incident";
import { Character } from "../data/types/Character";
import { Role } from "../data/types/Role";
import { CastMember } from "../model/CastMember";
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

interface ScriptCardProps {
  script: Script;
}

export function Mastermind({ script }: ScriptCardProps): React.JSX.Element {
  const { t } = useTranslation();
  const occurrences = describeIncidents(script.cast);

  return (
    <Stack gap={1}>
      <Typography variant="h2">{t("terms.mastermind")}</Typography>
      <GeneralInfo script={script} mastermind={true} />
      <Typography variant="h3">{t("terms.incident", { count: 2 })}</Typography>
      <Incidents occurrences={occurrences} mastermind={true} />
      <Typography variant="h3">{t("terms.cast")}</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell variant="head">{t("terms.character", { count: 1 })}</TableCell>
            <TableCell variant="head">{t("terms.role", { count: 1 })}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.sortBy(script.cast, (c) => t(c.character.name_i18n_key)).map((c) => (
            <TableRow key={`cast-${c.id}`}>
              <TableCell>
                <CastMemberName castMember={c} />
              </TableCell>
              <TableCell>{t(c.role.name_i18n_key)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}

export function Players({ script }: ScriptCardProps): React.JSX.Element {
  const { t } = useTranslation();
  const occurrences = describeIncidents(script.cast);

  return (
    <Stack gap={1}>
      <Typography variant="h2">{t("terms.player", { count: 2 })}</Typography>
      <GeneralInfo script={script} mastermind={false} />
      <Typography variant="h3">{t("terms.incident", { count: occurrences.length })}</Typography>
      <Incidents occurrences={occurrences} mastermind={false} />
    </Stack>
  );
}

interface GeneralInfoProps {
  mastermind: boolean;
  script: Script;
}
function GeneralInfo({ mastermind, script }: GeneralInfoProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Table size="small">
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
    <Table size="small">
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
        {_.sortBy(occurrences, (o) => o.day).map((occurrence) => (
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
  role: Role;
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
