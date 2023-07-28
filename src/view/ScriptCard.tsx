import * as React from "react";
import * as _ from "lodash";
import { useTranslation } from "react-i18next";
import { Script } from "../model/Script";
import { Incident } from "../data/types/Incident";
import { Character } from "../data/types/Character";
import { Role } from "../data/types/Role";
import { CastMember } from "../model/CastMember";

interface ScriptCardProps {
  script: Script;
}

export function Mastermind({ script }: ScriptCardProps): React.JSX.Element {
  const { t } = useTranslation();
  const occurrences = describeIncidents(script.cast);

  return (
    <div className="p-2 bg-red-500">
      <h1>{t("terms.mastermind")}</h1>
      <GeneralInfo script={script} mastermind={true} />
      <Incidents occurrences={occurrences} mastermind={true} />
      <h1>{t("terms.cast")}</h1>
      <table>
        <thead>
          <tr>
            <th>{t("terms.character", { count: 1 })}</th>
            <th>{t("terms.role", { count: 1 })}</th>
          </tr>
        </thead>
        <tbody>
          {_.sortBy(script.cast, (c) => t(c.character.name_i18n_key)).map((c) => (
            <tr key={`cast-${c.id}`}>
              <td>
                <CastMemberName castMember={c} />
              </td>
              <td>{t(c.role.name_i18n_key)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Players({ script }: ScriptCardProps): React.JSX.Element {
  const { t } = useTranslation();
  const occurrences = describeIncidents(script.cast);

  return (
    <div className="p-2 bg-green-500">
      <h1>{t("terms.player", { count: 2 })}</h1>
      <GeneralInfo script={script} mastermind={false} />
      <h1>{t("terms.incident", { count: occurrences.length })}</h1>
      <Incidents occurrences={occurrences} mastermind={false} />
    </div>
  );
}

interface GeneralInfoProps {
  mastermind: boolean;
  script: Script;
}
function GeneralInfo({ mastermind, script }: GeneralInfoProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <table className="table-auto">
      <tbody>
        <tr>
          <th>{t("terms.tragedySet")}</th>
          <td>{t(script.tragedySet.name_i18n_key)}</td>
        </tr>
        <tr>
          <th>{t("terms.castSize")}</th>
          <td>{script.cast.length}</td>
        </tr>
        <tr>
          <th>{t("terms.loops")}</th>
          <td>{script.loops}</td>
        </tr>
        <MastermindOnly
          mastermind={mastermind}
          render={() => (
            <>
              <tr>
                <th>{t("terms.mainPlot")}</th>
                <td>{t(script.mainPlot.name_i18n_key)}</td>
              </tr>
              {script.subplots.map((subplot, i) => (
                <tr key={`subplot-${i}-${subplot.id}`}>
                  <th>{i === 0 ? t("terms.subplot", { count: script.subplots.length }) : ""}</th>
                  <td>{t(subplot.name_i18n_key)}</td>
                </tr>
              ))}
            </>
          )}
        />
      </tbody>
    </table>
  );
}

interface IncidentsProps {
  mastermind: boolean;
  occurrences: Array<IncidentMetadata>;
}
function Incidents({ mastermind, occurrences }: IncidentsProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>{t("terms.day", { count: 1 })}</th>
          <th>{t("terms.name")}</th>
          <MastermindOnly mastermind={mastermind} render={() => <th>{t("terms.culprit")}</th>} />
        </tr>
      </thead>
      <tbody>
        {_.sortBy(occurrences, (o) => o.day).map((occurrence) => (
          <tr key={`occ-${occurrence.id}`}>
            <td>{occurrence.day}</td>
            <td>
              <IncidentName mastermind={mastermind} occurrence={occurrence} />
            </td>
            <MastermindOnly mastermind={mastermind} render={() => <td>{t(occurrence.character.name_i18n_key)}</td>} />
          </tr>
        ))}
      </tbody>
    </table>
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
