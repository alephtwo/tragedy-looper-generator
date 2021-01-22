import { CastMember } from '../types/Character';
import { Incident } from '../types/Incident';
import { IncidentOcurrence } from '../types/IncidentOcurrence';
import * as _ from 'lodash';

interface AssignIncidentsArgs {
  incidents: Array<Incident>;
  cast: Array<CastMember>;
  requestedIncidents: number;
  lastDay: number;
}

export function assignIncidents(args: AssignIncidentsArgs): Array<IncidentOcurrence> {
  // Make our pools.
  const castPool = [...args.cast];
  const incidentPool = [...args.incidents];
  const daysPool = _.range(1, args.lastDay + 1);

  // A place to hold our results.
  const assignedIncidents: Array<IncidentOcurrence> = [];

  // Knox's 7th: it is forbidden for the detective to be the culprit.
  // Remove anyone who can never be the culprit from the pool.
  _.remove(castPool, (c: CastMember) => c.role.isCulprit === 'never');

  // Likewise, some roles must always be a culprit. Add them.
  args.cast
    .filter((c) => c.role.isCulprit === 'always')
    .forEach((castMember) => {
      const chosenIncident = _.sample(incidentPool) as Incident;
      const chosenDay = _.sample(daysPool) as number;

      // Add them to the list of assigned things.
      assignedIncidents.push({
        character: castMember.character,
        incident: chosenIncident,
        day: chosenDay,
      });

      // Remove the data we just added from all pools.

      _.remove(castPool, (c: CastMember) => c.character.id === castMember.character.id);
      // Use splice to remove an incident since there may be duplicates by ID.
      const incidentIndexToRemove = incidentPool.findIndex((i) => i.id === chosenIncident.id);
      incidentPool.splice(incidentIndexToRemove, 1);
      _.remove(daysPool, chosenDay);
      console.log(
        `${castMember.character.name} is the culprit of ${chosenIncident.name} on day ${chosenDay} due to plot requirements.`
      );
    });

  // We now have a set of pools.
  // How many more do we need?
  const numberOfMissingAssignments = args.requestedIncidents - assignedIncidents.length;
  // There might be more incidents than we expect... which is fine, but we need to stop.
  if (numberOfMissingAssignments <= 0) {
    return assignedIncidents;
  }

  // Otherwise, pick!
  const chosenCast = _.sampleSize(castPool, numberOfMissingAssignments);
  const chosenIncidents = _.sampleSize(incidentPool, numberOfMissingAssignments);
  const chosenDays = _.sampleSize(daysPool, numberOfMissingAssignments);

  // Zip them all together.
  const remaining = _.zipWith(
    chosenCast,
    chosenIncidents,
    chosenDays,
    (castMember: CastMember, incident: Incident, day: number) => ({
      character: castMember.character,
      incident: incident,
      day: day,
    })
  );

  return assignedIncidents.concat(remaining);
}
