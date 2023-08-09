import * as React from "react";
import * as _ from "lodash";
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

interface CheatsheetProps {
  script: Script;
}
export function Cheatsheet({ script }: CheatsheetProps): React.JSX.Element {
  const { t } = useTranslation();
  if (!script.isValid()) {
    return <></>;
  }

  const mastermindAbilities = extractMastermindAbilities(script);
  const roleAbilities = extractRoleAbilities(script);
  const allIncidents = script.cast.flatMap((c) => {
    return c.incidentTriggers.map((it) => ({
      castMember: c,
      incidentTrigger: it,
    }));
  });

  return (
    <Paper sx={{ padding: 2 }} elevation={1}>
      <Box sx={styles.section}>
        <Typography variant="h2" sx={styles.headerWithIcon}>
          <Icons.Cheatsheet />
          {t("scaffolding.cheatsheet")}
        </Typography>
        <Divider variant="fullWidth" />
        <WinConditions plots={script.plots()} roleAbilities={roleAbilities} incidents={allIncidents} />
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
          {_.uniqBy(fromPlotRules, (pr) => pr.id).map((pr) => (
            <TableRow key={`wc-${pr.id}`}>
              <TableCell>{t("terms.plotRule")}</TableCell>
              <TableCell></TableCell>
              <TableCell>{t(pr.trigger.description_i18n_key)}</TableCell>
              <TableCell>{t(pr.effect_i18n_key)}</TableCell>
            </TableRow>
          ))}
          {sortRoleAbilities(
            _.uniqWith(
              fromRoleAbilities,
              (a, b) => a.ability.id === b.ability.id && a.castMember.id === b.castMember.id,
            ),
          ).map((ra) => (
            <TableRow key={`wc-${ra.ability.id}-${ra.castMember.id}`}>
              <TableCell>{t("terms.roleAbility", { count: 1 })}</TableCell>
              <TableCell>
                <CastMemberDescription castMember={ra.castMember} />
              </TableCell>
              <TableCell>{t(ra.ability.trigger.description_i18n_key)}</TableCell>
              <TableCell>{t(ra.ability.effect_i18n_key)}</TableCell>
            </TableRow>
          ))}
          {_.uniqBy(fromIncidents, (i) => i.id).map((i) => (
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
              <TableCell>{t(a.ability.trigger.description_i18n_key)}</TableCell>
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
          {_.sortBy(incidents, (i) => i.incidentTrigger.day).map(({ castMember, incidentTrigger }) => (
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
  return _.sortBy(roleAbilities, (a) => a.ability.trigger.order);
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
      {t(castMember.character.name_i18n_key)} ({t(castMember.role.name_i18n_key)})
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
