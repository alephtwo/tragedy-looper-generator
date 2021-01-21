import { GeneratorArgs } from '../types/GeneratorArgs';
import { Script } from '../types/Script';
import { Plot } from '../types/Plot';
import { chooseCharacters } from './chooseCharacters';
import { chooseIncidents } from './chooseIncidents';
import { assignRoles } from './assignRoles';
import { assignIncidents } from './assignIncidents';
import * as _ from 'lodash';
import { getRoles } from './getRoles';

export function generateScript(args: GeneratorArgs): Script {
  const { tragedySet } = args;

  // Figure out what plots we're dealing with.
  const mainPlot = chooseMainPlot(tragedySet.mainPlots);
  const subplots = chooseSubplots(tragedySet.subplots, args.subplots);
  const plots = [mainPlot].concat(subplots);

  // What roles are going to come into play?
  const roles = getRoles(plots, args.castSize);

  // Notably, the plot can demand more roles than there are characters.
  // From now on, use the max of the two.
  // Sorry, users!
  const neededCharacters = Math.max(args.castSize, roles.length);
  if (neededCharacters != args.castSize) {
    console.log('Characters have been added to ensure that roles can be filled.');
  }

  // What cast are we going to have?
  const characters = chooseCharacters({
    amount: neededCharacters,
    useMidnightCircleCharacters: args.useMidnightCircleCharacters,
    useCosmicEvilCharacters: args.useCosmicEvilCharacters,
    plots: plots,
  });

  // Assign a role to each member of our cast.
  const cast = assignRoles({
    characters: characters,
    plots: plots,
    roles: roles,
  });

  // What incidents are we going to have?
  const incidents = chooseIncidents({
    incidents: tragedySet.incidents,
    plots: plots,
    cast: cast,
    lastDay: args.days,
    requestedIncidents: args.incidents,
  });

  // Based on the cast, we need to assign incidents to each.
  const incidentOccurrences = assignIncidents({
    incidents: incidents,
    cast: cast,
    requestedIncidents: args.incidents,
    lastDay: args.days,
  });

  return {
    tragedySet: tragedySet.title,
    mainPlot: mainPlot,
    subplots: subplots,
    cast: cast,
    incidents: incidentOccurrences,
  };
}

function chooseMainPlot(pool: Array<Plot>): Plot {
  return _.sample(pool) as Plot;
}

function chooseSubplots(pool: Array<Plot>, size: number): Array<Plot> {
  return _.sampleSize(pool, size);
}
