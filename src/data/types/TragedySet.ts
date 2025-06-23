import { Character } from "../../data/types/Character";
import { Incident } from "./Incident";
import { Plot } from "./Plot";
import { UUID } from "crypto";
import { MessageFunction } from "@inlang/paraglide-js";

export interface TragedySet {
  readonly id: UUID;
  readonly name: MessageFunction;
  readonly order: number;
  readonly characters: Array<Character>;
  readonly mainPlots: Array<Plot>;
  readonly subplots: Array<Plot>;
  readonly incidents: Array<Incident>;
}
