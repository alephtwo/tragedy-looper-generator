import { Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import * as _ from 'lodash';
import * as React from 'react';
import { CastMember } from '../model/CastMember';
import { Incident } from '../model/data/Incident';
import { MastermindAbility } from '../model/data/MastermindAbility';
import { Plot } from '../model/data/Plot';
import { PlotRule } from '../model/data/PlotRule';
import { RoleAbility } from '../model/data/RoleAbility';
import { IncidentOccurrence } from '../model/IncidentOccurrence';
import { Script } from '../model/Script';
import { useTranslation } from 'react-i18next';
import { i18n as i18next } from 'i18next';

interface CheatsheetProps {
  script: Script;
}
export function Cheatsheet(props: CheatsheetProps): JSX.Element {
  const { t, i18n } = useTranslation();
  if (!props.script.isValid()) {
    return <></>;
  }

  const mastermindAbilities = extractMastermindAbilities(props.script, i18n);
  const roleAbilities = extractRoleAbilities(props.script, i18n);
  const allIncidents = props.script.cast.flatMap((c) => {
    return c.incidentTriggers.map((it) => ({
      castMember: c,
      incidentTrigger: it,
    }));
  });

  return (
    <Paper sx={styles.paper}>
      <Typography variant="h1" align="center">
        {t('scaffolding.cheatsheet')}
      </Typography>
      <Divider sx={styles.extraBottomMargin} />
      <WinConditions plots={props.script.plots()} roleAbilities={roleAbilities} incidents={allIncidents} />
      <Typography variant="h2">{t('terms.mastermindAbilities')}</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>{t('terms.mandatory')}</TableCell>
            <TableCell>{t('terms.triggeredBy')}</TableCell>
            <TableCell>{t('terms.effect')}</TableCell>
            <TableCell>{t('terms.perDay')}</TableCell>
            <TableCell>{t('terms.perLoop')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mastermindAbilities.map((mat, i) => (
            <TableRow key={`cheatsheet-ma-${i}`}>
              <TableCell>{t(mat.ability.optional ? 'terms.optional' : 'terms.mandatory')}</TableCell>
              <TableCell>{mat.triggerer}</TableCell>
              <TableCell>{t(mat.ability.effect_i18n_key)}</TableCell>
              <TableCell>{mat.ability.timesPerDay}</TableCell>
              <TableCell>{mat.ability.timesPerLoop}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="h2">{t('terms.roleAbility', { count: 2 })}</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>{t('terms.trigger')}</TableCell>
            <TableCell>{t('terms.mandatory')}</TableCell>
            <TableCell>{t('terms.triggeredBy')}</TableCell>
            <TableCell>{t('terms.effect')}</TableCell>
            <TableCell>{t('terms.perLoop')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortRoleAbilities(roleAbilities).map((a, i) => (
            <TableRow key={`cheatsheet-ra-${i}`}>
              <TableCell>{t(a.ability.trigger.description_i18n_key)}</TableCell>
              <TableCell>{t(a.ability.optional ? 'terms.optional' : 'terms.mandatory')}</TableCell>
              <TableCell>{a.triggerer}</TableCell>
              <TableCell>{t(a.ability.effect_i18n_key)}</TableCell>
              <TableCell>{a.ability.timesPerLoop}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="h2">{t('terms.incident', { count: 2 })}</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>{t('terms.day_one')}</TableCell>
            <TableCell>{t('terms.incident_one')}</TableCell>
            <TableCell>{t('terms.culprit')}</TableCell>
            <TableCell>{t('terms.effect')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.sortBy(allIncidents, (i) => i.incidentTrigger.day).map(({ castMember, incidentTrigger }) => (
            <TableRow key={`cheatsheet-i-${incidentTrigger.id}`}>
              <TableCell>{incidentTrigger.day}</TableCell>
              <TableCell>{t(incidentTrigger.incident.name_i18n_key)}</TableCell>
              <TableCell>{castMember.describe(i18n)}</TableCell>
              <TableCell>{t(incidentTrigger.incident.effect_i18n_key)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

interface WinConditionsProps {
  plots: Array<Plot>;
  roleAbilities: Array<RoleAbilityTrigger>;
  incidents: Array<CastMemberIncidentTrigger>;
}
function WinConditions(props: WinConditionsProps): JSX.Element {
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
      <Typography variant="h2">{t('terms.winConditions')}</Typography>
      <Table size="small" sx={styles.extraBottomMargin}>
        <TableHead>
          <TableRow>
            <TableCell>{t('terms.mechanic')}</TableCell>
            <TableCell>{t('terms.source')}</TableCell>
            <TableCell>{t('terms.trigger')}</TableCell>
            <TableCell>{t('terms.effect')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.uniqBy(fromPlotRules, (pr) => pr.id).map((pr) => (
            <TableRow key={`wc-${pr.id}`}>
              <TableCell>{t('terms.plotRule')}</TableCell>
              <TableCell />
              <TableCell>{t(pr.trigger.description_i18n_key)}</TableCell>
              <TableCell>{t(pr.effect_i18n_key)}</TableCell>
            </TableRow>
          ))}
          {sortRoleAbilities(
            _.uniqWith(fromRoleAbilities, (a, b) => a.ability.id === b.ability.id && a.triggerer === b.triggerer),
          ).map((ra) => (
            <TableRow key={`wc-${ra.ability.id}-${ra.triggerer}`}>
              <TableCell>{t('terms.roleAbility')}</TableCell>
              <TableCell>{ra.triggerer}</TableCell>
              <TableCell>{t(ra.ability.trigger.description_i18n_key)}</TableCell>
              <TableCell>{t(ra.ability.effect_i18n_key)}</TableCell>
            </TableRow>
          ))}
          {_.uniqBy(fromIncidents, (i) => i.id).map((i) => (
            <TableRow key={`wc-${i.id}`}>
              <TableCell>{t('terms.incident_one')}</TableCell>
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

function extractMastermindAbilities(script: Script, i18n: i18next): Array<MastermindAbilityTrigger> {
  const fromPlots = script.plots().flatMap((p) => {
    return p.mastermindAbilities.map((ma) => ({
      ability: ma,
      triggerer: i18n.t(p.name_i18n_key),
    }));
  });
  const fromRoles = script.cast.flatMap((c) => {
    return c.role.mastermindAbilities.map((ma) => ({
      ability: ma,
      triggerer: c.describe(i18n),
    }));
  });
  return fromPlots.concat(fromRoles);
}

function extractRoleAbilities(script: Script, i18n: i18next): Array<RoleAbilityTrigger> {
  return script.cast.flatMap((c) => {
    return c.role.abilities.map((a) => ({
      ability: a,
      triggerer: c.describe(i18n),
    }));
  });
}

function sortRoleAbilities(roleAbilities: Array<RoleAbilityTrigger>): Array<RoleAbilityTrigger> {
  return _.sortBy(roleAbilities, (a) => a.ability.trigger.order);
}

const styles = {
  paper: {
    padding: 2,
  },
  extraBottomMargin: {
    marginBottom: 2,
  },
};

interface MastermindAbilityTrigger {
  ability: MastermindAbility;
  triggerer: string;
}

interface RoleAbilityTrigger {
  ability: RoleAbility;
  triggerer: string;
}

interface CastMemberIncidentTrigger {
  castMember: CastMember;
  incidentTrigger: IncidentOccurrence;
}
