import { Script } from '../types/Script';
import * as _ from 'lodash';

export function estimateLoops(script: Script): number {
  const plots = [script.mainPlot].concat(script.subplots);

  const fromPlots = _.sum(plots.map((plot) => plot.estimateLoops(script)));
  const fromIncidents = _.sum(script.incidents.map((i) => i.incident.loopEstimate || 0));
  const fromDays = getLoopsFromDays(script.days);

  const estimate = Math.ceil(fromPlots + fromIncidents + fromDays);

  // Assume we want at least two loops to be a good sport.
  return Math.max(estimate, 2);
}

function getLoopsFromDays(days: number) {
  return days <= 6 ? -0.6 : -0.2;
}
