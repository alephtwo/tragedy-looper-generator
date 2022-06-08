import { estimateLoops } from '../scriptGenerator/estimateLoops';
import { CastMember } from './CastMember';
import { Plot } from './data/Plot';
import { TragedySet } from './data/TragedySet';
import { IncidentOccurrence } from './IncidentOccurrence';

export class Script {
  readonly tragedySet: TragedySet;
  readonly loops: number;
  readonly days: number;
  readonly mainPlot: Plot;
  readonly subplots: Array<Plot>;
  readonly cast: Array<CastMember>;

  constructor(args: ScriptArgs) {
    this.tragedySet = args.tragedySet;
    this.days = args.days;
    this.mainPlot = args.mainPlot;
    this.subplots = args.subplots;
    this.cast = args.cast;

    const loops = estimateLoops(this);
    this.loops = loops;
    this.cast.forEach((c) => c.character.setLoopToEnter(loops));
  }

  getIncidents(): Array<IncidentOccurrence> {
    return this.cast.flatMap((c) => c.incidentTriggers);
  }

  isValid(): boolean {
    return this.cast.length > 0;
  }

  plots(): Array<Plot> {
    return [this.mainPlot].concat(this.subplots);
  }
}

interface ScriptArgs {
  readonly tragedySet: TragedySet;
  readonly days: number;
  readonly mainPlot: Plot;
  readonly subplots: Array<Plot>;
  readonly cast: Array<CastMember>;
}
