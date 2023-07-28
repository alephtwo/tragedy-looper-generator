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
    <div className="p-2 bg-blue-500">
      <h1>{t("scaffolding.cheatsheet")}</h1>
      <WinConditions plots={script.plots()} roleAbilities={roleAbilities} incidents={allIncidents} />
      <MastermindAbilities mastermindAbilities={mastermindAbilities} />
      <RoleAbilities roleAbilities={roleAbilities} />
      <Incidents incidents={allIncidents} />
    </div>
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
      <h1>{t("terms.winConditions")}</h1>
      <table>
        <thead>
          <tr>
            <th>{t("terms.mechanic")}</th>
            <th>{t("terms.source")}</th>
            <th>{t("terms.trigger")}</th>
            <th>{t("terms.effect")}</th>
          </tr>
        </thead>
        <tbody>
          {_.uniqBy(fromPlotRules, (pr) => pr.id).map((pr) => (
            <tr key={`wc-${pr.id}`}>
              <td>{t("terms.plotRule")}</td>
              <td></td>
              <td>{t(pr.trigger.description_i18n_key)}</td>
              <td>{t(pr.effect_i18n_key)}</td>
            </tr>
          ))}
          {sortRoleAbilities(
            _.uniqWith(
              fromRoleAbilities,
              (a, b) => a.ability.id === b.ability.id && a.castMember.id === b.castMember.id,
            ),
          ).map((ra) => (
            <tr key={`wc-${ra.ability.id}-${ra.castMember.id}`}>
              <td>{t("terms.roleAbility", { count: 1 })}</td>
              <td>
                <CastMemberDescription castMember={ra.castMember} />
              </td>
              <td>{t(ra.ability.trigger.description_i18n_key)}</td>
              <td>{t(ra.ability.effect_i18n_key)}</td>
            </tr>
          ))}
          {_.uniqBy(fromIncidents, (i) => i.id).map((i) => (
            <tr key={`wc-${i.id}`}>
              <td>{t("terms.incident_one")}</td>
              <td>{t(i.name_i18n_key)}</td>
              <td />
              <td>{t(i.effect_i18n_key)}</td>
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
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("terms.mastermindAbilities")}</h1>
      <table>
        <thead>
          <tr>
            <th>{t("terms.mandatory")}</th>
            <th>{t("terms.triggeredBy")}</th>
            <th>{t("terms.effect")}</th>
            <th>{t("terms.perDay")}</th>
            <th>{t("terms.perLoop")}</th>
          </tr>
        </thead>
        <tbody>
          {mastermindAbilities.map((mat, i) => (
            <tr key={`cheatsheet-ma-${i}`}>
              <td>{t(mat.ability.optional ? "terms.optional" : "terms.mandatory")}</td>
              <td>
                <MastermindAbilityTriggerer mastermindAbility={mat} />
              </td>
              <td>{t(mat.ability.effect_i18n_key)}</td>
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
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("terms.roleAbility", { count: 2 })}</h1>
      <table>
        <thead>
          <tr>
            <th>{t("terms.trigger")}</th>
            <th>{t("terms.mandatory")}</th>
            <th>{t("terms.triggeredBy")}</th>
            <th>{t("terms.effect")}</th>
            <th>{t("terms.perLoop")}</th>
          </tr>
        </thead>
        <tbody>
          {sortRoleAbilities(roleAbilities).map((a, i) => (
            <tr key={`cheatsheet-ra-${i}`}>
              <td>{t(a.ability.trigger.description_i18n_key)}</td>
              <td>{t(a.ability.optional ? "terms.optional" : "terms.mandatory")}</td>
              <td>
                <CastMemberDescription castMember={a.castMember} />
              </td>
              <td>{t(a.ability.effect_i18n_key)}</td>
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
  const { t, i18n } = useTranslation();
  if (incidents.length === 0) {
    return <></>;
  }

  return (
    <>
      <h1>{t("terms.incident", { count: 2 })}</h1>
      <table>
        <thead>
          <tr>
            <th>{t("terms.day", { count: 1 })}</th>
            <th>{t("terms.incident", { count: 1 })}</th>
            <th>{t("terms.culprit")}</th>
            <th>{t("terms.effect")}</th>
          </tr>
        </thead>
        <tbody>
          {_.sortBy(incidents, (i) => i.incidentTrigger.day).map(({ castMember, incidentTrigger }) => (
            <tr key={`cheatsheet-i-${incidentTrigger.id}`}>
              <td>{incidentTrigger.day}</td>
              <td>{t(incidentTrigger.incident.name_i18n_key)}</td>
              <td>
                <CastMemberDescription castMember={castMember} />
              </td>
              <td>{t(incidentTrigger.incident.effect_i18n_key)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
