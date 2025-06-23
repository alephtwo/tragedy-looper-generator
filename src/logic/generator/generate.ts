import { produce } from "immer";
import * as _ from "radash";
import * as Characters from "../../data/Characters";
import * as Incidents from "../../data/Incidents";
import * as Roles from "../../data/Roles";
import { CastMember } from "../../model/CastMember";
import { Character } from "../../data/types/Character";
import { Incident } from "../../data/types/Incident";
import { Plot } from "../../data/types/Plot";
import { TragedySet } from "../../data/types/TragedySet";
import { IncidentOccurrence } from "../../model/IncidentOccurrence";
import { Script } from "../../model/Script";
import { Deck } from "../../model/Deck";
import { PlotRole } from "../../data/types/PlotRole";

export interface GenerateArgs {
  tragedySet: TragedySet;
  castSize: number;
  days: number;
  incidents: number;
}
export function generate(args: GenerateArgs): Script {
  const decks = {
    mainPlots: new Deck(args.tragedySet.mainPlots),
    subplots: new Deck(args.tragedySet.subplots),
  };

  const mainPlot = decks.mainPlots.draw();
  const subplots = decks.subplots.pull(2);
  const plots = [mainPlot].concat(subplots);

  // Find the required roles.
  // Notably, the Mystery Boy might appear in the initial cast. If he does,
  // then we have to account for his role slot already being filled.
  const requiredRoles = getRequiredRoles(plots, args.tragedySet);
  const initialCast = initializeCast(args, requiredRoles);

  // If there is any initial cast, we should account for their roles
  const roles = fillRemainingRoles(requiredRoles, args.castSize - initialCast.length);
  const castWithoutIncidents = roles.reduce(buildCast, {
    cast: initialCast,
    // Assume that the mystery boy has already been assigned.
    characters: args.tragedySet.characters.filter((c) => c.id !== Characters.mysteryBoy.id),
  }).cast;

  const incidents = pickIncidents({
    incidents: args.tragedySet.incidents,
    amount: args.incidents,
    days: args.days,
    plots: plots,
  });

  const cast = assignIncidentsToCast(castWithoutIncidents, incidents);
  return new Script({
    tragedySet: args.tragedySet,
    days: args.days,
    mainPlot: mainPlot,
    subplots: subplots,
    cast: cast,
  });
}

function getRequiredRoles(plots: Array<Plot>, tragedySet: TragedySet): Array<PlotRole> {
  const roles = plots.flatMap((p) => p.roles());

  return roles.reduce((roles: Array<PlotRole>, role: PlotRole) => {
    // Enforce maximum limits.
    // Check if the role is at capacity in the list we've already got.
    // If it is, we can't add it.
    if (!role.canBeAddedTo(roles, tragedySet)) {
      return roles;
    }

    // Otherwise, add the role to the list.
    return [...roles, role];
  }, []);
}

// Enforce maximums.
function fillRemainingRoles(roles: Array<PlotRole>, castSize: number): Array<PlotRole> {
  // If the castSize is less than the number of required plots... sorry, users.
  // We'll need to add more cast.
  const needed = Math.max(castSize, roles.length);
  // We want to return an array of length equal to castSize.
  // Fill the rest with "Person" roles.
  const filler = new Array(needed - roles.length).fill(new PlotRole(Roles.person));
  return roles.concat(filler);
}

function initializeCast(args: GenerateArgs, requiredRoles: Array<PlotRole>): Array<CastMember> {
  const tragedySet = args.tragedySet;

  // We're going to pick a fake cast and if we get the Mystery Boy,
  // we'll just pretend he was already picked.
  const fakeCast = _.shuffle(tragedySet.characters).slice(0, args.castSize);
  if (!fakeCast.some((c) => c.id === Characters.mysteryBoy.id)) {
    // No Mystery Boy, no need it initialize
    return [];
  }

  // Alright, we've got a mystery boy. Now we need to find a role for him.
  // Per the rules, he can't have a role dictated by the plot.
  const requiredRoleIds = new Set(requiredRoles.map((r) => r.id));
  const candidateRoles = tragedySet.mainPlots
    .concat(tragedySet.subplots)
    .flatMap((p) => p.roles())
    .filter((r) => !requiredRoleIds.has(r.id));

  return [
    new CastMember({
      character: Characters.mysteryBoy,
      // oh my what a hack
      role: _.draw(candidateRoles) as PlotRole,
      incidentTriggers: [],
    }),
  ];
}

