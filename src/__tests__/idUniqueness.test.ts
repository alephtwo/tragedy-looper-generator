import { describe, it, expect } from "vitest";

import * as _ from "radash";
import * as Characters from "../data/Characters";
import * as Expansions from "../data/Expansions";
import * as Incidents from "../data/Incidents";
import * as Locations from "../data/Locations";
import * as MainPlots from "../data/MainPlots";
import * as Subplots from "../data/Subplots";
import * as Roles from "../data/Roles";
import * as TragedySets from "../data/TragedySets";
import * as Triggers from "../data/Triggers";

describe("ID Uniqueness Check", () => {
  it("Ensure uniqueness of all ids", () => {
    const ids = [
      ...Object.values(Expansions).map((e) => e.id),
      ...Object.values(TragedySets).map((ts) => ts.id),
      ...Object.values(Characters).map((c) => c.id),
      ...Object.values(Incidents).map((i) => i.id),
      ...Object.values(Locations).map((l) => l.id),
      ...Object.values(MainPlots).map((i) => i.id),
      ...Object.values(Subplots).map((i) => i.id),
      ...Object.values(Roles).map((r) => r.id),
      ...Object.values(Triggers).map((t) => t.id),
      ...Object.values(Roles).flatMap((r) => (r.abilities ?? []).map((ra) => ra.id)),
    ];

    expect(ids.length).toEqual(new Set(ids).size);
  });
});
