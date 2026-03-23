import * as React from "react";
import * as _ from "radash";
import { Script } from "../model/Script";
import { Incident } from "../data/types/Incident";
import { Character } from "../data/types/Character";
import { CastMember } from "../model/CastMember";
import * as Icons from "./Icons";
import { m } from "../paraglide/messages";
import { PlotRole } from "../data/types/PlotRole";
import { Paper } from "./components/Paper";

interface ScriptCardProps {
  script: Script;
}

export function Mastermind({ script }: ScriptCardProps): React.JSX.Element {
  const occurrences = describeIncidents(script.cast);

  return (
    <Paper>
      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Icons.Mastermind />
          {m["terms.mastermind"]()}
        </h2>
        <div className="divider my-0" />
        <GeneralInfo script={script} mastermind={true} />
        <Incidents occurrences={occurrences} mastermind={true} />
        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <Icons.Cast />
            {m["terms.cast"]()}
          </h3>
          <table className="table table-sm">
            <thead>
              <tr>
                <td>{m["terms.character"]({ count: 1 })}</td>
                <td>{m["terms.role"]({ count: 1 })}</td>
              </tr>
            </thead>
            <tbody>
              {_.alphabetical(script.cast, (c) => c.character.name()).map((c) => (
                <tr key={`cast-${c.id}`}>
                  <td>
                    <CastMemberName castMember={c} />
                  </td>
                  <td>{c.role.name()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Paper>
  );
}

export function Players({ script }: ScriptCardProps): React.JSX.Element {
  const occurrences = describeIncidents(script.cast);

  return (
    <Paper>
      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Icons.Players />
          {m["terms.player"]({ count: 2 })}
        </h2>
        <div className="divider my-0" />
        <GeneralInfo script={script} mastermind={false} />
        <Incidents occurrences={occurrences} mastermind={false} />
        <TraitorWinConditions script={script} />
      </div>
    </Paper>
  );
}

interface GeneralInfoProps {
  mastermind: boolean;
  script: Script;
}
function GeneralInfo({ mastermind, script }: GeneralInfoProps): React.JSX.Element {
  return (
    <table className="table table-sm">
      <tbody>
        <tr>
          <th>{m["terms.tragedySet"]()}</th>
          <td>{script.tragedySet.name()}</td>
        </tr>
        <tr>
          <th>{m["terms.castSize"]()}</th>
          <td>{script.cast.length}</td>
        </tr>
        <tr>
          <th>{m["terms.loops"]()}</th>
          <td>{script.loops}</td>
        </tr>
        <MastermindOnly
          mastermind={mastermind}
          render={() => (
            <>
              <tr>
                <th>{m["terms.mainPlot"]()}</th>
                <td>{script.mainPlot.name()}</td>
              </tr>
              {script.subplots.map((subplot, i) => (
                <tr key={`subplot-${i}-${subplot.id}`}>
                  <th>{i === 0 ? m["terms.subplot"]({ count: script.subplots.length }) : ""}</th>
                  <td>{subplot.name()}</td>
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
  return (
    <div className="flex flex-col gap-2">
      <h3 className="flex items-center gap-2 text-xl font-semibold">
        <Icons.Incidents />
        {m["terms.incident"]({ count: occurrences.length })}
      </h3>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>{m["terms.day"]({ count: 1 })}</th>
            <th>{m["terms.name"]()}</th>
            <MastermindOnly mastermind={mastermind} render={() => <th>{m["terms.culprit"]()}</th>} />
          </tr>
        </thead>
        <tbody>
          {_.sort(occurrences, (o) => o.day).map((occurrence) => (
            <tr key={`occ-${occurrence.id}`}>
              <td>{occurrence.day}</td>
              <td>
                <IncidentName mastermind={mastermind} occurrence={occurrence} />
              </td>
              <MastermindOnly mastermind={mastermind} render={() => <td>{occurrence.character.name()}</td>} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
  const { character } = castMember;
  if (castMember.character.loopToEnter <= 1) {
    return <>{character.name()}</>;
  }
  return (
    <>
      {character.name()} {m["terms.entersOnLoop"]({ loop: character.loopToEnter })}
    </>
  );
}

interface IncidentMetadata {
  id: string;
  day: number;
  incident: Incident;
  fakeIncident?: Incident;
  character: Character;
  role: PlotRole;
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
  // If there's no fake incident, we're done. Just say what it's called.
  if (occurrence.fakeIncident === undefined) {
    return <>{occurrence.incident.name()}</>;
  }
  // By now, we know this incident has been faked.
  if (mastermind) {
    // Masterminds know what the fake incident actually is.
    return (
      <>
        {occurrence.incident.name()} ({occurrence.fakeIncident.name()})
      </>
    );
  }
  // Players only see the fake incident.
  return <>{occurrence.fakeIncident.name()}</>;
}

interface TraitorWinConditionProps {
  script: Script;
}
function TraitorWinConditions(props: TraitorWinConditionProps): React.JSX.Element {
  const traitorWinConditions = props.script
    .plots()
    .flatMap((plot) => plot.plotRules)
    .filter((pr) => pr.winConditionForTraitor !== undefined);

  // Only show this if there's a traitor win condition!
  if (traitorWinConditions.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="flex items-center gap-2 text-xl font-semibold">
        <Icons.TraitorWinConditions />
        {m["terms.traitorWinCondition"]({ count: traitorWinConditions.length })}
      </h3>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Traitor</th>
            <th>Trigger</th>
            <th>Rule</th>
          </tr>
        </thead>
        <tbody>
          {_.alphabetical(traitorWinConditions, (wc) => wc.winConditionForTraitor ?? "").map((wc) => (
            <tr key={`wc-${wc.id}`}>
              <td>{wc.winConditionForTraitor}</td>
              <td>{wc.trigger.description()}</td>
              <td>{wc.effect()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