interface BuildCastAccumulator {
  cast: Array<CastMember>;
  characters: Array<Character>;
}
function buildCast(state: BuildCastAccumulator, role: PlotRole): BuildCastAccumulator {
  // Grab the real role.
  const character = matchCharacter(state.characters, role, state.cast);

  return produce(state, (next) => {
    // Add the cast member.
    next.cast.push(
      new CastMember({
        character: character,
        role: role,
        // We will assign incidents later.
        incidentTriggers: [],
      }),
    );
    // Remove the character from the pool.
    next.characters.splice(
      next.characters.findIndex((c) => c.id === character.id),
      1,
    );
  });
}

function matchCharacter(pool: Array<Character>, role: PlotRole, cast: Array<CastMember>): Character {
  // Find characters that can meet that role.
  const characters = pool.filter((c) => role.canBePlayedBy(c, cast));

  // Pick a random one of the matching characters.
  // This cast might cause problems but I'm really hoping it won't.
  return _.draw(characters) as Character;
}

interface PickIncidentsArgs {
  incidents: Array<Incident>;
  amount: number;
  days: number;
  plots: Array<Plot>;
}
function pickIncidents(args: PickIncidentsArgs): Array<IncidentOccurrence> {
  const required = args.plots.flatMap((p) => p.requiredIncidents);

  // Can't have more incidents than we do days.
  // TODO: Account for whether or not we have roles that require incidents.
  // We also might have some that are required, in which case we don't want to double count those.
  const amount = Math.min(args.amount, args.days) - required.length;
  // Pick however many we still need at random.
  const remainingIncidents = Array.from({ length: amount }, () => _.draw(args.incidents) as Incident);

  const incidents = required.concat(remainingIncidents);
  const assignedIncidents = incidents.reduce(assignDayToIncident, {
    lastDay: args.days,
    days: _.list(1, args.days),
    occurrences: [],
  }).occurrences;

  // For each of our assigned incidents, we want to actually go through and assign it.
  return produce(assignedIncidents, (next) => {
    next
      .filter((i) => i.incident.id === Incidents.fakeIncident.id)
      .forEach((incident) => {
        const candidates = incidents.filter((i) => i.id !== Incidents.fakeIncident.id);
        incident.setFake(_.draw(candidates) as Incident);
      });
  });
}

interface AssignDayToIncidentState {
  lastDay: number; // need to know the last available day so it can be assigned first
  days: Array<number>;
  occurrences: Array<IncidentOccurrence>;
}
function assignDayToIncident(state: AssignDayToIncidentState, incident: Incident): AssignDayToIncidentState {
  // cool cast bro
  // if this is the first day we're assigning, it needs to pick the last day
  // an incident must always occur on the last day
  const day = state.occurrences.length === 0 ? state.lastDay : (_.draw(state.days) as number);
  return produce(state, (next) => {
    next.days.splice(
      next.days.findIndex((d) => d === day),
      1,
    );
    next.occurrences.push(new IncidentOccurrence({ incident: incident, day: day }));
  });
}

function assignIncidentsToCast(cast: Array<CastMember>, incidents: Array<IncidentOccurrence>): Array<CastMember> {
  return produce(cast, (next) => {
    // Who _could_ be a culprit here?
    let culpritPool = [...next.filter((c) => !c.role.canNeverBeCulprit())];
    incidents.forEach((incident) => {
      // If we are attempting to assign a serial murder and one has already been assigned, we will assign it to the same culprit.
      // TODO: Support that it _might_ be the same culprit, but doesn't have to be. Coin flip?
      // If you're working on a script that doesn't want the same role to be responsible for all of the serial murders,
      // you should probably just write a script manually and not generate one at random.
      if (incident.incident.id === Incidents.serialMurder.id) {
        const serialMurderer = next.find((c) =>
          c.incidentTriggers.some((i) => i.incident.id === Incidents.serialMurder.id),
        );
        if (serialMurderer !== undefined) {
          serialMurderer.incidentTriggers.push(incident);
          return;
        }
      }

      // We know we're not dealing with a serial murderer here.
      // If there is a culprit candidate who is mandatory but hasn't yet been assigned, let's do that.
      const required = culpritPool.filter((c) => c.role.mustBeCulprit() && c.incidentTriggers.length === 0);

      // Pick a culprit.
      const culprit = (required.length > 0 ? _.first(required) : _.draw(culpritPool)) as CastMember;

      // Take that culprit and assign it the incident.
      culprit.incidentTriggers.push(incident);

      // Remove the culprit from the pool of possibilities.
      culpritPool = produce(culpritPool, (next) => {
        next.splice(
          next.findIndex((c) => c.character.id === culprit.character.id),
          1,
        );
      });
    });
  });
}
