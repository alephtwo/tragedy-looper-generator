import { assert } from 'chai';
import * as _ from 'lodash';
import { describe } from 'mocha';
import { Characters } from '../../src/data/Characters';
import { Expansions } from '../../src/data/Expansions';
import { Incidents } from '../../src/data/Incidents';
import { MainPlots, Subplots } from '../../src/data/Plots';
import { Roles } from '../../src/data/Roles';
import { TragedySets } from '../../src/data/TragedySets';
import { Triggers } from '../../src/data/Triggers';

describe('ID Uniqueness Check', () => {
  it('Ensure uniqueness of all ids', () => {
    const ids = [
      ..._.values(Characters).map((c) => c.id),
      ..._.values(Expansions).map((e) => e.id),
      ..._.values(Incidents).map((i) => i.id),
      ..._.values(MainPlots).map((i) => i.id),
      ..._.values(Subplots).map((i) => i.id),
      ..._.values(Roles).map((r) => r.id),
      ..._.values(TragedySets).map((ts) => ts.id),
      ..._.values(Triggers).map((t) => t.id),
    ];

    _.each(
      _.countBy(ids, (a) => a),
      (v, k) => {
        assert.equal(v, 1, `${k} appears ${v} times`);
      }
    );
  });
});
