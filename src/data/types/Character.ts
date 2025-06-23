import { UUID } from "crypto";
import { Identifiable } from "../../@types/Identifiable";
import { Location } from "./Location";
import type { MessageFunction } from "@inlang/paraglide-js";

export class Character implements Identifiable {
  readonly id: UUID;
  readonly name: MessageFunction;
  readonly descriptors: Set<Descriptor>;
  readonly locations: Set<Location>;
  readonly startingLocation: Location;
  readonly #entersOnLoop?: (loops: number) => number;
  loopToEnter: number;

  constructor(fields: Fields) {
    this.id = fields.id;
    this.name = fields.name;
    this.descriptors = new Set(fields.descriptors);
    this.locations = new Set(fields.locations);
    this.startingLocation = fields.startingLocation;
    this.#entersOnLoop = fields.entersOnLoop;
    this.loopToEnter = 1; // by default
  }

  isMale(): boolean {
    return this.descriptors.has("Boy") || this.descriptors.has("Man");
  }

  isFemale(): boolean {
    return this.descriptors.has("Girl") || this.descriptors.has("Woman");
  }

  setLoopToEnter(loops: number): void {
    if (this.#entersOnLoop !== undefined) {
      this.loopToEnter = this.#entersOnLoop(loops);
    }
  }
}

interface Fields {
  readonly id: UUID;
  readonly name: MessageFunction;
  readonly descriptors: Array<Descriptor>;
  readonly locations: Array<Location>;
  readonly startingLocation: Location;
  readonly entersOnLoop?: (loops: number) => number;
}

export type Descriptor =
  | "Student"
  | "Boy"
  | "Girl"
  | "Adult"
  | "Man"
  | "Woman"
  | "Construct"
  | "Fabrication"
  | "Animal";
