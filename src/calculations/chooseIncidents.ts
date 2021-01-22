import { Incident } from '../types/Incident';
import { Plot } from '../types/Plot';
import * as _ from 'lodash';
import { CastMember } from '../types/Character';

interface ChooseIncidentsArgs {
  incidents: Array<Incident>;
  plots: Array<Plot>;
  cast: Array<CastMember>;
  lastDay: number;
  requestedIncidents: number;
}

export function chooseIncidents(args: ChooseIncidentsArgs): Array<Incident> {
  // Make a copy of the full list of incidents, we're going to be modifying it shortly.
  const pool = [...args.incidents];
  // Make a holding tank for the incidents we have chosen.
  const chosenIncidents: Array<Incident> = [];

  // Find plots that have required incidents.
  const mandatoryIncidents = args.plots.filter((p) => p.incidents).flatMap<Incident>((p) => p.incidents || []);
  mandatoryIncidents.forEach((incident) => {
    // Add it to our list of chosen incidents.
    chosenIncidents.push(incident);
    // Remove it from the pool.
    // Use splice, since there might be more than one of the same incident.
    const indexToRemove = pool.findIndex((i) => i.id === incident.id);
    pool.splice(indexToRemove, 1);
    console.log(`Incident "${incident.name}" was added to the pool due to plot requirements.`);
  });

  // Certain roles need to be the culprit of an incident.
  // Regardless of what the user asked us for, we need to add incidents to account for that.
  // How many are there?
  const minimumIncidents = args.cast.filter((c) => c.role.isCulprit === 'always').length;

  // Now that we have packed our array, let's keep going.
  // Also worth mentioning that there can be more chosen incidents at this point than the user has requested.
  // That's just how it's gotta be, sometimes! The plot demands it.
  const distanceToRequested = args.requestedIncidents - chosenIncidents.length;
  const distanceToMinimum = minimumIncidents - chosenIncidents.length;

  // Whichever is higher: the amount we're missing from what the user asked for, or what is absolutely required
  // for roles, we need to have that many.
  const numberOfMissingIncidents = Math.max(distanceToRequested, distanceToMinimum);

  // If we have enough (or too many) we can stop here.
  if (numberOfMissingIncidents <= 0) {
    return chosenIncidents;
  }

  // If we need more incidents, grab them from the pool and return everything.
  // The same incident can happen more than once.
  const remaining = _.times<Incident>(numberOfMissingIncidents, () => _.sample(pool) as Incident);

  return chosenIncidents.concat(remaining);
}
