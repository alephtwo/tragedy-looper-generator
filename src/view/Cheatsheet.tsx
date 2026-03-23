import * as React from "react";
import * as _ from "radash";
import { Script } from "../model/Script";
import { Plot } from "../data/types/Plot";
import { RoleAbility } from "../data/types/RoleAbility";
import { MastermindAbility } from "../data/types/MastermindAbility";
import { CastMember } from "../model/CastMember";
import { IncidentOccurrence } from "../model/IncidentOccurrence";
import { PlotRule } from "../data/types/PlotRule";
import { Incident } from "../data/types/Incident";
import * as Icons from "./Icons";
import { m } from "../paraglide/messages";
import { Role } from "../data/types/Role";
import { Paper } from "./components/Paper";

interface CheatsheetProps {
  script: Script;
}
export function Cheatsheet({ script }: CheatsheetProps): React.JSX.Element {
  if (!script.isValid()) {
    return <></>;
  }

  const plots = script.plots();
  const mastermindAbilities = extractMastermindAbilities(script);
  const roleAbilities = extractRoleAbilities(script);
  const allIncidents = script.cast.flatMap((c) => {
    return c.incidentTriggers.map((it) => ({
      castMember: c,
      incidentTrigger: it,
    }));
  });

  return (
    <Paper>
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Icons.Cheatsheet />
          {m["scaffolding.cheatsheet"]()}
        </h2>
        <div className="divider my-0" />
        <WinConditions plots={plots} roleAbilities={roleAbilities} incidents={allIncidents} />
        <PlotRules plots={plots} />
        <MastermindAbilities mastermindAbilities={mastermindAbilities} />
        <RoleAbilities roleAbilities={roleAbilities} />
        <Incidents incidents={allIncidents} />
      </div>
    </Paper>
  );
}

