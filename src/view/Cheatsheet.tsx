import * as React from "react";
import * as _ from "radash";
import { useTranslation } from "react-i18next";
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

interface CheatsheetProps {
  script: Script;
}
export function Cheatsheet({ script }: CheatsheetProps): React.JSX.Element {
  const { t } = useTranslation();
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
          {t("scaffolding.cheatsheet")}
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
  const { t } = useTranslation();
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
        {t("terms.winConditions")}
      </Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell variant="head">{t("terms.mechanic")}</TableCell>
            <TableCell variant="head">{t("terms.source")}</TableCell>
            <TableCell variant="head">{t("terms.trigger")}</TableCell>
            <TableCell variant="head">{t("terms.effect")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.unique(fromPlotRules, (pr) => pr.id).map((pr) => (
            <TableRow key={`wc-${pr.id}`}>
              <TableCell>{t("terms.plotRule", { count: 1 })}</TableCell>
              <TableCell></TableCell>
              <TableCell>{t(pr.trigger.description_i18n_key)}</TableCell>
              <TableCell>{t(pr.effect_i18n_key)}</TableCell>
            </TableRow>
          ))}
          {sortRoleAbilities(uniqueAbilityAndCastMember(fromRoleAbilities)).map((ra) => (
            <TableRow key={`wc-${ra.ability.id}-${ra.castMember.id}`}>
              <TableCell>{t("terms.roleAbility", { count: 1 })}</TableCell>
              <TableCell>
                <CastMemberDescription castMember={ra.castMember} />
              </TableCell>
              <TableCell>{ra.ability.triggers.map((trigger) => t(trigger.description_i18n_key)).join(", ")}</TableCell>
              <TableCell>{t(ra.ability.effect_i18n_key)}</TableCell>
            </TableRow>
          ))}
          {_.unique(fromIncidents, (i) => i.id).map((i) => (
            <TableRow key={`wc-${i.id}`}>
              <TableCell>{t("terms.incident_one")}</TableCell>
              <TableCell>{t(i.name_i18n_key)}</TableCell>
              <TableCell />
              <TableCell>{t(i.effect_i18n_key)}</TableCell>
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
  const { t } = useTranslation();

  const plotRules = props.plots.flatMap((plot) =>
    plot.plotRules.map((pr) => ({
      plotId: plot.id,
      ruleId: pr.id,
      plot: plot.name_i18n_key,
      rule: pr.effect_i18n_key,
    })),
  );
  return (
    <>
      <Typography variant="h3" sx={styles.headerWithIcon}>
        <Icons.PlotRules />
        {t("terms.plotRule", { count: 2 })}
      </Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell variant="head">{t("terms.plot")}</TableCell>
            <TableCell variant="head">{t("terms.effect")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.alphabetical(plotRules, (pr) => t(pr.plot)).map((pr) => (
            <TableRow key={`plotrule-${pr.plotId}-${pr.ruleId}`}>
              <TableCell>{t(pr.plot)}</TableCell>
              <TableCell>{t(pr.rule)}</TableCell>
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
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h3" sx={styles.headerWithIcon}>
        <Icons.MastermindAbilities />
        {t("terms.mastermindAbilities")}
      </Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell variant="head">{t("terms.mandatory")}</TableCell>
            <TableCell variant="head">{t("terms.triggeredBy")}</TableCell>
            <TableCell variant="head">{t("terms.effect")}</TableCell>
            <TableCell variant="head">{t("terms.perDay")}</TableCell>
            <TableCell variant="head">{t("terms.perLoop")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mastermindAbilities.map((mat, i) => (
            <TableRow key={`cheatsheet-ma-${i}`}>
              <TableCell>{t(mat.ability.optional ? "terms.optional" : "terms.mandatory")}</TableCell>
              <TableCell>
                <MastermindAbilityTriggerer mastermindAbility={mat} />
              </TableCell>
              <TableCell>{t(mat.ability.effect_i18n_key)}</TableCell>
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
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h3" sx={styles.headerWithIcon}>
        <Icons.RoleAbilities />
        {t("terms.roleAbility", { count: roleAbilities.length })}
      </Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell variant="head">{t("terms.trigger")}</TableCell>
            <TableCell variant="head">{t("terms.mandatory")}</TableCell>
            <TableCell variant="head">{t("terms.triggeredBy")}</TableCell>
            <TableCell variant="head">{t("terms.effect")}</TableCell>
            <TableCell variant="head">{t("terms.perLoop")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortRoleAbilities(roleAbilities).map((a, i) => (
            <TableRow key={`cheatsheet-ra-${i}`}>
              <TableCell>{a.ability.triggers.map((trigger) => t(trigger.description_i18n_key)).join(", ")}</TableCell>
              <TableCell>{t(a.ability.optional ? "terms.optional" : "terms.mandatory")}</TableCell>
              <TableCell>
                <CastMemberDescription castMember={a.castMember} />
              </TableCell>
              <TableCell>{t(a.ability.effect_i18n_key)}</TableCell>
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
  const { t } = useTranslation();
  if (incidents.length === 0) {
    return <></>;
  }

  return (
    <>
      <Typography variant="h3" sx={styles.headerWithIcon}>
        <Icons.Incidents />
        {t("terms.incident", { count: incidents.length })}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell variant="head">{t("terms.day", { count: 1 })}</TableCell>
            <TableCell variant="head">{t("terms.incident", { count: 1 })}</TableCell>
            <TableCell variant="head">{t("terms.culprit")}</TableCell>
            <TableCell variant="head">{t("terms.effect")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.sort(incidents, (i) => i.incidentTrigger.day).map(({ castMember, incidentTrigger }) => (
            <TableRow key={`cheatsheet-i-${incidentTrigger.id}`}>
              <TableCell>{incidentTrigger.day}</TableCell>
              <TableCell>{t(incidentTrigger.incident.name_i18n_key)}</TableCell>
              <TableCell>
                <CastMemberDescription castMember={castMember} />
              </TableCell>
              <TableCell>{t(incidentTrigger.incident.effect_i18n_key)}</TableCell>
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
  const { t } = useTranslation();
  return (
    <>
      {t(castMember.character.name_i18n_key)} (<RoleName role={castMember.role} />)
    </>
  );
}

interface MastermindAbilityTriggererProps {
  mastermindAbility: MastermindAbilityTrigger;
}
function MastermindAbilityTriggerer({ mastermindAbility }: MastermindAbilityTriggererProps): React.JSX.Element {
  const { t } = useTranslation();
  // If a cast member is defined, use it
  if (mastermindAbility.castMember !== undefined) {
    return <CastMemberDescription castMember={mastermindAbility.castMember} />;
  }
  // check plot next
  if (mastermindAbility.plot !== undefined) {
    return <>{t(mastermindAbility.plot.name_i18n_key)}</>;
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
