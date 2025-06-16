import { describe, it, expect } from "vitest";

import * as _ from "radash";
import { Characters } from "../data/Characters";
import { Expansions } from "../data/Expansions";
import { Incidents } from "../data/Incidents";
import { Locations } from "../data/Locations";
import { MainPlots, Subplots } from "../data/Plots";
import { Roles } from "../data/Roles";
import { TragedySets } from "../data/TragedySets";
import { Triggers } from "../data/Triggers";
import { DualRole } from "../data/types/Role";

describe("ID Uniqueness Check", () => {
  it("Ensure uniqueness of all ids", () => {
    const plots = Object.values(MainPlots).concat(Object.values(Subplots));
    const ids = [
      ...Object.values(Characters).map((c) => c.id),
      ...Object.values(Expansions).map((e) => e.id),
      ...Object.values(Incidents).map((i) => i.id),
      ...Object.values(Locations).map((l) => l.id),
      ...Object.values(MainPlots).map((i) => i.id),
      ...Object.values(Subplots).map((i) => i.id),
      ...Object.values(Roles).map((r) => r.id),
      ...Object.values(TragedySets).map((ts) => ts.id),
      ...Object.values(Triggers).map((t) => t.id),
      // Plot Rules
      ...plots.map((mp) => mp.plotRules.map((pr) => pr.id)),
      // Dual Roles
      ...plots.map((p) =>
        p
          .roles()
          .filter((r) => r instanceof DualRole)
          .map((r) => r.id),
      ),
      // Role Abilities
      ...Object.values(Roles).flatMap((r) => r.abilities.map((ra) => ra.id)),
    ];

    expect(ids.length).toEqual(new Set(ids).size);
  });
});
