import { Plot } from "../../data/types/Plot";
import { TragedySet } from "../../data/types/TragedySet";
import { Script } from "../../model/Script";
import { Deck } from "../../model/Deck";
import { PlotRole } from "../../data/types/PlotRole";
import { m } from "../../paraglide/messages";
import { CastMember } from "../../data/types/CastMember";
import * as Characters from "../../data/Characters";
import * as Incidents from "../../data/Incidents";
import * as Roles from "../../data/Roles";
import { Character } from "../../data/types/Character";
import { Incident } from "../../data/types/Incident";
import { IncidentOccurrence } from "../../model/IncidentOccurrence";

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
    incidents: new Deck(args.tragedySet.incidents),
    characters: new Deck(args.tragedySet.characters),
  };

  const mainPlot = decks.mainPlots.draw();
  const subplots = decks.subplots.pull(2);
  const plots = [mainPlot, ...subplots];

  // Determine our cast.
  const cast = chooseCast({
    tragedySet: args.tragedySet,
    plots,
    characters: decks.characters,
    requestedCastSize: args.castSize,
  });

  // How many days do we need?
  // Only one incident per day. Prefer to add days rather than cut incidents.
  const days = Math.max(args.days, args.incidents);
  if (days > args.days) {
    console.warn(m["warnings.daysOverridden"]({ needed: days }));
  }

  // Assign incidents to days.
  const incidentOccurrences = new Deck(
    getIncidentOccurrences({
      plots,
      incidents: decks.incidents,
      days,
      requestedIncidentCount: args.incidents,
    }),
  );

  // Assign incidents to cast members.
  // Until the deck of occurrences is empty, keep drawing.

  return new Script({
    tragedySet: args.tragedySet,
    mainPlot,
    subplots,
    cast,
    days,
  });
}

interface ChooseCastArgs {
  tragedySet: TragedySet;
  plots: Array<Plot>;
  characters: Deck<Character>;
  requestedCastSize: number;
}
function chooseCast(args: ChooseCastArgs): Array<CastMember> {
  // These roles are required by the plot.
  const requiredRoles = args.plots
    .flatMap((p) => p.roles())
    .reduce((roles: Array<PlotRole>, role: PlotRole) => {
      // Enforce maximum limits.
      // Check if the role is at capacity in the list we've already got.
      // If it is, we can't add it.
      if (!role.canBeAddedTo(roles, args.tragedySet)) {
        return roles;
      }

      // Otherwise, add the role to the list.
      return [...roles, role];
    }, []);

  // Determine our _actual_ cast size. If there are more roles than the
  // requested size, we have to grow to accommodate it.
  const castSize = maybeGrowCastSize(args.requestedCastSize, requiredRoles.length);

  // Now we need to figure out which characters are going to be in the cast.
  // First, fill each role.
  const cast: Array<CastMember> = [];
  requiredRoles.forEach((role) => {
    // Pick a character from the deck...
    const chosen = args.characters.select((character) => {
      // The Mystery Boy cannot have a required role, so don't pick him.
      const isMysteryBoy = character.id === Characters.mysteryBoy.id;
      // The role has to be able to be played by the chosen character, too.
      return !isMysteryBoy && role.canBePlayedBy(character, cast);
    });
    // We've got a character - add them to the cast as the role.
    cast.push(
      new CastMember({
        character: chosen,
        role: role,
      }),
    );
  });
  // If we need more cast members, then let's pick those and assign roles to them.
  if (cast.length < castSize) {
    const extraCast: Array<CastMember> = Array.from({ length: castSize - cast.length }, () => {
      // Grab a character.
      const character = args.characters.draw();
      // If it's not the mystery boy, it's just a regular Person.
      if (character.id !== Characters.mysteryBoy.id) {
        return new CastMember({ character, role: new PlotRole(Roles.person) });
      }
      // The Mystery Boy gets a random role not associated with any plot.
      return new CastMember({
        character,
        role: chooseMysteryBoyRole(args.plots, requiredRoles),
      });
    });

    cast.push(...extraCast);
  }

  return cast;
}

interface AssignIncidentsArgs {
  plots: Array<Plot>;
  incidents: Deck<Incident>;
  days: number;
  requestedIncidentCount: number;
}
function getIncidentOccurrences(args: AssignIncidentsArgs): Array<IncidentOccurrence> {
  // Which incidents do we _need_ to assign?
  const requiredIncidents = args.plots.flatMap((plot) => plot.requiredIncidents);
  const fillerIncidentCount = args.requestedIncidentCount - requiredIncidents.length;

  // Build out a deck of all incidents.
  const incidents = new Deck([
    // Starting with required incidents...
    ...requiredIncidents,
    // Fill out the rest...
    ...Array.from({ length: fillerIncidentCount }, () => args.incidents.peek()),
  ]);
  // Build out a deck of day numbers.
  const days = new Deck<number>(Array.from({ length: args.days }, (_, i) => i + 1));

  return incidents.pull(incidents.count).reduce((occurrences: Array<IncidentOccurrence>, incident: Incident) => {
    // If it's the first occurrence, it needs to happen on the last day
    const day = occurrences.length === 0 ? days.select((d) => d === args.days) : days.draw();
    const occurrence = new IncidentOccurrence({ day, incident });

    // If it's a fake incident, we need to assign a random incident as its fake
    if (occurrence.isIncident(Incidents.fakeIncident)) {
      incidents.peekWhere((incident) => incident.id !== Incidents.fakeIncident.id);
    }

    return [...occurrences, occurrence];
  }, []);
}

/**
 * In the case where our cast size needs to be bigger than the user requested,
 * we need to warn them that it happened.
 *
 * @param requested The requested cast size
 * @param required The required cast size (number of required roles)
 * @returns Maximum of required and requested. Logs a warning if required is returned.
 */
function maybeGrowCastSize(requested: number, required: number): number {
  if (required < requested) {
    console.warn(m["warnings.castSizeOverridden"]({ needed: required }));
    return required;
  }
  return requested;
}

function chooseMysteryBoyRole(plots: Array<Plot>, requiredRoles: Array<PlotRole>): PlotRole {
  // Figure out which roles are unused by any plots.
  const requiredRoleIds = new Set(requiredRoles.map((role) => role.id));
  const allRoles = plots.flatMap((plot) => plot.roles());

  // Make a deck out of the left over roles.
  const leftoverRoles = new Deck(allRoles.filter((role) => !requiredRoleIds.has(role.id)));

  // Draw a card from the deck.
  return leftoverRoles.draw();
}
