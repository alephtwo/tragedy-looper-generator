import { m } from "@i18n/messages";
import * as _ from "radash";

import { Divider } from "@/components/Divider";
import { Paper } from "@/components/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Character } from "../data/types/Character";
import { Incident } from "../data/types/Incident";
import { PlotRole } from "../data/types/PlotRole";
import { CastMember } from "../model/CastMember";
import { Script } from "../model/Script";
import * as Icons from "./Icons";

interface ScriptCardProps {
  script: Script;
}

export function Mastermind({ script }: Readonly<ScriptCardProps>): React.JSX.Element {
  const occurrences = describeIncidents(script.cast);

  return (
    <Paper>
      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Icons.Mastermind />
          {m["terms.mastermind"]()}
        </h2>
        <Divider />
        <GeneralInfo script={script} mastermind={true} />
        <Incidents occurrences={occurrences} mastermind={true} />
        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <Icons.Cast />
            {m["terms.cast"]()}
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">{m["terms.character"]({ count: 1 })}</TableHead>
                <TableHead className="font-bold">{m["terms.role"]({ count: 1 })}</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {_.alphabetical(script.cast, (c) => c.character.name()).map((c) => (
                <TableRow key={`cast-${c.id}`}>
                  <TableCell>
                    <CastMemberName castMember={c} />
                  </TableCell>
                  <TableCell>{c.role.name()}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Paper>
  );
}

export function Players({ script }: Readonly<ScriptCardProps>): React.JSX.Element {
  const occurrences = describeIncidents(script.cast);

  return (
    <Paper>
      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Icons.Players />
          {m["terms.player"]({ count: 2 })}
        </h2>
        <Divider />
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
function GeneralInfo({ mastermind, script }: Readonly<GeneralInfoProps>): React.JSX.Element {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead className="font-bold">{m["terms.tragedySet"]()}</TableHead>
          <TableCell>{script.tragedySet.name()}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="font-bold">{m["terms.castSize"]()}</TableHead>
          <TableCell>{script.cast.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="font-bold">{m["terms.loops"]()}</TableHead>
          <TableCell>{script.loops}</TableCell>
        </TableRow>
        <MastermindOnly
          mastermind={mastermind}
          render={() => (
            <>
              <TableRow>
                <TableHead className="font-bold">{m["terms.mainPlot"]()}</TableHead>
                <TableCell>{script.mainPlot.name()}</TableCell>
              </TableRow>
              {script.subplots.map((subplot, i) => (
                <TableRow key={`subplot-${i}-${subplot.id}`}>
                  <TableHead>
                    {i === 0 ? m["terms.subplot"]({ count: script.subplots.length }) : ""}
                  </TableHead>
                  <TableCell>{subplot.name()}</TableCell>
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
function Incidents({ mastermind, occurrences }: Readonly<IncidentsProps>): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="flex items-center gap-2 text-xl font-semibold">
        <Icons.Incidents />
        {m["terms.incident"]({ count: occurrences.length })}
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">{m["terms.day"]({ count: 1 })}</TableHead>
            <TableHead className="font-bold">{m["terms.name"]()}</TableHead>
            <MastermindOnly
              mastermind={mastermind}
              render={() => <TableHead>{m["terms.culprit"]()}</TableHead>}
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {_.sort(occurrences, (o) => o.day).map((occurrence) => (
            <TableRow key={`occ-${occurrence.id}`}>
              <TableCell>{occurrence.day}</TableCell>
              <TableCell>
                <IncidentName mastermind={mastermind} occurrence={occurrence} />
              </TableCell>
              <MastermindOnly
                mastermind={mastermind}
                render={() => <TableCell>{occurrence.character.name()}</TableCell>}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface MastermindOnlyProps {
  mastermind: boolean;
  // use a render function so that it is lazy
  render: () => React.JSX.Element;
}
function MastermindOnly(props: Readonly<MastermindOnlyProps>): React.JSX.Element {
  if (props.mastermind) {
    return props.render();
  }
  return <></>;
}

interface CastMemberNameProps {
  castMember: CastMember;
}
function CastMemberName({ castMember }: Readonly<CastMemberNameProps>): React.JSX.Element {
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
function IncidentName({ occurrence, mastermind }: Readonly<IncidentNameProps>): React.JSX.Element {
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
function TraitorWinConditions(props: Readonly<TraitorWinConditionProps>): React.JSX.Element {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">{m["terms.traitor"]()}</TableHead>
            <TableHead className="font-bold">{m["terms.trigger"]({ count: 1 })}</TableHead>
            <TableHead className="font-bold">{m["terms.rule"]({ count: 1 })}</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {_.alphabetical(traitorWinConditions, (wc) => wc.winConditionForTraitor ?? "").map(
            (wc) => (
              <tr key={`wc-${wc.id}`}>
                <td>{wc.winConditionForTraitor}</td>
                <td>{wc.trigger.description()}</td>
                <td>{wc.effect()}</td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    </div>
  );
}
