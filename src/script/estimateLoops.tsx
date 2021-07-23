import * as _ from 'lodash';
import { Script } from '../types/Script';

export function estimateLoops(script: Script): number {
  console.debug('Script', script);
  return _.random(1, 10);
}