interface WinConditionsProps {
  plots: Array<Plot>;
  roleAbilities: Array<RoleAbilityTrigger>;
  incidents: Array<CastMemberIncidentTrigger>;
}
function WinConditions(props: WinConditionsProps): React.JSX.Element {
  const fromPlotRules: Array<PlotRule> = props.plots
    .flatMap((p) => p.plotRules)
    .filter((pr) => pr.winCondition === true);

  const fromRoleAbilities: Array<RoleAbilityTrigger> = props.roleAbilities.filter(
    (ra) => ra.ability.winCondition === true,
  );

  const fromIncidents: Array<Incident> = props.incidents
    .map((i) => i.incidentTrigger.incident)
    .filter((i) => i.winCondition === true);

  return (
    <>
      <h3 className="flex items-center gap-2 text-xl font-semibold">
        <Icons.WinConditions />
        {m["terms.winConditions"]()}
      </h3>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>{m["terms.mechanic"]()}</th>
            <th>{m["terms.source"]()}</th>
            <th>{m["terms.trigger"]()}</th>
            <th>{m["terms.effect"]()}</th>
          </tr>
        </thead>
        <tbody>
          {_.unique(fromPlotRules, (pr) => pr.id).map((pr) => (
            <tr key={`wc-${pr.id}`}>
              <td>{m["terms.plotRule"]({ count: 1 })}</td>
              <td></td>
              <td>{pr.trigger.description()}</td>
              <td>{pr.effect()}</td>
            </tr>
          ))}
          {sortRoleAbilities(uniqueAbilityAndCastMember(fromRoleAbilities)).map((ra) => (
            <tr key={`wc-${ra.ability.id}-${ra.castMember.id}`}>
              <td>{m["terms.roleAbility"]({ count: 1 })}</td>
              <td>
                <CastMemberDescription castMember={ra.castMember} />
              </td>
              <td>{ra.ability.triggers.map((trigger) => trigger.description()).join(", ")}</td>
              <td>{ra.ability.effect()}</td>
            </tr>
          ))}
          {_.unique(fromIncidents, (i) => i.id).map((i) => (
            <tr key={`wc-${i.id}`}>
              <td>{m["terms.incident"]({ count: 1 })}</td>
              <td>{i.name()}</td>
              <td />
              <td>{i.effect()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

interface PlotRulesProps {
  plots: Array<Plot>;
}
function PlotRules(props: PlotRulesProps): React.JSX.Element {
  const plotRules = props.plots.flatMap((plot) =>
    plot.plotRules.map((pr) => ({
      plotId: plot.id,
      ruleId: pr.id,
      plot: plot.name,
      rule: pr.effect,
    })),
  );
  if (plotRules.length === 0) {
    return <></>;
  }

  return (
    <>
      <h3 className="flex items-center gap-2 text-xl font-semibold">
        <Icons.PlotRules />
        {m["terms.plotRule"]({ count: 2 })}
      </h3>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>{m["terms.plot"]()}</th>
            <th>{m["terms.effect"]()}</th>
          </tr>
        </thead>
        <tbody>
          {_.alphabetical(plotRules, (pr) => pr.plot()).map((pr) => (
            <tr key={`plotrule-${pr.plotId}-${pr.ruleId}`}>
              <td>{pr.plot()}</td>
              <td>{pr.rule()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

interface MastermindAbilitiesProps {
  mastermindAbilities: Array<MastermindAbilityTrigger>;
}
function MastermindAbilities({ mastermindAbilities }: MastermindAbilitiesProps): React.JSX.Element {
  if (mastermindAbilities.length === 0) {
    return <></>;
  }
  return (
    <>
      <h3 className="flex items-center gap-2 text-xl font-semibold">
        <Icons.MastermindAbilities />
        {m["terms.mastermindAbilities"]()}
      </h3>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>{m["terms.mandatory"]()}</th>
            <th>{m["terms.triggeredBy"]()}</th>
            <th>{m["terms.effect"]()}</th>
            <th>{m["terms.perDay"]()}</th>
            <th>{m["terms.perLoop"]()}</th>
          </tr>
        </thead>
        <tbody>
          {mastermindAbilities.map((mat, i) => (
            <tr key={`cheatsheet-ma-${i}`}>
              <td>{m[mat.ability.optional ? "terms.optional" : "terms.mandatory"]()}</td>
              <td>
                <MastermindAbilityTriggerer mastermindAbility={mat} />
              </td>
              <td>{mat.ability.effect()}</td>
              <td>{mat.ability.timesPerDay}</td>
              <td>{mat.ability.timesPerLoop}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

interface RoleAbilitiesProps {
  roleAbilities: Array<RoleAbilityTrigger>;
}
function RoleAbilities({ roleAbilities }: RoleAbilitiesProps): React.JSX.Element {
  return (
    <>
      <h3 className="flex items-center gap-2 text-xl font-semibold">
        <Icons.RoleAbilities />
        {m["terms.roleAbility"]({ count: roleAbilities.length })}
      </h3>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>{m["terms.trigger"]()}</th>
            <th>{m["terms.mandatory"]()}</th>
            <th>{m["terms.triggeredBy"]()}</th>
            <th>{m["terms.effect"]()}</th>
            <th>{m["terms.perLoop"]()}</th>
          </tr>
        </thead>
        <tbody>
          {sortRoleAbilities(roleAbilities).map((a, i) => (
            <tr key={`cheatsheet-ra-${i}`}>
              <td>{a.ability.triggers.map((trigger) => trigger.description()).join(", ")}</td>
              <td>{m[a.ability.optional ? "terms.optional" : "terms.mandatory"]()}</td>
              <td>
                <CastMemberDescription castMember={a.castMember} triggeringRole={a.grantedBy} />
              </td>
              <td>{a.ability.effect()}</td>
              <td>{a.ability.timesPerLoop}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

interface IncidentsProps {
  incidents: Array<CastMemberIncidentTrigger>;
}
function Incidents({ incidents }: IncidentsProps): React.JSX.Element {
  if (incidents.length === 0) {
    return <></>;
  }

  return (
    <>
      <h3 className="flex items-center gap-2 text-xl font-semibold">
        <Icons.Incidents />
        {m["terms.incident"]({ count: incidents.length })}
      </h3>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>{m["terms.day"]({ count: 1 })}</th>
            <th>{m["terms.incident"]({ count: 1 })}</th>
            <th>{m["terms.culprit"]()}</th>
            <th>{m["terms.effect"]()}</th>
          </tr>
        </thead>
        <tbody>
          {_.sort(incidents, (i) => i.incidentTrigger.day).map(({ castMember, incidentTrigger }) => (
            <tr key={`cheatsheet-i-${incidentTrigger.id}`}>
              <td>{incidentTrigger.day}</td>
              <td>{incidentTrigger.incident.name()}</td>
              <td>
                <CastMemberDescription castMember={castMember} />
              </td>
              <td>{incidentTrigger.incident.effect()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function sortRoleAbilities(roleAbilities: Array<RoleAbilityTrigger>): Array<RoleAbilityTrigger> {
  return _.sort(roleAbilities, (a) => _.max(a.ability.triggers.map((trigger) => trigger.order)) ?? 0);
}

// This is a gross hack but it works.
// We want to take a list of triggers and make sure we unique-ify it based
// on the cast member and associated ability.
function uniqueAbilityAndCastMember(triggers: Array<RoleAbilityTrigger>): Array<RoleAbilityTrigger> {
  const seen = new Set<string>();
  const uniques: Array<RoleAbilityTrigger> = [];

  triggers.forEach((trigger) => {
    const json = JSON.stringify({ ability: trigger.ability.id, castMember: trigger.castMember.id });
    if (!seen.has(json)) {
      uniques.push(trigger);
      seen.add(json);
    }
  });

  return uniques;
}

function extractMastermindAbilities(script: Script): Array<MastermindAbilityTrigger> {
  const fromPlots: Array<MastermindAbilityTrigger> = script.plots().flatMap((p) => {
    return p.mastermindAbilities.map((ma) => ({
      ability: ma,
      plot: p,
    }));
  });
  const fromRoles: Array<MastermindAbilityTrigger> = script.cast.flatMap((c) => {
    return c.role.mastermindAbilities().map(({ grantedBy, ability }) => ({
      grantedBy,
      ability,
      castMember: c,
    }));
  });
  return fromPlots.concat(fromRoles);
}

function extractRoleAbilities(script: Script): Array<RoleAbilityTrigger> {
  return script.cast.flatMap((c) => {
    return c.role.abilities().map(({ grantedBy, ability }) => ({
      grantedBy,
      ability,
      castMember: c,
    }));
  });
}

interface CastMemberDescriptionProps {
  castMember: CastMember;
  triggeringRole?: Role;
}
function CastMemberDescription({ castMember, triggeringRole }: CastMemberDescriptionProps): React.JSX.Element {
  return (
    <>
      {castMember.character.name()} ({castMember.role.name(triggeringRole)})
    </>
  );
}

interface MastermindAbilityTriggererProps {
  mastermindAbility: MastermindAbilityTrigger;
}
function MastermindAbilityTriggerer({ mastermindAbility }: MastermindAbilityTriggererProps): React.JSX.Element {
  // If a cast member is defined, use it
  if (mastermindAbility.castMember !== undefined) {
    return (
      <CastMemberDescription castMember={mastermindAbility.castMember} triggeringRole={mastermindAbility.grantedBy} />
    );
  }
  // check plot next
  if (mastermindAbility.plot !== undefined) {
    return <>{mastermindAbility.plot.name()}</>;
  }
  return <></>;
}

interface MastermindAbilityTrigger {
  grantedBy?: Role;
  ability: MastermindAbility;
  castMember?: CastMember;
  plot?: Plot;
}

interface RoleAbilityTrigger {
  grantedBy: Role;
  ability: RoleAbility;
  castMember: CastMember;
}

interface CastMemberIncidentTrigger {
  castMember: CastMember;
  incidentTrigger: IncidentOccurrence;
}
