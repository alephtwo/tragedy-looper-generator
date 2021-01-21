import { GeneratorArgs } from '../types/GeneratorArgs';
import { Script } from '../types/Script';
import { Plot } from '../types/Plot';
import { chooseCharacters } from './chooseCharacters';
import { chooseIncidents } from './chooseIncidents';
import { assignRoles } from './assignRoles';
import { assignIncidents } from './assignIncidents';
import * as _ from 'lodash';

export function generateScript(args: GeneratorArgs): Script {
  const { tragedySet } = args;

  // Figure out what plots we're dealing with.
  const mainPlot = chooseMainPlot(tragedySet.mainPlots);
  const subplots = chooseSubplots(tragedySet.subplots, args.subplots);
  const plots = [mainPlot].concat(subplots);

  // What cast are we going to have?
  const characters = chooseCharacters({
    amount: args.castSize,
    useMidnightCircleCharacters: args.useMidnightCircleCharacters,
    useCosmicEvilCharacters: args.useCosmicEvilCharacters,
    plots: plots,
  });

  // Assign a role to each member of our cast.
  const cast = assignRoles(characters, plots);

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
