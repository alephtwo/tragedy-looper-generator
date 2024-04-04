import { describe, it, expect } from "vitest";

import * as _ from "lodash";
import { Characters } from "../data/Characters";
import { Expansions } from "../data/Expansions";
import { Incidents } from "../data/Incidents";
import { Locations } from "../data/Locations";
import { MainPlots, Subplots } from "../data/Plots";
import { Roles } from "../data/Roles";
import { TragedySets } from "../data/TragedySets";
import { Triggers } from "../data/Triggers";

describe("ID Uniqueness Check", () => {
  it("Ensure uniqueness of all ids", () => {
    const ids = [
      ..._.values(Characters).map((c) => c.id),
      ..._.values(Expansions).map((e) => e.id),
      ..._.values(Incidents).map((i) => i.id),
      ..._.values(Locations).map((l) => l.id),
      ..._.values(MainPlots).map((i) => i.id),
      ..._.values(Subplots).map((i) => i.id),
      ..._.values(Roles).map((r) => r.id),
      ..._.values(TragedySets).map((ts) => ts.id),
      ..._.values(Triggers).map((t) => t.id),
      // Plot Rules
      ..._.values(MainPlots)
        .concat(..._.values(Subplots))
        .flatMap((mp) => mp.plotRules.map((pr) => pr.id)),
      // Role Abilities
      ..._.values(Roles).flatMap((r) => r.abilities.map((ra) => ra.id)),
    ];

    _.each(
      _.countBy(ids, (a) => a),
      (v, _k) => {
        expect(v).toEqual(1);
      },
    );
  });
});
