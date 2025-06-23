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
import { Box, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import * as Icons from "./Icons";
import { RoleName } from "./RoleName";
import { m } from "../paraglide/messages";

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
    <Paper variant="transparent" sx={{ padding: 2 }} elevation={1}>
      <Box sx={styles.section}>
        <Typography variant="h2" sx={styles.headerWithIcon}>
          <Icons.Cheatsheet />
          {m["scaffolding.cheatsheet"]()}
        </Typography>
        <Divider variant="fullWidth" />
        <WinConditions plots={plots} roleAbilities={roleAbilities} incidents={allIncidents} />
        <PlotRules plots={plots} />
        <MastermindAbilities mastermindAbilities={mastermindAbilities} />
        <RoleAbilities roleAbilities={roleAbilities} />
        <Incidents incidents={allIncidents} />
      </Box>
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
      <Typography variant="h3" sx={styles.headerWithIcon}>
        <Icons.WinConditions />
        {m["terms.winConditions"]()}
      </Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell variant="head">{m["terms.mechanic"]()}</TableCell>
            <TableCell variant="head">{m["terms.source"]()}</TableCell>
            <TableCell variant="head">{m["terms.trigger"]()}</TableCell>
            <TableCell variant="head">{m["terms.effect"]()}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.unique(fromPlotRules, (pr) => pr.id).map((pr) => (
            <TableRow key={`wc-${pr.id}`}>
              <TableCell>{m["terms.plotRule"]({ count: 1 })}</TableCell>
              <TableCell></TableCell>
              <TableCell>{pr.trigger.description()}</TableCell>
              <TableCell>{pr.effect()}</TableCell>
            </TableRow>
          ))}
          {sortRoleAbilities(uniqueAbilityAndCastMember(fromRoleAbilities)).map((ra) => (
            <TableRow key={`wc-${ra.ability.id}-${ra.castMember.id}`}>
              <TableCell>{m["terms.roleAbility"]({ count: 1 })}</TableCell>
              <TableCell>
                <CastMemberDescription castMember={ra.castMember} />
              </TableCell>
              <TableCell>{ra.ability.triggers.map((trigger) => trigger.description()).join(", ")}</TableCell>
              <TableCell>{ra.ability.effect()}</TableCell>
            </TableRow>
          ))}
          {_.unique(fromIncidents, (i) => i.id).map((i) => (
            <TableRow key={`wc-${i.id}`}>
              <TableCell>{m["terms.incident"]({ count: 1 })}</TableCell>
              <TableCell>{i.name()}</TableCell>
              <TableCell />
              <TableCell>{i.effect()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
  return (
    <>
      <Typography variant="h3" sx={styles.headerWithIcon}>
        <Icons.PlotRules />
        {m["terms.plotRule"]({ count: 2 })}
      </Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell variant="head">{m["terms.plot"]()}</TableCell>
            <TableCell variant="head">{m["terms.effect"]()}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.alphabetical(plotRules, (pr) => pr.plot()).map((pr) => (
            <TableRow key={`plotrule-${pr.plotId}-${pr.ruleId}`}>
              <TableCell>{pr.plot()}</TableCell>
              <TableCell>{pr.rule()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

interface MastermindAbilitiesProps {
  mastermindAbilities: Array<MastermindAbilityTrigger>;
}
function MastermindAbilities({ mastermindAbilities }: MastermindAbilitiesProps): React.JSX.Element {
  return (
    <>
      <Typography variant="h3" sx={styles.headerWithIcon}>
        <Icons.MastermindAbilities />
        {m["terms.mastermindAbilities"]()}
      </Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell variant="head">{m["terms.mandatory"]()}</TableCell>
            <TableCell variant="head">{m["terms.triggeredBy"]()}</TableCell>
            <TableCell variant="head">{m["terms.effect"]()}</TableCell>
            <TableCell variant="head">{m["terms.perDay"]()}</TableCell>
            <TableCell variant="head">{m["terms.perLoop"]()}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mastermindAbilities.map((mat, i) => (
            <TableRow key={`cheatsheet-ma-${i}`}>
              <TableCell>{m[mat.ability.optional ? "terms.optional" : "terms.mandatory"]()}</TableCell>
              <TableCell>
                <MastermindAbilityTriggerer mastermindAbility={mat} />
              </TableCell>
              <TableCell>{mat.ability.effect()}</TableCell>
              <TableCell>{mat.ability.timesPerDay}</TableCell>
              <TableCell>{mat.ability.timesPerLoop}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

interface RoleAbilitiesProps {
  roleAbilities: Array<RoleAbilityTrigger>;
}
function RoleAbilities({ roleAbilities }: RoleAbilitiesProps): React.JSX.Element {
  return (
    <>
      <Typography variant="h3" sx={styles.headerWithIcon}>
        <Icons.RoleAbilities />
        {m["terms.roleAbility"]({ count: roleAbilities.length })}
      </Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell variant="head">{m["terms.trigger"]()}</TableCell>
            <TableCell variant="head">{m["terms.mandatory"]()}</TableCell>
            <TableCell variant="head">{m["terms.triggeredBy"]()}</TableCell>
            <TableCell variant="head">{m["terms.effect"]()}</TableCell>
            <TableCell variant="head">{m["terms.perLoop"]()}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortRoleAbilities(roleAbilities).map((a, i) => (
            <TableRow key={`cheatsheet-ra-${i}`}>
              <TableCell>{a.ability.triggers.map((trigger) => trigger.description()).join(", ")}</TableCell>
              <TableCell>{m[a.ability.optional ? "terms.optional" : "terms.mandatory"]()}</TableCell>
              <TableCell>
                <CastMemberDescription castMember={a.castMember} />
              </TableCell>
              <TableCell>{a.ability.effect()}</TableCell>
              <TableCell>{a.ability.timesPerLoop}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
      <Typography variant="h3" sx={styles.headerWithIcon}>
        <Icons.Incidents />
        {m["terms.incident"]({ count: incidents.length })}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell variant="head">{m["terms.day"]({ count: 1 })}</TableCell>
            <TableCell variant="head">{m["terms.incident"]({ count: 1 })}</TableCell>
            <TableCell variant="head">{m["terms.culprit"]()}</TableCell>
            <TableCell variant="head">{m["terms.effect"]()}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.sort(incidents, (i) => i.incidentTrigger.day).map(({ castMember, incidentTrigger }) => (
            <TableRow key={`cheatsheet-i-${incidentTrigger.id}`}>
              <TableCell>{incidentTrigger.day}</TableCell>
              <TableCell>{incidentTrigger.incident.name()}</TableCell>
              <TableCell>
                <CastMemberDescription castMember={castMember} />
              </TableCell>
              <TableCell>{incidentTrigger.incident.effect()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    return c.role.mastermindAbilities.map((ma) => ({
      ability: ma,
      castMember: c,
    }));
  });
  return fromPlots.concat(fromRoles);
}

function extractRoleAbilities(script: Script): Array<RoleAbilityTrigger> {
  return script.cast.flatMap((c) => {
    return c.role.abilities.map((a) => ({
      ability: a,
      castMember: c,
    }));
  });
}

interface CastMemberDescriptionProps {
  castMember: CastMember;
}
function CastMemberDescription({ castMember }: CastMemberDescriptionProps): React.JSX.Element {
  return (
    <>
      {castMember.character.name()} (<RoleName role={castMember.role} />)
    </>
  );
}

interface MastermindAbilityTriggererProps {
  mastermindAbility: MastermindAbilityTrigger;
}
function MastermindAbilityTriggerer({ mastermindAbility }: MastermindAbilityTriggererProps): React.JSX.Element {
  // If a cast member is defined, use it
  if (mastermindAbility.castMember !== undefined) {
    return <CastMemberDescription castMember={mastermindAbility.castMember} />;
  }
  // check plot next
  if (mastermindAbility.plot !== undefined) {
    return <>{mastermindAbility.plot.name()}</>;
  }
  return <></>;
}

interface MastermindAbilityTrigger {
  ability: MastermindAbility;
  castMember?: CastMember;
  plot?: Plot;
}

interface RoleAbilityTrigger {
  ability: RoleAbility;
  castMember: CastMember;
}

interface CastMemberIncidentTrigger {
  castMember: CastMember;
  incidentTrigger: IncidentOccurrence;
}

const styles = {
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
